import json
import os
import re
from datetime import datetime
from pathlib import Path
from urllib.request import Request, urlopen


ROOT = Path("src/.vuepress/public/pixelit_flasher")
API = "https://api.github.com/repos/pixelit-project/PixelIt/releases"
PATTERN = re.compile(
    r"firmware_(?P<version>v?\d+\.\d+\.\d+(?:-[^_]+)?)_"
    r"(?P<chip>ESP32|ESP8266)_(?P<board>[^.]+)"
    r"(?P<full>\.full-upgrade)?\.bin"
)


def github_json(url):
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "PixelIt.Docs"}
    if os.environ.get("GITHUB_TOKEN"):
        headers["Authorization"] = f"Bearer {os.environ['GITHUB_TOKEN']}"
    with urlopen(Request(url, headers=headers), timeout=30) as response:
        return json.load(response)


def latest_releases(fetch=github_json):
    stable = fetch(f"{API}/latest")
    if stable.get("draft") or stable.get("prerelease"):
        raise ValueError("GitHub latest must identify a published stable release")

    # Search all pages: version numbers and API ordering do not establish recency.
    betas = []
    page = 1
    while True:
        releases = fetch(f"{API}?per_page=100&page={page}")
        betas.extend(
            release for release in releases
            if not release.get("draft") and release.get("prerelease")
            and re.fullmatch(r"v?\d+\.\d+\.\d+-beta(?:\.\d+)*", release["tag_name"])
            and release.get("published_at")
        )
        if len(releases) < 100:
            break
        page += 1
    beta = max(betas, key=lambda r: datetime.fromisoformat(
        r["published_at"].replace("Z", "+00:00")
    ), default=None)
    return stable, beta


def firmware_data(filename):
    match = PATTERN.fullmatch(filename)
    if not match:
        raise ValueError(f"Unsupported firmware filename: {filename}")
    version = match["version"]
    return {
        "version": version,
        "beta": "-beta" in version,
        "testing": "-testing" in version,
        "chipFamily": match["chip"],
        "enviroment": match["board"],
        "full-upgrade": bool(match["full"]),
        "manifest": f"manifest_{filename[len('firmware_'):-len('.bin')]}.json",
        "firmware": filename,
        "path": f"../firmware/{filename}",
    }


def select_firmware(entries, releases):
    selected = []
    for release in releases:
        if release is None:
            continue
        tag = release["tag_name"].removeprefix("v")
        assets = {asset["name"] for asset in release["assets"]}
        expected = {name for name in assets if PATTERN.fullmatch(name)}
        available = {entry["firmware"] for entry in entries}
        if expected - available:
            raise ValueError(f"Missing local release assets: {sorted(expected - available)}")
        matching = [entry for entry in entries
                    if entry["version"].removeprefix("v") == tag
                    and entry["firmware"] in assets]
        if not matching:
            raise ValueError(f"No local firmware matches official release {release['tag_name']}")
        selected.extend(matching)
    return selected


def main():
    print("+++ Preparing Webflasher +++")
    entries = [firmware_data(path.name) for path in sorted((ROOT / "firmware").glob("*.bin"))]
    releases = latest_releases()
    selected = select_firmware(entries, releases)
    manifest_dir = ROOT / "manifest"
    manifest_dir.mkdir(exist_ok=True)
    # Validate release selection before writing or removing any assets.
    for entry in selected:
        manifest = {
            "name": "PixelIt", "version": entry["version"],
            "home_assistant_domain": "PixelIt",
            "funding_url": "https://github.com/pixelit-project/PixelIt",
            "new_install_prompt_erase": True,
            "builds": [{"chipFamily": entry["chipFamily"],
                        "parts": [{"path": entry["path"], "offset": 0}]}],
        }
        content = json.dumps(manifest, indent=2) + "\n"
        target = manifest_dir / entry["manifest"]
        # Avoid rewriting equivalent historical JSON just for formatting.
        if not target.exists() or json.loads(target.read_text()) != manifest:
            target.write_text(content)
    (ROOT / "meta.json").write_text(json.dumps(selected, indent=2) + "\n")
    keep_firmware = {entry["firmware"] for entry in selected}
    keep_manifests = {entry["manifest"] for entry in selected}
    for path in sorted((ROOT / "firmware").glob("*.bin")):
        if path.name not in keep_firmware:
            path.unlink()
            print(f"Removed firmware: {path.name}")
    for path in sorted(manifest_dir.glob("manifest_*.json")):
        if path.name not in keep_manifests:
            path.unlink()
            print(f"Removed manifest: {path.name}")
    print("Selected releases:", ", ".join(r["tag_name"] for r in releases if r))
    print(f"+++ Prepared {len(selected)} installation options +++")


if __name__ == "__main__":
    main()
