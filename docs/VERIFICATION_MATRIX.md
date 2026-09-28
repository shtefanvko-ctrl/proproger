# Verification matrix

## Recovered v8.16.0

Verified locally from the recovered full source tree:

- JavaScript syntax: **PASS 15/15**
- Core smoke: **PASS**
- Extended core: **PASS**
- Static contract: **PASS**
- Combined DEV_CHECK: **PASS**
- Working recovery tree: clean after verification

The exact hashes of critical runtime and test files are stored in `recovery/v8.16.0-critical-files.json`.

## Authentic history

Recovered original commits through v8.8.1.2:

- `d51dd47` v8.8.0.1
- `3214738` v8.8.0.1 sync
- `a8b37eb` v8.8.1
- `92ca5d9` v8.8.1.1
- `360de14` v8.8.1.2

## Later known baseline

A separate factual audit proves `ec7894a — v8.17.0 goal closure` and a full DEV_CHECK pass. Its source/Git objects are still missing from connected storage. Therefore v8.16.0 remains a recovered fallback, not the canonical latest release.

## Promotion gate

No branch may be promoted to `main` as the current implementation unless:

1. complete source tree is present;
2. manifest version matches the branch/release claim;
3. syntax + core + extended + static checks pass;
4. source hashes are recorded;
5. known newer verified baseline is not silently discarded.
