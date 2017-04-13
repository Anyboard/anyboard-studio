import {fabric} from 'fabric'

export const createPolyPoints = function (sideCount, radius) {
  var sweep = Math.PI * 2 / sideCount
  var cx = radius
  var cy = radius
  var points = []
  for (var i = 0; i < sideCount; i++) {
    var x = cx + radius * Math.cos(i * sweep)
    var y = cy + radius * Math.sin(i * sweep)
    points.push({x: x, y: y})
  }
  return (points)
}

// Helping function for layerify
function restoreObjs (group, canvas) {
  // Gets a list of objects from the group
  let items = group._objects
  // Restores the states of the objects from the group
  group._restoreObjectsState()
  // Removes the group object to canvas to avoid clogging with empty groups
  canvas.remove(group)
  // Goes through all objects and adds them to the canvas
  for (let i = 0, l = items.length; i < l; ++i) {
    canvas.add(items[i])
  }
}
// Layers types of objects, text > rects > paths > images
export const layerify = function (canvas) {
  // Sets up variables for all objects and lists for the types
  var obj = canvas.getObjects()
  var textLayer = []
  var tileLayer = []
  var bPathLayer = []
  var fPathLayer = []
  var imageLayer = []
  // Adds each relevant object to their respective list
  for (var i = 0, l = obj.length; i < l; ++i) {
    if (obj[i]['type'] === 'rect' || obj[i]['type'] === 'polygon') {
      tileLayer.push(obj[i])
    } else if (obj[i]['type'] === 'path' && obj[i]['name'] === 'bottom') {
      bPathLayer.push(obj[i])
    } else if (obj[i]['type'] === 'image') {
      imageLayer.push(obj[i])
    } else if (obj[i]['type'] === 'i-text') {
      textLayer.push(obj[i])
    } else if (obj[i]['type'] === 'path' && obj[i]['name'] === 'top') {
      fPathLayer.push(obj[i])
    }
  }
  // Adds lists of objects to respective fabric groups
  var textGroup = new fabric.Group(textLayer)
  var tileGroup = new fabric.Group(tileLayer)
  var bPathGroup = new fabric.Group(bPathLayer)
  var imageGroup = new fabric.Group(imageLayer)
  var fPathGroup = new fabric.Group(fPathLayer)
  // Clears old objects
  canvas.clear().renderAll()
  canvas.setBackgroundColor('white')
  // Adds groups to canvas
  canvas.add(imageGroup)
  canvas.add(bPathGroup)
  canvas.add(tileGroup)
  canvas.add(fPathGroup)
  canvas.add(textGroup)
  // Restores objects from group to canvas to allow layerify to work multiple times
  restoreObjs(imageGroup, canvas)
  restoreObjs(bPathGroup, canvas)
  restoreObjs(tileGroup, canvas)
  restoreObjs(fPathGroup, canvas)
  restoreObjs(textGroup, canvas)
}
