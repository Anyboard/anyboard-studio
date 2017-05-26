# BlocklyButtons.vue

Buttons that are added to the navbar related to saving, loading and exporting code.

## Template

A div containing link elements which calls methods when clicked on. The div is added to the navbar when on the
code builder view.

## Script

### Methods
Nearly all the methods will dispatch at least one action in the vuex store. The actions are further documented in
`blockly.js`.

#### exportCode ()

Dispatches the `exportCode` action which will export the entire game into a zipped file which the
browser will then download.

#### downloadCode ()

Dispatches the `downloadCode` action which will download the code currently in the code builder in an XML-format.

#### addCode ()

Clicks on an invisible html5 input element with the id `add`.

#### addCodeUpload ()

When the html5 input element `add` is clicked, the user will be able to upload code in XML-format. When the user
uploads a file, a FileReader will be made to read the file, and when it loads, it will parse the result and dispatch the
`addCode` action with the result. This will add the code from the XML-file into the code builder without removing
existing code. When this is done the input element is cleared to allow the user to upload the same code twice.

#### loadCode ()

Clicks on an invisible html5 input element with the id `upload`.

#### loadCodeUpload ()

When the html5 input element `upload` is clicked, the user will be able to upload code in XML-format. When the user
uploads a file, a FileReader will be made to read the file, and when it loads, it will parse the result and dispatch the
`upload` action with the result. This will add the code from the XML-file into the code builder while removing
existing code. When this is done the input element is cleared to allow the user to upload the same code twice.



