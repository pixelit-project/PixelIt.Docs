import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("webflasher", Path(__file__).parents[1] / "webflasher.py")
webflasher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(webflasher)


def release(tag, date="2026-10-31T12:00:00Z", prerelease=False, draft=False):
    return {
        "tag_name": tag, "published_at": date, "prerelease": prerelease, "draft": draft,
        "assets": [{"name": f"firmware_{tag}_ESP32_ulanzi{suffix}.bin"}
                   for suffix in ("", ".full-upgrade")],
    }


class WebflasherTests(unittest.TestCase):
    def test_release_selection_uses_publication_dates_across_pages(self):
        stable = release("v2.6.0")
        first = [release("v3.0.0-beta", "2024-01-01T00:00:00Z", True)] * 100
        beta = release("v2.7.0-beta.10", prerelease=True)
        second = [beta, release("v2.7.0-beta.9", "2026-10-30T00:00:00Z", True),
                  release("v9.0.0-beta", "2027-01-01T00:00:00Z", True, True),
                  release("v9.0.0-testing", "2027-01-01T00:00:00Z", True)]
        def fetch(url):
            return stable if url.endswith('/latest') else (first if url.endswith('page=1') else second)
        self.assertEqual(webflasher.latest_releases(fetch), (stable, beta))

    def test_stable_only_when_no_beta_exists(self):
        stable = release("v2.6.0")
        self.assertEqual(webflasher.latest_releases(lambda url: stable if url.endswith('/latest') else []),
                         (stable, None))

    def test_generation_filters_options_and_preserves_historical_assets(self):
        stable = release("v2.6.0")
        beta = release("v2.7.0-beta.10", prerelease=True)
        old = release("v3.0.0-beta", prerelease=True)
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'firmware').mkdir()
            for item in (stable, beta, old):
                for asset in item['assets']:
                    (root / 'firmware' / asset['name']).touch()
            with patch.object(webflasher, 'ROOT', root), patch.object(webflasher, 'latest_releases', return_value=(stable, beta)):
                webflasher.main()
            entries = json.loads((root / 'meta.json').read_text())
            self.assertEqual([entry['version'] for entry in entries], ['v2.6.0'] * 2 + ['v2.7.0-beta.10'] * 2)
            self.assertTrue(all(entry['beta'] for entry in entries[2:]))
            self.assertEqual({entry['full-upgrade'] for entry in entries[:2]}, {False, True})
            self.assertEqual(len(list((root / 'manifest').glob('*.json'))), 6)
            self.assertEqual(len(list((root / 'firmware').glob('*.bin'))), 6)
            for entry in entries:
                manifest = json.loads((root / 'manifest' / entry['manifest']).read_text())
                self.assertTrue((root / 'manifest' / manifest['builds'][0]['parts'][0]['path']).exists())

    def test_missing_assets_fail_instead_of_offering_older_release(self):
        with self.assertRaises(ValueError):
            webflasher.select_firmware([], (release("v2.6.0"), None))

    def test_all_existing_filenames_remain_supported(self):
        for path in (webflasher.ROOT / 'firmware').glob('*.bin'):
            with self.subTest(filename=path.name):
                entry = webflasher.firmware_data(path.name)
                self.assertEqual(entry['manifest'], path.name.replace('firmware_', 'manifest_', 1).replace('.bin', '.json'))
                self.assertEqual(entry['full-upgrade'], path.name.endswith('.full-upgrade.bin'))


if __name__ == '__main__':
    unittest.main()
