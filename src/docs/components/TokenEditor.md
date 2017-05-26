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
