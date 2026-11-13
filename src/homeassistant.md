---
collapsable: false
sidebarDepth: 2
---

# Home Assistant

Connect PixelIt through the [PixelIt custom integration](#pixelit-custom-integration) for direct control, playlists and liveview, or through Home Assistant's built-in [MQTT integration](https://www.home-assistant.io/integrations/mqtt/) for firmware MQTT discovery and screen commands. Both options are described below; Node-RED is optional.

## PixelIt custom integration

The [PixelIt integration](https://github.com/pixelit-project/ha-pixelit) connects Home Assistant directly to the display over WebSocket, without an MQTT broker. It uses the WebSocket control and liveview interface available in stable PixelIt firmware **3.0.0**. Home Assistant **2025.10 or newer** is required.

It provides display power and brightness controls, messages, saved screens, playlists, temporary alerts and a dashboard card mirroring the physical display. Sensor readings depend on the installed hardware; diagnostic entities are disabled initially. The liveview card receives its data through Home Assistant, so it also works through your existing remote Home Assistant access.

### Installation

1. In HACS, add `https://github.com/pixelit-project/ha-pixelit` as a **custom repository**, with type **Integration**, and install PixelIt.
2. Restart Home Assistant.
3. Open **Settings > Devices & services > Add integration > PixelIt**.
4. Enter the PixelIt IP address and matrix width and height (for example, `32` × `8`).
5. Add the PixelIt card to your dashboard and select the matching Liveview sensor. With one display, the card editor preselects its sensor.

Home Assistant must be able to reach PixelIt's WebSocket server on port **81**. MQTT and MQTT discovery are not required for this integration.

For manual installation, copy `custom_components/pixelit/` from the integration repository into Home Assistant's `config/custom_components/`, restart Home Assistant and continue with step 3.

The dashboard resource is registered automatically when resources are managed in storage mode. For YAML-managed resources, add `/pixelit/pixelit-card.js` with type `module`. New cards use `custom:pixelit-card`; see the [integration README](https://github.com/pixelit-project/ha-pixelit#configuration) for card options. To change the address or matrix dimensions later, choose **Reconfigure** on the integration entry.

### Display control and actions

Use the integration's **Display** light entity for power and brightness. In **Developer tools > Actions**, select a PixelIt action and choose your display. The action forms provide text, color and optional gallery icon controls; screen JSON is not required.

For YAML automations, replace `light.your_pixelit_display` with the entity created by this integration. This example shows a message until another command replaces it and stops an active playlist:

```yaml
action: pixelit.show_message
target:
  entity_id: light.your_pixelit_display
data:
  message: "Hello Home Assistant"
  color: "#00FF00"
  large_font: false
```

For an animated Gallery icon, add `icon: 42` (replace 42 with your Gallery ID).
Under **Advanced options**, `icon_animation_delay` sets milliseconds between frames
(default 100), `icon_rubberbanding: true` plays forwards and backwards (default
false), and `icon_limit_loops` limits playback to a positive number of loops
(default 0, repeating indefinitely). The loop limit accepts integers up to
2,147,483,647. These options also work for saved screens and alerts, have no effect
on static icons, and do not change screen or alert duration. In an advanced
`bitmapAnimation` object, the corresponding firmware fields are `animationDelay`,
`rubberbanding` and `limitLoops`.

For a temporary notification, use `pixelit.show_alert` instead:

```yaml
action: pixelit.show_alert
target:
  entity_id: light.your_pixelit_display
data:
  message: "Washing machine finished"
  duration: 10
  color: "#00FF00"
```

After ten seconds, the integration resumes its playlist or restores its last managed content. If neither exists, it returns to the clock. Home Assistant must keep running for this automatic return; content sent by another controller cannot be restored automatically. Optional gallery icons require internet access to download their bitmap data.

| Action | Purpose |
| :--- | :--- |
| `pixelit.set_screen` | Save a named screen with a message or clock and a display duration. |
| `pixelit.set_playlist` | Start rotation through saved screen names supplied in `screens`. |
| `pixelit.show_screen` | Show a saved screen by `name` and stop rotation. |
| `pixelit.stop_playlist` | Stop rotation and leave the current content visible. |

Saved screens and playlists survive a Home Assistant restart. Rotation pauses while the display is off or disconnected. See the [integration examples](https://github.com/pixelit-project/ha-pixelit#rotate-between-displays) for a complete playlist setup and the [technical reference](https://github.com/pixelit-project/ha-pixelit/blob/main/docs/technical-reference.md) for advanced options.

MQTT can remain enabled, but its discovered entities are separate. Avoid running playlists from Home Assistant and Node-RED on the same display simultaneously.

### Upgrading from PixelIt Liveview

The previous `pixelit_liveview` integration requires a manual migration to the `pixelit` domain. Note your host, dimensions and entity IDs before removing the old entry and component. Install the new integration, restart Home Assistant, add PixelIt again and reassign entities in cards and automations. Update message actions to `pixelit.show_message`. Follow the [upstream migration instructions](https://github.com/pixelit-project/ha-pixelit#upgrading-from-pixelit-liveview), including dashboard resource changes.

### Troubleshooting the custom integration

- **Cannot connect:** Check the configured IP address and that Home Assistant can reach port 81 on the display. MQTT broker settings do not affect this connection.
- **Card is empty or shows the wrong display:** Check its selected Liveview sensor and the dashboard resource URL, especially after migrating from PixelIt Liveview.
- **Content changes unexpectedly:** Check for another controller or playlist writing to the same display.

The sections below describe the alternative built-in MQTT connection. Its discovery configuration is independent of the custom integration.

## Setup

These steps use Home Assistant's built-in MQTT integration.

1. Set up an MQTT broker reachable by both Home Assistant and PixelIt. See Home Assistant's [broker setup instructions](https://www.home-assistant.io/integrations/mqtt/#setting-up-a-broker).
2. In Home Assistant, open **Settings > Devices & services**, add **MQTT**, and connect it to that broker. Keep MQTT discovery enabled with the discovery prefix `homeassistant`; PixelIt 3.0.0 uses this fixed discovery prefix.
3. Open the PixelIt [Webinterface](webinterface.html#options). Under **Options > MQTT**, enable MQTT and enter the broker address, port and credentials. Use an address reachable from PixelIt, not `localhost`.
4. Enable Home Assistant discovery (`mqttHAdiscoverable`); it always enables per-device topics in 3.0.0, even if `mqttUseDeviceTopic` was disabled. Give each PixelIt a unique hostname. The default master topic is `pixelit/`, including the trailing slash.
5. Save the settings and let PixelIt restart. On its MQTT connection, it publishes retained discovery messages under `homeassistant/`.
6. Open the MQTT integration's device list in Home Assistant and find your PixelIt. Check the entities created for it before using them in automations; entity IDs depend on your installation.

Discovery and per-device topics are enabled by default in firmware 3.0.0, but MQTT itself must be enabled and configured.

## Discovered entities

The firmware advertises the following entities. Sensor availability depends on the installed hardware and on Home Assistant accepting the discovery payload.

| Entity | Purpose / condition |
| :--- | :--- |
| LED Matrix (light) | Display on/off and brightness. Turning it off leaves the device connected. |
| Automatic brightness | Enable or disable ambient-light brightness control at runtime. |
| Display text, Text color, Text color picker | Prepare a message and choose a HEX/RGB color without interrupting the screen. |
| Text font size, alignment and scrolling | Small/Large; Centered/Left; Auto/Always/Off. |
| Show text | Display the prepared message and wake the matrix; respects an active forced screen. |
| Automatic clock, Clock fallback delay | Persist clock fallback settings; delay is 1–86400 seconds. |
| Firmware | Installed/latest version and release link; read-only, with no install command. |
| Illuminance and installed environmental sensors | Hardware-dependent readings. Temperature discovery follows the configured unit; BME680 gas is resistance in kΩ, not VOC concentration. |
| Button binary sensors and events | Pressed/released state plus gesture events for each enabled button. |
| Diagnostic sensors | WLAN information, uptime (seconds), free heap (bytes) and restart reason; initially disabled. |

### Prepare and show text

Set **Display text**, **Text color** or the native color picker, **Text font size**, **Text alignment** and **Text scrolling**, then press **Show text**. Editing a field stages the next message while the current animation continues. Defaults are white, small font, centered alignment and automatic scrolling. Text is limited to 255 UTF-8 bytes. Prepared text/options are runtime values, reset on reboot and do not write flash. Automatic brightness can override manual brightness.

For MQTT clients, publish plain UTF-8 values to `<MasterTopic>/<hostname>/setTextOptions/text`, `/color`, `/font`, `/alignment` or `/scroll`, and send literal `PRESS` to `<MasterTopic>/<hostname>/showText`. Use literal UTF-8 for umlauts; combined JSON updates do not decode `\uXXXX` escapes. Do not retain commands. `setText` still displays plain text immediately using current options.

### Button events

Event types are `press`, `release`, `single_press`, `double_press` and `long_press`. Buttons are debounced for 30 ms; single clicks wait for the 350 ms double-click window, and a hold of 800 ms produces one long-press event. Local button actions still run on each debounced press. Events are not retained. Filter an event entity's `event_type` attribute; avoid reacting to both `press` and `single_press` unless two actions are intended.

### Availability and migration from 2.x

Discovery always uses `<MasterTopic>/<hostname>/` for commands, status and availability. Each display needs a unique hostname. Existing entity IDs are preserved; discovery and current states are republished after MQTT reconnect, Home Assistant's `homeassistant/status = online` message and configuration updates. Disabled sensors/buttons or discovery remove their retained configurations.

**Breaking change:** if device topics were previously disabled, change automations using the master availability topic to `<MasterTopic>/<hostname>/state`. The payloads are `connected` and `disconnected`; the broker's Last Will now reaches the same device availability topic. Master-topic screen commands still reach all devices sharing that prefix.

The stale-availability, humidity unique-ID and gas-discovery issues from 2.6.0 have been corrected. If old entities remain after upgrading, let discovery republish, inspect retained discovery messages and remove only confirmed obsolete manual/duplicate entities. See [MQTT publishing intervals](api.html#mqtt-publishing-intervals) for sensor update modes.

## Send a screen

With master topic `pixelit/`, hostname `PixelIt` and per-device topics enabled, publish to `pixelit/PixelIt/setScreen`. Replace this topic in every example with your actual prefix and hostname, including capitalization.

The master topic `pixelit/setScreen` still reaches **all** devices subscribed to that prefix, even when per-device topics are enabled. Use the device topic when targeting one display.

In **Developer tools > Actions**, switch to YAML mode and run these actions separately, in order.

First wake the display:

```yaml
action: mqtt.publish
data:
  topic: pixelit/PixelIt/setScreen
  payload: '{"sleepMode":false}'
  qos: 0
  retain: false
```

Then send the text:

```yaml
action: mqtt.publish
data:
  topic: pixelit/PixelIt/setScreen
  payload: '{"text":{"textString":"Hello Home Assistant","bigFont":false,"scrollText":"auto","hexColor":"#FFFFFF","position":{"x":0,"y":1}}}'
  qos: 0
  retain: false
```

Send `sleepMode` separately from screen content. In firmware 3.0.0, a payload containing `sleepMode` skips screen rendering; waking can also restore the previous screen and return before processing other fields. Leave commands unretained so the broker does not replay an old screen whenever PixelIt reconnects.

## Automation example

Create an automation, open its YAML editor and paste this example. It wakes the display at 08:00, shows a message for ten seconds, then selects the internal clock. Adjust the time, text and all three topics. The final clock command replaces the message; this example does not restore the previously displayed screen.

```yaml
alias: PixelIt morning message
description: Show a message, then return to the clock.
triggers:
  - trigger: time
    at: "08:00:00"
conditions: []
actions:
  - action: mqtt.publish
    data:
      topic: pixelit/PixelIt/setScreen
      payload: '{"sleepMode":false}'
      retain: false
  - action: mqtt.publish
    data:
      topic: pixelit/PixelIt/setScreen
      payload: '{"text":{"textString":"Good morning!","bigFont":false,"scrollText":"auto","hexColor":"#FFFFFF","position":{"x":0,"y":1}}}'
      retain: false
  - delay: "00:00:10"
  - action: mqtt.publish
    data:
      topic: pixelit/PixelIt/setScreen
      payload: '{"clock":{}}'
      retain: false
mode: single
```

An active forced screen can temporarily block normal MQTT screen commands. Automatic clock fallback or another controller can also replace your message. Check those settings if content changes earlier than expected. See the [screen API](api.html#screen) for bitmaps, colors, clock options and other payloads.

## Troubleshooting

- **No device appears:** Check that both clients use the same broker, credentials and permitted topics. Home Assistant must use the `homeassistant` discovery prefix. Restart PixelIt to republish discovery after correcting settings.
- **Only some entities appear:** Check installed/enabled hardware, disabled diagnostic entities and the firmware limitations above. Inspect Home Assistant's MQTT logs for rejected discovery messages.
- **No text appears:** Verify the exact hostname and prefix, enable per-device topics, wake the display in a separate message, and check for an active forced screen. Subscribe to `pixelit/PixelIt/#` in the MQTT integration to inspect messages, adapting the prefix and hostname.
- **State is missing or stale:** Inspect the device's `matrixinfo`, `sensor` and `luxsensor` topics. To request fresh matrix information, publish `{"request":true}` to `pixelit/PixelIt/getMatrixinfo`. Firmware 3.0.0 rejects empty query payloads and `{}`. See [MQTT API](api.html#mqtt).

## Sources

- [PixelIt custom integration: installation, configuration, actions and migration](https://github.com/pixelit-project/ha-pixelit)
- [Integration source verified at commit 2539781](https://github.com/pixelit-project/ha-pixelit/tree/2539781261fa23071f65324257d48a48baba0fae/custom_components/pixelit)

- [PixelIt 3.0.0 release notes](https://github.com/pixelit-project/PixelIt/releases/tag/3.0.0)
- [Firmware source used for 3.0.0 preparation](https://github.com/pixelit-project/PixelIt/tree/d2d7f2fecf9987fddebb61bb978dc6b153a1178b): `src/Api.cpp`, `src/Mqtt.cpp`, `src/HAText.cpp` and the Home Assistant discovery helpers in `include/`.
- [Home Assistant MQTT documentation](https://www.home-assistant.io/integrations/mqtt/)
