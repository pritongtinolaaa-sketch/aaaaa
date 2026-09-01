---
name: CRA and Motion production build
description: Known production-only bundling incompatibility between the imported CRA 5 frontend and Motion packages.
---

The Replit development server compiles and runs, but the optimized CRA 5 build reports that `warnOnce` is not exported from `motion-utils`.

**Why:** Aligning several published Framer Motion, `motion-dom`, and `motion-utils` release families did not resolve the production-only error, while direct inspection confirmed the installed ESM and CommonJS entry points export `warnOnce`. Continuing to pin versions would risk changing application behavior without addressing the legacy bundler incompatibility.

**How to apply:** Do not treat this production build error as evidence that the Replit development workflow is broken. If publishing is requested, scope a separate toolchain compatibility fix and verify both the optimized build and animation behavior.