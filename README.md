# Naila Zaman | U.S. Voter Registration Search Tool

> This is a simple application that displays voter registration information by state. A user can use this to view relevant voter registration information for all U.S. states (and District of Colombia).

- [Developer requirements](#requirements)
- [AI output](#ai-output)
- [Running the application](#running-the-application)
- [Future considerations](#future-considerations)

## Developer Requirements

Below are the in scope requirements that this application was built in accordance to.

1. Parsing and storing `voter_registration_deadlines.csv` into a PostgreSQL database
2. Developing an API endpoint that retrieves the voter information data
3. Developing a UI that displays a list of all states and their voter information
4. The ability to filter and sort the voter information table
5. Developing a UI that is accessible
6. Developing a UI that is both web and mobile friendly
7. Writing unit tests to validate the API call(s)
8. Relevant documentation (`README.md` or similar) that describes how to run the application

Full UI/UX wireframes are out of scope for this application.

### Assumptions
1. On mobile, only 3 columns are displayed for better performance: `State`, `Registration Deadline Online`, and `Register`. This is operating under the assumption that a mobile user would most likely be looking for a way to register online via mobile, as opposed to other methods.

## AI Output

AI Output can be found in these files:
- [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)
- [TEST_COVERAGE.md](TEST_COVERAGE.md)
- [zaman-claude-output.zip](zaman-claude-output.zip)

## Running the Application

This application can currently be run locally. The frontend was developed in React.js using the Material UI framework, and the backend was developed in Python and PostgreSQL.

Please follow the below steps to run the application.

### Prerequisites

These steps are required to be able to run the application on your local machine. The following steps assume that the user is running the application on macOS.

#### GitHub
1. Generate an `ssh-key` for GitHub if you have not done so already by following the steps outlined in [this linked document](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
2. Open a Terminal window, navigate to your GitHub workspace directory (if applicable), and clone this repository (SSH recommended in order to use the `ssh-key`, using `git clone`).

#### Installers

1. Install [Homebrew](https://brew.sh/). This will allow you to use the command `brew install` in the Terminal to be able to install most libraries.

#### Python
1. Open a Terminal and navigate to the parent directory of where you cloned the repository (most likely named `take-home-assessment-2025`).
2. Install `python3` by running the command:
```
brew install python
```
- You may also follow the steps documented at [this link](https://docs.python.org/3/using/mac.html).
3. Confirm Python installation by running:
```
python --version
```
4. Once confirmed, a Python virtual environment needs to be installed. Run the following command to do so:
```
python3 -m venv .venv
```
5. Activate the virtual environment by running:
```
source .venv/bin/activate
```
6. Run the following command to install all required Python libraries: 
```
pip3 install -r requirements.txt
```
- Note: If installing `psycopg2` results in errors, try running `pip3 install psycopg2-binary` on its own.


#### NPM
1. Install `npm` by following the instructions linked [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. In a Terminal window, navigate to the parent directory of where you cloned the repository (most likely named `take-home-assessment-2025`).
2. Run the following command to install dependencies:
```
npm install --no-save
```

#### Docker / Colima
1. Open a Terminal window (or use an existing one you have open).
2. Install Docker by running:
```
brew install docker
```
3. Install Colima by running:
```
brew install colima
```
4. Run the following command to start Docker:
```
colima start
```
5. Confirm that Docker is running by running the following command:
```
docker ps
```

#### PostgreSQL
1. Open a Terminal window (or use an existing one you have open).
2. Install [PostgreSQL](https://www.postgresql.org/download/macosx/) by running the following command:
```
brew install postgresql@vv
```
- Replace `vv` with the version number you would like to install.
3. (Optional) Update `src/config/db_config.json` with your custom database credentials (username and password).
4. In a new Terminal window, run the following command to create your credentials for the database: 
```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=[PASSWORD] -e POSTGRES_USER=[USERNAME] postgres
```
- Replace `[PASSWORD]` with the password specified in `src/config/db_config.json`
- Replace `[USERNAME]` is the username specified in `src/config/db_config.json`
5. Run the following command in your original Terminal window to create and populate the database:
```
npm run db:create-db
```

### Running

1. Open a Terminal window (or use an existing one you have open).
2. (Optional) Update `src/config/local_api.json` with your desired server host and server port. It is recommended to keep the host name and choose a different port number than `3000`, since that is what the client will be running on.
3. Navigate to the parent directory of the cloned repository and run the following command:
```
./startApplication.sh
```
- This will launch the application in your default browser at `localhost:3000`.
4. If needed, Ctrl + C in the Terminal window to exit the application.

Mobile was tested using `Google Chrome > Inspect > Toggle device toolbar`. A refresh may need to be done for changes to go into effect.

### Testing

Both backend and frontend tests can be run together by running the following command from the parent directory of the cloned repository:
```
./runTests.sh
```
If you choose to do this, please first follow Step 2 of under the Backend section below.

Otherwise, tests can be run separately by following the below steps.

#### Backend
1. Open a Terminal window and navigate to the parent directory of the cloned repository and into `src/api`.
2. (First time only) Run this command (using your relevant path) so the test file recognizes `route.py` as the primary backend app for the unit test:
```
export PYTHONPATH=/path/to/src/api
```
3. Run `pytest` in `src/api`

#### Frontend
1. Open a Terminal window and navigate to the parent directory of the cloned repository.
2. Run the following command: 
```
npm test
```

### Debugging

Error logs for any backend issues can be found in `src/api/backend-error.log` or `./backend-error.log`. For frontend issues, there are console logs that can be accessed by inspecting the page.

## Future Considerations

Currently, this application is using MUI DataGrid for sorting and filtering on the frontend. While this works for a small dataset, one consideration would be to do the sorting and filtering on the backend to increase performance.

### Features
An additional metrics or reporting service and UI could be built adjacent to this application to gather data around how many users visited the site, used the application to register to vote, or otherwise took action to register. This would help us make data-based decisions on effective outreach and outcomes.

In conjunction with metrics, we would want to track clicks on the online registration links. For states that do not have online registration links currently listed, a link to current voter registration information would be beneficial so there is a quick action for users to take for their state.

Mobile currently only displays 3 columns for efficiency and performance reasons. Another feature would be to add a toggle to the footer to force a Desktop view of the application in mobile.