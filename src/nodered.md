---
sidebarDepth: 2
---

# Node-RED

There is a fairly well [PixelIt Node-RED extension](https://flows.nodered.org/node/node-red-contrib-pixelit) for [Node-RED](https://nodered.org/).  
This helps you to easily create the screens for PixelIt and also a [playlist](#playlist) of the screens was realized here.

- The playlist is also controlled fully automatically and your PixelIt switches through the various screens and always displays the latest data.
- There is also a [beginner example flow](#beginner-flow) that you can import to get started.

:::tip No no Node-RED yet?
If you don't have Node-RED running yet you should have a look here [Node-RED - Get Started](https://nodered.org/#get-started).
:::

## Beginner Flow

![](/einsteiger_flow.png)

To help you overcome the first challenge, you can import this flow, tweak it a little and try it out:

::: details Expand here!

```json
[
  {
    "id": "35ecb3fe.70a82c",
    "type": "Core",
    "z": "6cea977d.420938",
    "name": "Core",
    "ip": "192.168.0.137",
    "masterTopic": "",
    "x": 1590,
    "y": 280,
    "wires": [[]]
  },
  {
    "id": "2ae8103e.2bfa8",
    "type": "Alert Screen",
    "z": "6cea977d.420938",
    "name": "Alert Screen",
    "x": 1390,
    "y": 220,
    "wires": [["35ecb3fe.70a82c"]]
  },
  {
    "id": "a6448772.da11e8",
    "type": "Screen Data Update",
    "z": "6cea977d.420938",
    "name": "Screen Data Update",
    "x": 1360,
    "y": 260,
    "wires": [["35ecb3fe.70a82c"]]
  },
  {
    "id": "5d1d17a4.067008",
    "type": "Matrix Control",
    "z": "6cea977d.420938",
    "name": "Matrix Control",
    "x": 1380,
    "y": 300,
    "wires": [["35ecb3fe.70a82c"]]
  },
  {
    "id": "aaebf8a3.b93f98",
    "type": "Playlist Update",
    "z": "6cea977d.420938",
    "name": "Playlist Update",
    "x": 1360,
    "y": 420,
    "wires": [["35ecb3fe.70a82c"]]
  },
  {
    "id": "8dda7744.154fc8",
    "type": "comment",
    "z": "6cea977d.420938",
    "name": "Alert Message",
    "info": "",
    "x": 110,
    "y": 80,
    "wires": []
  },
  {
    "id": "2ae3a14.25d9d5e",
    "type": "inject",
    "z": "6cea977d.420938",
    "name": "Push",
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": "0",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 110,
    "y": 120,
    "wires": [["a8d0668.e8c4098"]]
  },
  {
    "id": "8ad9260b.cf8098",
    "type": "Switch Animation",
    "z": "6cea977d.420938",
    "name": "Switch Animation",
    "aktiv": "true",
    "animation": "fade",
    "x": 1010,
    "y": 120,
    "wires": [["b3ad9478.01eb48"]]
  },
  {
    "id": "b3ad9478.01eb48",
    "type": "Text",
    "z": "6cea977d.420938",
    "name": "Text",
    "intextString": "Pixel!!",
    "inbigFont": "false",
    "inscrollText": "true",
    "inscrollTextDelay": "0",
    "incenterText": "false",
    "inposX": "8",
    "inposY": "1",
    "incolorR": "255",
    "incolorG": "255",
    "incolorB": "255",
    "x": 1170,
    "y": 120,
    "wires": [["2ae8103e.2bfa8"]]
  },
  {
    "id": "a8d0668.e8c4098",
    "type": "Screen Init",
    "z": "6cea977d.420938",
    "name": "Screen Init",
    "inscreenName": "bra",
    "induration": "10",
    "x": 630,
    "y": 120,
    "wires": [["b3f96a15.ff4fb8"]]
  },
  {
    "id": "b3f96a15.ff4fb8",
    "type": "Bitmap Animation",
    "z": "6cea977d.420938",
    "name": "Bitmap Animation",
    "indata": "4",
    "inanimationDelay": "100",
    "inrubberbanding": "false",
    "inlimitLoops": "0",
    "x": 810,
    "y": 120,
    "wires": [["8ad9260b.cf8098"]]
  },
  {
    "id": "ab30e681.56e698",
    "type": "comment",
    "z": "6cea977d.420938",
    "name": "Internal PixelIt Clock [internal_clock]",
    "info": "",
    "x": 180,
    "y": 160,
    "wires": []
  },
  {
    "id": "e2f79120.fb761",
    "type": "inject",
    "z": "6cea977d.420938",
    "name": "Init",
    "repeat": "",
    "crontab": "",
    "once": true,
    "onceDelay": "0.1",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 110,
    "y": 200,
    "wires": [["341fc2fc.7d033e"]]
  },
  {
    "id": "341fc2fc.7d033e",
    "type": "Screen Init",
    "z": "6cea977d.420938",
    "name": "Screen Init",
    "inscreenName": "internal_clock",
    "induration": "10",
    "x": 690,
    "y": 200,
    "wires": [["4c2acf36.39c45"]]
  },
  {
    "id": "4c2acf36.39c45",
    "type": "Switch Animation",
    "z": "6cea977d.420938",
    "name": "Switch Animation",
    "aktiv": "true",
    "animation": "fade",
    "x": 1010,
    "y": 200,
    "wires": [["9729bfde.a1f27"]]
  },
  {
    "id": "9729bfde.a1f27",
    "type": "Clock",
    "z": "6cea977d.420938",
    "name": "Clock",
    "inswitchAktiv": "true",
    "inswitchSec": "6",
    "inwithSeconds": "false",
    "incolorR": "255",
    "incolorG": "255",
    "incolorB": "255",
    "x": 1170,
    "y": 200,
    "wires": [["a6448772.da11e8"]]
  },
  {
    "id": "b92c80c4.a60e9",
    "type": "change",
    "z": "6cea977d.420938",
    "name": "Display Playlist",
    "rules": [
      {
        "t": "set",
        "p": "payload",
        "pt": "msg",
        "to": "[{\"screenName\":\"Xmas_Countdown\"},{\"screenName\":\"internal_clock\"},{\"screenName\":\"Github_Stars_PixelIt\"}]",
        "tot": "json"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 1120,
    "y": 440,
    "wires": [["aaebf8a3.b93f98"]]
  },
  {
    "id": "2723a613.25f89a",
    "type": "inject",
    "z": "6cea977d.420938",
    "name": "Instant",
    "repeat": "",
    "crontab": "",
    "once": true,
    "onceDelay": "1",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 120,
    "y": 440,
    "wires": [["b92c80c4.a60e9"]]
  },
  {
    "id": "c97178af.32b168",
    "type": "comment",
    "z": "6cea977d.420938",
    "name": "Display Playlist",
    "info": "",
    "x": 120,
    "y": 400,
    "wires": []
  },
  {
    "id": "54e8d944.7419e8",
    "type": "inject",
    "z": "6cea977d.420938",
    "name": "Every Day",
    "props": [
      {
        "p": "payload",
        "v": "",
        "vt": "date"
      },
      {
        "p": "topic",
        "v": "",
        "vt": "string"
      }
    ],
    "repeat": "",
    "crontab": "01 00 * * *",
    "once": false,
    "onceDelay": "0",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 270,
    "y": 280,
    "wires": [["c0557253.0f67d"]]
  },
  {
    "id": "83e02357.4294c",
    "type": "Switch Animation",
    "z": "6cea977d.420938",
    "name": "Switch Animation",
    "aktiv": "true",
    "animation": "fade",
    "x": 1010,
    "y": 280,
    "wires": [["a85e1cb0.02ca2"]]
  },
  {
    "id": "a85e1cb0.02ca2",
    "type": "Text",
    "z": "6cea977d.420938",
    "name": "Text",
    "intextString": "{{payload}}",
    "inbigFont": "false",
    "inscrollText": "false",
    "inscrollTextDelay": "0",
    "incenterText": "true",
    "inposX": "8",
    "inposY": "1",
    "incolorR": "255",
    "incolorG": "255",
    "incolorB": "255",
    "x": 1170,
    "y": 280,
    "wires": [["a6448772.da11e8"]]
  },
  {
    "id": "416cc4d6.6470ec",
    "type": "Screen Init",
    "z": "6cea977d.420938",
    "name": "Screen Init",
    "inscreenName": "Xmas_Countdown",
    "induration": "10",
    "x": 610,
    "y": 280,
    "wires": [["cdd9e5e1.ed7df8"]]
  },
  {
    "id": "c0557253.0f67d",
    "type": "function",
    "z": "6cea977d.420938",
    "name": "Caculate X-Mas",
    "func": "var today = new Date();\nvar year = today.getYear();\n\nif (year < 1900) {\n\tyear += 1900;\n}\n\nvar date = new Date(\"December 24, \" + year);\nvar diff = date.getTime() - today.getTime();\nvar days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;\n\nmsg.payload = days;\n\nif (days === 0 || days === -1 || days === -2)\n{\n     msg.bmp = '430';\n     msg.payload = 'Xmas';\n     node.status({ fill: \"green\", shape: \"ring\", text: \"Xmas\" });\n}\nelse if (days > 0)\n{\n    msg.bmp = '425';\n    node.status({ fill: \"green\", shape: \"ring\", text: \"Only \"+ days +\" days left\" });\n}\n\nif (days > 24 || days < -2)\n{\n    msg.show = false;\n}\n\nreturn msg;\n",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "libs": [],
    "x": 440,
    "y": 280,
    "wires": [["416cc4d6.6470ec"]]
  },
  {
    "id": "cdd9e5e1.ed7df8",
    "type": "Bitmap Animation",
    "z": "6cea977d.420938",
    "name": "Bitmap Animation",
    "indata": "{{bmp}}",
    "inanimationDelay": "300",
    "inrubberbanding": "false",
    "inlimitLoops": "0",
    "x": 790,
    "y": 280,
    "wires": [["83e02357.4294c"]]
  },
  {
    "id": "3a433d7c.c24cf2",
    "type": "comment",
    "z": "6cea977d.420938",
    "name": "Xmas Counter !!! Will only be visible when only 24 days left !!!",
    "info": "",
    "x": 260,
    "y": 240,
    "wires": []
  },
  {
    "id": "48fdfafd.055a64",
    "type": "inject",
    "z": "6cea977d.420938",
    "name": "Init",
    "props": [
      {
        "p": "payload",
        "v": "",
        "vt": "date"
      },
      {
        "p": "topic",
        "v": "",
        "vt": "string"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": true,
    "onceDelay": "0.1",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 110,
    "y": 280,
    "wires": [["c0557253.0f67d"]]
  },
  {
    "id": "b8452538.5d65c8",
    "type": "http request",
    "z": "6cea977d.420938",
    "name": "Get Github Stats",
    "method": "GET",
    "ret": "obj",
    "paytoqs": "ignore",
    "url": "https://api.github.com/repos/{{{github_project}}}",
    "tls": "",
    "persist": false,
    "proxy": "",
    "authType": "",
    "x": 490,
    "y": 360,
    "wires": [["82571a70.401018"]]
  },
  {
    "id": "8012551d.0bd008",
    "type": "inject",
    "z": "6cea977d.420938",
    "name": "Every 30m",
    "props": [
      {
        "p": "payload"
      },
      {
        "p": "topic",
        "vt": "str"
      }
    ],
    "repeat": "1800",
    "crontab": "",
    "once": true,
    "onceDelay": "0",
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 130,
    "y": 360,
    "wires": [["5611f6ae.c02588"]]
  },
  {
    "id": "3ed54605.97b37a",
    "type": "Switch Animation",
    "z": "6cea977d.420938",
    "name": "Switch Animation",
    "aktiv": "true",
    "animation": "fade",
    "x": 1030,
    "y": 360,
    "wires": [["98d10835.b7bb08"]]
  },
  {
    "id": "98d10835.b7bb08",
    "type": "Text",
    "z": "6cea977d.420938",
    "name": "",
    "intextString": "{{msg.payload}}",
    "inbigFont": "false",
    "inscrollText": "false",
    "inscrollTextDelay": "0",
    "incenterText": "true",
    "inposX": "8",
    "inposY": "1",
    "incolorR": "255",
    "incolorG": "255",
    "incolorB": "255",
    "x": 1190,
    "y": 360,
    "wires": [["97f93071.fa143"]]
  },
  {
    "id": "2d677b17.996484",
    "type": "Screen Init",
    "z": "6cea977d.420938",
    "name": "Screen Init",
    "inscreenName": "Github_Stars_PixelIt",
    "induration": "10",
    "x": 850,
    "y": 360,
    "wires": [["3ed54605.97b37a"]]
  },
  {
    "id": "82571a70.401018",
    "type": "function",
    "z": "6cea977d.420938",
    "name": "Create Message",
    "func": "const stars = msg.payload.stargazers_count;\nmsg.payload = stars;\nnode.status({ fill: 'green', shape: 'ring', text: 'Stars ' +  stars});\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "libs": [],
    "x": 680,
    "y": 360,
    "wires": [["2d677b17.996484"]]
  },
  {
    "id": "97f93071.fa143",
    "type": "Bitmap Animation",
    "z": "6cea977d.420938",
    "name": "Bitmap Animation",
    "indata": "609",
    "inanimationDelay": "200",
    "inrubberbanding": "false",
    "inlimitLoops": "0",
    "x": 1350,
    "y": 360,
    "wires": [["a6448772.da11e8"]]
  },
  {
    "id": "5611f6ae.c02588",
    "type": "change",
    "z": "6cea977d.420938",
    "name": "Github Project",
    "rules": [
      {
        "t": "set",
        "p": "github_project",
        "pt": "msg",
        "to": "o0shojo0o/PixelIt",
        "tot": "str"
      },
      {
        "t": "set",
        "p": "headers",
        "pt": "msg",
        "to": "{\"USER-AGENT\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36\"}",
        "tot": "jsonata"
      }
    ],
    "action": "",
    "property": "",
    "from": "",
    "to": "",
    "reg": false,
    "x": 300,
    "y": 360,
    "wires": [["b8452538.5d65c8"]]
  },
  {
    "id": "24a4c9a5.880996",
    "type": "comment",
    "z": "6cea977d.420938",
    "name": "Github PixelIt Stars",
    "info": "",
    "x": 130,
    "y": 320,
    "wires": []
  }
]
```

::::

## Core Nodes

### Core

![](/core_node.png)

The Core Node is the heart of PixelIt Node-RED extension.

- Receiving and saving/updating screens.
- The handling of the alerts.
- Receiving the playlists.
- The playback of the playlists.
- Receiving the configuration of PixelIt.
- The receiving of controls.
- The optional communication with the web service to query the bitmap IDs and cache them.
- The communication with PixelIt.

#### Configuration

![](/core_node_config.png)

- **Name**: This value can be chosen as you like.
- **IP-Address**: The Ip address of PixelIt can be entered here to directly use the HTTP API.
- **Master-Topic**: Here the master topic can be entered to generate the MQTT-Topic, this is then passed on in the "msg.topic".

### Alert Screen

![](/alert_screen_node.png)

If you want to display show a screen directly and dont want to wait for the playlist to switch to it, you can use this node to easily display it.

### Screen Data Update

![](/screen_data_update_node.png)

Update screen information in the playlist, but do not switch to it. Checkout the API for more information.

### Matrix Control

![](/matrix_control_node.png)

You can use this node to easily control the sleep mode of PixelIt or the brightness.

#### Example

```javascript
msg.sleepMode = true;
msg.brightness = 80;
return msg;
```

### Playlist Update

![](/playlist_update_node.png)

This node receives the playlist and passes it on to the core node.

#### Example

```javascript
msg.payload = [
  {
    screenName: "clock",
  },
  {
    screenName: "smartmeter",
  },
  {
    screenName: "weather",
  },
];
return msg;
```

::: tip
Creat a Inject Node and set `msg.payload`. Enable `Injection once after 5 seconds` to set the playlist after each flow deployment.
:::

### Matrix Config <Badge text="Obsolete" type="warning"/>

![](/matrix_control_node.png)  
::: warning Outdated!
This node is obsolete and has been replaced by the [webinterface](webinterface.html#options)!
:::
Matrix Config is the node to set the configuration of PixelIt via the Node-RED extension.
This node is bound directly to the core node because the core node can process the node directly.

## Screen Nodes

The following nodes help you to create screens for PixelIt. There job is to create the JSON object for the screen and pass it on to the core node. You could also create the JSON object yourself and pass it on to the core node, but this is much more complicated and error-prone.

::: tip
Use the Node-RED `Debug node` to see the JSON object that is created by the screen nodes. Enable `Complete msg object` to see the complete JSON object, because many values are set to the `msg object` directly and not to the payload.
:::

### Screen Init

![](/screen_init_node.png)

Screen Init is the node to initialize a screen. You

- Naming the screen e.g. for the playlist
- Display duration

#### Configuration

![](/screen_init_node_config.png)

- **Name**: This value can be chosen as you like.
- **Screen Name**: Not relevant for alerts, but important for screens as this name is used in the playlist.
- **Duration**: The duration of the alert/screen in seconds, this value can also be passed dynamically by passing the appropriate message-val with double braces. Set `msg.duration` and access it with <span v-pre>`{{duration}}`</span>.

### Switch Animation

![](/switch_animation_node.png)

Switch Animation is the node to set a transition animation.

- Enables or disables the transition animation.
- Set the type of transition animation.

#### Configuration

![](/switch_animation_node_config.png)

- **Name**: This value can be chosen as you like.
- **Animation active**: Enables or disables the transition animation.
- **Animation style**: Here you can set the style of the transition animation.

### Text

![](/text_node.png)

In this node you can set a text that should be displayed on the screen. You can setup the color, position, scrolling and more.

Some special characters will be replaced with a icon. The following characters are supported at the moment:

`€ ← ↑ → ↓ ★ 📁 ♥ ↧ 🚗 😀`

![](/special_characters.png)

#### Configuration

![](/text_node_config.png)

- **Name**: This value can be chosen as you like.
- **Text**: The text that should be displayed on the screen. You can also pass the text dynamically by passing the appropriate message-val with double braces. Set `msg.payload` and access it with <span v-pre>`{{payload}}`</span>.
- **Big Font**: If the text should be displayed in big font.
- **Scrolling**: If the text should be scrolled. If you select `Auto`, the text will be scolled if it is longer than the screen width.
- **Scrolling Delay**: The delay between the scrolling steps in milliseconds.
- **Center Text**: If the text should be centered.
- **Position X**: The X position of the text.
- **Position Y**: The Y position of the text.
- **Color**: The color of the text.

### Bitmap

![](/bitmap_node.png)

In this node you can set a bitmap that should be displayed on the screen. You can set the position and a pixel array (Data) or the ID. If you set the ID, the Core Node will query the bitmap from the web service and cache it.

#### Configuration

![](/bitmap_node_config.png)

- **Name**: This value can be chosen as you like.
- **Data/ID**: The pixel array of the bitmap or the ID of the bitmap.
- **Position X**: The X position of the bitmap.
- **Position Y**: The Y position of the bitmap.
- **Width X**: The width of the bitmap.
- **Height Y**: The height of the bitmap.

### Bitmap Animation

![](/bitmap_animation_node.png)

Same as [Bitmap Node](nodered.html#bitmap) but with animation.

#### Configuration

![](/bitmap_animation_node_config.png)

- **Name**: This value can be chosen as you like.
- **Data/ID**: The pixel array of the bitmap or the ID of the bitmap.
- **Animation Delay**: The delay between the frames of the animation in milliseconds.
- **Rubberbanding**: If the animation should be played in reverse after it has been played.
- **Limit Loops**: The number of loops the animation should be played. `0` means infinite.

### Clock

![](/clock_node.png)

Because you could not set dynamic values in the [Text Node](nodered.html#text) you can use this node to display a clock, which use the time of the PixelIt. You can set the color and if the seconds should be displayed.

#### Configuration

![](/clock_node_config.png)

- **Name**: This value can be chosen as you like.
- **Date Time Switch**: Enables or disables switch between date and time.
- **With Seconds**: Enables or disables the seconds.
- **Switch Sec**: The number of seconds after which the switch between date and time should take place.

### GPIO Control

![](/gpio_control_node.png)

With this node you can control the GPIOs of PixelIt. You can set the GPIOs to `On (HIGH)` or `Off (LOW)` and the duration in milliseconds.

#### Configuration

![](/gpio_control_node_config.png)

- **Name**: This value can be chosen as you like.
- **GPIO**: The GPIO number.
- **Value**: The state of the GPIO. `On` or `Off`.
- **Duration**: The duration in milliseconds.

### Sound

![](/sound_node.png)

With this node you can play a sound on PixelIt. You can set the volume and the duration in milliseconds. The DF Player Mini is used for this.

#### Configuration

![](/sound_node_config.png)

- **Name**: This value can be chosen as you like.
- **Control**: What you want to do. `Play` or `Stop` etc.
- **Volume**: The volume of the sound.
- **Folder**: The folder number of the sound.
- **File**: The file number of the sound.

## Troubleshooting

See [Troubleshooting](troubleshooting.html).
