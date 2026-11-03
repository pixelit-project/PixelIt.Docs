---
collapsable: false
sidebarDepth: 2
---

# Home Assistant

Connect PixelIt to Home Assistant through the built-in [MQTT integration](https://www.home-assistant.io/integrations/mqtt/). PixelIt firmware **2.6.0** provides MQTT discovery for display control and status values. Send text and other screen content with the `mqtt.publish` action; Node-RED is optional.

## Setup

1. Set up an MQTT broker reachable by both Home Assistant and PixelIt. See Home Assistant's [broker setup instructions](https://www.home-assistant.io/integrations/mqtt/#setting-up-a-broker).
2. In Home Assistant, open **Settings > Devices & services**, add **MQTT**, and connect it to that broker. Keep MQTT discovery enabled with the discovery prefix `homeassistant`; PixelIt 2.6.0 uses this fixed discovery prefix.
3. Open the PixelIt [Webinterface](webinterface.html#options). Under **Options > MQTT**, enable MQTT and enter the broker address, port and credentials. Use an address reachable from PixelIt, not `localhost`.
4. Enable Home Assistant discovery (`mqttHAdiscoverable`) and per-device topics (`mqttUseDeviceTopic`). Give each PixelIt a unique hostname. The default master topic is `pixelit/`, including the trailing slash.
5. Save the settings and let PixelIt restart. On its MQTT connection, it publishes retained discovery messages under `homeassistant/`.
6. Open the MQTT integration's device list in Home Assistant and find your PixelIt. Check the entities created for it before using them in automations; entity IDs depend on your installation.

Discovery and per-device topics are enabled by default in firmware 2.6.0, but MQTT itself must be enabled and configured.

## Discovered entities

The firmware advertises the following entities. Sensor availability depends on the installed hardware and on Home Assistant accepting the discovery payload.

| Entity | Purpose / condition |
| :--- | :--- |
| LED Matrix (light) | Turn the display on/off through sleep mode and set brightness. Turning it off leaves the device connected. |
| Illuminance | LDR reading in lx; discovery is advertised even without a usable LDR installation. |
| Temperature and Humidity | Advertised when a temperature sensor is detected. Not all sensor types provide humidity. |
| Pressure | BME280, BMP280 or BME680, in hPa. |
| VOC | Advertised for BME680, but the actual value is gas resistance in kΩ, not a VOC concentration. See the limitations below. |
| Button binary sensors | One for each enabled physical button; reports pressed/released state. |
| Diagnostic sensors | WiFi signal, WiFi quality, CPU frequency, SSID, BSSID and chip ID; advertised as disabled by default. |

The light entity does not create text screens or select their colors. Use screen payloads for that. Automatic brightness control can override a manually selected brightness; see [Brightness](api.html#brightness).

### Firmware 2.6.0 discovery limitations

- Temperature discovery always declares °C. Keep PixelIt configured for Celsius when using this entity; see the [sensor API](api.html#sensor) for unit behavior.
- The humidity discovery payload leaves an unresolved placeholder in its unique ID. Treat humidity discovery as a firmware limitation, especially with multiple devices.
- The BME680 VOC discovery entry pairs a VOC device class with a gas-resistance unit. Home Assistant may reject it. Use the raw `gas` field from the [sensor topic](api.html#sensor) as gas resistance if you configure a sensor manually.
- The MQTT Last Will publishes `disconnected` only on the master-topic state channel, while per-device discovery uses the device-topic state channel. Per-device entities can therefore retain a stale available state after an unexpected disconnect. Do not use availability alone to confirm that a device is online.

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

Send `sleepMode` separately from screen content. In firmware 2.6.0, a payload containing `sleepMode` skips screen rendering; waking can also restore the previous screen and return before processing other fields. Leave commands unretained so the broker does not replay an old screen whenever PixelIt reconnects.

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
- **State is missing or stale:** Inspect the device's `matrixinfo`, `sensor` and `luxsensor` topics. To request fresh matrix information, publish `{"request":true}` to `pixelit/PixelIt/getMatrixinfo`. Firmware 2.6.0 rejects empty query payloads and `{}`. See [MQTT API](api.html#mqtt).

## Sources

- [PixelIt 2.6.0 release notes](https://github.com/pixelit-project/PixelIt/releases/tag/2.6.0)
- [Firmware 2.6.0 source](https://github.com/pixelit-project/PixelIt/blob/2.6.0/src/PixelIt.ino): `MQTTreconnect`, `callback` and `CreateFrames`.
- [Home Assistant MQTT documentation](https://www.home-assistant.io/integrations/mqtt/)
