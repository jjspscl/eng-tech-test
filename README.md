# Tech Test

### Changelog and Documentation

[View it here](https://github.com/jjspscl/eng-tech-test/blob/main/CHANGELOG.md)

### General

* [X] The code is published in a public git repository where anybody can clone the solution. (1.0.0)

### Client *(Frontend)*

* [X] A frontend developed in React written in TypeScript in strict mode (1.1.0)
* [ ] Using hooks that render the list of duties retrieved from the backend
* [ ] Allow the user
  * [ ] to create new ones and/or
  * [ ] modify existing ones.
* [ ] Must include form validations.
* [ ] OPTIONAL: The solution is also able to delete items from the to-do list.
* [ ] OPTIONAL: Ant Design as the component library for the frontend.

* The frontend project must be independent of the backend project.
* Do not use server-side implementation in the frontend, only client-side. implementation; consequently, avoid solutions like Next.js or similar.
* Avoid any state management solution like Redux, the React’s hook useReducer or similar.

### Server (Backend)

* [X] A backend written in Node JS with TypeScript in strict mode. (1.2.0)
* [ ] The data must be stored using PostgreSQL as a database engine.
* [ ] Do not use ORM or any other solution that hides the fact you are using a SQL database; use plain SQL queries instead.
