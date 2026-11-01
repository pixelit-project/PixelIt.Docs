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

- [ESPEasy Flasher](https://www.bastelbunker.de/wp-content/uploads/ESPEasy_Flasher.zip)

To flash the Wemos D1 Mini (or simillar ESP8266 board) we use the ESPEasy Flasher for simplicity. After unpacking the ESPEasy_Flasher.zip only the current `firmware_XXX.bin` must be copied into the folder of the ESPEasy Flasher.
Now we have two dropdown menus after starting the FlashESP8266.exe:
![](/flash_esp8266.png)

#### COM-Port

Here you have to select the port where you have connected your Wemos D1 mini (or simillar ESP8266 board).

#### Firmware

Now here we have two items the `CleanFlash.bin` and `firmware_XXX.bin`:

- `CleanFlash.bin` Has the task to zero the complete flash of the ESP, which can be very helpful if the ESP was already used for other projects and makes problems with the current project (e.g. no hotspot opens)
- `firmware_XXX.bin` Is the firmware of the PixelIt :)

Now you just have to press the Flash button and wait a bit.

## Flashing (macOS)

The serial commands below are for ESP8266 boards. For ESP32, use the Webflasher above and select the matching board and installation method.

#### Install esptool

Install esptool (e.g. via homebrew)  
`brew install esptool`

#### Find your board

Connect your board via USB, and get the device address by running:  
`ls /dev/tty*usb*`

This should output something like:  
`/dev/tty.usbserial-1337`

#### Erase and flash the firmware

Erase flash  
`esptool.py --port /dev/tty.XXX erase_flash`

Flash firmware  
`esptool.py --port /dev/tty.XXX --baud 1000000 write_flash --flash_size=4MB -fm dio 0 firmware_XXX.bin`

## Flashing (Linux)

The serial commands below are for ESP8266 boards. For ESP32, use the Webflasher above and select the matching board and installation method.

Install esptool (e.g. via pip)  
`pip install --upgrade esptool`

#### Find your board

Connect your board via USB, and get the device address by running:  
`ls /dev/ttyUSB*`

This should output something like:  
`/dev/ttyUSB0`

#### Erase and flash the firmware

Erase flash  
`esptool.py --port /dev/ttyXXX erase_flash`

Flash firmware  
`esptool.py --port /dev/ttyXXX --baud 1000000 write_flash --flash_size=4MB -fm dio 0 firmware_XXX.bin`

## Setup

After flashing, the PixelIt should now set up its own WiFi AccessPoint (SSID: `PIXELIT`). If you have connected to this AP, you can enter and save the WiFi data of your network. If everything has worked and the PixelIt is connected to the WiFi and the Internet, you should now see a time.

Now you can connect to the [Webinterface](webinterface.html) of PixelIt. Find the IP-Adress in your routers DHCP lease list or try the default hostname of PixelIt `pixelit` to finish the setup in the [Options](webinterface.html#options).

Now the next step should be to look at the [Tools](tools.html) to see the available options for creating ads (most called _Screens_ here).

## Troubleshooting

See [Troubleshooting](troubleshooting.html).
