# Changelog

Changelogs and documentations will be under this file.

## 2.1.0

* ADD Form Validation
  * MODIFY validator schema to ADD limit to todo names to 32 characters, and minimum 3
  * APPLY [Zod](https://zod.dev/) Schema to the Create and Update
    * FRONTEND - with Zod and [react-hook-form](https://react-hook-form.com/)
    * BACKEND - enhance SafeParsing with Zod

## 2.0.0

* FRONTEND
  * REMOVE Boilerplate code
  * SCAFFOLD todo
    * Since we are not allowed to use state management solution like Redux, the React’s hook useReducer or similar, we will be using [component injection](https://reactpatterns.js.org/docs/component-injection/) with the todos at the top level of our application
  * BACKEND Integration
    * ADD, UPDATE TODOS integration with BACKEND
* BACKEND
  * CONFIGURE CORS
  * NEW Enpoint
    * PUT `/todo/:id` , for updating todos
  * ADD Request logging

## 1.3.0

* Initialize the COMMON package
  * Types
  * Validators with [Zod](https://zod.dev/)
* BACKEND
  * Setup SERVER PG connection
    * CREATE Migration
  * Implementing Todo CRUD
    * GET `/todo`
    * GET `/todo/:id`
    * POST `/todo`
  * ADDITIONAL: Adding Validator for Backend

## 1.2.0

* Initialize Node Server Application
  * Initialized using `pnpm init`
  * Install dependencies
    * [tsup](https://tsup.egoist.dev/#install) as the bundler
    * [concurrently](https://www.npmjs.com/package/concurrently) + [nodemon](https://www.npmjs.com/package/nodemon) as a development runtime and add scripts to watch for file changes
  * Initialize the Todos Routes

## 1.1.0

* Initialize React Project with [Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) (react-ts)

## 1.0.0

* Initialized the project as a [PNPM Workspace](https://pnpm.io/workspaces) + Monorepo with [Turborepo](https://turbo.build/repo).
  Why Monorepo? We will be sharing types and interfaces between the two applications Frontend and Backend Applications.
  This is a best practice for modern Applications and Turborepo is one of the best tools I have used personally for Javascript Monorepo Projects.
