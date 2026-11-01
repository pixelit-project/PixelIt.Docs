---
collapsable: false
sidebarDepth: 2
---

# API

You can use the API via the HTTP REST Interface or MQTT. The HTTP API is available at `/api/` and the MQTT API at `<MasterTopic>/`. You can use both APIs at the same time.

::: tip
If you use the [Node-RED](nodered.html) or [ioBroker](iobroker.html) integration, you don't need to use the API directly.
:::

## Interfaces

### REST

The port is `80`, The REST API is available at `/api/`. The following endpoints are available:

### MQTT

The default MQTT prefix is `pixelit/` and can be changed in the WebUI. In the examples below, `<MasterTopic>` means the prefix without its trailing slash, so `<MasterTopic>/setScreen` becomes `pixelit/setScreen`. Do not add a second slash.

Enable `mqttUseDeviceTopic` to also address a single device at `<MasterTopic>/<hostname>/setScreen`. Devices using the same master topic receive the same master-topic commands.

Enable both MQTT and `mqttHAdiscoverable` to make the device discoverable via [Home Assistant](https://www.home-assistant.io/integrations/mqtt/).

::: tip
We recommend using MQTT.
:::

## Endpoints

The following endpoints are available:

| Endpoint       | Description                      | Details                               |
| :------------- | :------------------------------- | ------------------------------------- |
| `screen`       | Show screen on device            | [Details](api.html#screen)            |
| `brightness`   | Get brightness; set via screen            | [Details](api.html#brightness-2)        |
| `buttons`      | Get button states                | [Details](api.html#buttons)           |
| `luxsensor`    | Get lux sensor value             | [Details](api.html#lux-sensor)        |
| `sensor`       | Get sensor values                | [Details](api.html#sensor)            |
| `state`        | Get state (MQTT only)            | [Details](api.html#state)             |
| `matrixinfo`   | Get matrix info                  | [Details](api.html#matrix-infomation) |
| `config`       | Get or set config                | [Details](api.html#matrix-config)     |
| `wifireset`    | WiFi reset                       | [Details](api.html#wifi-reset)        |
| `factoryreset` | Reset device to factory defaults | [Details](api.html#factory-reset)     |

## Screen

Most important endpoint is `/api/screen` or `<MasterTopic>/setScreen`. This endpoint is used to display a single screen on Pixelit. The following elements are supported:

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
    "show": true,
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

| Parameter         | Type               | Values                         | Description                             |
| :---------------- | :----------------- | :----------------------------- | :-------------------------------------- |
| `textString`      | `String`           |                                | **Required**. Displayed Text            |
| `bigFont`         | `Boolean`          | `true / false`                 | Select the large text font              |
| `scrollText`      | `Boolean / String` | `true / false / auto`          | Enable scrolling; `auto` scrolls long text                  |
| `scrollTextDelay` | `Integer`          | `1 - 9999`                     | Optional delay in milliseconds; otherwise uses `scrollTextDefaultDelay`  |
| `centerText`      | `Boolean`          | `true / false`                 | **Required**                            |
| `position`        | `JSON`             | `{"x":8, "y":1}`               | **Required**                            |
| `color`           | `JSON`             | `{"r":255, "g":255, "b":255},` | **Required** (or hexColor)              |
| `hexColor`        | `String`           | `#FFFFFF`                      | **since v0.3.2** Alternatively to color |

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

| Parameter   | Type      | Values         | Description                                                   |
| :---------- | :-------- | :------------- | :------------------------------------------------------------ |
| `sleepMode` | `Boolean` | `true / false` | When active `sleepMode` disables the rendering of new screens |

### Brightness

---
Temporary adjust the brightness until next reboot or auto brightness change it when enabled.

```json
{
  "brightness": 125
}
```

| Parameter    | Type      | Values    | Description         |
| :----------- | :-------- | :-------- | :------------------ |
| `brightness` | `Integer` | `0 - 255` | Sets the brightness |

### Auto-Brightness

---
Temporary enable/disable the auto brightness feature until next reboot.

```json
{
  "autobrightness": false
}
```

| Parameter    | Type      | Values    | Description         |
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

| Parameter   | Type            | Values                                                     | Description                                                 |
| :---------- | :-------------- | :--------------------------------------------------------- | :---------------------------------------------------------- |
| `aktiv`     | `Boolean`       | `true / false`                                             |                                                             |
| `animation` | `String`        | `fade / coloredBarWipe / zigzagWipe / bitmapWipe / random` | [bitmapWipe call example](api.html#call-bitmapwipe-example) |
| `data`      | `Integer Array` | `RGB565 pixel values`                                       | **Required for bitmapWipe**; provide `width × 8` RGB565 values |
| `width`     | `Integer`       | `1 - 32`                                                   | **Required for bitmapWipe** height always needs to be 8     |

### Clock

---

```json
{
  "clock": {
    "show": true,
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

| Parameter      | Type      | Values                         | Description                                                                |
| :------------- | :-------- | :----------------------------- | :------------------------------------------------------------------------- |
| `show`         | `Boolean` | `true / false`                 | **Required**                                                               |
| `switchAktiv`  | `Boolean` | `true / false`                 | Switch clock/date                                                          |
| `switchSec`    | `Integer` | `1 - 9999`                     | **Required (when Switch clock/date is used)** Switch clock/date in seconds |
| `withSeconds`  | `Boolean` | `true / false`                 | Show seconds                                                               |
| `drawWeekDays` | `Boolean` | `true / false`                 | **since v1.1.0** Draw weekdays                                             |
| `color`        | `JSON`    | `{"r":255, "g":255, "b":255},` | Color of Clock (or hexColor)                                               |
| `hexColor`     | `String`  | `#FFFFFF`                      | **since v0.3.2** Alternatively to color                                    |

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

| Parameter  | Type            | Values                    | Description  |
| :--------- | :-------------- | :------------------------ | :----------- |
| `data`     | `Integer Array` | `RGB565 pixel values`      | **Required** |
| `position` | `JSON`          | `{"x":0, "y":0}`          | **Required** |
| `size`     | `JSON`          | `{"width":8, "height":8}` | **Required** |

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

| Parameter  | Type            | Values                    | Description  |
| :--------- | :-------------- | :------------------------ | :----------- |
| `data`     | `Integer Array` | `RGB565 pixel values`      | **Required** |
| `position` | `JSON`          | `{"x":0, "y":0}`          | **Required** |
| `size`     | `JSON`          | `{"width":8, "height":8}` | **Required** |

### Bitmap Animation

---

Each frame needs 64 RGB565 values for an 8×8 image. The firmware stores ten frames; keep animations below ten frames so the end marker remains available. The example cycles through white, blue and red.

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

| Parameter        | Type                      | Values                                    | Description                                    |
| :--------------- | :------------------------ | :---------------------------------------- | :--------------------------------------------- |
| `data`           | `Array of Integer Arrays` | One array of 64 RGB565 values per frame | **Required** Only 8x8 BMPs are supported here! |
| `animationDelay` | `Integer`                 | `0 - 99999`                               | **Required** Higher is a slower animation      |
| `rubberbanding`  | `Boolean`                 | `true / false`                            | Should the animation run back and forth        |
| `limitLoops`     | `Integer`                 | `0-99`                                    | Limiting the loops                             |
| `position`       | `JSON`                    | `{"x":0, "y":0}`                          | Postion                                        |

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

| Parameter  | Type     | Values                           | Description                             |
| :--------- | :------- | :------------------------------- | :-------------------------------------- |
| `position` | `JSON`   | `{"x":0, "y":0,"x2":1, "y2":10}` | **Required**                            |
| `color`    | `JSON`   | `{"r":255, "g":255, "b":255},`   | Color of Clock (or hexColor)            |
| `hexColor` | `String` | `#FFFFFF`                        | **since v0.3.2** Alternatively to color |

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

| Parameter  | Type     | Values                           | Description                             |
| :--------- | :------- | :------------------------------- | :-------------------------------------- |
| `position` | `JSON`   | `{"x":0, "y":0,"x2":1, "y2":10}` | **Required**                            |
| `color`    | `JSON`   | `{"r":255, "g":255, "b":255},`   | Color of Clock (or hexColor)            |
| `hexColor` | `String` | `#FFFFFF`                        | **since v0.3.2** Alternatively to color |

### Set GPIO

```json
{
  "setGpio": {
    "gpio": 14,
    "set": true,
    "duration": 500
  }
}
```

| Parameter  | Type      | Values         | Description                                  |
| :--------- | :-------- | :------------- | :------------------------------------------- |
| `gpio`     | `Integer` | `E.g. 14`      | **Required** GPIO of the ESP                 |
| `set`      | `Boolean` | `true / false` | **Required**                                 |
| `duration` | `Integer` | `1 - 99999999` | Automatic fall back to false in milliseconds |

### Sound

---

#### Option 1

This option allows the use of multiple folders, but has the limitations, that the controls **next** and **previous** are omitted.

The following folders structure must be provided: `sd:\01\001.mp3`

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

| Parameter | Type      | Values         | Description  |
| :-------- | :-------- | :------------- | :----------- |
| `volume`  | `Integer` | `0 - 30`       | **Required** |
| `control` | `String`  | `play / pause` | **Required** |
| `folder`  | `Integer` | `1 - 99`       | **Required** |
| `file`    | `Integer` | `1 - 255`      | **Required** |

#### Option 2

This option also enables the controls **next** and **previous**, but the following order structure must be provided: `sd:\MP3\0001.mp3`

```json
{
  "sound": {
    "volume": 20,
    "control": "play",
    "file": 1
  }
}
```

| Parameter | Type      | Values                           | Description  |
| :-------- | :-------- | :------------------------------- | :----------- |
| `volume`  | `Integer` | `0 - 30`                         | **Required** |
| `control` | `String`  | `play / pause / next / previous` | **Required** |
| `file`    | `Integer` | `1 - 3000`                       | **Required** |

## Brightness

::: blue HTTP Endpoint [GET]
/api/brightness
:::  
This option can be used to query the current brightness. If u use MQTT, use `<MasterTopic>/matrixinfo` to get the current brightness.

The response has the following structure:

```json
{
  "brightness_255": 20,
  "brightness": 7
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
  "lux": 107.0217
}
```

## Sensor

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
  "temperature": 21.5
}
```

## State

Its possible to get a disconnection (and connection) message via the MQTT LWT (Last Will and Testament) Feature.

::: blue MQTT Topic [SUBSCRIBE]
&lt;MasterTopic&gt;/state
:::

```
disconnected (or connected)
```

## Matrix Infomation

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
  "pixelitVersion": "2.6.0",
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

Additional configuration fields available in 2.6.0:

| Fields | Purpose |
| :----- | :------ |
| `temperatureUnit` | `0` for Celsius, `1` for Fahrenheit |
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

Button actions are `0` (none), `1` (clock), `2` (toggle sleep), `3` (play/pause), `4` (previous track) or `5` (next track). Use the WebUI to choose valid pins and hardware-dependent settings.

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
