# Troubleshooting

::: tip
If you solve a problem that is not listed here, share the solution through a pull request or the project support channels.
:::

## Hardware

<a id="the-matrix-keeps-dark-after-flasing-the-firmware"></a>

### The matrix stays dark after flashing the firmware

Check power, common ground, the matrix DIN connection and solder joints. Confirm that the firmware matches your board: Ulanzi uses a different matrix pin from generic ESP32 builds. Check the selected matrix layout, brightness and sleep mode in the WebUI.

### My board is not detected by the computer

Use a USB cable that supports data, try another USB port, and check whether the operating system sees a USB serial device. Install the driver appropriate for the board's USB serial chip if needed. Close serial monitors before flashing, then reset the board and reconnect.

### No sound with DFPlayer Mini

1. Check the supply and common ground, and connect controller TX to DFPlayer RX and controller RX to DFPlayer TX.
2. Confirm the selected RX/TX pins match the wiring. Save and restart after changing pins.
3. Set a non-zero volume in the `0–30` range and test volume and playback with separate commands.
4. Check the microSD card format, file layout and speaker connection against the [DFRobot guide](https://wiki.dfrobot.com/dfr0299).

## Node-RED

### I can't find the PixelIt nodes in Node-RED or there are some missing

Install [`node-red-contrib-pixelit`](https://flows.nodered.org/node/node-red-contrib-pixelit) through **Manage palette → Install**, then restart Node-RED. Version 0.5.3 requires Node.js 22 or newer. Command-line installation is also supported from the Node-RED user directory; see the [official instructions](https://nodered.org/docs/user-guide/runtime/adding-nodes).

<a id="nothing-working-i-cant-see-anything-on-my-pixelit"></a>

### My flow does not display anything on PixelIt

Deploy the flow, configure the device IP in Core for HTTP, or connect Core to an MQTT Out node using `msg.topic`. Check the broker and topic prefix on both ends. Store named screens before starting their playlist. Wake the device before sending a new screen, and inspect Core's status and logs for connection failures.

## Webinterface

### I can't connect to the PixelIt Webinterface

Find the device IP in your router's DHCP client list and open it directly. Check that the browser can reach HTTP port 80 and WebSocket port 81; a loaded page alone does not prove the device connection is working. The firmware hostname defaults to `PixelIt`, but name resolution depends on your network. If you erased the flash or reset WiFi settings, reconnect through the `PIXELIT` access point first.


## Support

::: tip
Find the project forum, Telegram and Discord links under [Support](/#support). Include your board, firmware version, integration version and a minimal example when reporting a problem.
:::
