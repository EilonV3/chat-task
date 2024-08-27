import socket

def test_server():
    server_ip = 'localhost'
    port = 2000
    username = "TestUser"
    message = "Hello, this is a test message!"

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((server_ip, port))
        sock.sendall(username.encode('utf-8'))  # Send username
        sock.sendall(message.encode('utf-8'))   # Send message

        response = sock.recv(1024).decode('utf-8')
        print(f'Server response: {response}')

if __name__ == "__main__":
    test_server()