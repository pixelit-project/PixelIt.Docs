---
sidebarDepth: 2
---

# ioBroker

This adapter allows you to send screen to the [Pixel It]() from ioBroker. It queries the optional sensors of [Pixel It]() , and the API of the [Pixel Gallery](tools.html#pixel-gallery) is also implemented in the adapter.


## Basic settings

![](/iobroker_pixelIt_config.png)

- IP address: IP address of the PixelIt.
- Polling interval (sec): Specifies the polling interval of the sensors.

## Data points

![](/iobroker_pixelIt_datapoints.png)

- **brightness**:
  - Here the brightness is specified in percent from 0 - 100.
- **brightness_255**:
  - Here the brightness is specified in steps from 0 - 255.
- **ext_message**:
  - Hier kann man einen komplexen Screen in Form eines [JSON von diesen Aufbau](api.html#screen) übergeben.
  - Es werden nur Kommands von den Endpunkt `/api/screen` akzeptiert!
- **message**:
  - Hier kann sehr einfach ein simpler Screen übergeben werden.
  - Der Aufbau sie z.B. so aus `Miau!;255,255,255;387`
    - **_Miau!_**: Dein Text
    - **_255,255,255_**: Farbe des Textes [RGB](https://www.w3schools.com/colors/colors_picker.asp)
    - **_387_**: BMP ID von der [Pixel Gallery](tools.html#pixel-gallery)