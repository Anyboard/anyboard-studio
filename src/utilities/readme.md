# Utilities

# blockly-init.js

This file takes the standard Blockly object and modifies it, by adding custom blocks and changing code generation.
Blockly is a large project, and this readme will only give a brief overview.
Please reference Blockly documentation at https://developers.google.com/blockly/guides/overview for a more thorough explanation.

## Block definitions
How a block looks is defined with `Blockly.Blocks['block_name']`.
The code that a block generates is defined with `Blocky.JavaScript['block_name']`.
As per Blockly standard, the block names start with the category the block belongs to.

The code for how blocks looks was mostly developed with the Block Factory:
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html

All blocks defined here need to be included in utilities/blockly-toolbox.js, otherwise they won't show up in the toolbox.
That is also where you define what other blocks and values they come prefilled with.

## Redefined blocks

In addition to adding custom blocks, it was necessary to redefine some of the standard Blockly Blocks.
What is changed for these is mostly code generation, not the looks of the blocks.
The reason for the different code is that the generated code is placed inside an app object, which requires some different syntax.
The code for these redefined is mostly copied from Blocky directly, with only some minor changes to comply with that syntax.

## Non-block code
Blockly can add code not directly defined by blocks
There is the init function, which runs before the code generation for any blocks run
and the finish function, which runs after all the code generation for any blocks has finished
Here we add information from the other tabs; the Board Editor and the Game Assets
Again, the code here is copied from blockly, which some strategic additions to add our information and comply with the syntax needed.

# blockly-toolbox.py

Creates and exports a single String called toolbox.
The string contains all the information on which blocks Blockly should include in the tabs to the left of the workspace
and which tabs to include at all.
The string is structured as xml.
The <category> tags define what tabs will be created, and what color those should have.
The <block> tags, placed inside a <category>, add that block to that category.
These blocks are both the standard ones defined in Blockly, and the custom ones added to Blockly in `blockly-init`.
Inside block tags is further information on how inputs should be filled out in the toolbox.
Of particular interest are inputs that are other blocks. For these, the  <shadow> tag is used.
Blocks defined by <shadow> tags look a bit more transparant than their normal counter parts.
They can't be moved, but inputs can still be changed. If they are replaced by a normal block, they will vanish.
The purpose of shadow blocks is to give an idea of what blocks might be used as the inputs there,
as well as using the more common blocks for that purpose, so that in many cases the user can just leave the shadow block there.


# helpers.js

helpers.js is a file with helping methods for store and components.

## Variables

#### colourDict

A JSON-object containing the hex codes for valid colours as key and the anyboard numerical values for sectors as value.

#### colourNames

A JSON-object containing hex codes for valid sectors as key and developer defined names for the colours. These are used
to make generic names for sectors if the user has not defined any.

#### sectorDict

A developer defined list of predefined sectors.

This is used to help the user to get inspiration of what sectors they might need in their game.

#### sectorList

An array containing the keys in `sectorDict`

## Methods

#### createPolyPoints (sideCount, radius)

The method creates an array that can be used by Fabric to create a polygon with `sidecount` sides and `radius` radius.

#### dataURLtoBlob (dataurl)

Takes in a `dataurl` and turns it into a blob. It is used to create a blob of the canvas which can be saved as a
png-file.

#### pushForward (layer, cvs)

Used by `layerify` to push layers to front in ascending order.

#### layerify (cvs)

Used to "layerify" the canvas. As Fabric doesn't have native layer support this is a function made to imitate primitive
layers. The goal is to have grids always be on the bottom, followed by images, then by free drawn paths made to be drawn
in the background, then sectors, then free drawn paths in the foreground and finally text.

Once all objects have been grouped they are pushed to front in ascending order using `pushForward`

#### insertIntoDict (dict, key, value)

Made to insert new entries into a dictionary/JSON-object. As long as `key` does not already exist in `dict` then `key`
will be added with `value` as an element.

#### getColorName (color)

Returns a developer defined name for a color found in `colourDict` based on the argument `color`.

#### exportSectors (canvas)

Creates a JSON-object based on the sectors the user has added to `canvas`. It iterates through the objects found,
if it finds an object that is of the type `rect`, `polygon` or `circle`, and the sector color has not already been
added to the object it will be added, and that colour will be set as used. Once done with all the objects it returns
the object.

This is used to save the user defined sectors by name and color to store, so that they can be used in blockly coding.

#### updateSectorList (canvas)

Used to get a JSON-object with both the developer predefined sectors and the user added sectors.
It iterates through the `sectorDict` object, adds them to a new object and then adds the user made sectors into the
new object before returning it.

#### _isContains (json, value)

Returns true if `json` contains `value` as a value in one of the elements.

#### checkIfSameName (name, dict, obj)

First checks if the `obj` is a sector, and if it is a sector checks if `name` already exists in `dict` with a different
color.

Used to avoid naming collisions where a user might try to name two sectors of different colours the same name.

#### renameSameSector (obj, canvas)

`obj` is a sector then this will iterate through all objects in `canvas`, and if it finds other sectors of the same
color it will rename `obj` into the name of those sectors

As the AnyBoard tokens can't separate sectors by anything other than color, all sectors of the same color should also
have the same name to make blockly coding easier.

#### renameSector (canvas, newName)

Used to rename the active object on `canvas` into `newName`. It then updates `sectorDict` to include the new name and
removes the old element with the old name. After that it finds all other sectors with the same color and renames them
to `newName`.

As the AnyBoard tokens can't separate sectors by anything other than color, all sectors of the same color should also
have the same name to make blockly coding easier.

#### colorChange (canvas, sectorColor)

Used to change color of the selected object on `canvas` into `sectorColor`. Only sectors and free drawn paths can be
changed color. It also calls `renameSameSector` if the object is a sector and if there are other sectors of the new
color then the selected object will be renamed to their name.

#### getFile (url, callback)

Used to get files from a `url` using a XMLHttpRequest. The response can be used as a `callback` function.

The 'GET' request is set to async. This causes the page to stop when loading a file, but running it sync has caused
errors where it won't get the files properly. As `getFile` is only used when exporting the game when done this has been
decided as acceptable, but should be made sync in the future to improve user experience.

#### makeZip (blob)

Using JSZip it creates a zip file which includes all the game files necessary to run the game using Evothings.
It makes use of `getFile` to get the game files from the Anyboard github. Any URL can be changed if the file location
moves. It also takes `blob` as an argument which is the 'index.html' file generated by `blockly.js`.

#### colorHexToRGB (hexCode)

Makes an array out of a `hexCode` in string format. Used to make an array that a token can use to change its LED color.

#### binaryToHex (s)

Converts binary to hex.

#### hexToBinary (s)

Converts hex to binary.

# html-template.js

A js file that contains `index.html` as a string variable. This variable is used to inject the user created game code
into `index`, which can then be exported back from string into an html file. `htmlConverter.py` must be exectued when
changes are made to `index.html` to update this file.

# htmlConverter.py

A python file used to convert `index.html` into a string variable in `html-template.js`. When executed it goes through
`index.html` line for line and adds each line to a `htmlTemplate` variable. When the reader is done, it writes the
export line at the end of `html-template.js` to allow the variable to be imported.

# index.html

This file contains the base template for games made with the Anyboard Studio. Some of the files this file references
are downloaded from the Anyboard Github (https://github.com/simonem/anyboard) when the user exports the game into
a zipped folder. This file is based on a demo game from the Anyboard Github
(https://github.com/simonem/anyboard/tree/master/games/demo-anyPawn)

If changes are made to this file, `htmlConverter.py` must be executed to update the index code to be used by
`blockly.js`

## Script

#### $(document).ready

When the game has loaded onto the phone, it will force the summary div to show. The summary div contains the buttons
required to connect tokens and start the game.

#### app

app is the object that contains the entire game.
The following functions and variables are parts of the app object.

#### devices

Devices is a JSON-object where bluetooth devices the game discovers is added. This will not only contain AnyPawns.

#### REPLACEME

This line is where code from the code builder will be injected into. Several variables used in code below will also
be added here.

#### connectedPlayers

ConnectedPlayers is a variable to keep track of how many AnyPawns are actually connected to the game.

#### discover ()

This method is used to discover bluetooth devices within range. If a device is found the `addDiscovered` method is
called. If an error should occur it will be logged in the EvoThings console.

#### addDiscovered (token)

The method is called when a bluetooth device is discovered. If the device is not already added to the devices object,
it will be done so with the name of the device as key and the device itself as value. When a new device is added a
button will be added to the html body with the name of the device as the value of the button. If the button is pressed
the game will try to add the device to the game using the `connect` method. Only AnyPawns should be possible to add.

If a device is connected to the game, here on refered to as token, the token will be calibrated to a printer type.
This is can be defined in the code builder, but if none is chosen then laser printer is the default setting.
`connectedPlayers` will also be increased by one, and the button used to connect the token will be turned green.
Finally, the method will check if the required amounts of players are connected. This is also defined in the code
builder through a variable `requiredPlayers`, but if it's not defined then the game can be started as long as at least
one token is connected. If the required tokens are connected then a button will appear that allows the players to start
the game.

If a device is disconnected the button used to connect the device will be colored red.

#### connect (tokenName)

This method is called when the player attempts to connect a device. The token object is found in the `devices` object
through the `tokenName` argument. If the device is already attempting to connect, nothing is done. If the device is
already connected, the device will vibrate. Otherwise the button will turn blue and the device will attempt to connect.

### Feedback commands

The following methods are commands used to make the tokens give feedback. They all include a `completedFunction`
variable which logs the success of the command to the EvoThings console, while `errorCallback` reports a failure to
exectue the command.

All of the methods also check if the token that is trying to give feedback is allowed to do so. An object named
`tokenVal` is injected into the index file on game export, and if the token is found in `tokenVal`, where the key is the
token name and the feedback it is trying to give is listed in the value of the token, the feedback will not be given.

For example: If the token is being sent a vibration command, but 'vibrate' is listed in the token's value in `tokenVal`,
the feedback will not be given.

Valid feedback and actions will be defined by the user with the `TokenEditor.vue` component. If a token does not have an
id and therefore is not found in `tokenVal` then the feedback is considered as valid.

#### sendVibrationCmd (token, length)

This is a method used to send vibrations to a `token`. Length is the duration of the vibration.

#### sendVibrationPattern (token, pattern)

Sends a vibration pattern to `token` through an array `pattern`. And example of a pattern is [1100101] where the token
will vibrate for 200ms, wait 200ms, vibrate 100ms, wait 100ms, vibrate 100ms.

This command is not implemented in the firmware or drivers for the tokens, and will not do anything if called.

#### sendLedOnCmd (token, ledArray)

Turns on the led light in the `token` and/or changes the color of the light. `ledArray` is an rgb array, each value
must be either 0 or 255, any other value will turn off the led.

#### sendLedBlinkCmd (token, time, period)

If the led light is turned on this command will tell the `token` to blink for `time` seconds, with a frequency of
`period` for the blinks.

#### sendLedOffCmd (token)

Turns the led light off for `token`.

#### sendDisplayPatternCmd (token, pattern)

Used to change the display of a `token`'s led matrix. The `pattern` is an array with eight elements, each element one
byte. Each byte represents a row of led lights on the `token`'s 8x8 led matrix. If all bytes are 0 the display will be
turned off.

#### sendDisplayTextCmd (token, text)

Sends a `text` to be sent to the `token` to be displayed as scrolling text across the `token`'s led matrix. There can
be a maximum of 19 characters in `text`, any further characters will be cut off.

This command is not implemented in the firmware or drivers for the tokens, and will not do anything if called.

#### sendCountCmd (token, num)

Sends a command for the `token` to count down from `num` on the led display matrix.

This command is not implemented in the firmware or drivers for the tokens, and will not do anything if called.

#### sendPaperSelectCmd (token, paperType)

Sends a `paperType` to calibrate the `token`. If `paperType` is 1 then the token will work on colours printed with
a laser printer, 2 means inkjet printer. This can be defined by the user in the code builder, but if they don't the
standard is laser printer.

### Other methods

#### next_panel ()

The method is called when the player presses to start the game once enough tokens have been connected. This also
calls the `initiate` method which is injected into the file on game export and contains the actual game logic. This is
to prevent the game for being runable once tokens have been connected, but the game hasn't actually been started yet.

#### setId (token, id)

Sets the `id` of a `token`, and changes the led color of the token to the colour defined for that `id` in `tokenVal`,
which is injected into the file on game export.

#### getSector (token)

Gets the sector that `token` is currently standing on. When a token moves onto a valid sector, that value is saved in
the token object.

#### getRandomToken (token)

Returns a random token object from `devices`. Might cause issues if there are other bluetooth devices within range of
the phone.

For future work: A check to make sure either only actual tokens are returned, or that `devices` will only contain
tokens on game start.

#### getRandomSector ()

Returns a random sector value from `sectorVals`. `sectorVals` is an array containing all values for the sectors the
user has used in their game, and is injected into the file on game export.

#### mathRandomInt (a, b)

Used to get a random integer between `a` and `b`. If `a` is bigger than `b` the method swaps around the values before
returning the random integer.

#### getToken (id)

Returns a token object by token `id`.

#### getGrid (token)

Returns the pattern displayed on top of a `token` as an array with eight elements, each element being a byte.

## Body

### Summary

A div containing the elements used before game starts

#### Discover button

A button that is pressed to scan for bluetooth devices near the phone. Won't scan forever and will need to be pressed
again to rescan.

#### tokens div

A div where the buttons for found bluetooth devices will be added

#### Next button

A button to start the game. Will remain hidden until enough players are connected. When pressed the summary div is
hid.

### main

The main information and contents of the game are contained in this div.

#### Title

The title of the game. The user can set this in the code builder.

#### Messagediv

A div containing empty `p` elements that the user can change the content off through the code builder to text.

#### Numberdiv

A div containing empty `p` elements that the user can change the content off through the code builder to numbers.

## Style

`messagediv` is given `word-wrap: break-word` to avoid having long, userwritten text go outside of the boundaries
of the mobile screen.
