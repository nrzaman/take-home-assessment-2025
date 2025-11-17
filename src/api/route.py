from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

conn = psycopg2.connect("dbname='state_registration_deadlines' user='postgres' host='localhost' password='test'")

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes by default

@app.route('/test', methods=['GET'])
def get_test():
    cur = conn.cursor()
    cur.execute('SELECT * FROM voter_registration_deadlines;')
    return jsonify(cur.fetchall())

if __name__ == '__main__':
    app.run()