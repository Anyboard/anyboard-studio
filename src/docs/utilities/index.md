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
