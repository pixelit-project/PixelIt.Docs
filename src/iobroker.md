---
sidebarDepth: 2
---

# ioBroker

This adapter allows you to send screen to the [Pixel It]() from ioBroker. It queries the optional sensors of [Pixel It]() , and the API of the [Pixel Gallery](tools.html#pixel-gallery) is also implemented in the adapter.


## Basic settings

![](/iobroker_pixelIt_config.png)

- IP address: IP address of the PixelIt.

## Data points

![](/iobroker_pixelIt_datapoints.png)

- **brightness**:
  - Here the brightness is specified in percent from 0 - 100.
- **brightness_255**:
  - Here the brightness is specified in steps from 0 - 255.
- **ext_message**:
  - Here you can pass a complex screen in the form of a [JSON from this build](api.html#screen).
  - Only commands from the endpoint `/api/screen` are accepted!
- **message**:
  - Here you can easily pass a simple screen.
  - The structure looks like this `Miau!;255,255,255;387`.
    - **_Miau!_**: Your text
    - **_255,255,255_**: Color of the text [RGB](https://www.w3schools.com/colors/colors_picker.asp)
    - **_387_**: BMP ID from the [Pixel Gallery](tools.html#pixel-gallery)
- **show_clock**:
  - Shows the clock screen.
- **sleep_mode**:
  - Activates or deactivates the [Sleep Mode](api.html#sleep-mode).