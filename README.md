# Vue.js Task Manager

A Nuxt 4 + Vue 3 task management application built with Pinia and a repository pattern for clean data access. This project includes modern testing with Vitest, decoupled store logic, and reusable repository abstractions.

---

## Project Overview

This application is a task manager that supports:

- task listing and filtering
- search by title
- create, update, delete operations
- form validation for task input
- toast notifications for success and error states

The architecture is designed to separate concerns:

- `app/stores/` contains Pinia stores for application state
- `app/repositories/` contains the repository layer for API access
- `app/composables/` contains reusable logic such as validation and notification helpers
- `app/tests/` contains unit tests for stores and repositories
- `app/components/` contains UI components, including task form/list and shared UI controls

---

## Key Technologies

- Nuxt 4
- Vue 3
- Pinia
- Tailwind CSS
- Vitest
- Nuxt Toast
- Repository pattern for API access

---

## Architecture

### Repository Pattern

The repository layer abstracts HTTP operations behind a consistent interface.

- `app/repositories/factory.ts` defines a generic `Factory<T>` base class with standard CRUD methods:
  - `getAll()`
  - `getById(id)`
  - `create(payload)`
  - `update(id, payload)`
  - `delete(id)`

- `app/repositories/modules/tasks.ts` extends `Factory<Task>` with task-specific helpers such as `search()` and `filter()`.

- `app/repositories/index.ts` exposes `useRepositories()` to create repository instances using Nuxt's `$api` helper.

### Store Layer

The Pinia store in `app/stores/task.store.ts` coordinates application state and repository calls.

It includes:

- state: `tasks`, `currentTask`, `selectedTask`, `filters`, `searchQuery`, `loading`, `error`
- getters: `filteredTasks`, `taskCount`
- actions: `fetchTasks`, `fetchTask`, `createTask`, `updateTask`, `deleteTask`, `setFilters`, `setSearchQuery`

The store relies on `taskRepository` from `useRepositories()` and `useNotifier()` for notifications.

### Composables

- `app/composables/useNotifier.ts`: wraps `useToast()` for success/error notification handling.
- `app/composables/useValidation.ts`: validates task form input and exposes reusable validation methods.

---

## Testing

This project uses Vitest for unit testing.

### Existing test structure

- `app/tests/setup.ts`: shared Vitest setup file that clears mocks before each test.
- `app/tests/stores/`: Pinia store unit tests.
- `app/tests/repositories/`: repository unit tests.

### Test scripts

Use these scripts from the project root:

```bash
npm run test
npm run test:run
npm run test:ui
npm run test:store
npm run test:repo
npm run test:watch
npm run coverage
```

### What is covered

- repository tests verify API request endpoints and payloads
- store tests verify state transitions, actions, and computed values
- external dependencies are mocked so tests remain isolated and fast

---

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Nuxt Configuration

The Nuxt configuration includes:

- `@nuxt/image`
- `@pinia/nuxt`
- `@nuxtjs/tailwindcss`
- `nuxt-toast`
- `@nuxt/test-utils/module`

This configuration enables state management, styling, toast notifications, API interaction, and Vitest integration.

---

## How to extend

To add a new resource:

1. create a new repository class in `app/repositories/modules/`
2. register it in `app/repositories/index.ts`
3. add a Pinia store in `app/stores/`
4. add UI components under `app/components/`
5. add unit tests under `app/tests/stores/` and `app/tests/repositories/`

---

## Notes

- The repository pattern keeps backend access decoupled from UI logic.
- The store layer handles business state, actions, and computed values.
- The composables provide reusable utilities for validation and notifications.

---

## License

Available on request.
