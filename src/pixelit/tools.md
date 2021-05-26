---
sidebarDepth: 2
---

# Tools

## Pixel Creator

Mit den [Pixel Creator](https://pixelit.bastelbunker.de/PixelCreator) kannst Du deine eigene Bilder (aka BPM) erstellen und auch in der Pixel Gallery speichern.  
::: tip Tipp
Um die Funktion von **LiveDraw active** sowie **Show on Pixel It** nutzen zu können,  
muss man **Zulassen von gemischtem Inhalt** im Browser aktivieren.  
Es gibt da eine gute [Anleitung von Adobe](https://experienceleague.adobe.com/docs/target/using/experiences/vec/troubleshoot-composer/mixed-content.html?lang=de#task_FF297A08F66E47A588C14FD67C037B3A) für.
::::
![](/pixel_creator.png)

## Pixel Gallery

Die [Pixel Gallery](https://pixelit.bastelbunker.de/PixelGallery) ist die Sammelstelle der BMP (PixelArt Bilder), die BMPs die sich in der Pixel Gallery befinden sind auch über die API zu erreichen.  
So sind diese auch über die Pixel Gallery ID in den [Bitmap Node](#bitmap), [Bitmap Animation Node](#bitmap-animation) und auch in den [Adapter ioBroker](/ioBroker_pixelit/) verfügbar.
![](/pixel_gallery.png)

## ioBroker

Für ioBroker gibt es auch einen [Adapter](/ioBroker_pixelit/).

## Node-Red

Es gibt ein recht umfangreiches [Pixel It Node](https://flows.nodered.org/node/node-red-contrib-pixelit) für das Node-Red.  
Dies hilft Dir auf recht einfache Weise die Screens für die Pixel It zu erstellen, auch eine [Playlist](#playlist) der Screens wurde hier realisiert.

Es gibt auch einen Einsteiger Flow den man importieren kann: [Einsteiger Beispiel Flow](#einsteiger-flow) um die erste Hürde zu meistern.

Wer noch kein Node-Red am laufen hat sollte hier einmal reinschauen [Node-Red - Get Started](https://nodered.org/#get-started).

### Einsteiger Flow

---

Um die erste Hürde etwas abzuflachen, kann man sich diesen Flow mal importieren,
und etwas daran rumwerkeln und probieren.
![](/einsteiger_flow.png)  
Abhängigkeit / dependence: [Is online Node](https://flows.nodered.org/node/node-red-contrib-isonline)

```json
[
    {
        "id": "35ecb3fe.70a82c",
        "type": "Core",
        "z": "c11e4807.0cce48",
        "name": "Core",
        "ip": "192.168.0.137",
        "masterTopic": "",
        "x": 1550,
        "y": 340,
        "wires": [[]]
    },
    {
        "id": "2ae8103e.2bfa8",
        "type": "Alert Screen",
        "z": "c11e4807.0cce48",
        "name": "Alert Screen",
        "x": 1350,
        "y": 280,
        "wires": [["35ecb3fe.70a82c"]]
    },
    {
        "id": "a6448772.da11e8",
        "type": "Screen Data Update",
        "z": "c11e4807.0cce48",
        "name": "Screen Data Update",
        "x": 1320,
        "y": 320,
        "wires": [["35ecb3fe.70a82c"]]
    },
    {
        "id": "5d1d17a4.067008",
        "type": "Matrix Control",
        "z": "c11e4807.0cce48",
        "name": "Matrix Control",
        "x": 1340,
        "y": 360,
        "wires": [["35ecb3fe.70a82c"]]
    },
    {
        "id": "aaebf8a3.b93f98",
        "type": "Playlist Update",
        "z": "c11e4807.0cce48",
        "name": "Playlist Update",
        "x": 1340,
        "y": 400,
        "wires": [["35ecb3fe.70a82c"]]
    },
    {
        "id": "8dda7744.154fc8",
        "type": "comment",
        "z": "c11e4807.0cce48",
        "name": "Alert Message",
        "info": "",
        "x": 70,
        "y": 140,
        "wires": []
    },
    {
        "id": "2ae3a14.25d9d5e",
        "type": "inject",
        "z": "c11e4807.0cce48",
        "name": "Push",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": "0",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 70,
        "y": 180,
        "wires": [["a8d0668.e8c4098"]]
    },
    {
        "id": "8ad9260b.cf8098",
        "type": "Switch Animation",
        "z": "c11e4807.0cce48",
        "name": "Switch Animation",
        "aktiv": "true",
        "animation": "fade",
        "x": 970,
        "y": 180,
        "wires": [["b3ad9478.01eb48"]]
    },
    {
        "id": "b3ad9478.01eb48",
        "type": "Text",
        "z": "c11e4807.0cce48",
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
        "x": 1130,
        "y": 180,
        "wires": [["2ae8103e.2bfa8"]]
    },
    {
        "id": "a8d0668.e8c4098",
        "type": "Screen Init",
        "z": "c11e4807.0cce48",
        "name": "Screen Init",
        "inscreenName": "bra",
        "induration": "10",
        "x": 590,
        "y": 180,
        "wires": [["b3f96a15.ff4fb8"]]
    },
    {
        "id": "b3f96a15.ff4fb8",
        "type": "Bitmap Animation",
        "z": "c11e4807.0cce48",
        "name": "Bitmap Animation",
        "indata": "4",
        "inanimationDelay": "100",
        "inrubberbanding": "false",
        "inlimitLoops": "0",
        "x": 770,
        "y": 180,
        "wires": [["8ad9260b.cf8098"]]
    },
    {
        "id": "f3f2a895.193e38",
        "type": "http request",
        "z": "c11e4807.0cce48",
        "name": "Get Lux",
        "method": "GET",
        "ret": "txt",
        "url": "http://192.168.0.137/api/luxsensor",
        "tls": "",
        "x": 500,
        "y": 420,
        "wires": [["d0be6521.9a50c8"]]
    },
    {
        "id": "d0be6521.9a50c8",
        "type": "json",
        "z": "c11e4807.0cce48",
        "name": "Pars JSON",
        "property": "payload",
        "action": "",
        "pretty": false,
        "x": 650,
        "y": 420,
        "wires": [["b4533301.6b818"]]
    },
    {
        "id": "5206c6e3.422eb8",
        "type": "inject",
        "z": "c11e4807.0cce48",
        "name": "Every 3s",
        "repeat": "3",
        "crontab": "",
        "once": true,
        "onceDelay": "0",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 80,
        "y": 420,
        "wires": [["66da05c9.5ef47c"]]
    },
    {
        "id": "66da05c9.5ef47c",
        "type": "is online",
        "z": "c11e4807.0cce48",
        "name": "check PIXEL IT is online",
        "url": "192.168.0.137",
        "action": "1",
        "x": 310,
        "y": 420,
        "wires": [["f3f2a895.193e38"]]
    },
    {
        "id": "b4533301.6b818",
        "type": "function",
        "z": "c11e4807.0cce48",
        "name": "Brightness Logic",
        "func": "var lux = msg.payload.lux;\nvar brightness = 255;\nvar currentBrightness = context.get(\"currentBrightness\")||-1;\n\nif (lux <= 1)\n{\n    brightness = 20;\n}\nelse if (lux <= 5)\n{\n    brightness = 30;\n}\nelse if (lux <= 10)\n{\n    brightness = 45;\n}\nelse if (lux <= 20)\n{\n    brightness = 60;\n}\nelse if (lux <= 100)\n{\n    brightness = 80;\n}\nelse if (lux <= 250)\n{\n    brightness = 100;\n}\n\nmsg.provider = \"Brightness Logic\";\nmsg.brightness = brightness;\nnode.status({ fill: \"yellow\", shape: \"ring\", text: \"Lux: \" + lux.toFixed(3) +\" | Bri: \" + brightness });\n\nif (currentBrightness != brightness)\n{\n    node.status({ fill: \"green\", shape: \"ring\", text: \"Lux: \" + lux.toFixed(3) +\" | Bri: \" + brightness +\" send!\" });\n    context.set(\"currentBrightness\", brightness);\n    return msg;\n}",
        "outputs": 1,
        "noerr": 0,
        "x": 1090,
        "y": 420,
        "wires": [["5d1d17a4.067008"]]
    },
    {
        "id": "b127dcc7.abdee",
        "type": "comment",
        "z": "c11e4807.0cce48",
        "name": "Brightness Automatic",
        "info": "",
        "x": 100,
        "y": 380,
        "wires": []
    },
    {
        "id": "ab30e681.56e698",
        "type": "comment",
        "z": "c11e4807.0cce48",
        "name": "Internal Pixel It Clock [internal_clock]",
        "info": "",
        "x": 140,
        "y": 220,
        "wires": []
    },
    {
        "id": "e2f79120.fb761",
        "type": "inject",
        "z": "c11e4807.0cce48",
        "name": "Init",
        "repeat": "",
        "crontab": "",
        "once": true,
        "onceDelay": "0.1",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 70,
        "y": 260,
        "wires": [["341fc2fc.7d033e"]]
    },
    {
        "id": "341fc2fc.7d033e",
        "type": "Screen Init",
        "z": "c11e4807.0cce48",
        "name": "Screen Init",
        "inscreenName": "internal_clock",
        "induration": "10",
        "x": 650,
        "y": 260,
        "wires": [["4c2acf36.39c45"]]
    },
    {
        "id": "4c2acf36.39c45",
        "type": "Switch Animation",
        "z": "c11e4807.0cce48",
        "name": "Switch Animation",
        "aktiv": "true",
        "animation": "fade",
        "x": 970,
        "y": 260,
        "wires": [["9729bfde.a1f27"]]
    },
    {
        "id": "9729bfde.a1f27",
        "type": "Clock",
        "z": "c11e4807.0cce48",
        "name": "Clock",
        "inswitchAktiv": "true",
        "inswitchSec": "6",
        "inwithSeconds": "false",
        "incolorR": "255",
        "incolorG": "255",
        "incolorB": "255",
        "x": 1130,
        "y": 260,
        "wires": [["a6448772.da11e8"]]
    },
    {
        "id": "b92c80c4.a60e9",
        "type": "change",
        "z": "c11e4807.0cce48",
        "name": "Display Playlist",
        "rules": [
            {
                "t": "set",
                "p": "payload",
                "pt": "msg",
                "to": "[{\"screenName\":\"youtube\"},{\"screenName\":\"internal_clock\"}]",
                "tot": "json"
            }
        ],
        "action": "",
        "property": "",
        "from": "",
        "to": "",
        "reg": false,
        "x": 1100,
        "y": 500,
        "wires": [["aaebf8a3.b93f98"]]
    },
    {
        "id": "2723a613.25f89a",
        "type": "inject",
        "z": "c11e4807.0cce48",
        "name": "Instant",
        "repeat": "",
        "crontab": "",
        "once": true,
        "onceDelay": "1",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 80,
        "y": 500,
        "wires": [["b92c80c4.a60e9"]]
    },
    {
        "id": "c97178af.32b168",
        "type": "comment",
        "z": "c11e4807.0cce48",
        "name": "Display Playlist",
        "info": "",
        "x": 80,
        "y": 460,
        "wires": []
    },
    {
        "id": "bc796b29.c45958",
        "type": "http request",
        "z": "c11e4807.0cce48",
        "name": "",
        "method": "GET",
        "ret": "txt",
        "paytoqs": "ignore",
        "url": "https://www.youtube.com/c/Hausautomatisierung-com/featured",
        "tls": "",
        "persist": false,
        "proxy": "",
        "authType": "",
        "x": 290,
        "y": 340,
        "wires": [["4b5fd2b7.abda5c"]]
    },
    {
        "id": "c575cf12.ad6e3",
        "type": "inject",
        "z": "c11e4807.0cce48",
        "name": "Every 30min",
        "repeat": "1800",
        "crontab": "",
        "once": true,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 340,
        "wires": [["bc796b29.c45958"]]
    },
    {
        "id": "b9f66719.b28f08",
        "type": "comment",
        "z": "c11e4807.0cce48",
        "name": "YouTube Subscriber haus-automatisierung.com",
        "info": "",
        "x": 180,
        "y": 300,
        "wires": []
    },
    {
        "id": "f7a07316.502a7",
        "type": "Text",
        "z": "c11e4807.0cce48",
        "name": "Text",
        "intextString": "{{payload}}",
        "inbigFont": "false",
        "inscrollText": "false",
        "inscrollTextDelay": "0",
        "incenterText": "true",
        "inposX": "7",
        "inposY": "1",
        "incolorR": "255",
        "incolorG": "255",
        "incolorB": "255",
        "x": 990,
        "y": 340,
        "wires": [["3c9b6509.9b36aa"]]
    },
    {
        "id": "2cae9cc6.c4b114",
        "type": "Switch Animation",
        "z": "c11e4807.0cce48",
        "name": "Switch Animation",
        "aktiv": "true",
        "animation": "fade",
        "x": 830,
        "y": 340,
        "wires": [["f7a07316.502a7"]]
    },
    {
        "id": "945e4c9f.0d3f3",
        "type": "Screen Init",
        "z": "c11e4807.0cce48",
        "name": "Screen Init",
        "inscreenName": "youtube",
        "induration": "10",
        "x": 650,
        "y": 340,
        "wires": [["2cae9cc6.c4b114"]]
    },
    {
        "id": "3c9b6509.9b36aa",
        "type": "Bitmap",
        "z": "c11e4807.0cce48",
        "name": "Bitmap",
        "indata": "45",
        "inposX": "0",
        "inposY": "0",
        "inwidth": "8",
        "inheight": "8",
        "x": 1120,
        "y": 340,
        "wires": [["a6448772.da11e8"]]
    },
    {
        "id": "4b5fd2b7.abda5c",
        "type": "function",
        "z": "c11e4807.0cce48",
        "name": "",
        "func": "const test = msg.payload.match(/\"subscriberCountText\":{\"simpleText\":\"(\\d+.\\d+)/);\nmsg.payload = test[1].replace('.','');\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "x": 480,
        "y": 340,
        "wires": [["945e4c9f.0d3f3"]]
    }
]
```

### Core

---

![](/core_node.png)

Der Core Node ist das Herzstück von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

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

#### Die Konfiguration:

![](/core_node_config.png)

**Name**: Dieser ist frei wählbar.  
**IP-Address**: Hier kann die Ip-Adresse der Pixel It eingetragen werden um direkt die HTTP-API zu nutzen.  
**Master-Topic**: Hier kann der Master-Topic eingetragen werden um den MQTT-Tpoic zu generieren, dieser wird dann in der "msg.topic" weitergegeben

### Alert Screen

---

![](/alert_screen_node.png)

Alert Screen Node ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

-   Den ankommenden Screen als Alert Tagen so das der Core Node weiß damit umzugehen.

#### Die Konfiguration:

![](/alert_screen_node_config.png)

**Name**: Dieser ist frei wählbar.

### Screen Data Update

---

![](/screen_data_update_node.png)

Screen Data Update ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

-   Den ankommenden Screen als Data Update für einen Screen Tagen so das der Core Node weiß damit umzugehen.

#### Die Konfiguration:

---

![](/screen_data_update_node_config.png)

**Name**: Dieser ist frei wählbar.

### Matrix Control

---

![](/matrix_control_node.png)  
Matrix Control ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

-   Den ankommenden Datenstrom als Matrix Steuerbefehle Tagen so das der Core Node weiß damit umzugehen.

#### Die Konfiguration:

![](/matrix_control_node_config.png)

**Name**: Dieser ist frei wählbar.

### Playlist Update

---

![](/playlist_update_node.png)

Playlist Update ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

-   Den ankommenden Datenstrom als Playlist Tagen so das der Core Node weiß damit umzugehen.

#### Die Konfiguration:

![](/playlist_update_node_config.png)

**Name**: Dieser ist frei wählbar.

### Playlist

---

![](/)

Die Playlist wird als ein Json erstellt, diese die Namen beinhaltet die zuvor in der [Screen Init Node](#screen-init) festgelegt wurden.

#### Die Aufgaben:

-   Abspielreihenfolge festlegen.

#### Die Konfiguration:

**Name**: Dieser ist frei wählbar.

### Matrix Config <Badge text="Obsolete" type="warning"/>

---

![](/matrix_control_node.png)  
::: warning Veraltet!
Diese Node ist veraltet und wurde durch das [Webinterface](/pixelit/webinterface.html#options) ersetzt!
:::
Matrix Config ist ein der Node um die Configuration der Pixel It über die Node-RED Erweiterung zu setzten.
Dieser Node wird direkt an den Core Node gebunden da dieser den Node direkt verarbeiten kann.

#### Die Aufgaben:

-   Konfiguration der Pixel It.

#### Die Konfiguration:

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

### Screen Init

---

![](/screen_init.png)

Matrix Config ist ein der Node um die Configuration der Pixel It über die Node-RED Erweiterung zu setzten.
Dieser Node wird direkt an den Core Node gebunden da dieser den Node direkt verarbeiten kann.

#### Die Aufgaben:

-   Benennen des Screen z.B. für die Playlist
-   Anzeigedauer

#### Die Konfiguration:

![](/screen_init_config_0.png)  
**Name**: Dieser ist frei wählbar.

![](/screen_init_config_1.png)  
**Screen Name**: Für Alerts nicht von Bedeutung, aber für Screens wichtig da dieser Name in der Playlist angeben wird.

![](/screen_init_config_2.png)  
::: v-pre
**Duration**: Die Anzeigedauer des Alerts / Screens in Sekunden, dieser Wert kann auch dynamisch übergeben werden in den man die passende Message-Val mit doppelt Geschweifte Klammern übergibt z.B.`{{payload}}`
:::

### Switch Animation

---

![](/switch_animation_node.png)

Switch Animation ist ein der Node um eine Übergangsanimation zu setzten.

#### Die Aufgaben:

-   Aktiver oder deaktiviert die Übergangsanimation.
-   Art der Übergangsanimation festlegen.

#### Die Konfiguration:

![](/switch_animation_node_config_0.png)  
**Name**: Dieser ist frei wählbar.

![](/switch_animation_node_config_1.png)  
**Animation aktiv**: Aktiver oder deaktiviert die Übergangsanimation.

![](/switch_animation_node_config_2.png)  
**Animation style**: Hier kann die Art der Übergangsanimation festgelegt werden.

### Text

---

![]()

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelit/tools.md)
:::

#### Die Aufgaben:

-

#### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.

### Bitmap

---

![]()

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelit/tools.md)
:::

#### Die Aufgaben:

-

#### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.

### Bitmap Animation

---

![]()

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelit/tools.md)
:::

#### Die Aufgaben:

-

#### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.

### Clock

---

![]()

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelit/tools.md)
:::

#### Die Aufgaben:

-

#### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.

### GPIO Control

---

![](/gpio_control_node.png)

::: warning ToDo
[Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelit/tools.md)
:::

#### Die Aufgaben:

-

#### Die Konfiguration:

![]()  
**Name**: Dieser ist frei wählbar.
