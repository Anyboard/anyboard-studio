# htmlConverter.py

A python file used to convert `index.html` into a string variable in `html-template.js`. When executed it goes through
`index.html` line for line and adds each line to a `htmlTemplate` variable. When the reader is done, it writes the
export line at the end of `html-template.js` to allow the variable to be imported.
