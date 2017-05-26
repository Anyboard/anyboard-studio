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
