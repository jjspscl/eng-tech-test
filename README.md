# Tech Test

### Changelog and Documentation

[View it here](https://github.com/jjspscl/eng-tech-test/blob/main/CHANGELOG.md)

### Setup

1. Clone the repository
2. Install dependencies from the root directory

   ```bash
   pnpm install
   ```
3. Create a `.env` file in the root directory and add the following

   ```env
    SERVER_PORT=3000
    DB_HOST=DB_HOST
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=DB_PASSWORD
    DB_NAME=todo
   ```
4. Start both the server and client from the root directory in development mode

   ```bash
   pnpm dev
   ```
5. You can accessthe services:
   `client - http://localhost:5432`
   `server - http://localhost:3000`
6. Run all server and client tests from the root directory

   ```bash
   pnpm test
   ```

### General

* [X] The code is published in a public git repository where anybody can clone the solution. (1.0.0)
* [X] Testing using [Jest](https://jestjs.io/) (frontend & backend). (2.2.0)
  I will be using [Vitest](https://vitest.dev/) for performance and the current 	Vite and TurboRepo setup.
* [X] OPTIONAL: The solution is also able to delete items from the to-do list.

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
  * [X] OPTIONAL: Ant Design as the component library for the frontend. (2.3.0)

### Server (Backend)

* Do not use ORM or any other solution that hides the fact you are using a SQL database; use plain SQL queries instead.

* [X] A backend written in Node JS with TypeScript in strict mode. (1.2.0)
* [X] The data must be stored using PostgreSQL as a database engine. (1.3.0)
