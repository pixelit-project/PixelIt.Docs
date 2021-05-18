# Firmware
## Flashen

### Downloads:
* [PixelIt Firmware](https://github.com/o0shojo0o/PixelIt/releases)
* [ESPEasy Flasher](https://www.bastelbunker.de/wp-content/uploads/ESPEasy_Flasher.zip)

Zum flashen des ESP8266 nutzen wir der Einfachheit zur liebe den ESPEasy Flasher,  
es muss nach den Entpacken der ESPEasy_Flasher.zip nur noch die aktuelle PixelIt.bin in den Order des ESPEasy Flashers kopiert werden.  
  
Nun haben wir nach den starten der FlashESP8266.exe zwei Dropdown-Menüs:
![](/flash_esp8266.png)


#### COM-Port:
Hier muss der Port gewählt werden wo ihr euren Wemos D1 mini (oder der gleichen) anschossen habt.  

#### Firmware: 
Hier haben wir nun zwei Punkte die CleanFlash.bin und PixelIt.bin.  
CleanFlash.bin: Hat die Aufgabe den kompletten Flash des ESP´s zu nullen, was sehr hilfreich sein kann wen der ESP schon für andere Projekte genutzt wurde und Probleme mit den aktuellen Projekt macht  (z.B. macht kein Hotspot auf)
PixelIt.bin: ist die Firmware der Pixel It :)  

Jetzt muss man nur noch auf den Button Flash drücken und etwas warten.   

## Einrichtung
Nach dem Falshen sollte nun die Pixel It ein eigenes WLAN aufspannen.  
Wenn man sich mit diesem verbunden hat, kann man dort die WLAN Daten seinses Netzwerkes eingeben und Speichern.  
Wenn alles funktioniert hat und die Pixel It mit dem WLAN und dem liegendem Internet verbunden ist, sollte nun eine Uhrzeit zu sehen sein.  
  
Nun kann man sich mit dem [Webinterface](/pixelit/webinterface.html) was über die IP-Adresse der Pixel It verbinden, um in den Breiche [Options](/pixelit/webinterface.html#options) die restliche Einrichtung abzuschließen.  
  
Nun sollte der nächte Schritt sein, sich den [Tools Bereich](/pixelit/tools.html) anzusehen, um die vorhanden Möglichkeiten der Erstellung von Anzeigen (*hier meiste Screens genannt*) zu sichten.
