---
name: Playwright runtime on Replit
description: Environment requirements for launching Python Playwright Chromium reliably on Replit.
---

Python Playwright requires both its version-matched Chromium/headless-shell download and the Chromium shared-library runtime in the Replit Nix environment. The `playwright-driver` package alone does not provide a launchable browser for the Python package.

**Why:** The Python package could import successfully, but browser launch first failed because the expected headless-shell executable was absent, then failed on missing NSPR, ATK, and GBM libraries.

**How to apply:** After Playwright version or environment rebuilds, install the matching Chromium browser and verify `ldd` reports no missing libraries. Keep NSPR/NSS, GTK/ATK, graphics, X11, audio, and GBM runtime packages available before diagnosing application-level browser behavior.