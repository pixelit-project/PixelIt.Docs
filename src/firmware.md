# Firmware
## Flashing

### Downloads
* [PixelIt Firmware](https://github.com/o0shojo0o/PixelIt/releases)
* [ESPEasy Flasher](https://www.bastelbunker.de/wp-content/uploads/ESPEasy_Flasher.zip)

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

## Setup
After flashing, the PixelIt should now set up its own WiFi AccessPoint. If you have connected to this AP, you can enter and save the WiFi data of your network. If everything has worked and the PixelIt is connected to the WiFi and the Internet, you should now see a time.  
  
Now you can connect to the [Webinterface](webinterface.html) of PixelIt. Find the IP-Adress in your routers DHCP lease list or try the default hostname of PixelIt `pixelit`  to finish the setup in the [Options](webinterface.html#options).  
  
Now the next step should be to look at the [Tools](tools.html) to see the available options for creating ads (most called *Screens* here).
