# FabricCanvas.vue

FabricCanvas.vue is a vue component which includes the html5 canvas element, which is what the user will draw their
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
