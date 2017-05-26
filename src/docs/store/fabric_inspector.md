# fabric_inspector.js

fabric_inspector.js is a vuex store
file for manipulating the fabric inspector object 

## States

 `sectors` is the list of sectors that are displayed in the Sector list.
 
 `activeColor` is a hex string of the color that is currently set to active.

 All of the following states are used to hold various information
  about a object and is displayed in the Object properties
 
 `height` contains the height of a object in the form of a float value
 
 `width` contains the width of a object in the form of a float value
 
 `type` contains the type of a object (circle, rectangle, etc) in the form of a string
 
 `fill` contains the color of a object in the form of a hex string
 
 `name` contains the name of a object in the form of a string
 
 `stroke` contains the objects border color in the form of a hex string
 
 `strokedasharray` contains the properties regarding the objects border (distance between each border section and length of each section) in the form of a array with gap and length
 
 `strokewidth` contains the width of a objects border in the form of a float
 
 `minwidth` contains the minimum width that a object must have in the form of a float
 
 `minheight` contains the minimum height that a object must have in the form of a float

## Mutations

All of the following mutations take in a `state` and a `payload`.
Some specified value in the `state` is set to the value of `payload`.

#### SET_PREDEFINED_SECTORS (state, payload)

Sets the state `sectors` to `payload`.

Used to set the predefined sectors.

#### SET_HEIGHT (state, payload)

Sets the state `height` to `payload`.

Used to set the height of a object.

#### SET_WIDTH (state, payload)

Sets the state `width` to `payload`.

Used to set the width of a object.


#### SET_TYPE (state, payload)

Sets the state `type` to `payload`.

Used to set the type of a object.

#### SET_FILL (state, payload)

Sets the state `fill` to `payload`.

Used to set the color of a object.


#### SET_NAME (state, payload) 

Sets the state `name` to `payload`.

Used to set the name of a object.


#### SET_STROKE (state, payload)

Sets the state `stroke` to `payload`.
 
Used to set the color of a objects border.

#### SET_STROKE_DASH_ARRAY (state, payload)

Sets the state `strokedasharray` to `payload`.

Used to set the values of a objects strokedasharray.
    
#### SET_STROKE_WIDTH (state, payload) 

Sets the state `strokewidth` to `payload`.

Used to set the width of a objects border.

#### SET_MIN_WIDTH (state, payload)

Sets the state `minwidth` to `payload`.

Used to set the minimum required width of a object.

#### SET_MIN_HEIGHT (state, payload)

Sets the state `minheight` to `payload`.

Used to set the minimum required height of a object.

#### SET_PROPER_COLOR (state, payload)

Sets the state `activecolor` to `payload`.

Used to set the selected color to active color. 

## Actions

All actions have `{commit}` as an argument, which is used to call mutations. Many of the actions in this store are
self explanatory and are only use to call a single mutation. These will not be explained.

#### updateInfo ({commit}, activeObj)

updateInfo is used to invoke numerous mutations that update the 
object properties list. Conditional statements are used to check what type of object is 
currently selected and decide which mutations should be called.



