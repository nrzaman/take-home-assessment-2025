from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2
from collections import OrderedDict

conn = psycopg2.connect("dbname='state_registration_deadlines' user='postgres' host='localhost' password='test'")

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app)  # This enables CORS for all routes by default

@app.route('/data', methods=['GET'])
def get_data():
    # Connect to the database and select all relevant columns
    cur = conn.cursor()
    cur.execute('SELECT * FROM voter_registration_deadlines;')

    # Define the exact order of frontend field names (camelCase)
    frontend_columns = [
        'state',
        'deadlineInPerson',
        'deadlineByMail',
        'deadlineOnline',
        'electionDayRegistration',
        'onlineRegistrationLink',
        'description'
    ]

    # Build result with ordered field names using OrderedDict to guarantee order
    r = []
    for row in cur.fetchall():
        row_dict = OrderedDict()
        for i, col_name in enumerate(frontend_columns):
            row_dict[col_name] = row[i]
        r.append(row_dict)

    cur.connection.close()
    return jsonify(r)

if __name__ == '__main__':
    app.run()