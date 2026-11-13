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


## Logs and diagnostics

Dashboard logs and the serial monitor show events as `[timestamp] component: message`. The WebSocket form is `{"log":{"timeStamp":"2026-11-13T12:00:00","function":"MQTTreconnect","message":"MQTT connected!"}}`. This is an illustrative example, not a new device measurement. Timestamps use the device clock; check NTP/time configuration if they are wrong. `function` names the reporting component, not a separate API command.

### Normal connection and command messages

| Component / example | Meaning and action |
| :--- | :--- |
| `MQTTreconnect: MQTT connecting to broker...` followed by `MQTT connected!` | Normal MQTT connection. Repeated failures require checking WiFi, broker address, port and credentials. |
| `WebSocketEvent: [0] Connected from ... url: ...` / `[0] Disconnected!` | A browser or integration connected/disconnected. The number is a client slot, not a device ID. Occasional reconnects are normal; repeated reconnects require checking reachability of port 81, network stability and competing viewers. |
| `HandleScreen: Incoming JSON length: ...` | Serialized length of the parsed HTTP screen object, in bytes. It is not the original HTTP body size. |
| `SetConfig: Incoming JSON length: ...` | Serialized length of the parsed configuration object. A save/restart can disconnect the WebUI. |
| `MQTT_callback: Incoming JSON (Topic: pixelit/PixelIt/setScreen, Cmd: setScreen, Bytes: A/B)` | `Topic` is the received MQTT topic; `Cmd` is the extracted command. `A` is the byte length passed to the application callback; `B` is the parsed object's compact serialized byte length. |
| `WebSocketEvent: Incoming JSON (Length: A/B)` | Received application length versus parsed serialized length, in bytes. This is not an animation frame counter. |
| `SleepScreen: Sleeping...` / `Waking up...` | Display state changed; the network device remains active. |
| `Buttons: ... is now true/false` | Debounced physical button state. Gesture events are separate MQTT events. |

Transport compaction may already have happened before the MQTT callback, and animation packing occurs before JSON parsing. Serialization also removes whitespace. Therefore `Bytes: A/B` is **not** a direct wire-size/compacted-size pair; equal values do not prove that no compaction occurred.

### Rejections and receive diagnostics

`Invalid animation data`, `JSON message empty or too long` and `Invalid JSON or insufficient memory` indicate rejection, rather than successful playback. Check JSON syntax, RGB565 values, exact pixels per frame, frame count and the [device budgets](api.html#bitmap-animation). Send uploads sequentially. Do not retry oversized data continuously.

For one diagnostic snapshot, open `http://<device-ip>/api/animationinfo`. Avoid frequent polling during playback, particularly on ESP8266. This endpoint returns timing and the latest receive statistics:

| Field | Unit / scope |
| :--- | :--- |
| `animationDelay` | Requested animation frame interval, milliseconds. |
| `animationRenderedFrames` | Rendered-frame count for the loaded animation. |
| `animationMaxFrameGap` | Largest measured frame gap for the loaded animation, milliseconds. Compare with `animationDelay` under the actual workload. |
| `animationFailedLedFrames` | Failed LED-transfer count; meaningful transfer instrumentation is ESP8266-specific. ESP32 zero does not prove physical LED delivery. |
| `ledFramesSent`, `ledFrameRetries` | ESP8266 LED transfer counters since boot. |
| `slowestTask`, `slowestTaskMillis` | Slowest recorded background task and its duration in milliseconds. |
| `mqttWork` | Callback, screen, status, reconnect and discovery durations in milliseconds, useful for attributing MQTT delays. |
| `httpUploadInputBytes`, `httpUploadCompactBytes` | Input and compacted bytes recorded for the latest HTTP upload. |
| `httpUploadMinHeap`, `httpUploadMinBlock` | Minimum observed free heap and largest contiguous free block during HTTP reception, in bytes; not a complete device-wide peak-memory measurement. |
| `httpUploadStatus` | Latest HTTP upload receive status. |
| `mqttReceive`, `webSocketReceive` | `messages` (receive count), `status`, `inputBytes` (incoming transport payload size), `compactBytes` (stored compacted length), `freeHeap` and `maxBlock` (bytes at the recorded receive snapshot). These are not historical heap minima. |

Receive status values use HTTP-style meanings even inside MQTT/WebSocket diagnostics:

| Status | Meaning / next step |
| :--- | :--- |
| `200` | Reception succeeded. Also check the application acknowledgement: parsing/render validation can still reject a command. |
| `400` | Invalid or incomplete transport JSON; check message structure and delivery. |
| `406` | Invalid animation data/compaction failure; check dimensions, pixels and frame budgets. |
| `408` | Receive timeout; check connection quality and the sending client. |
| `413` | Wire size exceeded; reduce the message. |
| `503` | Insufficient receive memory; stop concurrent uploads/viewers and retry once the load has cleared. |

For example, `"mqttReceive":{"status":200,"inputBytes":10809,"compactBytes":5400}` would describe a successfully received, compacted message; these numbers are illustrative. A `413` or `503` is a failure even if an older animation remains visible. Successful WebSocket screen commands reply with `{"response":"OK"}`; rejections return a descriptive `response`. HTTP callers should inspect both status and response body.

### ESP32 network and preview diagnostics

The same endpoint exposes `network` on ESP32. `wifiDisconnects` and `wifiGotIP` count events since boot; `wifiLastReason` is the framework disconnect reason code. `wifiLastDisconnectMillis` and `wifiLastGotIPMillis` are uptime timestamps in milliseconds. `wifiStatus` is the framework WiFi status code.

`mqttMaxLoopMillis` and `mqttMaxConnectMillis` retain the largest observed durations. Calls lasting at least 250 ms increment `mqttSlowLoops` or `mqttSlowConnects`; `mqttLastSlowMillis`, `mqttLastSlowDuration`, `mqttLastSlowState` and `mqttLastSlowWasConnect` identify the most recent slow call. `mqttLastSlowState` is the MQTT client's state code, not a receive HTTP status.

`webSocketSend` records failures with `client` (slot), `status` and `error` (transport/framework codes). `previewSubscribers` counts active preview subscriptions. These snapshots reset on reboot. A single slow event does not establish the root cause: correlate increasing counters, uptime, WiFi conditions and broker logs.

If only Liveview stutters, compare the physical display and frame diagnostics. Hidden pages intentionally stop previews, and slow clients can skip preview images. Close extra viewers and reconnect. If the physical animation also stalls, record `animationMaxFrameGap`, the slowest task, MQTT timing and ESP8266 heap/block values during a representative workload. Include the board, firmware version, minimal payload and diagnostic snapshot in a bug report; redact credentials and private addresses.

Source: the 3.0.0 candidate at [firmware commit d2d7f2f](https://github.com/pixelit-project/PixelIt/tree/d2d7f2fecf9987fddebb61bb978dc6b153a1178b), especially `src/Logging.cpp`, `src/Api.cpp`, `src/TransportReceive.cpp`, `src/HttpScreenUpload.cpp` and `src/NetworkDiagnostics.cpp`.

## Support

::: tip
Find the project forum, Telegram and Discord links under [Support](/#support). Include your board, firmware version, integration version and a minimal example when reporting a problem.
:::
