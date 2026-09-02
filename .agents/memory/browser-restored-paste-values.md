---
name: Browser-restored paste values
description: A preview browser can restore stale personal text into a controlled cookie textarea.
---

Treat unexpected text that reappears in a paste field as browser-restored form state before treating it as application data.

**Why:** The application state and backend contained no matching value, while the browser continued restoring it after deletion.

**How to apply:** Disable autocomplete, autocorrect, capitalization, and spellcheck on cookie paste inputs, and give the input a unique name. If an old value remains in the current session, reload the preview or use a private window.