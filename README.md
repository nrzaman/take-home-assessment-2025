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

These steps are required to be able to run the application on your local machine.

1. Generate a personal access token (PAT) in GitHub if you have not done so already.
2. Clone this repository (SSH recommended in order to use the PAT, using `git clone`).
3. Install `npm`
4. Install `python`
5. Run `npm install --no-save`
6. Install PostgreSQL
7. Update `src/config/db_config.json` with the relevant database credentials if needed.
8. Run `npm run db:create-db`
9. Navigate to `/src/api/` and create a Python virtual environment.
10. Install `pytest` in `/src/api`

### Running

1. (Optional) Update `src/config/local_api.json` with your desired server host and server port. It is recommended to keep the host name and choose a different port number than `3000`, since that is what the client will be running on.
1. Open 2 terminal windows.
2. In the first terminal window, navigate to the parent directory of the cloned repository and into `src/api` and run `python route.py`
3. In the second terminal window, navigate to the parent directory of the cloned repository and run `npm run start`

This should trigger the web browser opening to `localhost:3000` with the application.

### Testing

1. Open a terminal window.
2. Navigate to the parent directory of the cloned repository and into `src/api`
3. (Only need to do once) Run `export PYTHONPATH=/path/to/src/api`
4. Run `pytest`

### Common Debugging Issues

If there is a data load issue, it's possible that it is blocked by a CORS policy. While there was code written to address this, `src/config/local_api.json` may need to be updated with a different port number.

## Future Considerations

Currently, this application is using MUI DataGrid for sorting and filtering on the frontend. While this works for a small dataset, one consideration would be to do the sorting and filtering on the backend to increase performance.
