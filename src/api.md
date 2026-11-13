---
collapsable: false
sidebarDepth: 2
---

# API

Use the HTTP REST API on port 80 or MQTT to control PixelIt. Both interfaces can be active at the same time. This page describes firmware 3.0.0.

::: tip
If you use the [Node-RED](nodered.html) or [ioBroker](iobroker.html) integration, you don't need to use the API directly.
:::

## Interfaces

### REST

HTTP endpoints are listed below. Send screen and configuration payloads as JSON objects using `Content-Type: application/json`.

### MQTT

The default MQTT prefix is `pixelit/` and can be changed in the WebUI. In the examples below, `<MasterTopic>` means the prefix without its trailing slash, so `<MasterTopic>/setScreen` becomes `pixelit/setScreen`. Do not add a second slash.

Enable `mqttUseDeviceTopic` to also address a single device at `<MasterTopic>/<hostname>/setScreen`. Devices using the same master topic receive the same master-topic commands. Home Assistant discovery always enables device topics in 3.0.0, even if `mqttUseDeviceTopic` was disabled. Availability then uses `<MasterTopic>/<hostname>/state`; migrate automations using the master availability topic.

Enable both MQTT and `mqttHAdiscoverable` to make the device discoverable via Home Assistant. See the [Home Assistant guide](homeassistant.html) for setup, available entities and automation examples.

MQTT query topics (`getLuxsensor`, `getMatrixinfo`, `getConfig`) require a non-empty JSON object as their request payload in 3.0.0; empty payloads and `{}` are rejected by the shared parser. Responses are published on the corresponding sensor, matrix-info or config topic.

### WebSocket

The [PixelIt custom integration for Home Assistant](homeassistant.html#pixelit-custom-integration) uses this interface for display control and liveview without an MQTT broker.

The WebUI and ioBroker receive live updates over `ws://<device-ip>:81`. Status messages wrap their data under `sysinfo`, `luxsensor`, `sensor`, `config`, `buttons` or `telemetry`.

Commands use a wrapper, unlike REST and MQTT screen payloads. For example, activate the clock with:

```json
{"setScreen":{"clock":{}}}
```

Prefer compact JSON serialization to stay within the device transport budget. Invalid JSON and insufficient-memory failures are reported to the client. `setConfig` wraps a configuration object and restarts the device after saving. Reset commands are `{"wifiReset":true}` and `{"factoryReset":true}`.

#### Forced screens

To temporarily protect screen content from ordinary incoming screen commands, send a positive `forcedDuration` in milliseconds alongside `setScreen` over WebSocket:

```json
{"forcedDuration":5000,"setScreen":{"text":{"textString":"Alert","bigFont":false,"scrollText":false,"centerText":true,"position":{"x":0,"y":1},"hexColor":"#FFFFFF"}}}
```

This example protects the text for five seconds. The duration applies to text, bitmap, bitmap animation and bar content, not a clock-only command. Another forced screen can replace it. Sleep, brightness, auto-brightness, GPIO and sound controls are processed separately from the content lock. The clock fallback also runs separately; disable automatic fallback if it would interrupt the forced screen.

Expiry only allows new screen commands again; it does not restore the previous screen. `forcedDuration` is a WebSocket wrapper field, not a field supported by REST or MQTT screen payloads.

#### Live matrix view and logs

The firmware also sends these WebSocket messages:

| Message | Payload |
| :------ | :------ |
| `liveview` | A string of six hexadecimal RGB digits per pixel, in row order from the top-left corner. A 32×8 matrix has 256 pixels and 1536 hexadecimal characters. This is RGB888, unlike the RGB565 arrays used by screen commands. |
| `log` | An object containing `timeStamp`, `function` and `message`. Timestamps use the device's current time. |

Liveview sends changed images; animation sampling can run faster than the normal 250 ms interval, bounded to 20 preview samples per second. Slow viewers can skip preview frames while the physical animation continues. On ESP32, preview delivery applies backpressure and disconnects failed clients so they do not block the device. The bundled WebUI pauses previews in hidden tabs and resumes with the current image. Status messages arrive separately during reconnect; clients must accept each wrapper independently. For example, `{"liveview":"..."}` represents the message shape only; replace `...` with the complete pixel string when decoding it. Log messages are emitted as events occur. See [logs and diagnostics](troubleshooting.html#logs-and-diagnostics) for fields, units and receive status codes.

ESP32 advertises `sysinfo.previewControl` and `sysinfo.previewCompact`. Capable clients can pause their own preview with `{"preview":{"enabled":false}}` and resume with `true`. Adding `"compact":true` opts into `liveview64`, a Base64 string of raw RGB888 bytes in the same pixel order. The bundled WebUI expands this before rendering. Clients that do not opt in continue receiving hexadecimal `liveview`. Preview selection resets on reconnect and does not pause the physical matrix.

The `telemetry` message is sent when a WebSocket client connects. The command `{"sendTelemetry":true}` resets the telemetry send timer; an upload follows when telemetry is enabled. See [Telemetry and update notifications](#telemetry-and-update-notifications).

## Endpoints

The following endpoints are available:

| Endpoint | Description | Details |
| :------------- | :------------------------------- | ------------------------------------- |
| `screen` | Show screen on device | [Details](api.html#screen) |
| `brightness` | Get brightness; set via screen | [Details](api.html#brightness-2) |
| `buttons` | Get button states | [Details](api.html#buttons) |
| `luxsensor` | Get lux sensor value | [Details](api.html#lux-sensor) |
| `sensor` | Get sensor values | [Details](api.html#sensor) |
| `state` | Get state (MQTT only) | [Details](api.html#state) |
| `animationinfo` | Get playback and receive diagnostics (HTTP GET) | [Details](troubleshooting.html#logs-and-diagnostics) |
| `matrixinfo` | Get matrix info | [Details](api.html#matrix-information) |
| `config` | Get or set config | [Details](api.html#matrix-config) |
| `wifireset` | WiFi reset | [Details](api.html#wifi-reset) |
| `factoryreset` | Reset device to factory defaults | [Details](api.html#factory-reset) |

## Screen

Send one screen payload to `/api/screen` or `<MasterTopic>/setScreen`. Fields such as `text`, `bitmap` and `clock` describe the screen; `brightness`, `sleepMode`, `setGpio` and `sound` control device behavior.

::: blue HTTP Endpoint [POST]
/api/screen
:::
::: blue MQTT Topic [PUBLISH]
&lt;MasterTopic&gt;/setScreen
:::

You **must** combine all elements in one call that are to be displayed as one screen.

Example call:
::: details Example call:

#### Calling the internal clock with a fade animation:

```json
{
  "switchAnimation": {
    "aktiv": true,
    "animation": "fade"
  },
  "clock": {
    "switchAktiv": true,
    "withSeconds": false,
    "switchSec": 6,
    "hexColor": "#1E00FF"
  }
}
```

#### Call fade animation, image and text:

```json
{
  "switchAnimation": {
    "aktiv": true,
    "animation": "fade"
  },
  "bitmap": {
    "data": [
      0, 0, 0, 21855, 0, 0, 0, 0, 0, 0, 0, 21855, 0, 0, 0, 0, 0, 0, 21855,
      21855, 21855, 0, 0, 0, 0, 0, 21855, 21855, 21855, 0, 0, 0, 0, 693, 1055,
      1055, 65535, 44735, 0, 0, 0, 693, 1055, 65535, 65535, 44735, 0, 0, 0, 693,
      1055, 1055, 65535, 21855, 0, 0, 0, 0, 693, 1055, 21855, 0, 0, 0
    ],
    "position": {
      "x": 0,
      "y": 0
    },
    "size": {
      "width": 8,
      "height": 8
    }
  },
  "text": {
    "textString": "59%",
    "bigFont": false,
    "scrollText": false,
    "scrollTextDelay": 0,
    "centerText": true,
    "position": {
      "x": 7,
      "y": 1
    },
    "hexColor": "#1E00FF"
  }
}
```

:::

### Text

---

The following special characters are supported:
`€ ← ↑ → ↓ ★ ♥ ↧ 🚗 😀 📁 📄`
![](/special_characters.png)

```json
{
  "text": {
    "textString": "Test It :D",
    "bigFont": false,
    "scrollText": "auto",
    "scrollTextDelay": 20,
    "centerText": false,
    "position": {
      "x": 8,
      "y": 1
    },
    "color": {
      "r": 255,
      "g": 255,
      "b": 255
    },
    "hexColor": "#FFFFFF"
  }
}
```

| Parameter | Type | Values | Description |
| :---------------- | :----------------- | :----------------------------- | :-------------------------------------- |
| `textString` | `String` |  | **Required**. Displayed Text |
| `bigFont` | `Boolean` | `false / true` | `false`: small text; `true`: large text |
| `scrollText` | `Boolean / String` | `true / false / auto` | Enable scrolling; `auto` scrolls long text |
| `scrollTextDelay` | `Integer` | Positive milliseconds | Optional delay in milliseconds; otherwise uses `scrollTextDefaultDelay` |
| `centerText` | `Boolean` | `true / false` | Include an explicit value for predictable rendering |
| `position` | `JSON` | `{"x":8, "y":1}` | Include an explicit value for predictable rendering |
| `color` | `JSON` | `{"r":255, "g":255, "b":255}` | Use this or `hexColor` |
| `hexColor` | `String` | `#FFFFFF` | Alternative to `color` |

Use JSON booleans (`false` or `true`) for `text.bigFont`, without quotation marks. Configure the internal clock fonts separately using `fatFont` and `largeFont`; see [Clock](#clock).

### Sleep Mode

---

Send `sleepMode` through the screen endpoint to turn the display off or on. While asleep, the device does not render new screen content. A message containing `sleepMode` also skips new screen content, even when its value is `false`.

To wake the display and show a new screen, first send `{"sleepMode": false}`, then send the new screen in a separate request without `sleepMode`. Waking restores the last saved screen when one is available.

Enabling `sleepMode` turns off the matrix display; it does not put the ESP8266 or ESP32 into deep sleep.

```json
{
  "sleepMode": false
}
```

| Parameter | Type | Values | Description |
| :---------- | :-------- | :------------- | :------------------------------------------------------------ |
| `sleepMode` | `Boolean` | `true / false` | When active `sleepMode` disables the rendering of new screens |

### Brightness

---
Set the display brightness while awake. Automatic brightness control can change it again; use the configuration API to save a persistent setting.

```json
{
  "brightness": 125
}
```

| Parameter | Type | Values | Description |
| :----------- | :-------- | :-------- | :------------------ |
| `brightness` | `Integer` | `0 - 255` | Sets the brightness |

### Auto-Brightness

---
Enable or disable automatic brightness control without saving the configuration.

```json
{
  "autobrightness": false
}
```

| Parameter | Type | Values | Description |
| :----------- | :-------- | :-------- | :------------------ |
| `autobrightness` | `Boolean` | `true / false` | Temporary enable/disable the auto brightness feature |


### Switch Animation

---

```json
{
  "switchAnimation": {
    "aktiv": true,
    "animation": "fade"
  }
}
```

#### Call bitmapWipe example

```json
{
  "switchAnimation": {
    "aktiv": true,
    "animation": "bitmapWipe",
    "data": [65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535],
    "width": 1
  }
}
```

| Parameter | Type | Values | Description |
| :---------- | :-------------- | :--------------------------------------------------------- | :---------------------------------------------------------- |
| `aktiv` | `Boolean` | `true / false` |  |
| `animation` | `String` | `fade / coloredBarWipe / zigzagWipe / bitmapWipe / curtain / pixelDissolve / slide / blinds / crt / glitch / verticalSlide / random` | [bitmapWipe call example](api.html#call-bitmapwipe-example) |
| `data` | `Integer Array` | `RGB565 pixel values` | **Required for bitmapWipe**; provide `width × 8` RGB565 values |
| `width` | `Integer` | `1 - 32` | **Required for bitmapWipe** height always needs to be 8 |

With new screen content, `random` chooses among Fade, Colored Bar Wipe, Zigzag Wipe, Curtain, Pixel Dissolve, Slide, Blinds, CRT, Glitch and Vertical Slide. An effect-only request without new content randomly selects one of the three legacy effects: Fade, Colored Bar Wipe or Zigzag Wipe. Bitmap Wipe requires caller-supplied pixels and is excluded from random selection.

### Clock

---

An object such as `{"clock": {}}` activates the device clock. The legacy `show` field is ignored in 3.0.0. Omitted clock options retain their current settings. Send text or bitmap content to replace the clock display.

```json
{
  "clock": {
    "switchAktiv": true,
    "withSeconds": true,
    "switchSec": 5,
    "drawWeekDays": true,
    "color": {
      "r": 255,
      "g": 255,
      "b": 255
    },
    "hexColor": "#FFFFFF"
  }
}
```

| Parameter | Type | Values | Description |
| :------------- | :-------- | :----------------------------- | :------------------------------------------------------------------------- |
| `switchAktiv` | `Boolean` | `true / false` | Switch clock/date |
| `switchSec` | `Integer` | Positive seconds | Interval between clock/date changes; used when switching is enabled |
| `withSeconds` | `Boolean` | `true / false` | Show seconds |
| `blinkAnimated` | `Boolean` | `true / false` | Animate the clock separator |
| `fatFont` | `Boolean` | `true / false` | Select the fat clock font |
| `largeFont` | `Boolean` | `true / false` | Select the large clock font |
| `drawWeekDays` | `Boolean` | `true / false` | Draw weekdays |
| `color` | `JSON` | `{"r":255, "g":255, "b":255}` | RGB color (or `hexColor`) |
| `hexColor` | `String` | `#FFFFFF` | Alternative to `color` |

### Bitmap

---

Provide one RGB565 integer per pixel, in row order (`width × height` values). The example is a solid white 8×8 bitmap.

```json
{
  "bitmap": {
    "data": [
      65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
      65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
      65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
      65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
      65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
      65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
      65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
      65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535
    ],
    "position": {
      "x": 0,
      "y": 0
    },
    "size": {
      "width": 8,
      "height": 8
    }
  }
}
```

| Parameter | Type | Values | Description |
| :--------- | :-------------- | :------------------------ | :----------- |
| `data` | `Integer Array` | `RGB565 pixel values` | **Required** |
| `position` | `JSON` | `{"x":0, "y":0}` | **Required** |
| `size` | `JSON` | `{"width":8, "height":8}` | **Required** |

### Bitmaps

---

Use `bitmaps` to display multiple static bitmaps on one screen. Each bitmap needs `width × height` RGB565 values.
::: warning Limitations
When displaying multiple bitmaps, animated bitmaps, scrolling or text are not supported!
:::

```json
{
  "bitmaps": [
    {
      "data": [
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535
      ],
      "position": {
        "x": 0,
        "y": 0
      },
      "size": {
        "width": 8,
        "height": 8
      }
    },
    {
      "data": [
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535
      ],
      "position": {
        "x": 8,
        "y": 0
      },
      "size": {
        "width": 8,
        "height": 8
      }
    },
    {
      "data": [
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535
      ],
      "position": {
        "x": 16,
        "y": 0
      },
      "size": {
        "width": 8,
        "height": 8
      }
    },
    {
      "data": [
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535
      ],
      "position": {
        "x": 24,
        "y": 0
      },
      "size": {
        "width": 8,
        "height": 8
      }
    }
  ]
}
```

| Parameter | Type | Values | Description |
| :--------- | :-------------- | :------------------------ | :----------- |
| `data` | `Integer Array` | `RGB565 pixel values` | **Required** |
| `position` | `JSON` | `{"x":0, "y":0}` | **Required** |
| `size` | `JSON` | `{"width":8, "height":8}` | **Required** |

### Bitmap Animation

---

Each frame contains exactly `width × height` RGB565 integers from 0 to 65535, in row order. The default size is 8×8. Set `size: {"width":32,"height":8}` for a full-display animation with 256 values per frame. Dimensions must fit the display.

| Device | Maximum frames at 8×8 | Maximum frames at 32×8 | Total pixel budget |
| :--- | ---: | ---: | ---: |
| ESP8266 | 28 | 7 | 1,792 |
| ESP32 | 160 | 40 | 10,240 |

Both frame count and total pixels must fit. Invalid, empty or oversized animations are rejected rather than truncated. RGB565 value `2` is valid pixel data. See the complete [32×8 example](https://github.com/pixelit-project/PixelIt/blob/3.0.0/examples/animation-32x8.json).

ESP8266 HTTP bodies and WebSocket commands are limited to 12,288 bytes; MQTT packets including topic and overhead must fit 11,264 bytes. ESP32 has a 65,535-byte wire limit for these transports. Metadata and available contiguous heap can limit uploads further. Send large transfers sequentially and avoid repeated uploads during playback. The WebUI uses device-advertised budgets and validates again before sending.

The following example cycles through white, blue and red.

```json
{
  "bitmapAnimation": {
    "data": [
      [
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535,
        65535, 65535, 65535, 65535, 65535, 65535, 65535, 65535
      ],
      [
        31, 31, 31, 31, 31, 31, 31, 31,
        31, 31, 31, 31, 31, 31, 31, 31,
        31, 31, 31, 31, 31, 31, 31, 31,
        31, 31, 31, 31, 31, 31, 31, 31,
        31, 31, 31, 31, 31, 31, 31, 31,
        31, 31, 31, 31, 31, 31, 31, 31,
        31, 31, 31, 31, 31, 31, 31, 31,
        31, 31, 31, 31, 31, 31, 31, 31
      ],
      [
        63488, 63488, 63488, 63488, 63488, 63488, 63488, 63488,
        63488, 63488, 63488, 63488, 63488, 63488, 63488, 63488,
        63488, 63488, 63488, 63488, 63488, 63488, 63488, 63488,
        63488, 63488, 63488, 63488, 63488, 63488, 63488, 63488,
        63488, 63488, 63488, 63488, 63488, 63488, 63488, 63488,
        63488, 63488, 63488, 63488, 63488, 63488, 63488, 63488,
        63488, 63488, 63488, 63488, 63488, 63488, 63488, 63488,
        63488, 63488, 63488, 63488, 63488, 63488, 63488, 63488
      ]
    ],
    "animationDelay": 20,
    "rubberbanding": false,
    "limitLoops": 0
  }
}
```

| Parameter | Type | Values | Description |
| :--------------- | :------------------------ | :---------------------------------------- | :--------------------------------------------- |
| `data` | `Array of Integer Arrays` | One array of `width × height` RGB565 values per frame | See device budgets above |
| `size` | `JSON` | `{"width":8,"height":8}` | Optional; defaults to 8×8 |
| `animationDelay` | `Integer` | Milliseconds | **Required** Higher is a slower animation |
| `rubberbanding` | `Boolean` | `true / false` | Should the animation run back and forth |
| `limitLoops` | `Integer` | `0` or a positive count | `0` repeats indefinitely; a positive value limits playback |
| `position` | `JSON` | `{"x":0, "y":0}` | Position |

### Bar

---

```json
{
  "bar": {
    "position": {
      "x": 0,
      "y": 0,
      "x2": 0,
      "y2": 0
    },
    "color": {
      "r": 255,
      "g": 255,
      "b": 255
    },
    "hexColor": "#FFFFFF"
  }
}
```

| Parameter | Type | Values | Description |
| :--------- | :------- | :------------------------------- | :-------------------------------------- |
| `position` | `JSON` | `{"x":0, "y":0,"x2":1, "y2":7}` | Include an explicit value for predictable rendering |
| `color` | `JSON` | `{"r":255, "g":255, "b":255}` | RGB color (or `hexColor`) |
| `hexColor` | `String` | `#FFFFFF` | Alternative to `color` |

### Bars

---

Here you can pass an array of bars to draw several on one screen.

```json
{
  "bars": [
    {
      "position": {
        "x": 0,
        "y": 0,
        "x2": 0,
        "y2": 0
      },
      "color": {
        "r": 255,
        "g": 255,
        "b": 255
      },
      "hexColor": "#FFFFFF"
    }
  ]
}
```

| Parameter | Type | Values | Description |
| :--------- | :------- | :------------------------------- | :-------------------------------------- |
| `position` | `JSON` | `{"x":0, "y":0,"x2":1, "y2":7}` | Include an explicit value for predictable rendering |
| `color` | `JSON` | `{"r":255, "g":255, "b":255}` | RGB color (or `hexColor`) |
| `hexColor` | `String` | `#FFFFFF` | Alternative to `color` |

### Set GPIO

`gpio` is the GPIO number, not a D1 mini D-label. Select a free output-capable pin that is not used by the matrix, sensors or flash. Up to four GPIO reset timers can be active. Without `duration`, the output remains at the requested level.

```json
{
  "setGpio": {
    "gpio": 14,
    "set": true,
    "duration": 500
  }
}
```

| Parameter | Type | Values | Description |
| :--------- | :-------- | :------------- | :------------------------------------------- |
| `gpio` | `Integer` | `E.g. 14` | **Required** GPIO of the ESP |
| `set` | `Boolean` | `true / false` | **Required** |
| `duration` | `Integer` | Positive milliseconds | Optional timeout after which the GPIO is set LOW |

### Sound

---

A DFPlayer Mini must be connected and configured. Firmware supports `play`, `pause`, `next` and `previous`; it does not implement `stop`. Volume and playback changes are more reliable as separate requests on some modules.

#### Option 1

Supply `folder` and `file` to call the DFPlayer library's folder-play command. Use numbered directories and files, for example `01/001.mp3`. Do not rely on `next` and `previous` to remain within that folder.

```json
{
  "sound": {
    "volume": 20,
    "control": "play",
    "folder": 1,
    "file": 1
  }
}
```

| Parameter | Type | Values | Description |
| :-------- | :-------- | :------------- | :----------- |
| `volume` | `Integer` | `0 - 30` | Optional volume setting |
| `control` | `String` | `play / pause` | Required for playback commands; omit for volume-only changes |
| `folder` | `Integer` | `1 - 99` | **Required** |
| `file` | `Integer` | `1 - 255` | Required for `play` |

#### Option 2

Omit `folder` (or use `0`) to select a track using the library's `play(file)` command. This uses the DFPlayer's track index, which can depend on the order files were copied to the card. It is not the dedicated `/MP3/0001.mp3` folder command. Prepare the card according to the [DFRobot documentation](https://wiki.dfrobot.com/dfr0299). `next` and `previous` use the module's track navigation.

```json
{
  "sound": {
    "volume": 20,
    "control": "play",
    "file": 1
  }
}
```

| Parameter | Type | Values | Description |
| :-------- | :-------- | :------------------------------- | :----------- |
| `volume` | `Integer` | `0 - 30` | Optional volume setting |
| `control` | `String` | `play / pause / next / previous` | Required for playback commands; omit for volume-only changes |
| `file` | `Integer` | `1 - 3000` | Required for `play` |

## Brightness

::: blue HTTP Endpoint [GET]
/api/brightness
:::  
Query the current brightness. To set it, use the [screen brightness field](#brightness). With MQTT, subscribe to `<MasterTopic>/matrixinfo` to get the current brightness.

The response has the following structure:

```json
{
  "brightness_255": 20,
  "brightness": 7,
  "hostname": "PixelIt"
}
```

## Buttons

::: blue HTTP Endpoint [GET]
/api/buttons
:::

The HTTP response has the following structure:

```json
{
  "leftButton": "false",
  "middleButton": "true",
  "rightButton": "false",
  "hostname": "PixelIt"
}
```

::: blue MQTT Topic [SUBSCRIBE]
&lt;MasterTopic&gt;/buttons/#<br />
&lt;MasterTopic&gt;/buttons/button0<br />
&lt;MasterTopic&gt;/buttons/button1<br />
&lt;MasterTopic&gt;/buttons/button2<br />
:::

Each button topic publishes the plain text payload `true` or `false` (without quotes or a JSON object).

## Lux Sensor

::: blue HTTP Endpoint [GET]
/api/luxsensor
:::
::: blue MQTT Topic [PUBLISH]
&lt;MasterTopic&gt;/getLuxsensor
:::
::: blue MQTT Topic [SUBSCRIBE]
&lt;MasterTopic&gt;/luxsensor
:::

The response has the following structure:

```json
{
  "lux": 107.0217,
  "hostname": "PixelIt"
}
```

## Sensor

The example below represents a DHT22 installation. Available readings depend on the detected hardware. Unsupported measurements are the string `"Not installed"`; BME680 read failures can return `"Error while reading"` instead of a number. Validate types before using values in calculations.

Pressure is in hPa, BME680 gas resistance is in kΩ, humidity and battery level are percentages. Temperature uses the configured Celsius/Fahrenheit unit for DHT22, BME280, BMP280 and BME680. In firmware 3.0.0, the SHT31 path reports Celsius even when Fahrenheit is selected.

::: blue HTTP Endpoint [GET]
/api/sensor
:::
::: blue MQTT Topic [SUBSCRIBE]
&lt;MasterTopic&gt;/sensor
:::

The response has the following structure:

```json
{
  "humidity": 40,
  "temperature": 21.5,
  "pressure": "Not installed",
  "gas": "Not installed",
  "battery": "Not installed",
  "hostname": "PixelIt"
}
```

### Legacy sensor aliases

Firmware 3.0.0 retains `GET /api/dhtsensor` as an alias for `/api/sensor`. It also publishes the same sensor JSON on `<MasterTopic>/dhtsensor` and, when enabled, `<MasterTopic>/<hostname>/dhtsensor`. These aliases are for existing integrations; use `sensor` for new integrations. Despite the old name, their payload is not limited to DHT sensors.

## State

The device publishes `connected` on MQTT connection and configures `disconnected` as its Last Will. Both use the master-topic state channel.

::: blue MQTT Topic [SUBSCRIBE]
&lt;MasterTopic&gt;/state
:::

```
disconnected (or connected)
```

<a id="matrix-infomation"></a>

## Matrix Information

::: blue HTTP Endpoint [GET]
/api/matrixinfo
:::
::: blue MQTT Topic [PUBLISH]
&lt;MasterTopic&gt;/getMatrixinfo
:::
::: blue MQTT Topic [SUBSCRIBE]
&lt;MasterTopic&gt;/matrixinfo
:::
Example response from an ESP8266 (values vary by device):

```json
{
  "pixelitVersion": "3.0.0",
  "note": "",
  "hostname": "PixelIt",
  "deviceID": "example-device",
  "buildSection": "ESP8266_d1_mini",
  "freeSketchSpace": 2695168,
  "wifiRSSI": -58,
  "wifiQuality": 84,
  "wifiSSID": "WiFi",
  "ipAddress": "192.168.0.137",
  "currentMatrixBrightness": 20,
  "freeHeap": 29976,
  "sketchSize": 447424,
  "chipID": 13668362,
  "cpuFreqMHz": 80,
  "sleepMode": false,
  "wifiBSSID": "00:11:22:33:44:55",
  "uptime": 120,
  "resetReason": "Power on",
  "matrixsize": {"cols": 32, "rows": 8}
}
```

On ESP32, `chipID` is a string and `sketchSize` is omitted.

## Matrix Config

::: blue HTTP Endpoint [GET]
/api/config
:::
::: blue MQTT Topic [PUBLISH]
&lt;MasterTopic&gt;/getConfig
:::
::: blue MQTT Topic [SUBSCRIBE]
&lt;MasterTopic&gt;/config
:::
The response contains the saved configuration plus `showBatteryBtn`, which indicates whether the board supports the battery button. The following is an excerpt with example values, not a complete response or a list of defaults:

```json
{
  "matrixBrightnessAutomatic": true,
  "mbaDimMin": 20,
  "mbaDimMax": 255,
  "mbaLuxMin": 0,
  "mbaLuxMax": 250,
  "matrixBrightness": 127,
  "matrixType": 2,
  "note": "",
  "hostname": "PixelIt",
  "matrixTempCorrection": "default",
  "ntpServer": "de.pool.ntp.org",
  "clockTimeZone": 1,
  "clockColor": "#FFFFFF",
  "clockSwitchAktiv": true,
  "clockSwitchSec": 7,
  "clockWithSeconds": false,
  "scrollTextDefaultDelay": 100,
  "bootScreenAktiv": false,
  "mqttAktiv": false,
  "mqttUser": "",
  "mqttPassword": "",
  "mqttServer": "0.0.0.0",
  "mqttMasterTopic": "pixelit/",
  "mqttPort": 1883
}
```

::: blue HTTP Endpoint [POST]
/api/config
:::
::: blue MQTT Topic [PUBLISH]
&lt;MasterTopic&gt;/setConfig
:::

Send a JSON object containing the fields you want to change. Omitted fields keep their current values; supplied settings are saved. For example:

```json
{
  "clock24Hours": true,
  "clockAutoFallbackActive": true,
  "clockAutoFallbackTime": 30
}
```

Additional configuration fields available in 3.0.0:

| Fields | Purpose |
| :----- | :------ |
| `temperatureUnit` | `0` for Celsius, `1` for Fahrenheit; see the SHT31 exception under [Sensor](#sensor) |
| `clock24Hours`, `clockDayLightSaving`, `clockDateDayMonth`, `clockDayOfWeekFirstMonday` | Time format, automatic daylight saving, day/month ordering and first weekday |
| `clockAutoFallbackActive`, `clockAutoFallbackTime`, `clockAutoFallbackAnimation` | Return to the clock after screen inactivity; timeout is in seconds |
| `clockBlinkAnimated`, `clockLargeFont`, `clockFatFont`, `clockDrawWeekDays` | Clock appearance |
| `bootBatteryScreen`, `bootSound` | Battery display and sound at startup |
| `mqttUseDeviceTopic`, `mqttHAdiscoverable` | Per-device MQTT topics and Home Assistant discovery |
| `luxOffset`, `temperatureOffset`, `humidityOffset`, `pressureOffset`, `gasOffset` | Sensor reading corrections |
| `dfpRXpin`, `dfpTXpin`, `onewirePin`, `SCLPin`, `SDAPin` | Peripheral pin selections; use the board-specific values from the WebUI |
| `btn0Pin`, `btn0PressedLevel`, `btn0Enabled`, `btn0Action` | Left button configuration; replace `0` with `1` or `2` for the middle or right button |
| `ldrDevice`, `ldrPulldown`, `ldrSmoothing` | Light sensor selection and configuration |
| `initialVolume` | DFPlayer startup volume |
| `sendTelemetry`, `checkUpdateScreen` | Telemetry and update notification options |

HTTP configuration writes restart the device after saving. The WebUI also restarts it after configuration changes. MQTT `setConfig` saves the settings without restarting; restart after changing pins, peripheral selection or connection settings so initialization uses the new configuration.

Button actions are `0` (none), `1` (clock), `2` (toggle sleep), `3` (play/pause), `4` (previous track) or `5` (next track). Use the WebUI to choose valid pins and hardware-dependent settings.

### Matrix layout

Set `matrixType` to match the physical wiring. This selects pixel mapping, not matrix dimensions; released builds remain 32×8.

| Value | Layout |
| :---- | :----- |
| `1` | Column major, top-left origin, zigzag |
| `2` | Row major, top-left origin, zigzag |
| `3` | Four CJMCU 8×8 tiles, column major, bottom-left origin, progressive |
| `4` | MicroMatrix: four 8×8 tiles in one row, top-left origin, row-major zigzag |
| `5` | Four CJMCU 8×8 tiles in one row, top-left origin, row-major progressive |

### Color correction

`matrixTempCorrection` selects LED color correction or a color-temperature profile. It does not correct environmental temperature readings; use `temperatureOffset` for those.

- LED correction profiles: `default` (same as `typicalsmd5050`), `typicalsmd5050`, `typical8mmpixel`.
- Color-temperature profiles: `tungsten40w`, `tungsten100w`, `halogen`, `carbonarc`, `highnoonsun`, `directsunlight`, `overcastsky`, `clearbluesky`, `warmfluorescent`, `standardfluorescent`, `coolwhitefluorescent`, `fullspectrumfluorescent`, `growlightfluorescent`, `blacklightfluorescent`, `mercuryvapor`, `sodiumvapor`, `metalhalide`, `highpressuresodium`.
- Custom RGB correction: a fixed-width string such as `"255,200,150"`. Use three decimal digits for each channel, with commas between channels, and values from `000` to `255`.

Use a listed profile or the exact custom format: unrecognized strings enter the custom RGB parser. Restart after changing the correction so LED initialization applies it.

### Automatic brightness calibration

`matrixBrightnessAutomatic` enables automatic adjustment. `mbaLuxMin` and `mbaLuxMax` define two measured-light reference points; `mbaDimMin` and `mbaDimMax` define the corresponding display brightness values on the 0–255 scale. Use an increasing lux range with distinct endpoints.

For example, this maps 0 lux to brightness 20 and 400 lux to brightness 100:

```json
{"matrixBrightnessAutomatic":true,"mbaLuxMin":0,"mbaLuxMax":400,"mbaDimMin":20,"mbaDimMax":100}
```

The firmware recalculates brightness approximately once per second using an integer linear mapping. Readings outside the lux reference range are extrapolated; the result is clamped only to 0–255. The configured dim reference points are therefore not hard brightness limits. Manual screen brightness can be overwritten by the next automatic adjustment.

For an analog LDR, `ldrDevice` accepts `GL5516`, `GL5528`, `GL5537_1`, `GL5537_2`, `GL5539` or `GL5549`. An unknown name falls back to `GL5528`. `ldrPulldown` is the physical pulldown resistance in ohms; `ldrSmoothing` is passed to the LDR driver's smoothing parameter (firmware initial value `0`). These settings apply to the analog LDR, not BH1750 or MAX44009. Restart after changes. See [LDR wiring](hardware.html#ldr-gl5516).

### Time and clock fallback

`ntpServer` selects the NTP server. `clockTimeZone` is a numeric UTC offset in hours, including fractional offsets, rather than a named time zone. For example, `1` selects UTC+1 before daylight saving is applied.

`clockDayLightSaving` enables the firmware's European-style March-to-October daylight-saving calculation, adding one hour. It is not a worldwide time-zone database. Disable it for regions with different rules and configure the required offset explicitly.

`clockAutoFallbackActive` returns to the internal clock after `clockAutoFallbackTime` seconds without a screen message. `clockAutoFallbackAnimation` selects the transition:

| Value | Transition |
| :---- | :--------- |
| `0` | None |
| `1` | Fade |
| `2` | Colored bar wipe |
| `3` | Zigzag wipe |
| `4` | Random Wipe, which chooses among all ten individually selectable effects |
| `5` | Curtain |
| `6` | Pixel Dissolve |
| `7` | Slide |
| `8` | Blinds |
| `9` | CRT |
| `10` | Glitch |
| `11` | Vertical Slide |

Select the effect in **Options → Clock → Fallback Animation** in the WebUI bundled with this firmware.

`clockDateTransition` selects the clock/date transition using the same values `0`–`11`; `12` is **Auto** (the default). Auto uses Vertical Slide for small clock fonts and a slower Fade for the large clock font. Vertical Slide preserves the weekday row when applicable. Select **Clock/date transition** in Options. This setting is separate from `clockAutoFallbackAnimation`, which accepts `0`–`11`.

### Startup screens

`bootScreenAktiv` enables the boot animation. `bootScreenStyle` selects Gradient letters (`0`, default) or Multicolor letters (`1`, classic). `wifiScreenAktiv` independently controls the entire startup WiFi connection screen, including its moving trail and hotspot notice; it defaults to `true`. When disabled, the last startup image remains visible until startup completes. Save and restart to apply startup settings.

### MQTT publishing intervals

`mqttMatrixInfoInterval` controls matrix-info publications in whole seconds (`10`–`86400`, default `15`). It does not change WebSocket status timing.

`mqttSensorPublish` controls sensor and lux publications. Its defaults are:

```json
{"mqttSensorPublish":{"periodic":false,"dynamic":true,"interval":60,"minInterval":0,"maxInterval":0,"temperature":0.5,"humidity":1,"pressure":1,"gas":5,"battery":1,"lux":5}}
```

`dynamic` publishes on change. Threshold units are the configured temperature unit, humidity percentage points, hPa, kΩ, battery percentage points and lx. A zero threshold means any actual change. `minInterval` limits change-driven publications; `0` adds no rate limit. `maxInterval` forces periodic publications; `0` disables them. Intervals are whole seconds up to 86400; legacy `interval` is at least 3 seconds and controls change-check cadence when `periodic` is true. When dynamic mode and a nonzero maximum interval are combined, the maximum must be at least the active minimum/check interval.

In the WebUI, choose **when readings change** or **periodically**. Selecting one turns off the other; periodic mode starts at 60 seconds. Existing combined configurations remain accepted. **Use default thresholds** fills the draft; save to apply it. Forced initial/discovery publications still work. Sensor and lux delivery are tracked separately. This policy does not change sensor sampling or automatic brightness.

### Telemetry and update notifications

`sendTelemetry` enables uploads to `http://pixelit.bastelbunker.de/api/telemetry`. Its firmware initial value is `true`; saved configuration can override it. The first upload is scheduled after approximately 30.3 seconds of uptime, then every 12 hours.

The JSON contains `uuid` (SHA-1 of the chip ID), `version`, `type`, `buildSection`, a `matrix` object (`type`, `name`, `width`, `height`) and a `sensors` array of detected sensor names. It does not contain the sensor readings. Disable uploads with a configuration write:

```json
{"sendTelemetry":false}
```

`checkUpdateScreen` independently enables version checks through `http://pixelit.bastelbunker.de/api/lastversion` and update notifications on the matrix. Its firmware initial value is also `true`. Checks start after approximately 30.5 seconds. Subsequent checks run every eight hours and are deferred while animations or scrolling text are active. `includePrereleases` defaults to `false`; set it to `true` to include published beta/RC releases through the existing PixelIt.API version endpoint.

After discovering a newer version, the enabled matrix notification is shown for 15 seconds, then repeated every 30 minutes. Notifications wait while sleeping or while matrix update notifications are disabled. The Home Assistant read-only firmware entity receives version information independently of the matrix notification setting. This is a notification, not an automatic firmware installation. Disable it with `{"checkUpdateScreen":false}`. See [manual updates](webinterface.html#update).

## WiFi Reset

::: blue HTTP Endpoint [POST]
/api/wifireset
:::

Erases the WiFi configuration and restarts the device. Device will be in AP mode after restart.

## Factory Reset

::: blue HTTP Endpoint [POST]
/api/factoryreset
:::

Erases the WiFi configuration and all other settings and restarts the device. Device will be in AP mode after restart.

These reset operations are available over HTTP POST; the firmware does not implement MQTT reset topics.

## Sources

This 3.0.0 release documentation was prepared against firmware commit [`d2d7f2f`](https://github.com/pixelit-project/PixelIt/tree/d2d7f2fecf9987fddebb61bb978dc6b153a1178b), including `src/Api.cpp`, `src/ScreenContent.cpp`, `src/ScreenTransition.cpp`, `src/Configuration.cpp`, `include/AnimationLimits.h`, `include/ScreenLimits.h` and `include/SensorPublishPolicy.h`. The [3.0.0 release](https://github.com/pixelit-project/PixelIt/releases/tag/3.0.0) must contain this source. Firmware initial values apply before saved settings are loaded.
