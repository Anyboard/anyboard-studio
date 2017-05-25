#LEDGridEditor.vue

The LED-grid editor component allows the user to toggle LED-lights on the 8x8 top display of the Anypawn.

## Template

### Name

Each 8x8 LED grid must be defined with a name. The editor does not allow a user to define a grid with a blank name.

### Editor

The grid itself is defined by using the `v-for` function in Vue to generate 64 HTML `<div>` elements inside another `<div>` container.
Through Vue, each element is assigned an index, which is utilized by the `ledgrid.js` store to store the state of the current grid.

### Buttons

The LED-grid editor has two modes; editing an existing grid, or creating a new grid. 
When creating a new grid, a button to submit the new token is displayed and a button to clear the grid.
When editing an existing grid, buttons to update, copy and delete the grid are displayed, in addition to the button that clears the current grid.

## Scripts

### Data

The LEDGridEditor saves the name of the grid as `gridName`.

### Computed

The LEDGridEditor maps the state of each grid node to a grid saved in the `ledgrid.js` store.
The function `isNewGrid` controls the state of the grid editor.

The function `gridString` converts the data in the grid editor to a bit-string.

The function `cleanedGridName` converts the name of the grid to all lowercase. 

The function `validName` controls that the name input field isn't blank, and is used to block the user from submitting a grid without specifying a name.


### Methods

The function `toggleIndex` dispatches a call to the `ledgrid.js` store to toggle a led light on or off.

The function `submitGrid` saves the current state of the grid into `savedGrids` in the store.

The functions `updateGrid`, `clearGrid`, `copyGrid` and `deleteGrid` are used directly by the buttons in the user interface
to dispatch calls to the store in order to alter the data in grid array.
