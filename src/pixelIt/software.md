# Software
## Firmware Flashen

### Downloads:
* [PixelIt Firmware](https://www.bastelbunker.de/wp-content/uploads/PixelIt.zip)
* [ESPEasy Flasher](https://www.bastelbunker.de/wp-content/uploads/ESPEasy_Flasher.zip)

Zum flashen des ESP8266 nutzen wir der Einfachheit zur liebe den ESPEasy Flasher,  
es muss nach den Entpacken der ESPEasy_Flasher.zip nur noch die aktuelle PixelIt.bin in den Order des ESPEasy Flashers kopiert werden.  
  
Nun haben wir nach den starten der FlashESP8266.exe zwei Dropdown-Menüs:
![An image](/flash_esp8266.png)


#### COM-Port:
Hier muss der Port gewählt werden wo ihr euren Wemos D1 mini (oder der gleichen) anschossen habt.  

#### Firmware: 
Hier haben wir nun zwei Punkte die CleanFlash.bin und PixelIt.bin.  
CleanFlash.bin: Hat die Aufgabe den kompletten Flash des ESP´s zu nullen, was sehr hilfreich sein kann wen der ESP schon für andere Projekte genutzt wurde und Probleme mit den aktuellen Projekt macht  (z.B. macht kein Hotspot auf)
PixelIt.bin: ist die Firmware der Pixel It :)  

Jetzt muss man nur noch auf den Button Flash drücken und etwas warten.   

## Nach dem Flashen
Du hast erfolgreich geflasht? Dann lass uns direkt weiter machen.  

Jetzt sollte der ESP ein eigenes WLAN aufbauen. Mit dem du dich verbinden sollst.     
Ab dann sollte der Rest Selbstverständlich sein.  

Wenn alles geklappt hat und die Uhr sich mit dem WLAN und dahinter liegendem Internet verbinden konnte zeigt sie auch schon eine Uhrzeit an.  

Als nächstes geht es dann weiter mit Node-Red. Hier ein Link zur Installation: [Node-Red - Get Started](https://nodered.org/#get-started)
 
Wenn Node-Red installiert ist hat IdleBit einen netten Einsteiger Flow erstellt den man importieren kann: [Einsteiger Beispiel Flow](https://wiki.dietru.de/books/pixel-it/page/der-einsteiger-beispiel-flow)
