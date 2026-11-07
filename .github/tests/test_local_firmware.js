const assert = require('assert').strict;
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const source = path.resolve(__dirname, '../../src/.vuepress/public/pixelit_flasher/local-firmware.js');
const { localFirmwareManifest } = require(source);
const image = name => ({ name, size: 1024 });
for (const [name, chip] of [
  ['firmware_v2.6.0_ESP32_ulanzi.full-upgrade.bin', 'ESP32'],
  ['custom.full-upgrade.bin', 'ESP32'],
  ['firmware_v2.6.0_ESP8266_d1_mini.bin', 'ESP8266'],
  ['custom.bin', 'ESP8266'],
]) {
  const manifest = localFirmwareManifest(image(name), 'blob:local-file');
  assert.deepEqual(manifest.builds, [{ chipFamily: chip, parts: [{ path: 'blob:local-file', offset: 0 }] }]);
  assert.equal(manifest.new_install_prompt_erase, true);
}
for (const file of [image('firmware_v2.6.0_ESP32_ulanzi.bin'), image('image.txt'),
  image('firmware_ESP8266_test.full-upgrade.bin'), { name: 'empty.bin', size: 0 }]) {
  assert.throws(() => localFirmwareManifest(file, 'blob:local-file'));
}

(async () => {
  const elements = Object.fromEntries(['localFirmware', 'localInstaller', 'localConnectButton', 'localStatus']
    .map(id => [id, { disabled: true, files: [], addEventListener(event, handler) { this[event] = handler; },
      hasAttribute() { return !!this.active; } }]));
  const urls = new Map();
  const revoked = [];
  let observe;
  let pagehide;
  vm.runInNewContext(fs.readFileSync(source, 'utf8'), {
    document: { getElementById: id => elements[id] }, Blob,
    customElements: { whenDefined: async () => {} },
    MutationObserver: class { constructor(callback) { observe = callback; } observe() {} },
    window: { addEventListener: (event, callback) => { pagehide = callback; } },
    URL: { createObjectURL: value => { const url = `blob:${urls.size}`; urls.set(url, value); return url; },
      revokeObjectURL: url => revoked.push(url) },
  });
  const input = elements.localFirmware;
  const button = elements.localConnectButton;
  const installer = elements.localInstaller;
  input.files = [image('custom.full-upgrade.bin')];
  await input.change();
  assert.equal(button.disabled, false);
  const manifest = JSON.parse(await urls.get(installer.manifest).text());
  assert.equal(manifest.builds[0].chipFamily, 'ESP32');
  assert.equal(urls.get(manifest.builds[0].parts[0].path), input.files[0]);
  installer.active = true; observe();
  assert.equal(input.disabled, true);
  assert.equal(button.disabled, true);
  installer.active = false; observe();
  assert.equal(input.disabled, false);
  input.files = [image('firmware_ESP32_ulanzi.bin')];
  await input.change();
  assert.equal(button.disabled, true);
  assert.equal(installer.manifest, undefined);
  assert.equal(revoked.length, 2);
  input.files = [image('custom.bin')];
  await input.change();
  pagehide({ persisted: true });
  assert.equal(revoked.length, 2);
  pagehide({ persisted: false });
  assert.equal(revoked.length, 4);
  assert.equal(button.disabled, true);
  console.log('Local firmware validation, Blob manifests, URL cleanup and active state: OK');
})().catch(error => { console.error(error); process.exitCode = 1; });
