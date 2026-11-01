# Instructions for PixelIt.Docs

These rules apply to the entire repository.

## Required documentation baseline

- The documentation must always describe the **latest stable release** of [pixelit-project/PixelIt](https://github.com/pixelit-project/PixelIt).
- Before making any substantive documentation change, determine the latest stable version through [GitHub Releases / latest](https://github.com/pixelit-project/PixelIt/releases/latest) or the GitHub API at `https://api.github.com/repos/pixelit-project/PixelIt/releases/latest`. Verify the actual release tag; do not use a permanently pinned version number as the baseline.
- Only consider published releases that are neither drafts nor prereleases. Beta, RC, and other prerelease versions, as well as unreleased changes on `main` or development branches, are not the baseline for the regular documentation.
- Verify technical claims against the release notes and source code **at the identified release tag**. If they conflict, the behavior actually implemented in that stable version takes precedence.
- If the latest stable version cannot be verified, state this limitation in the work report. Do not claim that the documentation is current or add unverified features.

## Documentation changes

- Write new and revised documentation in English.
- Never invent API fields, default values, or examples. Verify them against authoritative sources for the stable release and explicitly report unresolved questions.
- When a new stable release is available, compare its release notes and relevant source changes with the previously documented version, identify all affected pages, and update them together. If the previous documentation baseline is unknown, report that uncertainty and verify the affected content directly against the latest stable release.
- Describe features, API endpoints, JSON fields, MQTT topics, default values, hardware support, and user workflows as they are available in the latest stable version.
- When making changes, also check affected examples, installation and update instructions, download links, and related pages. Examples must work with that version.
- Remove or correct outdated information in the area being edited. Historical notes must clearly identify the applicable version and must not contradict the current workflow.
- Document prerelease features only when explicitly requested, and clearly label them as not yet part of the stable release.
- Check integration and WebUI information for compatibility with the stable PixelIt release; a newer release in another repository does not automatically change the firmware baseline.
- Include the verified release tag and the sources used in the final report. This file defines the workflow; it does not update the documentation automatically.

## Project structure and validation

- This repository contains VuePress 1 documentation. Content pages are located in `src/`, and the VuePress configuration is in `src/.vuepress/`.
- Preserve the style and Markdown conventions of each page while following the English-language requirement above. Change navigation or configuration only when the task requires it.
- Use the existing npm scripts: `npm run dev` for local preview and `npm run build` for build validation. The project pins Node.js `16.17.0` through Volta.
- For documentation changes, check internal links, linked files, and code examples, and run the VuePress build when possible. Clearly report any checks that could not be performed.
- Keep changes focused on the task and preserve existing changes made by others.
- Update npm dependencies and the lockfile only when required by the task. Avoid unrelated dependency upgrades.
