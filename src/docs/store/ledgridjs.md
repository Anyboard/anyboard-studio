# ledgrid.js

## State

`grid` saves the current state of the LED grid in `LEDGridEditor.vue` as an array of boolean values.

`savedGrids` is an object containing the saved LED grids. The name of each grid is used as the key,
and the value is a 16-bit hexadecimal string that represents the grid.

`selectedGrid` is the currently selected grid in `LEDGridEditor.vue`. An empty string means no grid has been selected.

## Mutations

`SET_GRID` sets the state `grid` to a new grid.

`CLEAR_GRID` sets state `grid` to a grid with only false values.

`PUSH_TO_SAVEDGRIDS` appends a new grid to `savedGrids` in the state.

`UPDATE_GRID` updates the values of an already saved grid.

`SELECT_GRID` is used to set a new grid as `selectedGrid`

`DELETE_GRID` deletes a grid from `savedGrids`

`DOWNLOAD_GRIDS` creates a `.json`-file out of savedGrids so that the user can download their progress.

`UPLOAD_GRIDS` replaces `savedGrids` with a different set of saved grids.
This is used if a users wishes to upload grids from a `.json`-file

## Actions

`setGrid` transforms a 16-bit hexadecimal string to a 64-bit binary string and uses it to set new values for the state `grid`

`changeGrid` is used to invert the value of an index in the state `grid`

the remaining actions are used as intermediate steps dispatched from `LEDGridEditor.vue` and calls mutators inside the store.
