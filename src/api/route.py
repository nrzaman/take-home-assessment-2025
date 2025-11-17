from flask import Flask, jsonify
from flask_cors import CORS
from flask_compress import Compress
import json
import psycopg2
import logging
from collections import OrderedDict

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

# Enable gzip compression for responses
Compress(app)

# This enables CORS for all routes by default
CORS(app)

# Error logging
logging.basicConfig(
    filename='backend-error.log',
    level=logging.ERROR,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

# Helper function to read JSON config files
def read_config(file_path):
    try:
        with open(file_path, "r") as f:
            config_data = json.load(f)
            logging.info(f"The file '{file_path}' was successfully loaded.")
        return config_data
    except FileNotFoundError:
        logging.error(f"Error: The file '{file_path}' was not found.")
        return None
    except json.JSONDecodeError:
        logging.error(f"Error: Invalid JSON format in '{file_path}'.")
        return None

# Allow dynamic retrieval of db config values
db_config = read_config('../config/db_config.json')    

def connect_to_db():
    try:
        logging.info(f"Database connection was successful.")
        return psycopg2.connect("dbname='" + db_config["databaseName"] + "' user='" + db_config["user"] + "' host='" + db_config["host"] + "' password='" + db_config["password"] + "'")
    except psycopg2.OperationalError as e:
        logging.error(f"There was an operational error connecting to the database: {e}")
        return None
    except Exception as e:
        logging.error(f"There was a general error connecting to the database: {e}")
        return None

@app.route('/data', methods=['GET'])
def get_data():
    # Connect to the database and select all relevant columns
    conn = connect_to_db();
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

    response = jsonify(r)
    # Cache the response for 1 hour (3600 seconds) for better mobile performance
    response.cache_control.max_age = 3600
    response.cache_control.public = True
    return response

if __name__ == '__main__':
    # Retrieve host and port from local API config file
    config = read_config('../config/local_api.json')
    if config:
        logging.info(f"Running application on " + config['serverHost'] + ':' + config['serverPort'])
        app.run(config['serverHost'], config['serverPort'])

    # Not including an else here -- it should error out in read_config if there is an issue retrieving the host and port