// Local images are fetched through browser-owned Blob URLs, never uploaded.
function localFirmwareManifest(file, firmwareURL) {
  if (!file.size || !/\.bin$/i.test(file.name)) {
    throw new Error('Choose a non-empty .bin firmware file.');
  }
  const fullUpgrade = /\.full-upgrade\.bin$/i.test(file.name);
  if (/ESP32/i.test(file.name) && !fullUpgrade) {
    throw new Error('ESP32 requires a .full-upgrade.bin image, not an OTA application file.');
  }
  if (/ESP8266/i.test(file.name) && fullUpgrade) {
    throw new Error('For ESP8266, choose the matching application .bin file.');
  }
  return {
    name: 'PixelIt',
    version: file.name,
    new_install_prompt_erase: true,
    builds: [{
      // ESP Web Tools rejects a connected chip without a matching build.
      chipFamily: fullUpgrade ? 'ESP32' : 'ESP8266',
      parts: [{ path: firmwareURL, offset: 0 }],
    }],
  };
}

if (typeof document !== 'undefined') {
  (() => {
    const input = document.getElementById('localFirmware');
    const installer = document.getElementById('localInstaller');
    const connect = document.getElementById('localConnectButton');
    const status = document.getElementById('localStatus');
    let urls = [];
    let ready = false;
    function releaseURLs() {
      urls.forEach(url => URL.revokeObjectURL(url));
      urls = [];
      installer.manifest = undefined;
      ready = false;
      connect.disabled = true;
    }
    function syncActiveState() {
      const active = installer.hasAttribute('active');
      input.disabled = active;
      connect.disabled = active || !ready;
    }
    new MutationObserver(syncActiveState).observe(installer, {
      attributes: true, attributeFilter: ['active'],
    });
    input.addEventListener('change', async () => {
      releaseURLs();
      status.textContent = '';
      const file = input.files[0];
      if (!file) return;
      try {
        // Check before allocating URLs, and before waiting for the library.
        localFirmwareManifest(file, '');
        status.textContent = 'Preparing local firmware…';
        await customElements.whenDefined('esp-web-install-button');
        if (input.files[0] !== file) return;
        const firmwareURL = URL.createObjectURL(file);
        urls.push(firmwareURL);
        const manifest = localFirmwareManifest(file, firmwareURL);
        const manifestURL = URL.createObjectURL(new Blob([JSON.stringify(manifest)], {
          type: 'application/json',
        }));
        urls.push(manifestURL);
        installer.manifest = manifestURL;
        ready = true;
        syncActiveState();
        status.textContent = `Selected: ${file.name}. Ready for ${manifest.builds[0].chipFamily}. Check that the file matches your board.`;
      } catch (error) {
        releaseURLs();
        status.textContent = error.message;
      }
    });
    window.addEventListener('pagehide', event => {
      // A back/forward-cache entry keeps the selected file and its URLs alive.
      if (!event.persisted) releaseURLs();
    });
  })();
}

if (typeof module !== 'undefined') module.exports = { localFirmwareManifest };
