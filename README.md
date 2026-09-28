# PROPROGER

Execution Kernel / Chrome Extension project.

## Current repository status

The Git migration is provenance-first.

- Authentic Git history was recovered through **v8.8.1.2** (`360de14`).
- A complete **v8.16.0** source snapshot was recovered and passed syntax/core/extended/static checks.
- A later **v8.17.0 Goal Closure** implementation is historically verified at `ec7894a`, but its actual source/Git objects have not yet been recovered.

Therefore this repository does **not** pretend that recovered v8.16 is the latest implementation.

## Verification

Repository control:

```bash
npm run verify:repo
```

Verify an unpacked copy of the recovered v8.16 source byte-for-byte:

```bash
node scripts/verify-recovered-source.mjs /path/to/unpacked/PROPROGER
```

Critical v8.16 files are pinned by size and SHA-256 in `recovery/v8.16.0-critical-files.json`.

See:
- `docs/FEATURE_MAP.md`
- `docs/VERSION_PROVENANCE.md`
- `docs/VERIFICATION_MATRIX.md`
- `docs/RECOVERY_AUDIT.md`

## Architecture boundary

PROPROGER remains the **Execution Kernel**: pipeline, Project/Product Brain, Decision Gate, recovery, scheduling, artifacts, visual execution and Creator tooling.

AI Company OS is a separate server/business platform repository and must not be merged into the extension monolith.
