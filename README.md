# Awareness exercise with a shared presenter dashboard

This version records **only** a demo submission event and the server timestamp. It never reads, transmits, or stores the username/password input values.

## Important: deployment method

This project includes a Netlify Function and Netlify Blobs storage. It must be deployed through a Git-connected Netlify project or the Netlify CLI so the function can be built. A simple drag-and-drop static deploy is not enough for the server function.

## Setup

1. Upload this folder to a new GitHub repository, or place it in your existing site's repository.
2. In Netlify, open your existing site and go to **Project configuration → Environment variables**.
3. Add an environment variable:
   - Key: `DASHBOARD_PASSCODE`
   - Value: choose a long, unique presenter passcode.
4. Connect the Git repository to your existing Netlify site (or deploy with Netlify CLI). Ensure the publish directory is `.` and functions directory is `netlify/functions`.
5. Trigger a new production deploy after setting the environment variable.
6. Test the public page, then open `/presenter.html` and enter the passcode.

## Files

- `index.html` — participant-facing awareness exercise.
- `presenter.html` — presenter dashboard.
- `netlify/functions/events.mjs` — server-side event endpoint.
- `netlify.toml` — Netlify build configuration.

## Limitations

- This is intended for a low-volume classroom awareness exercise, not a high-volume production analytics system.
- The dashboard shows submissions recorded after this version is deployed. It cannot recover earlier browser-local events.
- Do not add fields or code that capture actual passwords, account credentials, or other sensitive information.
- Keep the presenter URL and passcode private. Rotate the passcode if it is shared.
