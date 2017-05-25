# FabricInspector.vue

FabricInspector.vue displays various information about `FabricCanvas.vue`. This includes a list of all sectors, a list of properties for the currently selected object, and a color picker, where the user selects the color for sectors.

## Template

### forskjellige components relevante til fabric inspector og beskrivelse av de her

## Script

### Methods

The following methods are called when using the FabricInspector. 

#### updateColorFabriceVue(val, idx)

Updates the active color by changing the values of
`index` and `color`, and dispatching `updateActiveObj` 
and `updateColor`. The method also updates the object properties 
list. `stateHanlding` is used to save the state of the canvas. 

#### renameSectorFabricInspector ()

Updates the name of the selected object and updates 
the object properties list by dispathing `renameSector`, `updateInfo` and `setPredefinedSectors`.
`stateHanlding` is used to save the state of the canvas. 

#### makeShape (type, color)

Creates a shape based on a selected sector from the sector list by 
dispatching `updateColorSectorList` and `createShape`.

#### spanMake (condition)

Used to toggle the dropdown that appears when a sector from the
sector list is clicked. Changes the boolean value of `this.clicked` to `condition`.

#### changeGridSize

Used to update the grid size when the grid size
slider is used in the object properties list. This is done by dispatching
`changeGridSizde` and passing the `this.gridsize` arguement.
 
