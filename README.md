## Installation

Prerequisites:
NodeJS

- Navigate to the folder and install npm packages using:
```bash
- npm install
```

- Install Playwright browsers
```bash
- npm install -D @playwright/test
```

## Commands to run the tests

- Run all the tests present in the "./tests/e2e" directory by using the below command
```bash
npm run test
```
- Run all the API tests
```bash
npm run test_only_api
```
- Run all the UI tests
```bash
npm run test_only_ui
```
- Run specific spec file
```bash
npx playwright test tests/e2e/{path_to_file/{specfile_name.spec.ts}
```
- Run tests in headed mode
```bash
npx playwright test tests/e2e/ --headed
```

## Setup with Docker 
- To run tests in docker containers, install docker and use the below commands to compose the docker image from the docker file;
```bash
docker build -t {give image name} .   
```
- To create the container and launch it use:
```bash
docker run -it -d {same image name as in the previous command}
```
- Check the container is up and running; copy the container id
```bash
docker ps -a 
```
- Login in to the running container 
```bash
docker exec -it {container id} bash
```
- Run the commands as per need in the docker bash;
```bash
npm run test
```