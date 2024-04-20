# Tech Test

### Changelog and Documentation

[View it here](https://github.com/jjspscl/eng-tech-test/blob/main/CHANGELOG.md)

### General

* [X] The code is published in a public git repository where anybody can clone the solution. (1.0.0)
* [X] Testing using [Jest](https://jestjs.io/) (frontend & backend). (2.2.0)
  I will be using [Vitest](https://vitest.dev/) for performance and the current 	Vite and TurboRepo setup.
* [ ] OPTIONAL: The solution is also able to delete items from the to-do list.
  * [ ] BACKEND - Delete endpoint

### Client *(Frontend)*

* The frontend project must be independent of the backend project.
* Do not use server-side implementation in the frontend, only client-side. implementation; consequently, avoid solutions like Next.js or similar.
* Avoid any state management solution like Redux, the React’s hook useReducer or similar.

* [X] A frontend developed in React written in TypeScript in strict mode (1.1.0)
* [X] Using hooks that render the list of duties retrieved from the backend
* [X] Allow the user (2.0.0)

  * [X] to create new ones and/or
  * [X] modify existing ones.
  * [X] Must include form validations. (2.1.0)
  * [ ] OPTIONAL: Ant Design as the component library for the frontend.

### Server (Backend)

* Do not use ORM or any other solution that hides the fact you are using a SQL database; use plain SQL queries instead.

* [X] A backend written in Node JS with TypeScript in strict mode. (1.2.0)
* [X] The data must be stored using PostgreSQL as a database engine. (1.3.0)
