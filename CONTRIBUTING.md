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
git clone git@github.com:SavingTool/hmrc-income-tax.git
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
- _Important_: the git remote must be the ssh url in order for np to work correctly. By default, GitHub Desktop uses the https URL as far as I can tell. It can be easily changed via: `git remote set-url origin git@github.com:SavingTool/hmrc-income-tax.git`. If you have failed to do this, the "pushing tags" part will hang. If this happens, ctrl+c out, manually run git push --follow-tags
- On an up-to-date `main`, run `yarn build` to ensure `lib/` is clean and up-to-date. `tsc` does not remove stale files, so a local `lib/` can accumulate outdated artifacts (e.g. compiled test files from before they were excluded) that cause spurious test failures.
- Run `yarn run tag:{patch|minor|major}`. This creates a git tag **and pushes it up**.
- This also opens a GitHub release draft - go ahead and publish it.
- The GitHub action stages the release on npm automatically. Check the Actions tab to see it happening. This is controlled by the `publish` workflow defined in `.github/workflows`.
- **The release is not live until it is approved.** The action uses npm trusted publishing (OIDC, no token) with staged publishing, so a successful run only puts the version in npm's staging queue. Approve it with 2FA on npmjs.com (the package's staged versions page), or locally with `npm stage list` / `npm stage approve`. Approval becomes available once npm's malware scan has finished.
- To discard a bad staged version, reject it (on npmjs.com or with `npm stage reject`). The version number stays taken until it is rejected.

### If the publish action fails

- Fix the cause and merge it to `main`, then re-run the release from the Actions tab: **Npm Publish → Run workflow**, choosing `main` (or `gh workflow run publish.yml --ref main`). This stages whatever version is in `package.json` on that branch, so only do this when that version hasn't been published yet.
- Re-running the original failed run will not pick up workflow fixes - it uses the workflow file from the tagged commit.
