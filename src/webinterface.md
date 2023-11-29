# Webinterface

The web interface provides you with items [Dashboard](#dashboard), [Options](#options), [Sensor & Buttons](#sensor-buttons), [Test Area](#test-area), [Pixel Gallery](#pixel-gallery) and [Update](#update).

## Demo

You can try the web interface in your browser. The demo is readonly and you can't change any settings. Checkout the demo [here](https://pixelit-project.github.io/PixelIt/webui/)

## Dashboard

![](/webinterface_main.png)

## Options

![](/webinterface_config.png)

### Play sound on boot

If you have a working DFPlayer, you can enable this option to play a sound on boot. The first MP3 (0001.mp3 or similar like [Sound Option 2](api.html#option-2)) on the SD card will be played on boot.

### MQTT

If you have a working MQTT server, you can enable this option to use a MQTT broker for messages instead of the REST API.

If you use MQTT, you can also use the HomeAssistant to turn on/off the PixelIt and get some status information. To control the PixelIt we recommend [Node-RED](nodered.html).

## Sensor & Buttons

![](/webinterface_sesnors_buttons.png)

## Test Area

![](/webinterface_test.png)

## Pixel Gallery

![](/webinterface_pixel_gallery.png)

## Update

![](/webinterface_update.png)
