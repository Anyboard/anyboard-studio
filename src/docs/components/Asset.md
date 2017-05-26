# Asset.vue

Asset.vue is the main component for the game assets view. It controls what game asset editor is being viewed to the user
and keeps a list of the relevant assets made with the editors.

## Template

The template element contains two main divs.

### Asset-listing

This div contains a collapse element which is used to show the different assets created and available, and to swap
between the different game asset editors. When a new asset is made with an editor, a relevant item will be added to the
respective collapse-item. If a new editor is to be added, a new collapse-item should be added.

### asset_inspector

The div containing and displaying the different editors. Only one editor will be shown at a time depending on the
state of `asset_type`

## Script

### Data

`asset_type` is the state used to define which editor is being displayed to the user. By default it is set to `led`.

### Computed

Computes different states from the vuex store.

From the `ledgrid` store `savedGrids` is computed to keep track of what display patterns have been made.
 
From the `token` store `savedTokens` and `selectedToken` are computed to keep track of what tokens have been made and 
which token is currently being selected and edited.

### Components

The different components used in Asset.vue.

### Methods

Many of the methods dispatches actions to their relevant stores, `token.js` and `ledgrid.js`. The actions are further
docuemnted there.

#### limit (key)

Limit is used to shorten the length of names of assets. If they are longer than 7 characters long, the name is sliced 
and the later characters are replaced with `...`. This is to keep the assets in the `asset-listing` consistent.

#### showToken ()

Swaps the `asset_type` to `token` which will change the editor displayed to the token editor.

#### showLedgrid ()

Swaps the `asset_type` to `led` which will change the editor displayed to the display pattern editor.

#### selectAsset (type, key)

Used when a user selects an asset from `asset-listing`. It will dispatch the action `selectToken` or `selectGrid`
depending on the `type` of asset. `key` is the index of the asset in the list.

#### newGrid ()

Dispatches `deselectGrid` and `clearGrid` which is used to make a new grid.

#### newToken ()

Dispatches `deselectToken` and `setStandardToken` which is used to make a new token.
