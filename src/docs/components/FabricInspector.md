# FabricInspector.vue

FabricInspector.vue displays various information about `FabricCanvas.vue`. This includes a list of all sectors, a list of properties for the currently selected object, and a color picker, where the user selects the color for sectors.

## Template

Fabric Inspector is divided into three parts, namely Colorpicker, Object properties and Sector list, each with its own purpose. 
The component also interacts with the FabricCanvas.

### FabricCanvas 
The FabricCanvas.vue component is the actual 
component that includes the visual board. 
When the user uses the Fabric Inspector to make changes 
they will be reflected in this component. 

### Colorpicker

The colorpicker is used to change the color of a selected
object or a new sector. By clicking on a color, the color will be set to active, indicated by the largest color box.

### Object properties

Object properties shows the various properties of the selected object.
The user can change the name of the selected object by entering a new name
in the text field. The user can also change the size of the board grid by using
the slider. 

### Sector list

The sector list shows the list of all sectors 
currently on the board, with the exception of the three
predefined sectors. These sectors are always present in the list.
By clicking on a sector, the user is given the option to create a new sector
of that kind by clicking on a sector shape.

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
 
