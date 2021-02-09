---
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