# NinjaOne TestCafé Challenge

E2E QA challenge Exercise NinjaOne

## Prerequisites

1. Clone the repository:
   ```bash
   git clone https://github.com/eespinoza-ja/ninja-one-devices-qa-challenge.git
   cd ninja-one-devices-qa-challenge
   ```
2. Versions of the dependencies, packages:

   - [Node.js](https://nodejs.org/) installed (Version 17.x or above)
   - [npm](https://www.npmjs.com/get-npm) installed (Version 8.x or above)
   - [Java](https://www.java.com/en/download/) installed (Version 8.x or above, required for Allure Commandline)

3. Environment configuration:
   - Run the server in the development mode (clone the repository: https://github.com/NinjaRMM/devicesTask_serverApp)
   - Run the app in the development mode (clone the repository: https://github.com/Yastrenky/devices-clientapp)
   - The .env file must be configured using the correct URL's

## Installation commands

- Install all the dependencies on local machine:
  ```bash
  npm install
  ```

## Execution commands

Steps to perform in order to run the automated tests.

1. Execute tests:
   ```bash
   npm run tests
   ```
2. Generate report:
   ```bash
   npm run generate:report
   ```
3. Open the report:
   ```bash
   npm run open:report
   ```
