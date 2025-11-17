from flask import Flask, jsonify
from flask_cors import CORS
import json
import psycopg2
from collections import OrderedDict

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# This enables CORS for all routes by default
CORS(app)

# Helper function to read JSON config files
def read_config(file_path):
    try:
        with open(file_path, "r") as f:
            config_data = json.load(f)
        return config_data
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in '{file_path}'.")
        return None

# Allow dynamic retrieval of db config values
db_config = read_config('../config/db_config.json')
conn = psycopg2.connect("dbname='" + db_config["databaseName"] + "' user='" + db_config["user"] + "' host='" + db_config["host"] + "' password='" + db_config["password"] + "'")

@app.route('/data', methods=['GET'])
def get_data():
    # Connect to the database and select all relevant columns
    cur = conn.cursor()
    cur.execute('SELECT * FROM ' + db_config["tableName"] + ';')

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

    # Build result with ordered field names using OrderedDict to guarantee order, 
    # and so that the frontend DataGrid component can properly identify the state as a unique ID for 
    # the table.
    r = []
    for row in cur.fetchall():
        row_dict = OrderedDict()
        for i, col_name in enumerate(frontend_columns):
            row_dict[col_name] = row[i]
        r.append(row_dict)

    #cur.connection.close()
    return jsonify(r)

if __name__ == '__main__':
    # Retrieve host and port from local API config file
    config = read_config('../config/local_api.json')
    if config:
        app.run(config['serverHost'], config['serverPort'])

    # Not including an else here -- it should error out in read_config if there is an issue retrieving the host and port