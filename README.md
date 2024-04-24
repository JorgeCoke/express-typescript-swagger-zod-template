<p align="center">
    <img alt="Express Swagger and Zod Template logo" src="repo-logo.png" width="512"/>
</p>

# Express + Typescript + Swagger + Zod [Template]

**Express** 🚀 template, including **Typesafety** 🛡, with **automatic Swagger OpenApi** 📚 docs generator and **Zod validator** 🦄

## ✨ Features

- 🚀 [Express](https://expressjs.com/) NodeJS server
- 📚 [Swagger](https://swagger.io/) OpenApi definition automatically generated based on your Zod Schemas, served vía Swagger UI
- 🦄 [Zod](https://zod.dev/) Validate inputs and outputs, type Req and Res objects automagically, under a Typesafety environment
- 📁 Scalable Project Structure, split features into modules
- 🧪 Powerful testing suite setup with [Vitest](https://vitest.dev/) and [Supertest](https://www.npmjs.com/package/supertest). Unitary and Integration test included, +90% code coverage report included!
- 📄 [Morgan](https://www.npmjs.com/package/morgan) Log retention. Save your request logs automatically with an automated rotating write stream
- 🌲 [Pino](https://github.com/pinojs/pino) logger
- ❌ Global Error Handler included
- ❤️‍🩹 Monitoring Health check endpoint included
- 🔒 Security middlewares provided: [Helmet](https://www.npmjs.com/package/helment) for HTTP header security, [CORS](https://www.npmjs.com/package/cors) setup, and [Rate Limiting](https://www.npmjs.com/package/express-rate-limit)
- 💉 [InversifyJS](https://github.com/inversify/InversifyJS) Dependency Injection
- 🌐 Latest stable NodeJS working environment, with .env config variables validated with [Zod](https://zod.dev/)
- 🎨 [ESLint](https://www.npmjs.com/package/eslint) & [Prettier](https://www.npmjs.com/package/prettier) as linter and formatter
- 🐶 Pre-Commit and Commit [Husky](https://github.com/typicode/husky) hooks (Runs linter and formatter before any commit against staged files only!)
- 💄 Commit nomenclature rules following [Conventional Commit Format](https://commitlint.js.org/) and [Commitizen CLI](https://github.com/commitizen/cz-cli) (emoji [powered](https://github.com/folke/devmoji))
- 🚀 Release management policy with [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version), including automagically CHANGELOG.md generation, version bumping and GitTags
- 🔦 Included [npm-check](https://www.npmjs.com/package/npm-check) to check for outdated, incorrect, and unused dependencies.
- 🥷🏻 Included [better-npm-audit](https://www.npmjs.com/package/better-npm-audit) to check for dependency vulnerabilities

## 🛠 Getting Started

```
npm ci                  # Install dependencies
cp .env.example .env    # And fill .env file variables
npm run db:migrate      # Generate an empty sqlite db and run migrations
npm run db:seed         # Seed db with dummy data
npm run dev             # Launch project locally
```

## 🎨 Linter & Formatter

```
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

## ⛩ Git Commit with Commitizen

```
git add .            # Add files
npm run cz           # Commit with Commitizen CLI
```

## 🚀 Release a new version

```
npm run release             # Bump version and generate CHANGELOG.md
git push --follow-tags      # Push changes and GitTag to origin
```

## 🔦 Check vulnerabilities and update outdated dependencies

```
npm run npm:audit     # Check dependency vulnerabilities
npm run npm:check     # Check outdated dependencies
```

## 🏗 Build and launch

```
npm run build         # Compile project
npm run start         # Launch
```

## 🧪 Testing

```
npm run test                # Run all tests
npm run test:cov            # Run all tests with code coverage report
npm run test:unit           # Run unitary tests
npm run test:integration    # Run integration tests
```

## 📀 Database Drizzle Cheatsheet

```
npm run db:generate     # Generate migrations if needed
npm run db:migrate      # Run migrations
npm run db:seed         # Seed database
npm run db:studio       # Open drizzle studio
npm run db:setuptests   # Setup test environment
npm run db:hardreset    # DANGER! Removes all databases and migrations. Generates migrations, execute them and seed database afterwards
```
