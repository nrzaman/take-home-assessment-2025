# Naila Zaman | U.S. Voter Registration Search Tool

This is a simple application that displays voter registration information by state. A user can use this to view relevant voter registration information for all U.S. states (and District of Colombia).

<img width="1940" height="753" alt="image" src="https://github.com/user-attachments/assets/ea3c102d-fb5e-4c48-b7e6-2bba76c8dfa3" />

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

Full UI/UX wireframes are out of scope for this iteration of the application.

### Assumptions
1. Mobile users would most likely use this application for quick online registration information and a CTA. Therefore, only 3 columns are displayed for better performance on mobile: `State`, `Registration Deadline Online`, and `Register Link`.

## AI Output

AI Output can be found in this folder:

- [/ai_reports](/ai_reports)

This folder includes test coverage and optimization reports, as well as a `.zip` file containing the Claude logs used on this project.

## Running the Application

This application can currently be run locally. The frontend was developed in **React.js** using the **Material UI framework**, and the backend was developed in **Python** and **PostgreSQL**.

Please follow the below steps to run the application.

### Prerequisites

These steps are required to be able to run the application on your local machine. Unless otherwise specified, the steps are applicable to both macOS and Windows operating systems.

#### GitHub
1. Generate an `ssh-key` for GitHub if you have not done so already by following the steps outlined in [this linked document](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
2. Open a Terminal (macOS) or PowerShell (Windows) window, navigate to your GitHub workspace directory (if applicable), and clone this repository (SSH recommended in order to use the `ssh-key`):
```
git clone git@github.com:nrzaman/take-home-assessment-2025.git
```

#### Installers

1. For macOS: Install [Homebrew](https://brew.sh/). This will allow you to use the command `brew install` in the Terminal to be able to install most libraries.
2. For Windows: No special installer is needed here.

#### Python
1. Open Terminal (macOS) or PowerShell (Windows) and navigate to the parent directory of where you cloned the repository (most likely named `take-home-assessment-2025`).
2. Install `python3`:
- For macOS, follow the steps documented at [this link](https://docs.python.org/3/using/mac.html) OR use the following command in Terminal:
```
brew install python
```
- For Windows, follow the steps documented at [this link](https://www.python.org/downloads/windows/) for the latest **Python** version. Please ensure `Add Python to PATH` is selected.
3. Confirm **Python** installation by running the following in Terminal (macOS) or PowerShell (Windows):
```
python --version
```
4. Once confirmed, a **Python virtual environment** needs to be installed. Run the following command in Terminal (macOS) or PowerShell (Windows) to do so:
```
python3 -m venv .venv
```
5. Activate the virtual environment:
- For macOS, use the following command in Terminal:
```
source .venv/bin/activate
```
- For Windows, use the following command in PowerShell:
```
.venv\Scripts\activate
```
6. Run the following command to install all required **Python** libraries: 
```
pip3 install -r requirements.txt
```
- Note: If installing `psycopg2` results in errors, try running `pip3 install psycopg2-binary` on its own.


#### NPM
1. Install `npm` by following the instructions linked [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), which includes instructions for both macOS and Windows.
2. In a Terminal (macOS) or PowerShell (Windows) window, verify the installation by running the command:
```
npm --version
```
3. In the same window, navigate to the parent directory of where you cloned the repository (most likely named `take-home-assessment-2025`).
4. Run the following command to install dependencies:
```
npm install --no-save
```

#### Docker
##### macOS
1. Open a Terminal window (or use an existing one you have open).
2. Install **Docker** by running:
```
brew install docker
```
3. Install **Colima** by running:
```
brew install colima
```
4. Run the following command to start **Docker**:
```
colima start
```

##### Windows
1. Install **Docker** by following the instructions [linked here](https://docs.docker.com/desktop/setup/install/windows-install/).
2. Enable `WSL 2` during the installation process.

##### Both operating systems
1. Confirm that **Docker** is running by running the following command in Terminal (macOS) or PowerShell (Windows):
```
docker ps
```

#### PostgreSQL
1. Install PostgreSQL by following the steps at [this link](https://www.postgresql.org/download/) for either operating system
- For macOS, you may also open a Terminal window (or use an existing one you have open) and run the following command (replaceing `vv` with version number):
```
brew install postgresql@vv
```
2. (Optional) Update [src/config/db_config.json](src/config/db_config.json) with your custom database credentials (username and password).
3. In a new Terminal (macOS) or PowerShell (Windows) window, run the following command to create your credentials for the database: 
```
docker run -p 5432:5432 -e POSTGRES_PASSWORD=[PASSWORD] -e POSTGRES_USER=[USERNAME] postgres
```
- Replace `[PASSWORD]` with the password specified in [src/config/db_config.json](src/config/db_config.json)
- Replace `[USERNAME]` is the username specified in [src/config/db_config.json](src/config/db_config.json)
5. Run the following command in your original Terminal (macOS) or PowerShell (Windows) window to create and populate the database:
```
npm run db:create-db
```

### Running

Below are steps for running the application on web. Mobile was tested using `Google Chrome > Inspect > Toggle device toolbar`. A refresh may need to be done for changes to go into effect.

#### macOS

1. Open a Terminal window (or use an existing one you have open).
2. (Optional) Update [src/config/local_api.json](src/config/local_api.json) with your desired server host and server port. It is recommended to keep the host name and choose a different port number than `3000`, since that is what the client will be running on.
3. Navigate to the parent directory of the cloned repository and run the following command:
```
./startApplication.sh
```
- This will launch the application in your default browser at `localhost:3000`.
4. Use Ctrl + C in the Terminal window to exit the application.

#### Windows

1. Open a new PowerShell window.
2. (Optional) Update [src/config/local_api.json](src/config/local_api.json) with your desired server host and server port. It is recommended to keep the host name and choose a different port number than `3000`, since that is what the client will be running on.
3. Navigate to the parent directory of the cloned repository and run the following command to run the backend:
```
python3 src/api/route.py
```
4. Open a new PowerShell window.
5. Navigate to the parent directory of the cloned repository and run the following command to run the frontend:
```
npm start
```
- This will launch the application in your default browser at `localhost:3000`.
6. Use Ctrl + C in each PowerShell window to exit the application.

### Testing

For macOS only, backend and frontend tests can be run together by running the following command from the parent directory of the cloned repository in a Terminal window:
```
./runTests.sh
```
If you choose to do this, please first follow Step 2 of under the Backend section below (only need to do this once).

For both operating systems, tests can be run separately by following the below steps.

#### Backend
1. Open a Terminal (macOS) or PowerShell (Windows) window and navigate to the parent directory of the cloned repository and into [src/api](src/api):
```
cd src/api
```
2. (First time and macOS only) Run this command (replacing `/absolute/path/to` with your relevant path) so the test file recognizes `route.py` as the primary backend app for the unit test:
```
export PYTHONPATH=/absolute/path/to/src/api
```
3. Run the backend tests:
- For macOS, run the following command in [src/api](src/api) from Terminal:
```
pytest
```
- For Windows, run the following command from the parent directory from PowerShell:
```
python -m pytest src/api/tests/test_route.py -v
```

#### Frontend
1. Open a Terminal (macOS) or PowerShell (Windows) window and navigate to the parent directory of the cloned repository.
2. Run the following command: 
```
npm test -- --watchAll=false
```

### Troubleshooting

#### General Setup
1. **Port already in use:** Change the port in [src/config/local_api.json](src/config/local_api.json) (default 4000).

#### Setup - macOS
1. **zsh: command not found: (command_name):** Make sure that the library / package associated with the `(command name)` is installed using `brew install` or `npm install`.

#### Setup - Windows
1. **Python not found:** Make sure "Add Python to PATH" was checked during installation.
3. **PowerShell execution policy error:** Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`.
4. **Docker won't start:** Make sure WSL 2 is installed and Docker Desktop is running.
5. **npm command not found:** Restart PowerShell after installing Node.js.

#### Application
Error logs for any backend issues can be found in `src/api/backend-error.log` or `./backend-error.log`. For frontend issues, there are console logs that can be accessed by inspecting the page.

## Future Considerations

### Performance
- Currently, MUI DataGrid is used for sorting and filtering on the frontend. While this works for a small static dataset, sorting and filtering should be moved to the backend to optimize performance.

### Features
- A metrics or reporting service could be built adjacent to this application to gather data around user visits and interactions (e.g., device accessed, CTA link clicks, etc.). This would help us make data-based decisions on effective methods of outreach and outcomes.
- Mobile currently only displays 3 columns for efficiency and performance reasons. Another feature would be to add a toggle to the footer to force a Desktop view of the application in mobile.

### Developer Experience / SDLC Considerations
- Develop a standardized branching strategy in conjunction with a PR process to ensure quality and consistency.
- Enforce branch protections.
- Build a CI/CD pipeline for automated deployments (GitHub Actions preferred to keep it within the GitHub ecosystem).
