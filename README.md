# Tech Test

### General

* [X] The code is published in a public git repository where anybody can clone the solution. (1.0.0)

### Client *(Frontend)*

* [ ] A frontend developed in React written in TypeScript in strict mode
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

* [ ] A backend written in Node JS with TypeScript in strict mode.
* [ ] The data must be stored using PostgreSQL as a database engine.
* [ ] Do not use ORM or any other solution that hides the fact you are using a SQL database; use plain SQL queries instead.

# Changelog

## 1.0.0

* Initialized the project as a [PNPM Workspace](https://pnpm.io/workspaces) + Monorepo with [Turborepo](https://turbo.build/repo).
  Why Monorepo? We will be sharing types and interfaces between the two applications Frontend and Backend Applications. 
  This is a best practice for modern Applications and Turborepo is one of the best tools I have used personally for Javascript Monorepo Projects.
