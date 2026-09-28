# PROPROGER

Git migration is in progress.

## Verified baselines

- **v8.17.0** — last historically verified implementation baseline; commit recorded by the project audit as `ec7894a — v8.17.0 goal closure`. The original source bytes are not currently available in the connected storage.
- **v8.16.0** — full source recovered and independently re-verified from the available project archive. It passes syntax checks for all 15 top-level JS modules and the recovered core smoke suite.

## Migration rule

Do not reconstruct v8.17.0 from descriptions and do not silently promote v8.16.0 to the latest version.

The recovered v8.16.0 tree is preserved as a complete Git bundle with branch `recovered/v8.16.0` and tag `v8.16.0-recovered`. It will be pushed after the original v8.17.0 working tree has been recovered or after an explicit decision to publish the recovered branch.

## Target architecture

PROPROGER remains the Execution Kernel. AI Company OS v9 is a separate platform layer and must not overwrite the extension architecture.
