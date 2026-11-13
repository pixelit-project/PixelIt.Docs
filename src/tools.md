---
sidebarDepth: 2
---

# Tools

The screenshot uses the WebUI demo with sample data; see the [screenshot source note](webinterface.html#demo).

## Pixel Creator

Use the [Pixel Creator](https://pixelit-project.github.io/PixelIt/webui/#/creator) to draw pixel art and publish it to the shared Pixel Gallery. Choose an 8×8 or 32×8 canvas for images and animations. The firmware animation limits still apply; see [Bitmap Animation](api.html#bitmap-animation).

PixelIt 3.0.0 includes an animation editor with frame reordering, adjustable preview timing, onion skin and playback controls. Drawing tools, undo/redo and bitmap input validation help you edit images. Separate local drafts are recovered for both canvas sizes.

![Pixel Creator with drawing tools and animation controls](/webinterface_2_6_creator.jpg)

## Pixel Gallery

Browse shared pixel art in the [Pixel Gallery](https://pixelit-project.github.io/PixelIt/webui/#/gallery). The gallery and ID lookups require access to the external bitmap service. Firmware screen commands use RGB565 arrays; integrations resolve gallery IDs before sending those arrays to the device.

Use Pixel Gallery IDs in the [Bitmap Node](nodered.html#bitmap), [Bitmap Animation Node](nodered.html#bitmap-animation) or [ioBroker adapter](iobroker.html).

The gallery loads more entries as you scroll and reuses loaded data when reopened. Animations pause outside the visible area or when the browser tab is hidden.

Filter the gallery by animations and bitmap dimensions. Device compatibility filtering uses the connected display's advertised dimensions and animation budgets. **Also show images incompatible with this device** reveals excluded entries with an explanation and a disabled Send button. Cards show dimensions and frame counts; invalid data is distinguished from content exceeding the device limits. Sending requires a connected device and fresh device information. Frames are never silently trimmed.

Open gallery details to copy an icon ID or **Copy RGB565 data**. Copying also works on device-hosted HTTP pages through the clipboard fallback. Successful Creator uploads refresh the gallery cache on the next visit. Upload errors leave the drawing available for correction.

Use the flag button to report an icon. Select a reason and optionally add details; **Other reason** requires details. Reports go to the gallery service for moderator review and do not immediately delete an icon. Gallery publishing and reporting are disabled in demo mode.

If loading fails, check access to the gallery service and retry. A gallery-service failure does not prevent local text screens or inline bitmap arrays from working.
