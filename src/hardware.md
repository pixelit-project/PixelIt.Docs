---
collapsable: false
sidebarDepth: 2
---

# Hardware

## Prebuilt

PixelIt provides firmware for the Ulanzi TC001. Select the `ESP32_ulanzi` build when installing or updating it.

| **Quantity** | **Name** | **Link** | **Notice** |
| ------------ | ------------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1 | Ulanzi TC001 Pixel Clock | [Official store](https://www.ulanzi.com/products/ulanzi-pixel-smart-clock-2882?aff=1181) | ESP32, 32×8 LED matrix, three buttons, built-in battery and light sensor. PixelIt 3.0.0 does not implement the built-in buzzer. |

## DIY components list

To build a PixelIt, you need basic soldering skills and these components:

- A supported ESP8266 or classic ESP32 board
- A 32×8 WS2812B matrix, or four compatible 8×8 tiles
- A 1000 µF capacitor rated for at least 6.3 V
- A regulated 5 V supply sized for your matrix and brightness

Sensors, a DFPlayer Mini and buttons are optional.

::: warning Wiring examples
The diagrams show ESP8266 D1 mini examples. ESP32 connections are listed separately in the tables. Check the exact board pinout and configure the peripheral pins in the WebUI before use. The examples are individual circuits; do not assign the same GPIO to unrelated peripherals when combining them.
:::

### Matrix

The released firmware targets a 32×8 matrix. Other dimensions require a custom build and code changes; changing a WebUI setting does not change the matrix dimensions.

Connect the capacitor across the matrix power input, observing its polarity. It buffers changes in current demand; it does not limit LED current or replace a suitable power supply. Follow the [NeoPixel wiring and power recommendations](https://learn.adafruit.com/adafruit-neopixel-uberguide/best-practices), including common ground, a data-line resistor and appropriate logic-level shifting for 3.3 V controllers driving 5 V pixels.

| **Quantity** | **Name** | **Link** | **Notice** |
| ------------ | ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------- |
| 1 | WS2812B LED Matrix 8x32 | [Amazon](https://amzn.to/3tEpc4u) [AliExpress](https://s.click.aliexpress.com/e/_DCC6Icd) |  |
| 4 | WS2812B LED Matrix CJMCU 8x8 | [Amazon](https://amzn.to/3v1RDqe) [AliExpress](https://s.click.aliexpress.com/e/_DmwWBm7) | alternative |
| 4 | MicroMatrix by foorschtbar 8x8 | [GitHub](https://github.com/foorschtbar/MicroMatrix) | alternative (really micro) |
| 1 | Capacitor 1000uF/6.3V or higher | [Amazon](https://amzn.to/2DktrGV) [AliExpress](https://s.click.aliexpress.com/e/_Ddqxp2j) |  |

### Microcontrollers

The stable release includes builds for ESP8266 generic, D1 mini and NodeMCU v2 boards, plus classic ESP32 generic, D1 mini32 and Ulanzi TC001 boards. Choose the matching [firmware asset](firmware.html). ESP32-C3, ESP32-S2 and ESP32-S3 are not interchangeable with these classic ESP32 builds.

| **Quantity** | **Name** | **Link** | **Notice** |
| ------------ | -------------------------- | ----------------------------------------------------------------------------------------- | ----------- |
| 1 | Wemos D1 Mini V3 (ESP8266) | [Amazon](https://amzn.to/2Df5v7M) [AliExpress](https://s.click.aliexpress.com/e/_DBjcNjX) |  |
| 1 | Wemos D1 ESP32 (ESP32) | [Amazon](https://amzn.to/3j9ZQ8Z) [AliExpress](https://s.click.aliexpress.com/e/_DDSkEKh) | alternative |

### Extensions

- [LDR GL5516 Sensor (Brightness)](hardware.html#ldr-gl5516)
- [DHT22 Sensor (Temperature & Humidity)](hardware.html#dht22-sensor)
- [BME280 Sensor (Temperature, Humidity & Pressure)](hardware.html#bme280-sensor)
- [BME680 Sensor (Temperature, Humidity, Pressure & Gas)](hardware.html#bme680-sensor)
- [DFPlayer Mini (MP3 player and sound effects)](hardware.html#dfplayer-mini)
- [Touch Buttons (Touch Sensor)](hardware.html#touch-buttons)

## Wiring guide

Matrix and analog light-sensor pins are fixed by the selected firmware build:

| Build | Matrix DIN | Analog light sensor |
| :---- | :--------- | :------------------ |
| ESP8266 builds | D2 / GPIO4 | A0 |
| Generic ESP32 and D1 mini32 | GPIO27 | GPIO34 |
| Ulanzi TC001 | GPIO32 | A7 (board-defined) |

The DIY tables below apply to ESP8266 D1 mini and generic classic ESP32 boards, not the internal Ulanzi wiring.

Set digital peripheral pins in the WebUI to match your wiring: sensor and button pins are under **Sensors & Buttons**, and DFPlayer pins are under **Options → Sound**. Saving through the WebUI restarts the device to initialize peripherals with the new configuration. Use GPIOs exposed by your board and supported by the firmware's pin selector. On classic ESP32, GPIO20 and GPIO24 are not usable choices for these builds.

Refer to the [D1 mini board documentation](https://www.wemos.cc/en/latest/d1/d1_mini.html) and [Espressif ESP32 GPIO documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/gpio.html). ESP8266 D-labels are board labels, not GPIO numbers: for example, D2 is GPIO4. GPIO signals use 3.3 V logic.

### Basic wiring

![](/hardware_basis.png)

| ESP8266 | ESP32 | Matrix | Function | Note |
| ------- | ------ | ------ | ---------------- | ---- |
| 5V | VIN | VCC | Power supply (+) |  |
| G | GND | GND | Power supply (-) |  |
| D2 | GPIO27 | DIN | Data In |  |

Size the 5 V supply, cables and connectors for the panel's specified maximum current and your brightness limit. Do not assume that a 5 V / 4 A supply or a computer USB port can power every 256-pixel panel at full white brightness. Connect the matrix supply and controller ground together; use your board's documented power input and avoid backfeeding USB.

### LDR GL5516

Provides the light reading used for automatic brightness control and exposed through the API and MQTT. The LDR reading is an estimate based on the selected photocell model and resistor. Check the ADC input limit of your exact board; bare ESP8266 ADC inputs differ from D1 mini A0 inputs.

#### Components

| **Quantity** | **Name** | **Link** |
| :----------: | ---------------- | :---------------------------------------------------------------------------------------: |
| 1 | LDR GL5516 | [Amazon](https://amzn.to/2DlQjWb) [AliExpress](https://s.click.aliexpress.com/e/_DFp6GAX) |
| 1 | Resistor 10k Ohm | [Amazon](https://amzn.to/3p6oOsQ) [AliExpress](https://s.click.aliexpress.com/e/_DBBuZGf) |

#### Wiring

![](/hardware_gl5516.png)

| ESP8266 | ESP32 | LDR GL5516 | Resistor 10k Ohm | Function | Note |
| ------- | ------ | ---------- | ---------------- | ------------------------- | ---- |
| 3V3 | 3V3 | Leg 1 |  |  |
| G | GND | - | Leg 1 |  |
| A0 | GPIO34 | Leg 2 | Leg 2 | Acts as a voltage divider |

The analog driver also supports GL5528, GL5537_1, GL5537_2, GL5539 and GL5549. Select the actual LDR model and physical pulldown resistance, then restart. See [automatic brightness calibration](api.html#automatic-brightness-calibration) for sensor settings and lux-to-brightness mapping.

### DHT22 Sensor

Exposes temperature and humidity through the API and MQTT. Set `onewirePin` to match DATA; use a pull-up between DATA and 3.3 V if your sensor module does not already include one.

#### Components

| **Quantity** | **Name** | **Link** |
| :----------: | ----------------- | :---------------------------------------------------------------------------------------: |
| 1 | DHT22 | [Amazon](https://amzn.to/2Po21Hx) [AliExpress](https://s.click.aliexpress.com/e/_DBbMEn1) |
| 1 | Resistor 4.7k Ohm | [Amazon](https://amzn.to/3p6oOsQ) [AliExpress](https://s.click.aliexpress.com/e/_DBBuZGf) |

#### Wiring

![](/hardware_dht22.png)

| ESP8266 | ESP32 | DHT22 | Function | Note |
| ------- | ------ | ----- | ---------------- | ---- |
| 3V3 | 3V3 | VCC | Power supply (+) |
| G | GND | GND | Power supply (-) |
| D1 | GPIO16 | DATA |  |

### BME280 Sensor

Exposes temperature, humidity and pressure values via API and MQTT.

#### Components

| **Quantity** | **Name** | **Link** |
| :----------: | ----------- | :---------------------------------------------------------------------------------------: |
| 1 | BME280 3.3V | [Amazon](https://amzn.to/2Ta89Hy) [AliExpress](https://s.click.aliexpress.com/e/_DnFiVa5) |

#### Wiring

![](/hardware_bme280.png)

| ESP8266 | ESP32 | BME280 | Function | Note |
| ------- | ------ | ------ | ---------------- | ---- |
| 3V3 | 3V3 | VCC | Power supply (+) |  |
| G | GND | GND | Power supply (-) |  |
| D1 | GPIO22 | SCL | Clock |  |
| D3 | GPIO21 | SDA | Data |  |

### BME680 Sensor

Exposes temperature, humidity, pressure and gas values via API and MQTT.

#### Components

| **Quantity** | **Name** | **Link** |
| :----------: | -------- | :---------------------------------------------------------------------------------------: |
| 1 | BME680 | [Amazon](https://amzn.to/3GfOHMA) [AliExpress](https://s.click.aliexpress.com/e/_DnrVCQD) |

#### Wiring

![](/hardware_bme680.png)

| ESP8266 | ESP32 | BME680 | Function | Note |
| ------- | ------ | ------ | ---------------- | ---- |
| 3V3 | 3V3 | VCC | Power supply (+) |  |
| G | GND | GND | Power supply (-) |  |
| D1 | GPIO22 | SCL | Clock |  |
| D3 | GPIO21 | SDA | Data |  |

### Other supported sensors

Firmware 3.0.0 also contains support for BMP280 (temperature and pressure), SHT31 (temperature and humidity), BH1750 and MAX44009 (light). It selects one environmental sensor and one light-sensor source during startup, rather than reporting every connected sensor independently.

The light-sensor probe tries BH1750 at `0x23`, then MAX44009, then the analog LDR. The environmental probe tries SHT31 at `0x44`, then BME280 at `0x76`, BMP280 at `0x76`, BME680, then DHT22. Use sensor modules compatible with the board's 3.3 V signals and check their address configuration. Restart after wiring or configuration changes.

The SHT31 driver uses its default `Wire` bus rather than the explicitly configured I²C bus in 3.0.0. Verify the default bus pins on your board and avoid conflicts with the matrix; changing `SDAPin` and `SCLPin` alone does not reconfigure that driver.

### DFPlayer Mini

The DFPlayer Mini plays audio stored on its microSD card. PixelIt can control it at startup, with configured button actions, or through the [sound API](api.html#sound). Use the module's speaker outputs as described in the [DFRobot documentation](https://wiki.dfrobot.com/dfr0299).

#### Components

| **Quantity** | **Name** | **Link** |
| :----------: | ------------------------ | :---------------------------------------------------------------------------------------: |
| 1 | DFPlayer Mini MP3 Player | [Amazon](https://amzn.to/3jcbmz7) [AliExpress](https://s.click.aliexpress.com/e/_DBhkE8L) |

#### Wiring

![](/hardware_dfplayer.png)

The diagram uses D5 for PixelIt TX and D7 for PixelIt RX. For this ESP8266 wiring, set `dfpTXpin` to `Pin_D5` and `dfpRXpin` to `Pin_D7`; the firmware default TX is D8 instead. Generic ESP32 defaults are TX GPIO16 and RX GPIO17. The DFPlayer RX connects to the controller TX, and vice versa. A GPIO cannot be shared with the DHT data line.

The table shows a 3.3 V supply as in the diagram. The DFPlayer's specified supply range is 3.2–5 V; ensure your supply supports the module and speaker load.

| ESP8266 | ESP32 | DFPlayer Mini | Function | Note |
| ------- | ------ | ------------- | ------------------------- | ---- |
| 3V3 | 3V3 | VCC | Power supply (+) |  |
| G | GND | GND | Power supply (-) |  |
| D5 | GPIO16 | RX | PixelIt TX -> DFPlayer RX |  |
| D7 | GPIO17 | TX | PixelIt RX <- DFPlayer TX |  |

### Touch Buttons

TTP223 touch modules provide digital button inputs. Configure each button's pin, enabled state, pressed level and action in **Sensors & Buttons**. Firmware actions include showing the clock, toggling sleep and controlling the DFPlayer. Button states are also published through MQTT.

#### Components

| **Quantity** | **Name** | **Link** |
| :----------: | ------------------- | :---------------------------------------------------------------------------------------: |
| 1 | TTP223 Touch Sensor | [Amazon](https://amzn.to/3UMnzvu) [AliExpress](https://s.click.aliexpress.com/e/_DeEyaxZ) |

#### Wiring

![](/hardware_touchbtn.png)

| ESP8266 | ESP32 | Button left | Button middle | Button right | Function | Note |
| ------- | ------ | ----------- | ------------- | ------------ | ---------------- | -------------- |
| 3V3 | 3V3 | VCC | VCC | VCC | Power supply (+) |
| G | GND | GND | GND | GND | Power supply (-) |
| D0 | GPIO25 | I/O | - | - | Touch signal | See disclaimer |
| D4 | GPIO26 | - | I/O | - | Touch signal | See disclaimer |
| D8 | GPIO23 | - | - | I/O | Touch signal | See disclaimer |

::: warning ESP8266 boot pins
D4 / GPIO2 must be HIGH during boot, so its touch module must idle HIGH and become LOW when touched. Configure that button's pressed level as LOW. D8 / GPIO15 must be LOW during boot, so its module must idle LOW and become HIGH when touched; configure its pressed level as HIGH. Use the module manufacturer's active-level configuration, and verify the idle voltage before connecting it to a boot pin.
:::

These are example assignments, not firmware defaults. ESP8266 button defaults are D0, D4 and D5, with buttons initially disabled. The diagram instead uses D8 for the right button; select D8 explicitly to use it. Use the ESP32 pins from the table only when they are free on your board.

TTP223 Image for Fritzing by [rbricheno](https://github.com/rbricheno).

## 3D Printing Files

![](/cover.jpg)
by PlastikJunkies

#### Downloads

- [Thingiverse](https://www.thingiverse.com/thing:3559014)
- [Thingiverse](https://www.thingiverse.com/thing:4749750)
- [Local download](/pixel_it_case.zip)

## Makes

Find examples from other builders in the discussion below.

- [Show your PixelIt](https://github.com/pixelit-project/PixelIt/discussions/48)

## Troubleshooting

See [Troubleshooting](troubleshooting.html).
