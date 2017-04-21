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

export const dataURLtoBlob = function (dataurl) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}

// Helping function for layerify
export const restoreObjs = function (group, cvs) {
  // Gets a list of objects from the group
  let items = group._objects
  // Restores the states of the objects from the group
  group._restoreObjectsState()
  // Removes the group object to canvas to avoid clogging with empty groups
  cvs.remove(group)
  // Goes through all objects and adds them to the canvas
  for (let i = 0, l = items.length; i < l; ++i) {
    cvs.add(items[i])
  }
}
// Layers types of objects, text > rects > paths > images
export const layerify = function (cvs) {
  // Sets up variables for all objects and lists for the types
  var obj = cvs.getObjects()
  var textLayer = []
  var sectorLayer = []
  var bPathLayer = []
  var fPathLayer = []
  var imageLayer = []
  // Adds each relevant object to their respective list
  for (var i = 0, l = obj.length; i < l; ++i) {
    if (obj[i]['type'] === 'rect' || obj[i]['type'] === 'polygon' || obj[i]['type'] === 'circle') {
      sectorLayer.push(obj[i])
    } else if (obj[i]['type'] === 'path' && obj[i]['pathName'] === 'bottom') {
      bPathLayer.push(obj[i])
    } else if (obj[i]['type'] === 'image') {
      imageLayer.push(obj[i])
    } else if (obj[i]['type'] === 'i-text') {
      textLayer.push(obj[i])
    } else if (obj[i]['type'] === 'path' && obj[i]['pathName'] === 'top') {
      fPathLayer.push(obj[i])
    }
  }
  // Adds lists of objects to respective fabric groups
  var textGroup = new fabric.Group(textLayer)
  var sectorGroup = new fabric.Group(sectorLayer)
  var bPathGroup = new fabric.Group(bPathLayer)
  var imageGroup = new fabric.Group(imageLayer)
  var fPathGroup = new fabric.Group(fPathLayer)
  // Clears old objects
  cvs.clear().renderAll()
  cvs.setBackgroundColor('white')
  // Adds groups to canvas
  cvs.add(imageGroup)
  cvs.add(bPathGroup)
  cvs.add(sectorGroup)
  cvs.add(fPathGroup)
  cvs.add(textGroup)
  // Restores objects from group to canvas to allow layerify to work multiple times
  restoreObjs(imageGroup, cvs)
  restoreObjs(bPathGroup, cvs)
  restoreObjs(sectorGroup, cvs)
  restoreObjs(fPathGroup, cvs)
  restoreObjs(textGroup, cvs)
}

// Helping function for inserting sectors into json object
function insertIntoDict (dict, key, value) {
  // If key is not initialized or some bad structure
  if (!(key in dict)) {
    dict[key] = value
  }
}

const colourDict = {
  '#166CA0': 2,
  '#4194D0': 5,
  '#112A95': 7,
  '#C047A3': 14,
  '#FB50A6': 15,
  '#5E1014': 16,
  '#9B3235': 18,
  '#FF483E': 20,
  '#66C889': 21,
  '#30A747': 24,
  '#31682E': 30,
  '#FF9344': 31,
  '#D96623': 33,
  '#F6EA77': 36,
  '#F4E658': 37
}

export const exportSectors = function (canvas) {
  // Gets objects from the json object
  const sectors = canvas.getObjects()
  // Variables to get unique values
  let sectorTypeObject = {}
  let unique = {}
  let str
  // Loops through all sectors and adds unique to a list
  for (var i = 0, l = sectors.length; i < l; ++i) {
    if (!unique.hasOwnProperty(sectors[i]['fill'])) {
      // Makes sure only rectangles or hexagons get added
      // May want to give all sectors a unique property to allow for more sector types in the future
      if (sectors[i]['type'] === 'rect' || sectors[i]['type'] === 'polygon' || sectors[i]['type'] === 'circle') {
        str = sectors[i]['name']
        if (typeof str === 'string') {
          str.replace(' ', '\u00A0')
        }
        insertIntoDict(sectorTypeObject, str, colourDict[sectors[i]['fill'].toUpperCase()])
        unique[sectors[i]['fill']] = 1
      }
    }
  }
  return sectorTypeObject
}

var sectorDict = {
  'Start Sector': '#FB50A6',
  'Mid Sector': '#F4E658',
  'End Sector': '#30A747'
}
var sectorList = Object.keys(sectorDict)

export const updateSectorList = function (canvas) {
  const obj = canvas.getObjects()
  let usedColours = {}
  sectorList = Object.keys(sectorDict)
  for (let i = 0; i < sectorList.length; i++) {
    insertIntoDict(usedColours, sectorList[i], sectorDict[sectorList[i]])
  }
  for (let z = 0, y = obj.length; z < y; ++z) {
    if (obj[z]['type'] === 'rect' || obj[z]['type'] === 'polygon' || obj[z]['type'] === 'circle') {
      insertIntoDict(usedColours, obj[z]['name'], obj[z]['fill'])
    }
  }
  return usedColours
}

function _isContains (json, value) {
  let contains = false
  Object.keys(json).some(key => {
    contains = typeof json[key] === 'object' ? _isContains(json[key], value) : json[key] === value
    return contains
  })
  return contains
}

export const checkIfSameName = function (name, dict, obj) {
  if (obj['type'] === 'circle' || obj['type'] === 'polygon' || obj['type'] === 'rect') {
    return (name in dict && dict[name] !== obj['fill'])
  } else {
    return false
  }
}

export const renameSameSector = function (obj, canvas) {
  if (obj['type'] === 'rect' || obj['type'] === 'polygon' || obj['type'] === 'circle') {
    const objs = canvas.getObjects()
    if (_isContains(sectorDict, obj['fill'])) {
      obj['name'] = Object.keys(sectorDict)[Object.values(sectorDict).indexOf(obj['fill'])]
    } else {
      for (let i = 0, l = objs.length; i < l; ++i) {
        if (obj['fill'] === objs[i]['fill'] && objs[i]['name'] !== obj['name']) {
          obj['name'] = objs[i]['name']
          break
        } else {
          obj['name'] = obj['fill']
        }
      }
    }
  }
}

export const renameSector = function (canvas, newName) {
  let selObj = canvas.getActiveObject()
  const obj = canvas.getObjects()
  const oldName = selObj['name']
  console.log('Trying to rename')
  if (selObj['type'] === 'rect' || selObj['type'] === 'polygon' ||
    selObj['type'] === 'circle') {
    if (oldName in sectorDict && oldName !== newName) {
      insertIntoDict(sectorDict, newName, selObj['fill'])
      delete sectorDict[oldName]
    }
    selObj.name = newName
    if (selObj['type'] === 'rect' || selObj['type'] === 'polygon' ||
      selObj['type'] === 'circle') {
      for (var i = 0, l = obj.length; i < l; ++i) {
        if (obj[i]['fill'] === selObj['fill']) {
          obj[i]['name'] = newName
        }
      }
    }
  } else if (selObj['type'] === 'i-text') {
    selObj['text'] = newName
    canvas.renderAll()
  } else {
    selObj.name = newName
  }
}

export const colorChange = function (canvas, sectorColor) {
  let activeObj = canvas.getActiveObject()
  if (activeObj != null && (activeObj['type'] === 'rect' || activeObj['type'] === 'polygon' ||
    activeObj['type'] === 'circle')) {
    activeObj.set('fill', sectorColor.toUpperCase())
    activeObj.set('name', activeObj.fill)
    canvas.renderAll()
    renameSameSector(activeObj, canvas)
  }
}
