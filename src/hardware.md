# Hardware

## Parts list

#### Minimal setup (Basis)

| **Quantity** | **Name**                        |                                         **Link**                                          |         **Notice**         |
| :----------: | ------------------------------- | :---------------------------------------------------------------------------------------: | :------------------------: |
|      1       | WS2812B LED Matrix 8x32         | [Amazon](https://amzn.to/3tEpc4u) [AliExpress](https://s.click.aliexpress.com/e/_DCu2VNp) |                            |
|      4       | WS2812B LED Matrix CJMCU 8x8    | [Amazon](https://amzn.to/3v1RDqe) [AliExpress](https://s.click.aliexpress.com/e/_DmwWBm7) |        alternative         |
|      4       | MicroMatrix by foorschtbar 8x8  |                   [GitHub](https://github.com/foorschtbar/MicroMatrix)                    | alternative (really micro) |
|      1       | Wemos D1 Mini (or Clone)        | [Amazon](https://amzn.to/2Df5v7M) [AliExpress](https://s.click.aliexpress.com/e/_DefTRgB) |                            |
|      1       | Capacitor 1000uF/6.3V or higher | [Amazon](https://amzn.to/2DktrGV) [AliExpress](https://s.click.aliexpress.com/e/_Ddqxp2j) |                            |

#### Wiring

![](/hardware_basis.png)

| Wemos | Matrix | Function         | Note |
| ----- | ------ | ---------------- | ---- |
| 5V    | VCC    | Power supply (+) |      |
| G     | GND    | Power supply (-) |      |
| D2    | DIN    | Data In          |      |

::: tip
If you reduce the brightness of the matrix, powering everything via USB should be sufficient for testing.
However, it is recommended to use a high-quality power supply for normal operation. A 20W (5V/4A) power supply is sufficient for this.
:::

::: tip
The 1000uF capacitor prevents the initial onrush of current from damaging the pixels. It also provides a small power reservoir for abrupt changes in brightness that the power source might not otherwise handle. Otherwise it can happen that the microcontroller restarts or it comes to gliches in the matrix.
:::

#### LDR GL5516 Sensor upgrade (brightness lux)

| **Quantity** | **Name**         |                                         **Link**                                          |
| :----------: | ---------------- | :---------------------------------------------------------------------------------------: |
|      1       | LDR GL5516       | [Amazon](https://amzn.to/2DlQjWb) [AliExpress](https://s.click.aliexpress.com/e/_DFp6GAX) |
|      1       | Resistor 10k Ohm | [Amazon](https://amzn.to/3p6oOsQ) [AliExpress](https://s.click.aliexpress.com/e/_DBBuZGf) |

#### Wiring

![](/hardware_gl5516.png)

| Wemos | LDR GL5516 | Resistor 10k Ohm | Function                  | Note |
| ----- | ---------- | ---------------- | ------------------------- | ---- |
| 3V3   | Leg 1      |                  |                           |
| G     | -          | Leg 1            |                           |
| A0    | Leg 2      | Leg 2            | Acts as a voltage divider |

#### DHT22 Sensor upgrade (Temperature & Humidity)

| **Quantity** | **Name**          |                                         **Link**                                          |
| :----------: | ----------------- | :---------------------------------------------------------------------------------------: |
|      1       | DHT22             | [Amazon](https://amzn.to/2Po21Hx) [AliExpress](https://s.click.aliexpress.com/e/_DBbMEn1) |
|      1       | Resistor 4.7k Ohm | [Amazon](https://amzn.to/3p6oOsQ) [AliExpress](https://s.click.aliexpress.com/e/_DBBuZGf) |

#### Wiring

![](/hardware_dht22.png)

| Wemos | DHT22 | Function         | Note |
| ----- | ----- | ---------------- | ---- |
| 3V3   | VCC   | Power supply (+) |
| G     | GND   | Power supply (-) |
| D1    | DATA  |                  |

#### BME280 Sensor upgrade (Temperature, Humidity & Pressure)

| **Quantity** | **Name**    |                                         **Link**                                          |
| :----------: | ----------- | :---------------------------------------------------------------------------------------: |
|      1       | BME280 3.3V | [Amazon](https://amzn.to/2Ta89Hy) [AliExpress](https://s.click.aliexpress.com/e/_DkqjVp1) |

#### Wiring

![](/hardware_bme280.png)

| Wemos | BME280 | Function         | Note |
| ----- | ------ | ---------------- | ---- |
| 3V3   | VCC    | Power supply (+) |      |
| G     | GND    | Power supply (-) |      |
| D1    | SCL    | Clock            |      |
| D3    | SDA    | Data             |      |

#### BME680 Sensor upgrade (Temperature, Humidity, Pressure & Gas)

| **Quantity** | **Name** |                                         **Link**                                          |
| :----------: | -------- | :---------------------------------------------------------------------------------------: |
|      1       | BME680   | [Amazon](https://amzn.to/3GfOHMA) [AliExpress](https://s.click.aliexpress.com/e/_DlgIMiP) |

#### Wiring

![](/hardware_bme680.png)

| Wemos | BME680 | Function         | Note |
| ----- | ------ | ---------------- | ---- |
| 3V3   | VCC    | Power supply (+) |      |
| G     | GND    | Power supply (-) |      |
| D1    | SCL    | Clock            |      |
| D3    | SDA    | Data             |      |

#### DFPlayer Mini upgrade (MP3 Player)

| **Quantity** | **Name**                 |                                         **Link**                                          |
| :----------: | ------------------------ | :---------------------------------------------------------------------------------------: |
|      1       | DFPlayer Mini MP3 Player | [Amazon](https://amzn.to/3jcbmz7) [AliExpress](https://s.click.aliexpress.com/e/_DBhkE8L) |

#### Wiring

![](/hardware_dfplayer.png)

| Wemos | DFPlayer Mini | Function                  | Note |
| ----- | ------------- | ------------------------- | ---- |
| 3V3   | VCC           | Power supply (+)          |      |
| G     | GND           | Power supply (-)          |      |
| D5    | RX            | PixelIt TX -> DFPlayer RX |      |
| D7    | TX            | PixelIt RX <- DFPlayer TX |      |

#### Touch Buttons upgrade (Touch Sensor)

| **Quantity** | **Name**            |                                         **Link**                                          |
| :----------: | ------------------- | :---------------------------------------------------------------------------------------: |
|      1       | TTP223 Touch Sensor | [Amazon](https://amzn.to/3UMnzvu) [AliExpress](https://s.click.aliexpress.com/e/_DeEyaxZ) |

#### Wiring

![](/hardware_touchbtn.png)

| Wemos | Button left | Button middle | Button right | Function         | Note            |
| ----- | ----------- | ------------- | ------------ | ---------------- | --------------- |
| 3.3V  | VCC         | VCC           | VCC          | Power supply (+) |
| G     | GND         | GND           | GND          | Power supply (-) |
| D0    | I/O         | -             | -            | Touch signal     |
| D4    | -           | I/O           | -            | Touch signal     | Solder bridge A |
| D8    | -           | -             | I/O          | Touch signal     |

:::warning Disclaimer
The touch sensors have two solder bridges on the board which can be connected. This allows switching between active high (when pressing high) and active low (when pressing low). This is absolutely necessary for the middle sensor (Btn 2), otherwise the wemos will not start. To prevent this, bridge A of the middle touch sensor must be closed. This sets the I/O pin to active low. Other touch sensors are not recommended, because they have no possibility to be set to active low.
:::

TTP223 Image for Fritzing by [rbricheno](https://github.com/rbricheno).

## 3D Printing Files

![](/cover.jpg)
by PlastikJunkies

#### Downloads

- [Thingiverse](https://www.thingiverse.com/thing:3559014)
- [Local download](/pixel_it_case.zip)

### AWTRIX Case (Discontinued project!)

- [Thingiverse](https://www.thingiverse.com/thing:4749750)

#### Makes

Make sure to check out this discussion page for some inspiration.

- [Show your PixelIt](https://github.com/pixelit-project/PixelIt/discussions/48)

## Troubleshooting

See [Troubleshooting](troubleshooting.html).
