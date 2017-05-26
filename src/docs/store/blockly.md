# ledgrid.js

## State

`workspace` saves the current state of the workspace. Every block that has been placed with all choices and where they are and how they connect.

`blocklyState` also saves the workspace, but in text format that isn't directly usable by Blockly but can be saved and later loaded.

`exportedCode` is deprecated. It was used in an earlier version to help export code.

## Mutations

`SET_WORKSPACE` sets state `workspace` to a new workspace.

`SAVE_BLOCKLY_STATE` sets state `blocklyState` to a new string.

`EXPORT_CODE` converts state `workspace` to javascript code, injects it into the index.html and uses the makeZip from helpers,
which adds relevant libraries. Then all of this is saved as a local zip file, containing a working Anyboard game.

`DOWNLOAD_CODE` saves state `blocklyState` to a local file.

`UPLOAD_CODE` is used to set state `blocklyState` to a string uploaded from a local file.
It does the same thing as `SAVE_BLOCKLY_STATE`, and is just used for different reasons in different actions.

## Getters

`GET_BLOCKLY_STATE` returns the state `blocklyState`

## Actions

`blocklyInit` sets up Blockly.
First it gathers all the information that `blockly-init` from helpers needs, and then calls that functions which sets up Blockly.
The information needed are the sectors defined in the Board editor and the tokens and grids defined in the Game Assets.
In this actions these are called sectorObject, tokenVal and ledGrids respectively.
For each of these, blockly-init also needs them in a second format, which is used for dropdown lists.
These modified formats are called sectorNames, TOKENS and GRIDS respectively.
All of this is given to `blockly-init` from utilities, which adds customised blocks and logic to Blockly.
For more detail check its own documentation.
With Blockly now suitably modified, it is injected into the blockly-wrapper div in `Blockly.vue` using the toolbox from `utilities/blockly-toolbox.js`.
The toolbox defines what blocks will be available in the tabs on the left of the workspace.
The workspace is set to save its state in the blockly store every time it is changed.
Finally, the state of blockly is loaded if it isn't empty. This is used if you return to the Code Builder tab from another tab.
In that case, Blockly will be built anew, and the `blocklyState` is loaded to restore what has already been done.

`exportCode` is used to convert the blocks in the workspace to a functioning zip containing all necessary game files by calling the corresponding mutation.

`downloadCode` is used to save the state of the workspace to a local file by calling the corresponding mutation.

`addCode` is used to add blocks to the workspace from a local file.

`loadCode` is used to replaced all current blocks in the workspace with blocks from a local file.
