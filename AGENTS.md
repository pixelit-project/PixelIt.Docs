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
- Release verification is required for changes to technical content or release selection. Changes limited to spelling, formatting, or contributor instructions do not require a release lookup or a repository-wide documentation update.

## Firmware assets and Webflasher

- Firmware delivery is automated: the upstream PixelIt workflow `.github/workflows/build-and-release.yml`, job `upload-fw-to-docs`, copies firmware binaries into this repository's `src/.vuepress/public/pixelit_flasher/firmware/` on tag pushes, retaining existing binaries. This includes prerelease tags; local filenames are not the authority for the latest stable release.
- This repository's `.github/workflows/build-and-deploy.yml` runs `.github/webflasher.py` to generate and commit `pixelit_flasher/meta.json` and `pixelit_flasher/manifest/*.json`, then builds and deploys the site. Routine documentation work does not require manually copying firmware or regenerating these files.
- Treat firmware binaries and generated Webflasher metadata as pipeline-managed assets. Change them only when the task explicitly concerns firmware delivery or the Webflasher pipeline. For generation changes, edit the generator, regenerate for validation, and review the resulting diff rather than hand-editing generated entries.
- For firmware and Webflasher changes, verify that referenced binaries exist and match the release, board, chip family, and installation method. Keep first-install/full-upgrade instructions distinct from OTA updates. Retain historical and prerelease assets unless their removal is part of the task; do not present them as the current stable recommendation.

## Project structure and validation

- This repository contains VuePress 1 documentation. Content pages are located in `src/`, and the VuePress configuration is in `src/.vuepress/`.
- Preserve the style and Markdown conventions of each page while following the English-language requirement above. Change navigation or configuration only when the task requires it.
- Use the existing npm scripts: `npm run dev` for local preview and `npm run build` for build validation. The project pins Node.js `16.17.0` through Volta.
- For documentation changes, check internal links, linked files, and code examples, and run the VuePress build when possible. Clearly report any checks that could not be performed.
- Preserve existing page URLs and heading anchors where possible. When renaming or moving them, update affected links and the sidebar in `src/.vuepress/config.js`. Static assets in `src/.vuepress/public/` are served from the site root.
- Preview affected pages when changing layout, images, VuePress containers, or the embedded Webflasher; a successful build alone does not verify their appearance or interaction.
- Do not include generated build output (`src/.vuepress/dist/`), temporary files, or `node_modules/` in changes. Review the final diff and run `git diff --check` before finishing.
- Keep changes focused on the task and preserve existing changes made by others.
- Update npm dependencies and the lockfile only when required by the task. Avoid unrelated dependency upgrades.

## Text font documentation scope

- Treat `text.bigFont` as a Boolean in documentation and examples: `false` for small text and `true` for large text. Use JSON booleans, not strings or numeric font selectors. Do not document values `2` or `3`. This is an explicit user preference. Document clock fonts separately through the clock options.
