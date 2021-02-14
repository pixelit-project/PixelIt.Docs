# Node-Red Nodes

## Core
![](/core_node.png)   
  
Der Core Node ist das Herzstück von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

* Das entgegen nehmen und speichern / updaten von Screens.
* Das Handling der Alerts.
* Das entgegen nehmen von den Playlisten.
* Das abspielen der Playlisten.
* Das entgegen nehmen der Konfiguration der Pixel It.
* Das entgegen nehmen von Controls.
* Die optionale Kommunikation mit dem Webservice um die Bitmap-IDs abzufragen.
* Dieser werden dann auch im RAM Cache vorgehalten.
* Der Aufbau des JSON.
* Die Kommunikation mit der Pixel It. 

#### Die Konfiguration:
![](/core_node_config.png)  

**Name**: Dieser ist frei wählbar.  
**IP-Address**: Hier kann die Ip-Adresse der Pixel It eingetragen werden um direkt die HTTP-API zu nutzen.  
**Master-Topic**: Hier kann der Master-Topic eingetragen werden um den MQTT-Tpoic zu generieren, dieser wird dann in der "msg.topic" weitergegeben 


## Alert Screen
![](/alert_screen_node.png)   
  
Alert Screen Node ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

* Den ankommenden Screen als Alert Tagen so das der Core Node weiß damit umzugehen.

#### Die Konfiguration:
![](/alert_screen_node_config.png)  

**Name**: Dieser ist frei wählbar.



## Screen Data Update
![](/screen_data_update_node.png)   
  
Screen Data Update ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

* Den ankommenden Screen als Data Update für einen Screen Tagen so das der Core Node weiß damit umzugehen.

#### Die Konfiguration:
![](/screen_data_update_node_config.png)  

**Name**: Dieser ist frei wählbar.



## Matrix Control
![](/matrix_control_node.png)   
  
Matrix Control ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

* Den ankommenden Datenstrom als Matrix Steuerbefehle Tagen so das der Core Node weiß damit umzugehen.

#### Die Konfiguration:
![](/matrix_control_node_config.png)  

**Name**: Dieser ist frei wählbar.



## Playlist Update
![](/playlist_update_node.png)   
  
Playlist Update ist ein kleiner Helfer von der Pixel It Node-RED Erweiterung.

#### Die Aufgaben:

* Den ankommenden Datenstrom als Playlist Tagen so das der Core Node weiß damit umzugehen.

#### Die Konfiguration:
![](/playlist_update_node_config.png)  

**Name**: Dieser ist frei wählbar.



## Matrix Config
![](/matrix_control_node.png)   
  
Matrix Config ist ein der Node um die Configuration der Pixel It über die Node-RED Erweiterung zu setzten.
Dieser Node wird direkt an den Core Node gebunden da dieser den Node direkt verarbeiten kann.

#### Die Aufgaben:

* Konfiguration der Pixel It.

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



## Screen Init
![](/screen_init.png)   
  
Matrix Config ist ein der Node um die Configuration der Pixel It über die Node-RED Erweiterung zu setzten.
Dieser Node wird direkt an den Core Node gebunden da dieser den Node direkt verarbeiten kann.

#### Die Aufgaben:

* Benennen des Screen z.B. für die Playlist
* Anzeigedauer

#### Die Konfiguration:
![](/screen_init_config_0.png)  
**Name**: Dieser ist frei wählbar.

![](/screen_init_config_1.png)  
**Screen Name**: Für Alerts nicht von Bedeutung, aber für Screens wichtig da dieser Name in der Playlist angeben wird. 

![](/screen_init_config_2.png)  
::: v-pre
**Duration**:  Die Anzeigedauer des Alerts / Screens in Sekunden, dieser Wert kann auch dynamisch übergeben werden in den man die passende Message-Val mit doppelt Geschweifte Klammern übergibt z.B.`{{payload}}`
:::

## Switch Animation
![](/switch_animation_node.png)   
  
Switch Animation ist ein der Node um eine Übergangsanimation zu setzten.

#### Die Aufgaben:

* Aktiver oder deaktiviert die Übergangsanimation.
* Art der Übergangsanimation festlegen.

#### Die Konfiguration:
![](/switch_animation_node_config_0.png)   
**Name**: Dieser ist frei wählbar.

![](/switch_animation_node_config_1.png)   
**Animation aktiv**: Aktiver oder deaktiviert die Übergangsanimation.

![](/switch_animation_node_config_2.png)   
**Animation style**: Hier kann die Art der Übergangsanimation festgelegt werden.



## Text
![]()   
  
::: warning ToDo
 [Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelIt/nodered_nodes.md)
:::

#### Die Aufgaben:

* 

#### Die Konfiguration:
![]()   
**Name**: Dieser ist frei wählbar.




## Bitmap
![]()   
  
::: warning ToDo
 [Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelIt/nodered_nodes.md)
:::

#### Die Aufgaben:

* 

#### Die Konfiguration:
![]()   
**Name**: Dieser ist frei wählbar.




## Bitmap Animation
![]()   
  
::: warning ToDo
 [Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelIt/nodered_nodes.md)
:::

#### Die Aufgaben:

* 

#### Die Konfiguration:
![]()   
**Name**: Dieser ist frei wählbar.




## Clock
![]()   
  
::: warning ToDo
 [Edit this page](https://github.com/o0shojo0o/doc/edit/master/src/pixelIt/nodered_nodes.md)
:::

#### Die Aufgaben:

* 

#### Die Konfiguration:
![]()   
**Name**: Dieser ist frei wählbar.