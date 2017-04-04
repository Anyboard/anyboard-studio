# Project Structure
## Import/Export
Vue (or Node?) defaults to picking up the `index.js` file when importing from a folder. 

_Example:_
```JavaScript
import localScopeVariableName from './folder'
```
is equivalent to
```JavaScript
import localScopeVariableName from './folder/index.js'
```
and sets the variable to reference the file's `export default` object/function/variable.

Another way of importing is by selecting specific parts of a file that have multiple exports.

_Example:_
```JavaScript
//ExportingFile.js
  export const funcToImport = function (arg) { console.log('Test: ' + arg) }
  export const varToImport = 42
  
  const anotherFunction = function (arg) { console.log('Do nothing ' + arg) }
  export default anotherFunction
```
```JavaScript
//ImportingFile1.js
  import { funcToImport as localVariableName } from './ExportingFile.js'
  
  // You can then call it (from within ImportingFile.js) with:
  localVariableName('This works')    
  # Output:    Test: This works
```
```JavaScript  
//ImportingFile2.js
  import importedDefault from './ExportingFile.js'
  
  importedDefault('works too!')        
  # Output:    Do nothing works too!
```
```JavaScript  
//ImportingFile3.js
  import { * as localObj } from './ExportingFile.js'
  
  console.log( localObj.varToImport )  
  # Output:    42
  
  localObj.anotherFunction('Called from a import all') 
  # Output:    Do nothing Called from a import all
  
```


## A simple explanation of the file structure.
```
.
├─ src/                   
│  ├─ assets/                     # Static resources like images and fonts
│  │
│  ├─ components/                 # All components we use
│  │  ├─ basecomponents.vue       # Collection of basic components
│  │  │
│  │  └─ mycomponent/             # More complex components are enclosed for better readability
│  │     ├─ mycomponent.vue       # The rendering file (HTML/JS/CSS)
│  │     └─ mycomponent.js        # Namespaced store with all data/functions the component introduces to global scope
│  │  
│  ├─ App.vue                     # Root render template including a the base router view
│  ├─ main.js                     # Initiatlization of Vue root
│  ├─ router.js                   # All the router files
│  └─ store.js                    # Assembling all partial stores to a global  
│
:

```

## Store Structure
The store is basically only a global object connected to the root Vue instance. So after you have initialized your Vue-object, the store accessible using `this.$store`. However, this only applies as long as you haven't messed with what `this` references. E.g. through the use of fat-arrow functions ( `(arg) => {}` ). 

## Component Structure














