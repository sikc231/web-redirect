# web-redirect

Simple permanent HTTP redirect server. The server issues a 301 redirect to the URL
provided in the `DESTINATION_URL` environment variable.

This project is intentionally tiny so it works well with builders like nixpacks.

Usage
-----

1. Install (optional — only needed to fetch dependencies, there are none):

	```bash
	npm install
	```

2. Run locally:

	```bash
	export DESTINATION_URL=https://example.com
	npm start
	```

	The server listens on `$PORT` (default 8080). nixpacks will use `npm start` to run the app.

Notes
-----

- The redirect is a 301 (Moved Permanently).
- `DESTINATION_URL` is required; the process exits if it's not set.
- This repository includes a minimal `package.json` so nixpacks or other builders can detect and run it.
