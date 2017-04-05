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

Read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

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
`Store.js` is composed of both direct and imported pieces. Only the "root" store has to import Vue and Vuex. "Child" stores are imported either partially or as a whole and will inherit it's parent's scope. By namespacing the children we also make sure to avoid any ambiguity on where a function belongs.

#### Example of the scaffold for a global store:
```JavaScript
import Vue from 'vue'
import Vuex from 'vuex'
import child from './component/child/child_store.js'

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
  modules: {
    child
  }
})

```

#### Mutation example
Mutations are required by Vue to be synchronous and transaction like. Only one function should be able to edit the state at the time and all or none of mutation must be completed.

Let's show it with an example of how to add some tiles from `Fabric.js`.
```JavaScript
// global_store.js
export default new Vuex.Store({
  state: {
    canvas_tiles: []
  },        
  
  mutations: {                                            // Caveat 1
    ADD_TILES (state, tilesArray) {                       // Caveat 2
      for (tile in tilesArray) {
        const idx = state.canvas_tiles.indexOf(tile)
        if ( idx > -1 ) {
          state.canvas_tiles[idx] = tile
        } else {
          state.canvas_tiles.push(tile)
        }
      }
    }
  }
})
```

**Some caveats to note**
1. Similarily to the data, a mutation is *not* called directly. All mutations are done via the `commit`-function, that requires at least one argument which must be the name of the mutation you wish to invoke. Typically you also pass a payload object as the second argument, unless e.g. the mutation is purely computational or uses other data from the store.

```JavaScript

// From within the store-scope
commit('ADD_TILES', payload)

// From a component mapping the mutation
this.$store.commit('ADD_TILES', payload)

// From a namespaced child store (root=true must be the 3rd argument)
commit('ADD_TILES', payload, { root: true })
```

2. Mutations must take in at least one argument, a context object for it's local state. This is to ensure that the mutation don't change data outside of it's intended scope. If you have to mutate data somewhere else you invoke that data's corresponding mutation-function through a commit instead.

### Action Example
Whenever you need to update several pieces of the state or you need to fetch something from e.g. a database actions is the way to go. Actions are expected to change the pieces through their corresponding mutation, but it only does so when it's relevant. 

For example if you want to fetch something from a web source, and using parts of the response you build up a new value that you want to put into the store. You don't want to lock up the thread while waiting for the web server to respond, but you can't change the state until you have a response. Thus asynchronous is the way to go. Vuex supports using Promises better control on success or failure.

**Look at this example.**
```JavaScript
// global_store.js
  state: {
    webResponse: ""
  },

  mutations: {
    SAVE_WEB_RESPONSE (state, payload) {
      if (typeof payload === "string") {
        state.webResponse = payload
      } else {
        state.webResponse = JSON.stringify(payload)
      }
    }
  },

  actions: {
    async saveWebResponse ({commit}) {                    // 1.
      commit( 'SAVE_WEB_RESPONSE', await getWebData() )   // 2.
    }
  }  
```

1. One thing to note here is that the function is set to not take in anything else than a context object and destructure it to get out the commit function. The reason here is that we don't have anything apart from the web response to save, otherwise we would send in a payload object as the second argument.

2. While a little cryptic this way of writing an asynchronous function is coming in the next ES-build. It utilises the async-await pattern. Simply explained (but probably not technically correct), it sort of puts the function/scope aside while waiting for `getWebData()` to resolve. GetWebData must return a Promise-object like below.

```JavaScript
// getWebData.js
const request = require('request')  // Node module for Http requests

getWebData () {
  // Say we have a REST api that returns a string at the following URL
  const url = 'http://ireturnrandomdata.com/simplestring/1'    

  return new Promise ( (resolve, reject) =>               // A.
    request( url, (error, response, body) => {            // B.
      
      if( error ) {
        reject ( error )                                  // A1.
        returns                                           // C.
      }
      
      let str = parseToGetString( body )    // Fictional parser
      resolve ( str )                                   // A2.
      
    })
  ) 
}
```

**Some explanation**
A. The promise takes in two functions as it's only parameters and pass it in to an anonomous function (aka lambda or fat arrow function). The reason for using lambdas is simply that it doesn't need to have `this` bound. These functions will, when invoked, reinitiate the method that used `await`, in this case: `saveWebResponse`. 
A1. If there is an error in the web response the promise invokes the `reject` function with the `error` object.
A2. If the response was succesful, it invokes the `resolve` function passing in the parsed string `str` for `saveWebResponse` to use as payload.

B. Calling a typical http request passing in the url and a callback (built like a normal lambda function) which takes in an error, response and body object as arguments. We use those to verify and handle what the server gave us.

C. By returning early we skip the rest of the function.

## Component Structure














