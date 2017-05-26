# Components

# AssetButtons.vue

Buttons that are added to the navbar, used to download and upload various game assets.


## Template

A div containing link elements which calls methods when clicked on. The div is added to the navbar when on the
game assets view.

## Script

### Methods

All the methods will be dispatching at least one action in the vuex store. The actions are further documented in
`token.js` and `ledgrid.js`

#### downloadTokens ()

Dispatches the `downloadTokens` action which downloads the tokens in a JSON-format which the user can later upload.

#### downloadGrids ()

Dispatches the `downloadGrids` action which downloads the grids in a JSON-format which the user can later upload.

#### loadTokens ()

Clicks on an invisible html5 input element with the id `tokens`.

#### uploadBoard ()

When the html5 input element `tokens` is clicked, the user will be able to upload tokens in JSON-format. When the user
uploads a file, a FileReader will be made to read the file, and when it loads, it will parse the result and dispatch the
`uploadTokens` action with the result.

#### loadGrids ()

Clicks on an invisible html5 input element with the id `grids`.

#### uploadBoard ()

When the html5 input element `grids` is clicked, the user will be able to upload grids in JSON-format. When the user
uploads a file, a FileReader will be made to read the file, and when it loads, it will parse the result and dispatch the
`uploadGrids` action with the result.

# BoardButtons.vue

Buttons that are added to the navbar, related to exporting and importing the board.


## Template

A div containing link elements which calls methods when clicked on. The div is added to the navbar when on the
board editor view.

## Script

### Methods

All the methods will be dispatching at least one action in the vuex store. The actions are further documented in
`fabric_canvas.js`

#### downloadBoard ()

Dispatches the `downloadBoard` action which downloads the board in a JSON-format which the user can later load.

#### loadBoard ()

Clicks on an invisible html5 input element with the id `upload`

#### uploadBoard ()

When the html5 input element `upload` is clicked, the user will be able to upload a board in JSON-format. When the user
uploads a file, a FileReader will be made to read the file, and when it loads, it will parse the result and dispatch the
`uploadBoard` action with the result. This will render the uploaded board onto the canvas. When this is done the input
element is cleared to allow the user to upload the same board twice.

#### saveBoard ()

Dispatches the `saveBoard` action which lets the user save the board in a png format.

#### printBoard ()

Dispatches the `makePrintableBoard` action which creates a format of the board which can be printed. Once the board
has been made prinable, the method will get the format through a vuex getter, create a new window which includes
only the board and then print it. Once the image has been sent to printer the window new window will also close.

There is a timeout set to allow the image to load properly before printing.

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

# FabricCanvas.vue

FabricCanvas.vue is a vue comoponent which includes the html5 canvas element, which is what the user will draw their
game board on.

## Template

#### canvas

The html5 canvas where the user interacts with the game board they are making. The size is dependant on the user's
screen size.

## Script

### Data

#### fullHeight

The full height of the user's screen size.

#### fullWidth

The full width of the user's screen size.

### Computed

The canvas state in store is being mapped here, so when the canvas changes in the store due to mutations, the
canvas in the component will also update.

### beforeMount

Actions done before the component is mounted. `fullWidth` and `fullHeight` are set here depending on the user's
screen size.


### mounted

Actions that can be done once the component is mounted. Once the component is mounted and observers added it will
set the canvas to be stored in the vuex store.

#### cvs

The `cvs` object is a Fabric canvas based on the html5 canvas element, and is what is actually manipulated. The 
html5 element then reflects the Fabric object.

#### Observers

These are various observers added to the canvas to make sure the state is always up to date, new objects are given
correct properties if needed and such.

##### path:created

This observes when paths are created, which are made through the free drawing functionality. The `name` attribute
is set to the layer which the user is currently drawing on so that the path can be layered properly. Finally
it updates the Fabric Inspector's info.

Currently path layers are not in use. They can be added by adding a button to the toolbar to change the freedrawing
layer or something equivalent.

##### object:added

First it checks if the grid has been added to the board. It won't do the following code if the grid adding process is
not completed to avoid running too many unnecessary state handling events. If the grid has been added, then it updates
the board state, and sets the minimum scale limit if the object added is a sector. It then finally updates the
Fabric Inspector information.

##### object:modified

Checks if the grid has been added to avoid running the code unnecessarily while the grid is in the process of being
added. If the grid has been added it will update the board state and store active object when a object is being
modified. Finally Fabric Inspector is being updated.

##### object: selected

This observer locks the scaling of Fabric Groups to avoid scaling issues. It then updates the store's active object
and finally updates Fabric Inspector information.

##### object:cleared

When a selection is cleared this updates the store's active object and then updates Fabric Inspector information.

##### object:moving

If the snap to grid mode is active, this observer snaps an object to the grid when moved by setting the object's
`left` and `top` attributes.

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


# TokenEditor.vue

The TokenEditor component is the tool users utilize to configure tokens used in a game.
The editor allows the user to restrict actions and configure attributes on types of tokens 
to streamline the design process when utilizing `Blockly.vue`.

The component consists of template HTML-code, scripts and a set of styles.

## Template

The HTML-template consists of a name input, a color input to configure the default LED color and a list of 
allowed haptic feedback and actions.

### Name

The name of a token can be configured in two different ways; 
static and dynamic, which are toggled using a checkbox input field.
If the static option is selected, the user *must* define a name for the token.
If the dynamic option is selected, the text input field for the name is hidden from the user, 
and the token is instead given an auto-generated name in the format of `tokenX`, where `X` is a number, 
so that if 4 tokens exist, and 2 of them use the dynamic naming convention, 
the two dynamically named tokens will have the names `token0` and `token1` regardless of which order the 4 tokens were created.

### LED Color

The default LED color of a token is defined using a color input field using a HTML5 datalist to constrain the user to the 7 following colors: 
```HTML
<datalist id="colors">
  <option>#ff0000</option>
  <option>#00ff00</option>
  <option>#0000ff</option>
  <option>#ffff00</option>
  <option>#ff00ff</option>
  <option>#00ffff</option>
  <option>#ffffff</option>
</datalist>
```

These colors were chosen due to hardware limitations in the firmware of the Anypawn. 

### Action and haptic restrictions

The haptic and actions restrictions defined for each token are defined using checkbox input fields. 
Each of the options are initialized as allowed when creating a new token.


### Buttons

When a user clicks the button to create a new token in the asset tab defined in `Asset.vue`, 
the TokenEditor generates a button to submit the Token defined. 
The data specified by the user is then submitted to the store file `token.js` located in `src/store`
When the user selects an already existing token from the asset tab, three different buttons are shown in the editor.
These are buttons allowing the user to `update`, `copy` or `delete` the selected token.

The `update` button allows the user to change the defined data for the selected token.
The `delete` button deletes the token from the `token.js` store, 
and the `copy` button opens a new token editor window where options selected mirror the definitions for the previously selected token.

## Scripts

### Data

The token editor records the the boolean name state `useDynamicName`, the name value `staticName`, 
as well as a boolean `disableButton` which records whether or not the submit-button should be available for the user 
depending on the validity  of the current values selected for the token.

### Watchers

The editor employs the watchers `useDynamicName(val)` and `staticName(val)` that decide whether or not the 
submit-button should be displayed. `useDynamicName(val)` disables the button if static name has been chosen, and the name input field is blank, 
while `staticName(val)` enables the submit-button, if the static name option is selected.

### Computed

The editor utilizes `mapstate` to transfer data to and from the `token.js` store assigned to the component.

### Methods

the token editor contains the functions `createToken`, `updateToken`, `copyToken` and `deleteToken`, which supports the functionalities described in the Template buttons.
It also contains the functions `updateCheckbox` and `updateLEDColor` 
which dispatches function calls to the store to update information pertaining the status of the selected token.
