## Preface

A lot of effort has been put into Applii to create a useful product. If you want to report bugs or add a feature, please open an issue [here](https://github.com/curatedcode/applii-tracker/issues). If you'd like to contribute follow this guide.

## Before contributing

- This app requires [NodeJS](https://nodejs.org/en) and [pnpm](https://pnpm.io/)

## Building

```
pnpm install
pnpm build
```

## Testing

```
# shorthand to run unit and e2e tests
pnpm test

# unit tests
pnpm test:unit

# e2e tests
pnpm test:e2e
```

## Opening pull requests

Pull Request titles need to follow a semantic convention.

PR titles are written in following convention: type: subject

Type is required and indicates the intent of the PR

Allowed types are:
| type | description |
| -------- | ------------------------------------------------------------------------- |
| feat | A new feature is introduced |
| fix | A bug was fixed |
| chore | No user affected code changes were made |
| refactor | A refactoring that also affected user (e.g. log a deprecation warning) |
| docs | Docs were changed |
| test | Test were changed |
| build | Build scripts were changed |
| infra | Infrastructure related things were made (e.g. issue-template was updated) |
| revert | A revert was triggered via git |

Some examples of valid pull requests

```
feat: add casing option
fix: lower target to support Webpack 4
chore: add naming convention rule
refactor(location): deprecate modifier function
docs: fix typo
test: validate function contents
build: add node v18 support
infra: rework bug-report template
revert: add more sorting options (#362)

# Breaking changes
refactor!: remove default export
build!: remove node v12 support

# A release PR will look like this
chore(release): 7.4.0

# Renovate dependencies
chore(deps): update devdependencies
chore(deps): update typescript-eslint to ~5.33.0
```
