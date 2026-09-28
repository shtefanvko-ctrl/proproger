# PROPROGER v8.16.0 — recovered baseline audit

Source: recovered from the user-supplied `PROPROGER_v8.6.2.zip` bundle.

## Status

- Manifest version: 3
- Extension version: 8.16.0
- JavaScript files: 15
- `node --check`: PASS for all 15 JavaScript files
- Secret-like credential scan: no embedded API/GitHub/private-key credentials found in the v8.16.0 source tree
- Basic module smoke tests: PASS for Project Brain, Decision Gate, Branch Recovery, Auto Completion, Worker Scheduler resource isolation, and Visual Audit

## Important limitation

This is a recovered v8.16.0 baseline, not the documented v8.17.0 implementation baseline. Do not label it as current production/latest if a newer local v8.17.0 repository can still be recovered.

## Architecture present in this baseline

- execution/content pipeline
- background service worker
- Project Brain
- Product Brain
- Decision Gate
- Branch Recovery
- Auto Completion
- Worker Scheduler
- file locking
- visual brain / reference sets / screen interpreter / visual task engine / visual audit
- artifact/input persistence and long-run recovery logic inside the extension runtime

## Audit findings

1. `content.js` remains a very large monolith (~11.3k lines), so regression risk is concentrated in one file.
2. The repository contains extensive manual `TEST_PLAN.txt` / `DOD.txt`, but no standalone automated browser regression suite in this recovered folder.
3. The README history starts with older release headings and is not a reliable single source for the installed version; `manifest.json` is authoritative for this recovered baseline.
4. DOM automation depends on ChatGPT selectors/structure and therefore needs browser-level regression tests against current ChatGPT UI.
5. `chat.openai.com` remains in host permissions for compatibility; current primary target is `chatgpt.com`.
6. v8.17 Goal Closure is not present in this recovered source tree.

## Git recommendation

Preserve this tree as a recovery tag/branch such as `recovered/v8.16.0`. Keep `main` for the newest verified baseline after the v8.17.0 local repository is recovered or reconstructed from verified source bytes.