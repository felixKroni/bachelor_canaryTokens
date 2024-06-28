from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

data_storage = []
@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        data = request.json
        # Process the webhook data here
        print('Webhook received!')
        print(data)
        data_storage.clear()
        data_storage.append(data)
        return jsonify({'status': 'success'}), 200
    else:
        return jsonify({'status': 'error'}), 400

@app.route('/data', methods=['GET'])
def get_data():
    global data_storage
    data = data_storage.copy()
    data_storage.clear()
    return jsonify(data), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
