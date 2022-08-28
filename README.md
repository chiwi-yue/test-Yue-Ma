# Entain Automation Coding Task

Thank you for your interest in the Automation Engineer position here at Entain. As a part of our hiring process, we have prepared the following technical task to get a better understanding of your skills, thought process and methodology.

<b>Please read the following details carefully.</b>

## Prerequisites

[Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are required to run the Next To Go web app and Cypress.

## Setup

Run ```npm install``` inside the project repository.

## Running the Next To Go web app

Run ```npm run start``` inside the project repository.

## Running Cypress

Run ```npm run e2e``` inside the project repository.

---

## Task Overview

For this task, you will be required to expand the testing coverage for the Next To Go web application provided to you. The site and Cypress can be launched with the above setup commands.

The site itself is a basic web application which lists the next 5 upcoming races (Next To Go) from the current time. Racing categories (thoroughbred (horse)/greyhound/harness) can be filtered using the checkboxes on the page to only show the races for the selected filters.

It will be your task to test the application and identify any test cases which can be automated, including any edge cases which may need to be covered. These test/edge cases will then need to be automated using the Cypress framework (see [Cypress docs](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress) for more info).

We estimate that the following activity should take <b>1 - 2.5 hours</b>.

There is no "correct" solution for this task per se; it will be at your discretion to add coverage for components/functionality which you feel would be necessary to assure the quality of such an application. The intention of this task is to allow us insight into your ability to analyse a problem and develop thorough, holistic solutions in an automation framework such as Cypress.

Two specs, along with a pre-filled spec file for your reference, have been created within the ```cypress/e2e/``` directory.

## Task Requirements
- Add tests to the ```countdown-timer``` and ```filters``` specs for each spec's respective components/functionality.
- Add more general coverage to the ```content.cy.ts``` spec to which you feel is necessary.
- Commit any changes you make onto a new Git branch named ```test/firstname-lastname```, replacing ```firstname``` and ```lastname``` with your first and last names.
- Follow Conventional Commits guidelines for your commit message/s (see [the guidelines](https://www.conventionalcommits.org/) for more info).
- Once completed, push this Git repository onto a platform such as Github for our review.
  - <b>Please ensure that this repository is made public, and double check that your branch is present on the remote repository.</b>

## Additional Considerations

The below points are not strict requirements for the test, but more so some aspects which you may want to implement/consider in your solution.

- Race response mocking.
- Negative scenario testing (e.g. failed network requests).
- Small summaries of any bugs/issues you witness whilst implementing your solution.

All additional coverage added which has not been explicitly asked for will strengthen your submission.

## Issues/Support

If you encounter any issues or have any questions regarding the task, please do not hesitate to reach out to your recruiter and we will endevour to address your concerns as soon as possible.
