# Journal Mobile Frontend

This is a mobile frontend for the Journal application, built with Expo and React Native. The application uses Redux for state management and integrates with a FastAPI backend.

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Scripts](#scripts)
- [License](#license)

## Requirements

- Node.js
- Yarn
- Expo CLI

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Bum-Ho12/journal.git
   cd journal
   ```

2. Install the dependencies:
   ```bash
   yarn install
   ```

## Environment Variables

Create a `.env` file in the root directory and add any necessary environment variables. For example:
```
EXPO_PUBLIC_API_URL=http://127.0.0.1:8000  # URL of the FastAPI backend
```

## Running the Application

1. Start the Expo development server:
   ```bash
   yarn start
   ```

2. To run the application on an Android device/emulator:
   ```bash
   yarn android
   ```

3. To run the application on an iOS device/simulator:
   ```bash
   yarn ios
   ```

4. To run the application in a web browser:
   ```bash
   yarn web
   ```

## Folder Structure

```
.
├── .expo                  # Expo configuration files
├── .vscode                # VSCode configuration files
├── app                    # Expo Router entry
├── assets                 # Asset files such as images, fonts, etc.
├── components             # Reusable UI components
├── constants              # Constant definitions
├── node_modules           # Node.js modules
├── store                  # Redux slices and store configuration
├── utils                  # Utility functions
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── app.json               # Expo configuration file
├── babel.config.js        # Babel configuration file
├── expo-env.d.ts          # Expo environment type definitions
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
├── tsconfig.json          # TypeScript configuration file
└── yarn.lock              # Yarn lockfile
```

## Scripts

- `yarn start`: Starts the Expo development server.
- `yarn android`: Runs the application on an Android device/emulator.
- `yarn ios`: Runs the application on an iOS device/simulator.
- `yarn web`: Runs the application in a web browser.
- `yarn test`: Runs the test suite.

## License

This project is licensed under the MIT License.
