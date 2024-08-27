import logging

logging.basicConfig(filename='chat_server.log', level=logging.INFO, 
                    format='%(asctime)s - %(message)s')

def log_message(message):
    logging.info(message)
    print(message)
