# Firmware

- [PixelIt Firmware](https://github.com/pixelit-project/PixelIt/releases/latest).

Choose the firmware for your exact board. For a Wemos D1 mini (ESP8266), the 2.6.0 release provides `firmware_v2.6.0_ESP8266_d1_mini.bin` (see the [components list](hardware.html#diy-components-list)).

## Flashing (Web)

Select the hardware you are using and then press the connect button.

<iframe id="dynamicFrame" title="PixelIt USB firmware installer" src="/pixelit_flasher/index.html" width="100%" height="400px" frameborder="0" ></iframe>

::: tip Flashing ESP32
For a first installation or a full upgrade over USB, select the matching "first install" image. In GitHub release downloads, these images end in `.full-upgrade.bin`. For an OTA update through the WebUI, use the matching application image without `.full-upgrade` in its filename. For example, Ulanzi TC001 uses `firmware_v2.6.0_ESP32_ulanzi.full-upgrade.bin` for a full USB installation and `firmware_v2.6.0_ESP32_ulanzi.bin` for OTA.
:::

## Flashing ESP8266 (Windows)

The Webflasher above is the easiest browser-based option. For command-line flashing, use Python 3.10 or newer and esptool 5.x. Create and activate a virtual environment in PowerShell:

```powershell
py -3 -m venv pixelit-flash-env
.\pixelit-flash-env\Scripts\Activate.ps1
python -m pip install "esptool>=5,<6"
python -m esptool version
```

Replace `COM3` with your board's serial port, then flash the matching ESP8266 image:

```powershell
python -m esptool --chip esp8266 --port COM3 --baud 460800 write-flash 0x0 firmware_v2.6.0_ESP8266_d1_mini.bin
```

#### COM-Port

Find the USB serial port in Windows Device Manager. Close other programs using that port before flashing.

#### Firmware

Download the `.bin` for your board from the stable release. The example above is for an ESP8266 D1 mini. It is not an ESP32 image.

A full erase removes saved settings and WiFi credentials. Use it only when a clean installation is needed, then repeat the write command:

```powershell
python -m esptool --chip esp8266 --port COM3 erase-flash
```

## Flashing (macOS)

These commands target ESP8266 boards. For ESP32 USB installation, use the matching first-install image in the Webflasher.

#### Install esptool

Use Python 3.10 or newer and install esptool 5.x in a virtual environment:

```sh
python3 -m venv pixelit-flash-env
source pixelit-flash-env/bin/activate
python -m pip install 'esptool>=5,<6'
python -m esptool version
```

#### Find your board

```sh
ls /dev/cu.usb*
```

Replace `/dev/cu.usbserial-1337` below with the port shown for your board.

#### Erase and flash the firmware

A normal write erases the sectors it needs. To install the D1 mini image:

```sh
python -m esptool --chip esp8266 --port /dev/cu.usbserial-1337 --baud 460800 write-flash 0x0 firmware_v2.6.0_ESP8266_d1_mini.bin
```

If a clean installation is required, first erase all flash, then run the write command again. A full erase removes saved settings and WiFi credentials:

```sh
python -m esptool --chip esp8266 --port /dev/cu.usbserial-1337 erase-flash
```

## Flashing (Linux)

These commands target ESP8266 boards. For ESP32 USB installation, use the matching first-install image in the Webflasher.

Use Python 3.10 or newer and install esptool 5.x in a virtual environment:

```sh
python3 -m venv pixelit-flash-env
source pixelit-flash-env/bin/activate
python -m pip install 'esptool>=5,<6'
python -m esptool version
```

#### Find your board

```sh
ls /dev/ttyUSB* /dev/ttyACM*
```

Some patterns may have no matches. Use the port belonging to your board, such as `/dev/ttyUSB0`. Ensure your user has serial-port access according to your distribution's instructions.

#### Erase and flash the firmware

```sh
python -m esptool --chip esp8266 --port /dev/ttyUSB0 --baud 460800 write-flash 0x0 firmware_v2.6.0_ESP8266_d1_mini.bin
```

For a clean installation, erase first and then repeat the write command. This removes saved settings and WiFi credentials:

```sh
python -m esptool --chip esp8266 --port /dev/ttyUSB0 erase-flash
```

The examples use the [esptool 5 command syntax](https://docs.espressif.com/projects/esptool/en/latest/esp8266/esptool/basic-commands.html). See the official [installation instructions](https://docs.espressif.com/projects/esptool/en/latest/esp32/installation.html) if Python or virtual-environment setup fails. If flashing is unreliable, retry at a lower baud rate such as `115200`.

## Setup

On a fresh installation, connect to the `PIXELIT` WiFi access point and enter your network credentials in the setup portal. Once connected, the device obtains its time through NTP.

Find the device's IP address in your router's DHCP client list and open it in a browser. In the [Webinterface](webinterface.html), configure matrix layout, time and optional peripherals. Save changes and restart after changing peripheral pins. An existing installation may retain its saved WiFi credentials, so an access point does not necessarily appear after every update.

Next, use the [API](api.html), [Node-RED](nodered.html) or [ioBroker](iobroker.html) to display your own screens. The [Tools](tools.html) page explains how to create and find pixel art.

## Troubleshooting

See [Troubleshooting](troubleshooting.html).
