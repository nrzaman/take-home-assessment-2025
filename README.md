# Naila Zaman | U.S. Voter Registration Search Tool

> This is a simple application that displays voter registration information by state. A user can use this to view relevant voter registration information for all U.S. states (and District of Colombia).

- [Developer requirements](#requirements)
- [Running the application](#running-the-application)
- [Future considerations](#future-considerations)

## Developer Requirements

Below are the in scope requirements and assumptions that this application was built in accordance to.

1. Parsing and storing `voter_registration_deadlines.csv` into a PostgreSQL database
2. Developing an API endpoint that retrieves the voter information data
3. Developing a UI that displays a list of all states and their voter information
4. The ability to filter and sort the voter information table
5. Developing a UI that is accessible
6. Developing a UI that is both web and mobile friendly
7. Writing unit tests to validate the API call(s)
8. Relevant documentation (README or similar) that describes how to run the application

Full UI/UX wireframes are out of scope for this application.

## Running the Application

This application can currently be run locally. The frontend was developed in React.js using the Material UI framework, and the backend was developed in Python and PostgreSQL.

Please follow the below steps to run the application.

### Prerequisites

These steps are required to be able to run the application on your local machine. The following steps assume that the user is running the application on macOS.

#### GitHub
1. Generate an `ssh-key` for GitHub if you have not done so already by following the steps outlined in [this linked document](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
2. Open a Terminal window and clone this repository (SSH recommended in order to use the `ssh-key`, using `git clone`).

#### Installers

1. Install [Homebrew](https://brew.sh/). This will allow you to use the command `brew install` in the Terminal to be able to install most libraries.

#### Python
1. Open a Terminal and navigate to the parent directory of where you cloned the repository.
2. Install `python3` by using the command `brew install python`. You may also follow the steps documents at [this link](https://docs.python.org/3/using/mac.html). This should automatically install `pip` or `pip3`. Then, run the following commands:
- Run `pip3 install flask` (Note: Try `pip install` if `pip3` doesn't work)
- Run `pip3 install flask_cors` (Note: Try `pip install` if `pip3` doesn't work)
- Run `pip3 install psycopg2` (Note: Try `pip install` if `pip3` doesn't work)
- Run `pip3 install pytest` (Note: Try `pip install` if `pip3` doesn't work)
3. Confirm python installation by typing `python --version`
4. Once confirmed, a python virtual environment needs to be installed. Run `python3 -m venv .venv`.
5. Then, activate the virtual environment by running `source .venv/bin/activate`

#### NPM
1. Install `npm` by following the instructions linked [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. Run `npm install --no-save`

#### PostgreSQL
1. Install [PostgreSQL](https://www.postgresql.org/download/macosx/) by using the command `brew install postgresql@vv` where `vv` is the version number you would like to install.
2. Update `src/config/db_config.json` with the relevant database credentials if needed.
3. Run `npm run db:create-db`

### Running

1. (Optional) Update `src/config/local_api.json` with your desired server host and server port. It is recommended to keep the host name and choose a different port number than `3000`, since that is what the client will be running on.
2. Navigate to the parent directory of the cloned repository and run `startApplication.sh`. This should trigger the web browser opening to `localhost:3000` with the application.
3. If needed, Ctrl + C to exit the application.

Mobile was tested using `Google Chrome > Inspect > Toggle device toolbar`. A refresh may need to be done for changes to go into effect.

### Testing

1. Open a Terminal window.
2. Navigate to the parent directory of the cloned repository and into `src/api`
3. Run `export PYTHONPATH=/path/to/src/api`
4. Run `pytest`

### Common Debugging Issues

If there is a data load issue, it's possible that it is blocked by a CORS policy. While there was code written to address this, `src/config/local_api.json` may need to be updated with a different port number.

Error logs for any backend issues can be found in `src/api/backend-error.log`.

## Future Considerations

Currently, this application is using MUI DataGrid for sorting and filtering on the frontend. While this works for a small dataset, one consideration would be to do the sorting and filtering on the backend to increase performance.
