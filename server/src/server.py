import asyncio
import websockets
import logging

logging.basicConfig(level=logging.INFO)

async def handler(websocket, path):
    logging.info(f"Accepted connection from {websocket.remote_address}")
    try:
        async for message in websocket:
            logging.info(f"Received message: {message} from: {websocket.remote_address}")
            await websocket.send(f"Echo: {message}")
    except websockets.ConnectionClosed as e:
        logging.info(f"Connection closed: {e}")

async def main():
    server = await websockets.serve(handler, 'localhost', 3000)
    logging.info("WebSocket server started on ws://localhost:4000")
    await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())
