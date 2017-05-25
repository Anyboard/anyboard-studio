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
list.

#### renameSectorFabricInspector ()

Updates the name of the selected object and updates the object properties list. 

#### makeShape (type, color)

Creates a shape based on a selected sector from the sector list.

#### spanMake (condition)

Used to toggle the dropdown that appears when a sector from the
sector list is clicked.

#### changeGridSize

Used to update the grid size when the grid size
slider is used in the object properties list. 
 
