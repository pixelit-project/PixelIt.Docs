# Troubleshooting

::: tip
You had a problem you could solve and it's not there yet? Help other users and describe it here. We are happy to receive pull requests or use the known contact options to share information and make this site and the project better!
:::

## Hardware

### The matrix keeps dark after flasing the firmware

Check the wiring and, if you have soldered the wires, also check for cold solder joints.

### My board is not detected by the computer

Try resetting the board (via reset switch).

### No sound with DFPlayer Mini

1. check the wiring and, if you have soldered the wires, also check for cold solder joints.
2. increase the volume. Some users have reported not hearing any sound below 30 percent (perhaps bad hardware/firmware)?
3. Test the hardware standalone. [Here](https://wiki.dfrobot.com/DFPlayer_Mini_SKU_DFR0299#target_5) you could find the schematic and sample code.

## Node-RED

### I cant find the PixelIt nodes in Node-RED or there are some missing

Install the latest version of Node-RED and the latest version of the PixelIt Extension [`node-red-contrib-pixelit`](https://flows.nodered.org/node/node-red-contrib-pixelit) via the palette manager. **Don't use NPM to install Node-RED extensions.**

### Nothing working! I cant see anything on my pixelit!

Have you deployed the Flow? Press "Deploy" in upper right corner in Node-RED.

## Webinterface

### I can't connect to the PixelIt Webinterface

Check if the IP address is correct. If you have not changed the hostname, the default hostname is `pixelit`. If you have changed the hostname, you can find the IP address in your router's DHCP lease list.


## Support

::: tip
Still need help? You can get help in the forum or the Telegram and Discord group. You find the links [here](/#support).
:::
