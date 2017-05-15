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
