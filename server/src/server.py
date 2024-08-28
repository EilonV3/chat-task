import asyncio
import websockets
import logging
import json

logging.basicConfig(level=logging.INFO)

connected_clients = set()

async def handler(websocket, path):
    # Add the new client to the set of connected clients
    connected_clients.add(websocket)
    logging.info(f"Accepted connection from {websocket.remote_address}")
    username_message = await websocket.recv()
    username_data = json.loads(username_message)
    username = username_data["sender"]
    # Notify all clients that a new user has joined
    join_message = json.dumps({"content": f"The user {username} has joined the chat."})
    await asyncio.wait([client.send(join_message) for client in connected_clients])

    try:
        async for message in websocket:
            logging.info(f"Received message: {message}")
            # Broadcast the message to all connected clients
            await asyncio.wait([client.send(message) for client in connected_clients])
    except websockets.ConnectionClosed as e:
        logging.info(f"Connection closed: {e}")
    finally:
        connected_clients.remove(websocket)
        leave_message = json.dumps({"sender": "System", "content": "A user has left the chat."})
        await asyncio.wait([client.send(leave_message) for client in connected_clients])

async def main():
    server = await websockets.serve(handler, 'localhost', 12345)
    logging.info("WebSocket server started on ws://localhost:12345")
    await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())
