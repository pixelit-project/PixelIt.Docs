# Einstellungen

## Grundeinstellungen

![](/iobroker_pixelIt_config.png)

- IP-Adresse: IP-Adresse der Pixel It.
- Abfrage-Intervall (sek): Gibt den Abfrage-Intervall der Sensoren an.

## Datenpunkte

![](/iobroker_pixelIt_datapoints.png)

- **brightness**:
  - Hier wird die Helligkeit in Prozent von 0 - 100 angeben.
- **brightness_255**:
  - Hier wird die Helligkeit in Steps von 0 - 255 angeben.
- **ext_message**:
  - Hier kann man einen komplexen Screen in Form eines [JSON von diesen Aufbau](/pixelit/api.html#screen) übergeben.
  - Es werden nur Kommands von den Endpunkt `/api/screen` akzeptiert!
- **message**:
  - Hier kann sehr einfach ein simpler Screen übergeben werden.
  - Der Aufbau sie z.B. so aus `Miau!;255,255,255;387`
    - **_Miau!_**: Dein Text
    - **_255,255,255_**: Farbe des Textes [RGB](https://www.w3schools.com/colors/colors_picker.asp)
    - **_387_**: BMP ID von der [Pixel Gallery](/pixelit/tools.html#pixel-gallery)
