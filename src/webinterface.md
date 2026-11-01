# Webinterface

The web interface provides you with items [Dashboard](#dashboard), [Options](#options), [Sensor & Buttons](#sensor-buttons), [Test Area](#test-area), [Pixel Gallery](#pixel-gallery) and [Update](#update).

## Demo

You can try the web interface in your browser. The demo is readonly and you can't change any settings. Checkout the demo [here](https://pixelit-project.github.io/PixelIt/webui/)

## Dashboard

System details can be collapsed. Dashboard logs can be filtered and paused.

![](/webinterface_main.png)

## Options

Options and Sensors & Buttons keep separate configuration drafts. Save your edits using the sticky save toolbar, or discard them to return to the saved configuration. The WebUI warns you about unsaved changes.

![](/webinterface_config.png)

### Play sound on boot

If you have a working DFPlayer, you can enable this option to play a sound on boot. The first MP3 (0001.mp3 or similar like [Sound Option 2](api.html#option-2)) on the SD card will be played on boot.

### MQTT

If you have a working MQTT server, you can enable this option to receive messages through a MQTT broker. The REST API remains available at the same time.

Enable Home Assistant discovery in the MQTT options to use Home Assistant to turn on/off the PixelIt and get some status information. To control the PixelIt we recommend [Node-RED](nodered.html).

## Sensor & Buttons

![](/webinterface_sesnors_buttons.png)

## Test Area

![](/webinterface_test.png)

## Pixel Gallery

![](/webinterface_pixel_gallery.png)

## Update

For a manual update, download the firmware for your hardware. The WebUI provides hardware-specific release downloads, image compatibility warnings and a prompt to back up your configuration before uploading. Check these warnings before continuing. The update view shows upload progress and reports reconnect or error status.

For the latest stable firmware, use [GitHub Releases / latest](https://github.com/pixelit-project/PixelIt/releases/latest). An ESP32 first-install image is for a full installation over USB; use the matching OTA image for updates through the WebUI. See [Firmware](firmware.html#flashing-web) for USB installation.

![](/webinterface_update.png)
