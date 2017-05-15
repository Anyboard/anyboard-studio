# BoardEditor.vue

BoardEditor.vue is the component where everything related to the Fabric Canvas is placed. The toolbar uses the
`IconButton.vue` component to create buttons, and the component also imports the components `FabricCanvas.vue` and
`FabricInspector.vue`. 

## Template

### Fabric Toolbar

The fabric toolbar is a customised unordered list using `Iconbutton.vue` components to create the buttons. It
includes all the functions necessary to add, modify and remove objects on the board. Some buttons show several new
buttons when hovered over instead. Some buttons related to uploading files click on an invisible html5 `input` element
of the type `file`.

### FabricCanvas

The `FabricCanvas.vue` component is the actual component that includes the visual board. When the user uses the toolbar
to make changes they will be reflected in this component. Some actions can be done by interacting directly with this
component too.

Further documentation in `FabricCanvas.vue`

### FabricInspector

The Fabric Inspector is a component that includes and shows relevant information about `FabricCanvas.vue`. This
includes a colorpicker to chose sector colors from, a properties tab where the user can view the attributes about
their currently selected object, and a list of sectors, both predefined and user created ones.

## Script

### Methods

The following methods are called when using the Fabric Toolbar. Most of the methods dispatch an action to the vuex
store, these are further documented in `fabric_canvas.js`

#### makeShape (event)

Dispatches the `createShape` action together with a sector type. This sector type is in the form of a string and depends
on which button was pressed. Will add a square, triangle or circle sector to the canvas with the currently chosen
colour in `FabricInspector.vue`

#### insertText ()

Dispatches the `insertText` action which adds an interactive text object to the canvas.

#### toggleDraw ()

Dispatches the `toggleDraw` action which will toggle the free drawing mode.

#### changeWidth ()

Dispatches the `changeWidth` action which changes the size of the free drawing brush.

#### changeDrawLayer ()

Dispatches the `changeDrawLayer` action which toggles if the user is drawing in the background or foreground.

#### changeDrawColor ()

Dispatches the `changeDrawColor` action which changes the draw color, currently used to reset the brush to black.

#### deleteObject ()

Dispatches the `deleteObject` action which will delete the active object if one is selected.

#### cloneObject ()

Dispatches the `cloneObject` action which clones the active object if one is selected and adds the clone to the canvas.

#### clearCanvas ()

Dispatches the `clearCanvas` action which deletes all objects on the board.

#### centerObject ()

Dispatches the `centerObject` action which centers the active object if one is selected to the center of the canvas.

#### arrangeObject (event)

Dispatches the `arrangeObject` action which will bring the selected object forward or to front, send it backwards or
to back, depending on the `event.target.id`. The `id` will be a string with value depending on the button pressed.

#### clickImage ()

Clicks on the invisible html5 input element with the id `image`.

#### uploadImage (event)

When clicked on by the `clickImage` method, the user can upload an image. If the user uploads a file, the
`uploadImage` action will be dispatched, where `event.target.files[0]` is the file. The image will be added to the
board and the html5 input element `image` will be reset in case the user wants to upload the same image twice.

#### changeGridMode ()

Dispatches the `changeGridMode` action which toggles the snap to grid mode.

### components

The components that are imported are defined here.

## Style

Styling documentation goes here.
