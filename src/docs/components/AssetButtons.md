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
