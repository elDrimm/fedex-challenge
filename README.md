# Fedex Web Coding Challenge

This project is the result of a coding challenge for a role at FedEx, it contains a signup form to create a user account.

## Some rules about the challenge
* Use the latest version of Angular in combination with TypeScript.
* UX/UI can be based on a CSS Framework (or do it yourself with minimal effort).
* You can target browsers that support ES6. Do not worry about supporting old browser versions.
* Make your solution available on GitHub or GitLab or Bitbucket.

## About my choices
**Packages**

I added one extra package called until-destroy to auto destroy subscriptions when a component is destroyed. More info can be found here: https://github.com/ngneat/until-destroy

**Email validation**

I choose to use the Angular built-in email validator, it's based on the  WHATWG HTML specification with some enhancements to incorporate more RFC rules (such as rules related to domain names and the lengths of different parts of the address).
This means it will also accept emails such as a@b since it's a valid email address (although it's not a common one). Could've used a Regex to check for more common addresses, but since that wasn't in the functional description I choose to accept all. That way I don't block those users from signing up. 

# How to run
## Development server

Make sure you've installed Node and NPM on your computer. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
