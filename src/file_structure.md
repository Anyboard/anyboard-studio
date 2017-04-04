# FILE STRUCTURE
A simple explanation of the file structure
Vue (or Node?) defaults to picking up the `index.js` file when importing from a folder. E.g.

```JavaScript
import localScopeVariableName from './folder'
```
is equivalent to
```JavaScript
import localScopeVariableName from './folder/index.js'
```
and sets the variable that file's `export default` object/function/variable


  If 


```JavaScript
/ src
  / assets              // Static resources like images and fonts
  / components
    / component         // Enclosing each component for readability
      'component.vue'   // Rendering template (with HTML/JS/CSS)
      'component.js'    // Namespaced store with all data/functions the component introduces to global scope
    / component2
      'component2.vue'
      'component2.js'
  / router
    index.js

  / store 
    index.js

```