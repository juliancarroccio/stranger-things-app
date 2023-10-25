# Webdriver.io Automated Testing for "Stranger Things" List App

Automated testing of a "Stranger Things" list app using Webdriver.io, Selenium, and Chai.

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/juliancarroccio/stranger-things-app.git
   ```

2. Navigate to the project directory:
   ```
   cd stranger-things-app
   ```

3. Install the project dependencies:
   ```
   npm install
   ```

4. Download and install WebDriver.io:
   [WebDriver.io Installation](https://webdriver.io/docs/gettingstarted.html)

5. Configure your environment as needed (e.g., Chrome browser, WebDriver.io configuration).

## Running Tests

You can run the tests using the following npm scripts:

- To run tests on Chrome desktop:
   ```
   npm run wdio-desktop
   ```

- To run tests on Chrome mobile:
   ```
   npm run wdio-mobile
   ```

## Running Tests in Docker

1. Download and install Docker Desktop from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).

2. Open a terminal and navigate to the Docker directory where you have your configuration files.

   ```shell
   cd docker
   ```

3. Run Docker Compose to start the containers defined in `docker-compose-hubNode.yml` in the background.

   ```shell
   docker-compose -f docker-compose-hubNode.yml up -d
   ```

4. Once the containers are up and running, you can execute your automated tests using the following command:

   ```shell
   npm run wdio-docker
   ```

5. You can access the test execution panel in your web browser by visiting [http://localhost:4444](http://localhost:4444).

6. The terminal where you ran the tests will display logs and test results, as if you were running them without Dockerization.

7. To stop and close the Docker containers, use the following command:

   ```shell
   docker-compose -f docker-compose-hubNode.yml down
   ```

These steps will allow you to run your automated tests in a Dockerized environment.

## Generate Allure Reports

After running your tests in Webdriver.io, a directory named `./allure-results` will be generated. This directory contains the test results in a format that Allure can process.

## View Reports

To generate and view Allure reports, follow these steps:

1. Make sure you have Allure Command Line Tool installed. If you don't have it, you can install it using the following command:

```bash
npm install -g allure-commandline
```

2. Generate reports by running the following command in your project's main directory, where the Allure results are located:

```bash
allure generate allure-results
```

This will generate an `allure-report` directory containing HTML reports.

You can open the generated reports in your web browser. Allure reports provide detailed information about your test results, including test cases, stories, and execution trends.

## Test Cases

### Part 1: CRUD Homepage

#### Case 1: Given the list page, when I create a new item, then it appears in the list.
#### Case 2: Given the list page, when I edit an existing item, then its text changes.
#### Case 3: Given the list page, when I delete the item created in Case 1, then it is removed from the list.
#### Case 4: Given the list page, when I enter text of more than 300 characters, then the application does not allow it to be listed.
#### Case 5: Given the list page, when I search for the text "Creators: Matt Duffer, Ross Duffer," and it exists, then it is present in the list.

### Part 2: Bug Verification Tests

#### Case 1: Given the list page, when I try to delete an item, then I see a popup that says "Are you sure you want to delete this item?"
#### Case 2: Given the list page, when I edit an item and then delete it, then the textarea's text disappears, and the Edit Item button is not visible.
#### Case 3: Given the list page, when I enter an item with a long one-word description, then the item's image maintains its dimensions.
