# Recovered v8.16.0 branch

This branch is reserved for the complete recovered PROPROGER v8.16.0 source tree.

Import gate:
- source must be complete under `src/`;
- critical files must match `recovery/v8.16.0-critical-files.json`;
- `node scripts/verify-recovered-source.mjs <tree>` must pass before import;
- branch CI must pass after import;
- this branch is not the canonical latest because v8.17.0 is historically verified at `ec7894a`.

Do not merge this branch into `main` merely to fill the repository with source. Recover the original v8.17 source first or explicitly re-baseline with evidence.
