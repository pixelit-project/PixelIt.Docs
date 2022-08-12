---
collapsable: false
sidebarDepth: 2
---

# API

## Screen

::: tip HTTP Endpoint [POST]
/api/screen
:::
::: tip MQTT Topic
MasterTopic/setScreen
:::
<br>

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
            0,
            0,
            0,
            21855,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            21855,
            0,
            0,
            0,
            0,
            0,
            0,
            21855,
            21855,
            21855,
            0,
            0,
            0,
            0,
            0,
            21855,
            21855,
            21855,
            0,
            0,
            0,
            0,
            693,
            1055,
            1055,
            65535,
            44735,
            0,
            0,
            0,
            693,
            1055,
            65535,
            65535,
            44735,
            0,
            0,
            0,
            693,
            1055,
            1055,
            65535,
            21855,
            0,
            0,
            0,
            0,
            693,
            1055,
            21855,
            0,
            0,
            0
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

The following special characters are supported as of v0.3.7:
`€ ← ↑ → ↓ ★ 📁 ♥ ↧ 🚗 😀`
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
| Parameter             | Type               | Values                           |Description                                |
| :----                 | :----              | :----                            | :----                                     |
| `textString`          | `String`           |                                  |**Required**. Displayed Text               |
| `scrollText`          | `Boolean / String` | `true / false / "auto"`          |**Required** Big front                     |
| `scrollTextDelay`     | `Integer`          | `1 - 9999`                       |**Required (when scrollText is used)**     |
| `centerText`          | `Boolean`          | `true / false`                   |**Required**                               |
| `position`            | `JSON`             | `{"x":8, "y":1}`                 |**Required**                               |
| `color`               | `JSON`             | `{"r":255, "g":255, "b":255},`   |**Required**  (or hexColor)                |
| `hexColor`            | `String`           | `#FFFFFF`                        |**since v0.3.2**  Alternatively to color   |

### Sleep Mode

---

```json
{
    "sleepMode": false
}
```
| Parameter             | Type               | Values                           |Description                                |
| :----                 | :----              | :----                            | :----                                     |
| `sleepMode`           | `Boolean`          | `true / false`                   |Sets the PixelIt into a kind of sleep mode |


### Brightness

---

```json
{
    "brightness": 125
}
```
| Parameter             | Type               | Values                           |Description                                |
| :----                 | :----              | :----                            | :----                                     |
| `brightness`          | `Integer`          | `0 - 255`                        |Sets the brightness                        |

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
        "animation": "fade",
        "data": [0, 0, 0, 0, 0, 0],
        "width": 8
    }
}
```
| Parameter             | Type               | Values                                                                       |Description                                                |   
| :----                 | :----              | :----                                                                        | :----                                                     |
| `aktiv`               | `Boolean`          | `true / false`                                                               |                                                           |
| `animation`           | `String`           | `"fade" / "coloredBarWipe / "zigzagWipe" / "bitmapWipe" / "random"`          |[bitmapWipe call example](./#call-bitmapwipe-example)                |
| `data`                | `Integer Array`    | `[0, 0, 0, 0, 0, 0]`                                                         |**Required for bitmapWipe**                                |
| `width`               | `Integer`          | `1 - 32`                                                                     |**Required for bitmapWipe** height always needs to be 8    |



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
| Parameter             | Type               | Values                           |Description                                                                |
| :----                 | :----              | :----                            | :----                                                                     |
| `show`                | `Boolean`          | `true / false`                   |**Required**                                                               |
| `switchAktiv`         | `Boolean`          | `true / false`                   |Switch clock/date                                                          |
| `switchSec`           | `Integer`          | `1 - 9999`                       |**Required (when Switch clock/date is used)** Switch clock/date in seconds |
| `drawWeekDays`        | `Boolean`          | `true / false`                   |**since v1.1.0** Draw weekdays                                             |
| `color`               | `JSON`             | `{"r":255, "g":255, "b":255},`   |Color of Clock (or hexColor)                                               |
| `hexColor`            | `String`           | `#FFFFFF`                        |**since v0.3.2**  Alternatively to color                                   |

### Bitmap

---

```json
{
    "bitmap": {
        "data": [0, 0, 0, 0, 0, 0], 
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
| Parameter             | Type               | Values                           |Description                                |
| :----                 | :----              | :----                            | :----                                     |
| `data`                | `Integer Array`    | `[0, 0, 0, 0, 0, 0]`             |**Required**                               |
| `position`            | `JSON`             | `{"x":0, "y":0}`                 |**Required**                               |
| `size`                | `JSON`             | `{"width":8, "height":8}`        |**Required**                               |

### Bitmap Animation

---

```json
{
    "bitmapAnimation": {
        "data": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ],
        "animationDelay": 20,
        "rubberbanding": false,
        "limitLoops": 0
    }
}
```
| Parameter             | Type                      | Values                                    |Description                                            |
| :----                 | :----                     | :----                                     | :----                                                 |
| `data`                | `Array of Integer Arrays` | `[[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0]]` |**Required** Only 8x8 BMPs are supported here!         |
| `animationDelay`      | `Integer`                 | `0 - 99999`                               |**Required** Higher is a slower animation              |
| `rubberbanding`       | `Boolean`                 | `true / false`                            | Should the animation run back and forth               |
| `limitLoops`          | `Integer`                 | `{"width":8, "height":8}`                 |If the repetition is to be limited                     |

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
| Parameter             | Type               | Values                           |Description                                                                |
| :----                 | :----              | :----                            | :----                                                                     |
| `position`            | `JSON`             | `{"x":0, "y":0,"x2":1, "y2":10}` |**Required**                                                               |
| `color`               | `JSON`             | `{"r":255, "g":255, "b":255},`   |Color of Clock (or hexColor)                                               |
| `hexColor`            | `String`           | `#FFFFFF`                        |**since v0.3.2**  Alternatively to color                                   |

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
| Parameter             | Type               | Values                           |Description                                                                |
| :----                 | :----              | :----                            | :----                                                                     |
| `position`            | `JSON`             | `{"x":0, "y":0,"x2":1, "y2":10}` |**Required**                                                               |
| `color`               | `JSON`             | `{"r":255, "g":255, "b":255},`   |Color of Clock (or hexColor)                                               |
| `hexColor`            | `String`           | `#FFFFFF`                        |**since v0.3.2**  Alternatively to color                                   |

### Set GPIO

---
**Since v0.3.5!**
```json
{
    "setGpio": {
        "gpio": 14,
        "set": true,
        "duration": 500
    }
}
```
| Parameter             | Type               | Values                           |Description                                    |
| :----                 | :----              | :----                            | :----                                         |
| `gpio`                | `Integer`          | `E.g. 14`                        |**Required** GPIO of the ESP                   |
| `set`                 | `Boolean`          | `true / false`                   |**Required**                                   |
| `duration`            | `Integer`          | `1 - 99999999`                   |Automatic fall back to false in milliseconds   |

### Sound

---

#### Option 1

Diese Option ermöglicht das nutzen von mehreren Ordnern hat allerdings die Einschränkungen,  
das die Controls **next** und **previous** wegfallen.  
Folgende Ordnungsstruktur vorausgesetzt :
`sd:\01\001.mp3`

```json
{
    "sound": {
        "volume": 20, // 0 - 30
        "control": "play", // play, pause
        "folder": 1, // 1 - 99
        "file": 1 // 1 - 255
    }
}
```

#### Option 2

Diese Option ermöglicht auch die Controls **next** und **previous**,  
es wird folgende Ordnungsstruktur vorausgesetzt :
`sd:\MP3\0001.mp3`

```json
{
    "sound": {
        "volume": 20, // 0 - 30
        "control": "play", // play, pause, next, previous
        "file": 1 // 1 - 3000
    }
}
```

## Current Brightness

::: tip HTTP Endpoint [GET]
/api/brightness
:::  
Mit dieser Option kann ab **v0.3.6** die aktuelle Brightness der PixelIt abgefragt werden.

Der Response (Antwort) ist folgender Struktur aufgebaut:

```json
{
    "brightness_255": 20,
    "brightness": 7
}
```

## Lux Sensor

::: tip HTTP Endpoint [GET]
/api/luxsensor
:::
::: tip MQTT Topic
MasterTopic/luxsensor
:::

Der Response (Antwort) ist folgender Struktur aufgebaut:

```json
{
    "lux": 107.0217
}
```

## DHT Hum / Temp Sensor

::: tip HTTP Endpoint [GET]
/api/dhtsensor
:::
::: tip MQTT Topic
MasterTopic/dhtsensor
:::

Der Response (Antwort) ist folgender Struktur aufgebaut:

```json
{
    "humidity": 40,
    "temperature": 21.5
}
```

## Matrix Infomation

::: tip HTTP Endpoint [GET]
/api/matrixinfo
:::

Der Response (Antwort) ist folgender Struktur aufgebaut:

```json
{
    "pixelitVersion": "0.3.4",
    "note": "",
    "hostname": "PixelIt",
    "freeSketchSpace": 2695168,
    "wifiRSSI": -58,
    "wifiQuality": 84,
    "wifiSSID": "Wlan",
    "ipAddress": "192.168.0.137",
    "freeHeap": 29976,
    "sketchSize": 447424,
    "chipID": 13668362,
    "cpuFreqMHz": 80,
    "sleepMode": false
}
```

## Matrix Config

::: tip HTTP Endpoint [GET]
/api/config
:::

Der Response (Antwort) ist folgender Struktur aufgebaut:

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
    "mqttMasterTopic": "Haus/PixelIt/",
    "mqttPort": 1883
}
```

::: tip HTTP Endpoint [Post]
/api/config
:::

Zum setzen der Konifuration ist die obere Struktur einzuhalten.
