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
There is no forced file structure for Vue-projects. Thus we can put bits and pieces all around as we wish as long as there are noe broken references. 

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

## Understanding the store
The store is basically a global object bound to the root Vue instance. So after you have initialized your Vue-object, the store's functions are accessible through `this.$store`. However, this only applies as long as you haven't messed with what `this` references. E.g. through the use of fat-arrow functions like `(arg) => {}`. Within that function scope `this` points to the browser window and you'll either have to pass in the reference to the Vue-instance as an argument or find it through other means. 

To make it easier to maintain we've broken up the store in several smaller pieces and put them alongside their related components. This should make it easier to understand the structure as the project grows.



### Global store
`Store.js` is composed of both direct and imported pieces. Only the "root" store has to import Vue and Vuex. "Child" stores are imported either partially or as a whole and will inherit it's parent's scope. By namespacing the children we also make sure to avoid any ambiguity on where something belongs.

Basic example of the scaffold for a global store 
```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'

// Setting the root Vue-instance to use Vuex
Vue.use(Vuex)       

// Initiating a new Store
export default new Vuex.Store({
  // The state object holds all the data that needs to be globally accessible, but should never be directly referenced.
  state: {},        
  
  // Mutations are functions for changing a single state and must be synchronous. Keep them simple.
  mutations: {},    
  
  // Actions are more complex methods that mutate one or more states by calling the corresponding mutation. Actions allows asynchronousity.
  actions: {},      
  
  // When you need data from the store use it's corresponding getter. 
  getters: {}

  // Child stores are imported and referenced here
  modules: {}
})

```

## Component Structure














