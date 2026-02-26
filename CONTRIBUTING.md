# Contributing

Contributions are welcomed! Please feel to open issues or even raise PRs.

Please note that the project aims to provide "low level" calculation utilities and will therefore continue to have a minimal feature set.

## Getting Started

`@saving-tool/hmrc-income-tax` is a pure TypeScript library. All you need to develop the project is

- Git (no specific version required but v2+ is recommended)
- Node.js (v14+ or latest LTS is recommended)
- Yarn Classic

To start developing:

```bash
git clone git@github.com:sgb-io/hmrc-income-tax.git
cd hmrc-income-tax
yarn
```

## CI

The project makes use of GitHub actions as a CI provider. The CI is designed to assist with validating PR changesets and protect against mistakes.

The CI currently runs these steps:

```yaml
- run: yarn # installs dependencies
- run: yarn build # builds the project into the `lib` dir
- run: yarn lint # ensures the changeset satisfies the eslint rules
- run: yarn prettier # ensures the changeset satisfies the required code style
- run: yarn test # ensures that all tests pass
```

## Releasing new versions

- Have `np` installed, globally
- Use Windows Terminal (or macOS) - avoid Git Bash for Windows, as the interactivity that `np` requires does not work!
- *Important*: the git remote must be the ssh url in order for np to work correctly. By default, GitHub Desktop uses the https URL as far as I can tell. It can be easily changed via: `git remote set-url origin git@github.com:sgb-io/hmrc-income-tax.git`. If you have failed to do this, the "pushing tags" part will hang. If this happens, ctrl+c out, manually run git push --follow-tags
- On an up-to-date `main`, run `yarn build` to ensure `lib/` is clean and up-to-date. `tsc` does not remove stale files, so a local `lib/` can accumulate outdated artifacts (e.g. compiled test files from before they were excluded) that cause spurious test failures.
- Run `yarn run tag:{patch|minor|major}`. This creates a git tag **and pushes it up**.
- This also opens a GitHub release draft - go ahead and publish it.
- The GitHub action should publish to npm automatically. Check the Actions tab to see it happening. This is controlled by the `publish` workflow defined in `.github/workflows`.