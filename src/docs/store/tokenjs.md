# token.js

## State

The token store contains state data pertaining the currently selected token.

`savedTokens` is a list of saved Tokens. Tokens are saved as objects, where the token's name serves as the object's key,
and the value is an array where the first value always is an array of RGB-values for the LED light, and other values in the array are allowed actions and haptics for the token.

`numberOfDynamicTokens` records the number of dynamic tokens created.

`selectedToken` keeps track of the currently selected token. If no token is currently selected, the value is an empty string.

`LEDColor` is a hex-string representing the color currently selected for the currently selected token.

`attributes` is an object containing boolean values for the haptics and actions of the currently selected token.

### Mutations

`CHANGE_LED_COLOR` updates the state's LEDColor.

`UPDATE_TOKEN_ATTRIBUTE` toggles an attribute in the state between true or false

`ADD_NEW_TOKE` generates a new token object and appends it to `savedTokens`.

`UPDATE_TOKEN` updates the currently selected token

`SET_TOKEN` is used by Asset.vue to set the `selectedToken`

`SET_STANDARD` is used as a helper function to reset the values to "default" values, where the LED color is green and all the attributes are true.

`DELETE_TOKEN` removes the selected token from `savedTokens`

`DOWNLOAD_TOKENS` creates a Blob-object and saves the `savedTokens` as a `.json`-file

`UPLOAD_TOKENS` is used to upload saved tokens from a `.json`-file. This function replaces the currently saved tokens with the tokens from the `.json`-file.

### Actions

The actions of the `token.js` store call mutations in different orders to propagate application behavior.

### Getters

The two getters `GET_SAVEDTOKENS` and `GET_SELECTEDTOKEN` are used by other components in the application to load data created with `TokenEditor.vue`
