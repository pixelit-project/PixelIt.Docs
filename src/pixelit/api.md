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

Es können / **müssen** alle Element im einen Aufruf kombeniert werden, die als ein Screen dargestellt werden sollen.

Ein Beispiel Aufruf:
::: details Beispiel Aufruf

#### Aufruf der internen Uhr mit einer Fade Animation:

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

#### Aufruf Fade Animation, Bild und Text:

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

Es werden ab v0.3.7 folgende Sonderzeichen unterstützt:
`€  ←  ↑  →  ↓ ★  📁 ♥ ↧ 🚗  😀` 

```json
{
    "text": {
        "textString": "Test It :D",
        "bigFont": false, // [true | false]
        "scrollText": "auto", // [ true | false | "auto"]
        "scrollTextDelay": 20, // [1 - 9999],
        // [Optional] nur verwendbar wenn scrollText = false !
        "centerText": true, // [true | false],
        "position": {
            "x": 8,
            "y": 1
        },
        // [Optional]
        "color": {
            "r": 255, // [0 - 255]
            "g": 255, // [0 - 255]
            "b": 255 // [0 - 255]
        },
        // [Alternativ zu color] ab v0.3.2
        "hexColor": "#FFFFFF"
    }
}
```

### Sleep Mode

---

```json
{
    "sleepMode": false // [ true | false ]
}
```

### Brightness

---

```json
{
    "brightness": 125 // [0 - 255], [Optional]
}
```

### Switch Animation

---

```json
{
    "switchAnimation": {
        "aktiv": true, // [ true | false ]
        "animation": "fade" // [ "fade" | "coloredBarWipe" ]
    }
}
```

### Clock

---

```json
{
    "clock": {
        "show": true, // [ true | false ]
        "switchAktiv": true, //[ true | false ]
        "withSeconds": true, //[ true | false ]
        "switchSec": 5, // [ 1 - 9999 ]

        // [Optional]
        "color": {
            "r": 255, // [0 - 255]
            "g": 255, // [0 - 255]
            "b": 255 // [0 - 255]
        },
        // [Alternativ zu color] ab v0.3.2
        "hexColor": "#FFFFFF"
    }
}
```

### Bitmap

---

```json
{
    "bitmap": {
        "data": [0, 0, 0, 0, 0, 0], //[ 0,0,0......]
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

### Bitmap Animation

---

```json
{
    // [Es werden hier nur 8x8 BMPs unterstützt!]
    "bitmapAnimation": {
        "data": [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ], // [[ 0,0,0......],[ 0,0,0......],[ 0,0,0......],[ 0,0,0......]]
        "animationDelay": 20, // Millisekunden
        // [Optional]
        "rubberbanding": false, // [true | false]
        // [Optional]
        "limitLoops": 0 // < 0 = No Limit >
    }
}
```

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
            "r": 255, // [0 - 255]
            "g": 255, // [0 - 255]
            "b": 255 // [0 - 255]
        },
        // [Alternativ zu color] ab v0.3.2
        "hexColor": "#FFFFFF"
    }
}
```

### Bars

---

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
                "r": 255, // [0 - 255]
                "g": 255, // [0 - 255]
                "b": 255 // [0 - 255]
            },
            // [Alternativ zu color] ab v0.3.2
            "hexColor": "#FFFFFF"
        }
    ]
}
```

### Set GPIO

---

Mit dieser Option kann ab **v0.3.5** ein GPIO von ESP angesteuert werden.

-   **gpio**: GPIO des ESPs.
-   **set**: State der gesetzt werden soll.
    -   an: true
    -   aus: false
-   **duration**: werden die Millisekunden angeben bis der GPIO wieder auf false gesetzt werden soll.

```json
{
    "setGpio": {
        "gpio": 14,
        "set": true,
        "duration": 500 // Optional
    }
}
```

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
