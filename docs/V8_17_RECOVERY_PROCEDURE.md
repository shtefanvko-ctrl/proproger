# Recovering the verified v8.17.0 baseline

Known verified historical baseline:

- version: **8.17.0**
- commit: `ec7894a — v8.17.0 goal closure`
- working tree at audit time: clean
- DEV_CHECK: PASS, including GOAL_CLOSURE_TEST

The original source/Git objects are still missing from connected storage.

When a new archive, directory or old clone is found, do not compare it manually first. Run:

```bash
npm run scan:v8.17 -- /path/to/candidate
```

The scanner checks:

1. manifest version is exactly 8.17.0;
2. the known Execution Kernel modules are present;
3. Goal Closure evidence exists in source/tests/docs;
4. if a `.git` directory exists, whether commit `ec7894a` is actually present;
5. SHA-256 hashes of required runtime modules are emitted for provenance comparison.

`CANDIDATE` does **not** automatically mean canonical. A candidate must still pass syntax, core/extended/static tests and be diffed against recovered v8.16.0 before promotion.
