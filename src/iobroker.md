---
sidebarDepth: 2
---

# ioBroker

The [PixelIt adapter](https://github.com/pixelit-project/ioBroker.pixelit) sends screens from ioBroker and receives device status, button and sensor updates. The examples use adapter version 1.1.4 and the HTTP/WebSocket contracts retained in firmware 3.0.0. The adapter requires Node.js 18 or newer; also meet your ioBroker installation's runtime requirements.

Install the adapter through ioBroker Admin and create an instance. Commands use HTTP port 80 and status updates use WebSocket port 81, so both ports must be reachable from the ioBroker host.

## Basic settings

![](/iobroker_pixelIt_config.png)

- IP address: Enter the PixelIt IP address without `http://` or a path. Save the instance configuration and check `info.connection`.

## Data points

![](/iobroker_pixelIt_datapoints.png)

- **brightness**:
  - Set brightness as a percentage from `0` to `100`.
- **brightness_255**:
  - Set brightness from `0` to `255`.
- **ext_message**:
  - Write a JSON string containing a [screen payload](api.html#screen). Prefer inline pixel arrays for bitmap payloads.
  - Only commands from the endpoint `/api/screen` are accepted!
- **message**:
  - Write text, optionally followed by an RGB color and a gallery ID.
  - The structure looks like this `Miau!;255,255,255;387`.
    - **_Miau!_**: Your text
    - **_255,255,255_**: Color of the text [RGB](https://www.w3schools.com/colors/colors_picker.asp)
    - **_387_**: BMP ID from the [Pixel Gallery](tools.html#pixel-gallery)
- **show_clock**:
  - Sends `{"clock": {}}` to display the device clock.
- **sleep_mode**:
  - Set `true` to sleep or `false` to wake. Send a new screen separately after waking; see [Sleep Mode](api.html#sleep-mode).

Write command states with `ack: false`; acknowledged states are feedback. Automatic brightness control can override a manually requested brightness.

Gallery ID lookups depend on the external gallery service. The adapter's numeric-ID handling in `ext_message` is different from its simple `message` lookup; use inline RGB565 arrays in complex screens instead of relying on numeric `data` IDs. Start with a text-only `message` such as `Hello PixelIt!` to verify device communication independently of the gallery.

The adapter does not provide the Node-RED playlist engine. Use your own ioBroker scheduling logic when rotating screens.
