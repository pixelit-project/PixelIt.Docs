---
sidebarDepth: 2
---

# Node-Red

Es gibt ein recht umfangreiches [Pixel It Node](https://flows.nodered.org/node/node-red-contrib-pixelit) für das Node-Red.  
Dies hilft Dir auf recht einfache Weise die Screens für die Pixel It zu erstellen, auch eine [Playlist](#playlist) der Screens wurde hier realisiert.

Es gibt auch einen Einsteiger Flow den man importieren kann: [Einsteiger Beispiel Flow](#einsteiger-flow) um die erste Hürde zu meistern.

Wer noch kein Node-Red am laufen hat sollte hier einmal reinschauen [Node-Red - Get Started](https://nodered.org/#get-started).

## Einsteiger Flow

---

Um die erste Hürde etwas abzuflachen, kann man sich diesen Flow mal importieren,
und etwas daran rumwerkeln und probieren.
![](/einsteiger_flow.png)  

::: details Hier aufklappen!

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
        "wires": [
            []
        ]
    },
    {
        "id": "2ae8103e.2bfa8",
        "type": "Alert Screen",
        "z": "6cea977d.420938",
        "name": "Alert Screen",
        "x": 1390,
        "y": 220,
        "wires": [
            [
                "35ecb3fe.70a82c"
            ]
        ]
    },
    {
        "id": "a6448772.da11e8",
        "type": "Screen Data Update",
        "z": "6cea977d.420938",
        "name": "Screen Data Update",
        "x": 1360,
        "y": 260,
        "wires": [
            [
                "35ecb3fe.70a82c"
            ]
        ]
    },
    {
        "id": "5d1d17a4.067008",
        "type": "Matrix Control",
        "z": "6cea977d.420938",
        "name": "Matrix Control",
        "x": 1380,
        "y": 300,
        "wires": [
            [
                "35ecb3fe.70a82c"
            ]
        ]
    },
    {
        "id": "aaebf8a3.b93f98",
        "type": "Playlist Update",
        "z": "6cea977d.420938",
        "name": "Playlist Update",
        "x": 1360,
        "y": 420,
        "wires": [
            [
                "35ecb3fe.70a82c"
            ]
        ]
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
        "wires": [
            [
                "a8d0668.e8c4098"
            ]
        ]
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
        "wires": [
            [
                "b3ad9478.01eb48"
            ]
        ]
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
        "wires": [
            [
                "2ae8103e.2bfa8"
            ]
        ]
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
        "wires": [
            [
                "b3f96a15.ff4fb8"
            ]
        ]
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
        "wires": [
            [
                "8ad9260b.cf8098"
            ]
        ]
    },
    {
        "id": "ab30e681.56e698",
        "type": "comment",
        "z": "6cea977d.420938",
        "name": "Internal Pixel It Clock [internal_clock]",
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
        "wires": [
            [
                "341fc2fc.7d033e"
            ]
        ]
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
        "wires": [
            [
                "4c2acf36.39c45"
            ]
        ]
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
        "wires": [
            [
                "9729bfde.a1f27"
            ]
        ]
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
        "wires": [
            [
                "a6448772.da11e8"
            ]
        ]
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
        "wires": [
            [
                "aaebf8a3.b93f98"
            ]
        ]
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
        "wires": [
            [
                "b92c80c4.a60e9"
            ]
        ]
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
        "wires": [
            [
                "c0557253.0f67d"
            ]
        ]
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
        "wires": [
            [
                "a85e1cb0.02ca2"
            ]
        ]
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
        "wires": [
            [
                "a6448772.da11e8"
            ]
        ]
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
        "wires": [
            [
                "cdd9e5e1.ed7df8"
            ]
        ]
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
        "wires": [
            [
                "416cc4d6.6470ec"
            ]
        ]
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
        "wires": [
            [
                "83e02357.4294c"
            ]
        ]
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
        "wires": [
            [
                "c0557253.0f67d"
            ]
        ]
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
        "wires": [
            [
                "82571a70.401018"
            ]
        ]
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
        "wires": [
            [
                "5611f6ae.c02588"
            ]
        ]
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
        "wires": [
            [
                "98d10835.b7bb08"
            ]
        ]
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
        "wires": [
            [
                "97f93071.fa143"
            ]
        ]
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
        "wires": [
            [
                "3ed54605.97b37a"
            ]
        ]
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
        "wires": [
            [
                "2d677b17.996484"
            ]
        ]
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
        "wires": [
            [
                "a6448772.da11e8"
            ]
        ]
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
        "wires": [
            [
                "b8452538.5d65c8"
            ]
        ]
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

Der Core Node ist das Herzstück von der Pixel It Node-RED Erweiterung.

### Die Aufgaben:

-   Das entgegen nehmen und speichern / updaten von Screens.
-   Das Handling der Alerts.
-   Das entgegen nehmen von den Playlisten.
-   Das abspielen der Playlisten.
-   Das entgegen nehmen der Konfiguration der Pixel It.
-   Das entgegen nehmen von Controls.
-   Die optionale Kommunikation mit dem Webservice um die Bitmap-IDs abzufragen.
-   Dieser werden dann auch im RAM Cache vorgehalten.
-   Der Aufbau des JSON.
-   Die Kommunikation mit der Pixel It.

### Die Konfiguration:

![](/core_node_config.png)

**Name**: Dieser ist frei wählbar.  
**IP-Address**: Hier kann die Ip-Adresse der Pixel It eingetragen werden um direkt die HTTP-API zu nutzen.  
**Master-Topic**: Hier kann der Master-Topic eingetragen werden um den MQTT-Tpoic zu generieren, dieser wird dann in der "msg.topic" weitergegeben

## Alert Screen

---

![](/alert_screen_node.png)

Alert Screen Node ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

### Die Aufgaben:

-   Den ankommenden Screen als Alert Tagen so das der Core Node weiß damit umzugehen.

### Die Konfiguration:

![](/alert_screen_node_config.png)

**Name**: Dieser ist frei wählbar.

## Screen Data Update

---

![](/screen_data_update_node.png)

Screen Data Update ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

### Die Aufgaben:

-   Den ankommenden Screen als Data Update für einen Screen Tagen so das der Core Node weiß damit umzugehen.

### Die Konfiguration:

---

![](/screen_data_update_node_config.png)

**Name**: Dieser ist frei wählbar.

## Matrix Control

---

![](/matrix_control_node.png)  
Matrix Control ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

### Die Aufgaben:

-   Den ankommenden Datenstrom als Matrix Steuerbefehle Tagen so das der Core Node weiß damit umzugehen.

### Die Konfiguration:

![](/matrix_control_node_config.png)

**Name**: Dieser ist frei wählbar.

## Playlist Update

---

![](/playlist_update_node.png)

Playlist Update ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

### Die Aufgaben:

-   Den ankommenden Datenstrom als Playlist Tagen so das der Core Node weiß damit umzugehen.

### Die Konfiguration:

![](/playlist_update_node_config.png)

**Name**: Dieser ist frei wählbar.

## Playlist

---

![](/)

Die Playlist wird als ein Json erstellt, diese die Namen beinhaltet die zuvor in der [Screen Init Node](#screen-init) festgelegt wurden.

### Die Aufgaben:

-   Abspielreihenfolge festlegen.

### Die Konfiguration:

**Name**: Dieser ist frei wählbar.

## Matrix Config <Badge text="Obsolete" type="warning"/>

---

![](/matrix_control_node.png)  
::: warning Veraltet!
Diese Node ist veraltet und wurde durch das [Webinterface](webinterface.html#options) ersetzt!
:::
Matrix Config ist ein der Node um die Configuration der Pixel It über die Node-RED Erweiterung zu setzten.
Dieser Node wird direkt an den Core Node gebunden da dieser den Node direkt verarbeiten kann.

### Die Aufgaben:

-   Konfiguration der Pixel It.

### Die Konfiguration:

![](/matrix_control_node_config_0.png)  
**Name**: Dieser ist frei wählbar.

![](/matrix_control_node_config_1.png)
**Matrix Brightness**: Stellt die Standard Helligkeit der Pixel It ein. (0 - 255)

![](/matrix_control_node_config_2.png)  
**Matrix Type**: Stellt den Type der der verwendeten Matrix ein. (Info)

![](/matrix_control_node_config_3.png)  
**Matrix Correction**: Hier kann eine Farbkorrektur vorgenommen werden. (Info)

![](/matrix_control_node_config_4.png)
**NTP Server**: Hier kann der Domain oder IP-Adresse des NTP Servers übergeben werden

![](/matrix_control_node_config_5.png)  
**Clock offset**: Hier wird der UTC Offset angeben (https://en.wikipedia.org/wiki/List_of_UTC_time_offsets)

![](/matrix_control_node_config_6.png)  
**Scroll Text Default Delay**: Hier wird der Default Delay für den Scrolltext eingestellt. (ms)

![](/matrix_control_node_config_7.png)  
**Bootscreen aktiv**: Schaltet den Bootscreen ein oder aus.

![](/matrix_control_node_config_8.png)  
**MQTT aktiv**: Schaltet den MQTT Client ein oder aus.

![](/matrix_control_node_config_9.png)  
![](/matrix_control_node_config_10.png)  
![](/matrix_control_node_config_11.png)  
![](/matrix_control_node_config_12.png)  
![](/matrix_control_node_config_13.png)  
**MQTT MasterTopic**: Dies ist der Topic auf den die Pixel It lauscht bzw. Sendet

## Screen Init

---

![](/screen_init.png)

Matrix Config ist ein der Node um die Configuration der Pixel It über die Node-RED Erweiterung zu setzten.
Dieser Node wird direkt an den Core Node gebunden da dieser den Node direkt verarbeiten kann.

### Die Aufgaben:

-   Benennen des Screen z.B. für die Playlist
-   Anzeigedauer

### Die Konfiguration:

![](/screen_init_config_0.png)  
**Name**: Dieser ist frei wählbar.

![](/screen_init_config_1.png)  
**Screen Name**: Für Alerts nicht von Bedeutung, aber für Screens wichtig da dieser Name in der Playlist angeben wird.

![](/screen_init_config_2.png)  
::: v-pre
**Duration**: Die Anzeigedauer des Alerts / Screens in Sekunden, dieser Wert kann auch dynamisch übergeben werden in den man die passende Message-Val mit doppelt Geschweifte Klammern übergibt z.B.`{{payload}}`
:::

## Switch Animation

---

![](/switch_animation_node.png)

Switch Animation ist ein der Node um eine Übergangsanimation zu setzten.

### Die Aufgaben:

-   Aktiver oder deaktiviert die Übergangsanimation.
-   Art der Übergangsanimation festlegen.

### Die Konfiguration:

![](/switch_animation_node_config_0.png)  
**Name**: Dieser ist frei wählbar.

![](/switch_animation_node_config_1.png)  
**Animation aktiv**: Aktiver oder deaktiviert die Übergangsanimation.

![](/switch_animation_node_config_2.png)  
**Animation style**: Hier kann die Art der Übergangsanimation festgelegt werden.

## Text

---

Es werden ab v0.3.7 folgende Sonderzeichen unterstützt:
`€ ← ↑ → ↓ ★ 📁 ♥ ↧ 🚗 😀`
![](/special_characters.png)

![]()

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/srctools.md)
:::

### Die Aufgaben:

-

### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.

## Bitmap

---

![]()

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/srctools.md)
:::

### Die Aufgaben:

-

### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.

## Bitmap Animation

---

![]()

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/srctools.md)
:::

### Die Aufgaben:

-

### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.

## Clock

---

![]()

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/srctools.md)
:::

### Die Aufgaben:

-

### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.

## GPIO Control

---

![](/gpio_control_node.png)

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/srctools.md)
:::

### Die Aufgaben:

-

### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.
