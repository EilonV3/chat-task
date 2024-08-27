def handle_client(server, client_socket, client_address):
    log_message(f"New connection from {client_address}")
    try:
        name = client_socket.recv(1024).decode('utf-8')
        server.clients[client_socket] = name
        server.broadcast(f"{name} has joined the chat!", client_socket)
        
        while True:
            message = client_socket.recv(1024).decode('utf-8')
            if message:
                server.broadcast(f"{name}: {message}", client_socket)
            else:
                server.remove_client(client_socket)
                break
    except Exception as e:
        log_message(f"Error: {e}")
        server.remove_client(client_socket)