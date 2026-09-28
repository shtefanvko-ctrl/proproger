# PROPROGER Execution Kernel — Feature Map

## Verified historical latest
- Version: **8.17.0**
- Commit: `ec7894a — v8.17.0 goal closure`
- Historical DEV_CHECK: PASS
- Source objects currently missing from connected storage.

## Recovered executable fallback
- Version: **8.16.0**
- Status: complete source snapshot recovered and locally verified.
- Promotion status: **recovery only**, not canonical latest.
- Exact critical file hashes: `recovery/v8.16.0-critical-files.json`.

## Core modules

| Capability | Recovered v8.16 | Historical v8.17 |
| --- | --- | --- |
| Execution pipeline / long-run | present | verified |
| Project Brain | present | verified |
| Product Brain | present | verified |
| Decision Gate | present | verified |
| Branch Recovery | present | verified |
| Auto Completion | present | verified |
| Goal Closure | not in recovered v8.16 | verified |
| Worker Scheduler / Recovery | present | verified |
| File Locks / Parallel Safety | present | verified |
| Response Binding | present | verified |
| Stage Isolation | present | verified |
| Artifact chain / vault behaviors | present in execution core | verified |
| Visual Brain | present | verified |
| Reference Set | present | verified |
| Screen Interpreter | present | verified |
| Visual Task Engine | present | verified |
| Visual Audit | present | verified |

## Hard invariants

1. Do not call v8.16 the latest release.
2. Do not recreate v8.17 Goal Closure from prose.
3. A recovered source import must match pinned file hashes before it is accepted.
4. `main` remains migration/control until actual current source provenance is restored.
5. AI Company OS business/platform domains live in the separate AI-Company-OS repository; they do not get folded into `content.js`.
6. DONE requires executable verification, not file presence.
