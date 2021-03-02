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
``` json
{
   "switchAnimation":{
      "aktiv":true,
      "animation":"fade"
   },
   "clock":{
      "show":true,
      "switchAktiv":true,
      "withSeconds":false,
      "switchSec":6,
      "color":{
         "r":255,
         "g":255,
         "b":255
      }
   }
}
```

#### Aufruf Fade Animation, Bild und Text:
``` json
{
   "switchAnimation":{
      "aktiv":true,
      "animation":"fade"
   },
   "bitmap":{    
        "data":[0,0,0,21855,0,0,0,0,0,0,0,21855,0,0,0,0,0,0,21855,21855,21855,0,0,0,0,0,21855,21855,21855,0,0,0,0,693,1055,1055,65535,44735,0,0,0,693,1055,65535,65535,44735,0,0,0,693,1055,1055,65535,21855,0,0,0,0,693,1055,21855,0,0,0],
        "position": {
            "x": 0,
            "y": 0
        },
        "size": {
            "width": 8,
            "height": 8
        }
   },
   "text":{
      "textString":"59%",
      "bigFont":false,
      "scrollText":false,
      "scrollTextDelay":0,
      "centerText":true,
      "position":{
         "x":7,
         "y":1
      },
      "color":{
         "r":255,
         "g":255,
         "b":255
      }
   }
}
```
:::

### Text
___
``` json
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
        "color": {
            "r": 255, // [0 - 255]
            "g": 255, // [0 - 255]
            "b": 255 // [0 - 255]   
        }
    }
}
```

### Sleep Mode
___
``` json
{
    // [Optional]
    "sleepMode": false, // [ true | false ]
}
```

### Brightness
___
``` json
{
    // [Optional]
    "brightness": 125, // [0 - 255], [Optional]
}
```

### Switch Animation
___
``` json
{
    "switchAnimation": {
        "aktiv": true, // [ true | false ]
        "animation": "fade" // [ "fade" | "coloredBarWipe" ]
    }
}
```

### Clock
___
``` json
{
    // [Optional]
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
        }
    }
}
```

### Bitmap
___
``` json
{
    // [Optional]
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
___
``` json
{
    // [Optional] [Es werden hier nur 8x8 BMPs unterstützt!]
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
___
``` json
{
    // [Optional]
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
        }
    }
}
```

### Bars
___
``` json
{
    // [Optional]
    "bars": [{
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
        }
    }]
}
``` 

### Sound
___
#### Option 1
Diese Option ermöglicht das nutzen von mehreren Ordnern hat allerdings die Einschränkungen,  
das die Controls **next** und **previous** wegfallen.  
Folgende Ordnungsstruktur vorausgesetzt :
`sd:\01\001.mp3`
``` json
{
    // [Optional] Option 1 siehe Info!   
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
``` json
{
    // [Optional] Option 2 siehe Info! 
    "sound": {
        "volume": 20, // 0 - 30
        "control": "play", // play, pause, next, previous
        "file": 1 // 1 - 3000
    }
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
	"pixelitVersion": "1910272052",
	"sketchSize": 451360,
	"freeSketchSpace": 593920,
	"wifiRSSI": "-73",
	"wifiQuality": 54,
	"wifiSSID": "Home-Wlan",
	"ipAddress": "192.168.0.137",
	"freeHeap": 30680,
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
  "matrixtBrightness": 85,
  "matrixType": 2,
  "matrixTempCorrection": "typicalsmd5050",
  "ntpServer": "de.pool.ntp.org",
  "clockTimeZone": 1,
  "scrollTextDefaultDelay": 110,
  "bootScreenAktiv": false,
  "mqttAktiv": true,
  "mqttUser": "",
  "mqttPassword": "",
  "mqttServer": "192.168.0.251",
  "mqttMasterTopic": "Haus/PixelIt/",
  "mqttPort": 1883
}
```

::: tip HTTP Endpoint [Post]
/api/config
:::

Zum setzen der Konifuration ist folgende Struktur einzuhalten:

```json
{
    "matrixtBrightness": [0 - 255],
  	"matrixType": [1,2], // <Type 1 = NEO_MATRIX_COLUMNS , Type 2 =  NEO_MATRIX_ROWS>
  	"matrixTempCorrection": "default", // <tungsten40w (2600 Kelvin) | tungsten100w (2850 Kelvin) | halogen (3200 Kelvin) | carbonarc (5200 Kelvin) | highnoonsun (5400 Kelvin) | directsunlight (6000 Kelvin) | overcastsky (7000 Kelvin) | clearbluesky (20000 Kelvin)......>
  	"ntpServer" : "de.pool.ntp.org" // <or IP-Address>
    "clockTimeZone" : 1, // <Berlin (Germany - Berlin) UTC + 1>
    "scrollTextDefaultDelay": 100 // <millis>
	"bootScreenAktiv": [ true , false ],
    "mqttAktiv": [ true , false ],
    "mqttServer": "<IP>",
    "mqttMasterTopic": "Haus/PixelIt/",
    "mqttPort": <PORT>
}
```