# PixelIt.Docs

This is the [documentation](https://pixelit-project.github.io/) for the [PixelIt Project](https://github.com/pixelit-project/PixelIt).

## Development

1. Use the project's pinned Node.js version, `16.17.0` (Volta is configured in `package.json`).
2. Install the locked dependencies with `npm ci`.
3. Start the VuePress preview with `npm run dev` (or `npm run dev-win` on Windows).
4. Validate changes with `npm run build` and `git diff --check`.

Follow [AGENTS.md](AGENTS.md) when editing technical documentation. Build output and `node_modules/` must not be committed.
