---
sidebarDepth: 2
---

# Node-RED

There is a quite extensive [PixelIt Node](https://flows.nodered.org/node/node-red-contrib-pixelit) for [Node-RED](https://nodered.org/).  
This helps you in a quite simple way to create the screens for PixelIt, also a [Playlist](#playlist) of the screens was realized here.

There is also a beginner flow that you can import: [beginner example flow](#beginner-flow) to master the first hurdle.

If you don't have Node-RED running yet you should have a look here [Node-RED - Get Started](https://nodered.org/#get-started).

## Beginner Flow

---

To flatten the first hurdle a bit, you can import this flow, and tinker with it a bit and try it out.
![](/einsteiger_flow.png)

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

## Core

---

![](/core_node.png)

The Core Node is the heart of PixelIt Node-RED extension.

### The tasks

- Receiving and saving/updating screens.
- The handling of the alerts.
- Receiving the playlists.
- The playback of the playlists.
- Receiving the configuration of PixelIt.
- The receiving of controls.
- The optional communication with the web service to query the bitmap IDs.
- These are then also kept in the RAM cache.
- The structure of the JSON.
- The communication with PixelIt.

### The configuration

![](/core_node_config.png)

**Name**: This value can be chosen as you like.  
**IP-Address**: The Ip address of PixelIt can be entered here to directly use the HTTP API.  
**Master-Topic**: Here the master topic can be entered to generate the MQTT-Tpoic, this is then passed on in the "msg.topic".

## Alert Screen

---

![](/alert_screen_node.png)

Alert Screen Node is a small helper from PixelIt Node-RED extension.

### The tasks

- The incoming screen as alert days so that the core node knows how to deal with it.

### The configuration

![](/alert_screen_node_config.png)

**Name**: This value can be chosen as you like.

## Screen Data Update

---

![](/screen_data_update_node.png)

Screen Data Update is a small helper from PixelIt Node-RED extension.

### The tasks

- Den ankommenden Screen als Data Update für einen Screen Tagen so das der Core Node weiß damit umzugehen.

### The configuration

---

![](/screen_data_update_node_config.png)

**Name**: This value can be chosen as you like.

## Matrix Control

---

![](/matrix_control_node.png)  
Matrix Control is a small helper from PixelIt Node-RED extension.

### The tasks

- The incoming data stream as matrix control commands days so that the core node knows how to deal with it.

### The configuration

![](/matrix_control_node_config.png)

**Name**: This value can be chosen as you like.

## Playlist Update

---

![](/playlist_update_node.png)

Playlist Update is a little helper from PixelIt Node-RED extension.

### The tasks

- Tag the incoming data stream as a playlist so that the core node knows how to handle it.

- ### The configuration

![](/playlist_update_node_config.png)

**Name**: This value can be chosen as you like.

## Playlist

---

![](/)

The playlist is created as a json containing the names previously specified in the [Screen Init Node](#screen-init).

### The tasks

- Set playback order.
-

### The configuration

**Name**: This value can be chosen as you like.

## Matrix Config <Badge text="Obsolete" type="warning"/>

---

![](/matrix_control_node.png)  
::: warning Outdated!
This node is obsolete and has been replaced by the [webinterface](webinterface.html#options)!
:::
Matrix Config is the node to set the configuration of PixelIt via the Node-RED extension.
This node is bound directly to the core node because the core node can process the node directly.

### The tasks

- Configuration of PixelIt.

### The configuration

![](/matrix_control_node_config_0.png)  
**Name**: This value can be chosen as you like.

![](/matrix_control_node_config_1.png)
**Matrix Brightness**: Sets the default brightness of PixelIt. (0 - 255)

![](/matrix_control_node_config_2.png)  
**Matrix Type**: Sets the type of the matrix used. (info)

![](/matrix_control_node_config_3.png)  
**Matrix Correction**: Color correction can be applied here. (info)

![](/matrix_control_node_config_4.png)
**NTP Server**: Here the domain or IP address of the NTP server can be passed.

![](/matrix_control_node_config_5.png)  
**Clock offset**: Here the UTC offset is specified (https://en.wikipedia.org/wiki/List_of_UTC_time_offsets)

![](/matrix_control_node_config_6.png)  
**Scroll Text Default Delay**: Sets the default delay for the scroll text. (ms)

![](/matrix_control_node_config_7.png)  
**Bootscreen active**: Switches the boot screen on or off.

![](/matrix_control_node_config_8.png)  
**MQTT active**: Switches the MQTT client on or off.

![](/matrix_control_node_config_9.png)  
![](/matrix_control_node_config_10.png)  
![](/matrix_control_node_config_11.png)  
![](/matrix_control_node_config_12.png)  
![](/matrix_control_node_config_13.png)  
**MQTT MasterTopic**: This is the topic on which the PixelIt listens or transmits

## Screen Init

---

![](/screen_init.png)

Matrix Config is the node to set the configuration of the PixelIt via the Node-RED extension.
This node is bound directly to the core node because the core node can process the node directly.

### The tasks

- Naming the screen e.g. for the playlist
- Display duration

### The configuration

![](/screen_init_config_0.png)  
**Name**: This value can be chosen as you like.

![](/screen_init_config_1.png)  
**Screen Name**: Not relevant for alerts, but important for screens as this name is used in the playlist.

![](/screen_init_config_2.png)  
::: v-pre
**Duration**: The duration of the alert / screen in seconds, this value can also be passed dynamically by passing the appropriate message-val with double braces e.g. `{payload}}`.
:::

## Switch Animation

---

![](/switch_animation_node.png)

Switch Animation is the node to set a transition animation.

### The tasks

- Enables or disables the transition animation.
- Set the type of transition animation.

### The configuration

![](/switch_animation_node_config_0.png)  
**Name**: This value can be chosen as you like.

![](/switch_animation_node_config_1.png)  
**Animation active**: Enables or disables the transition animation.

![](/switch_animation_node_config_2.png)  
**Animation style**: Here you can set the style of the transition animation.

## Text

---

The following special characters are supported as of v0.3.7:
`€ ← ↑ → ↓ ★ 📁 ♥ ↧ 🚗 😀`
![](/special_characters.png)

![]()

::: warning ToDo
[Edit this page](https://github.com/pixelit-project/Docs/edit/master/src/nodered.md)
:::

### The tasks

-

### The configuration

![]()  
**Name**: This value can be chosen as you like.

## Bitmap

---

![]()

::: warning ToDo
[Edit this page](https://github.com/pixelit-project/Docs/edit/master/src/nodered.md)
:::

### The tasks

-

### The configuration

![]()  
**Name**: This value can be chosen as you like.

## Bitmap Animation

---

![]()

::: warning ToDo
[Edit this page](https://github.com/pixelit-project/Docs/edit/master/src/nodered.md)
:::

### The tasks

-

### The configuration

![]()  
**Name**: This value can be chosen as you like.

## Clock

---

![]()

::: warning ToDo
[Edit this page](https://github.com/pixelit-project/Docs/edit/master/src/nodered.md)
:::

### The tasks

-

### The configuration

![]()  
**Name**: This value can be chosen as you like.

## GPIO Control

---

![](/gpio_control_node.png)

::: warning ToDo
[Edit this page](https://github.com/pixelit-project/Docs/edit/master/src/nodered.md)
:::

### The tasks

-

### The configuration

![]()  
**Name**: This value can be chosen as you like.

## Troubleshooting

See [Troubleshooting](troubleshooting.html).
