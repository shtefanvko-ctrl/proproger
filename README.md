# PROPROGER

Git migration and history recovery are in progress.

## Verified provenance

A real local Git repository was recovered from `proproger-local.zip`. Its authentic commit history is:

- `d51dd47` — Baseline PROPROGER v8.8.0.1 local dev
- `3214738` — Sync v8.8.0.1 manifest and rotation check
- `a8b37eb` — v8.8.1 Parallel Safety file locks
- `92ca5d9` — v8.8.1.1 Parallel Safety audit hotfix
- `360de14` — v8.8.1.2 strict response binding

The recovered Git object database contains no later unreachable/dangling commits.

## Recovered source

A complete v8.16.0 source package was independently recovered and verified. It passes:

- syntax check: 15/15 JS modules
- core smoke suite: PASS
- manifest dependency presence check: PASS

It is preserved separately as `recovered/v8.16.0` in the portable recovery bundle. The original intermediate Git commits between v8.8.1.2 and v8.16.0 were not available, so they are not fabricated.

## Later known baseline

Project audit evidence records a later baseline:

`ec7894a — v8.17.0 goal closure`

with a clean working tree and full DEV_CHECK pass. The original v8.17.0 source bytes/Git objects are not currently available, so v8.16.0 is **not** promoted as the latest version.

## Migration rule

Do not reconstruct missing releases from descriptions. Preserve authentic Git history where it exists, mark recovered snapshots explicitly, and promote a version to `main` only after its actual source tree is available and verified.

AI Company OS v9 remains a separate platform layer above the PROPROGER Execution Kernel.
