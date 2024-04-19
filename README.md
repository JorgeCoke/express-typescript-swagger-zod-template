<p align="center">
    <img alt="Express Swagger and Zod Template logo" src="repo-logo.png" width="512"/>
</p>

# Express + Typescript + Swagger + Zod [Template]

**Express** 🚀 template, including **Typesafety** 🛡, with **automatic Swagger OpenApi** 📚 docs generator and **Zod validator** 🦄. _What could go wrong with the trifecta?_

- 🚀 Express
- 📚 Swagger
- 🦄 Zod

## ✨ Features

- ❌ Global Error Handler included
- 🔒 Security middlewares provided: [Helmet](https://www.npmjs.com/package/helment) for HTTP header security, [CORS](https://www.npmjs.com/package/cors) setup, and [Rate Limiting](https://www.npmjs.com/package/express-rate-limit)
- 💉 [InversifyJS](https://github.com/inversify/InversifyJS) Dependency Injection
- 🌐 Latest stable NodeJS working environment, with .env config variables
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
