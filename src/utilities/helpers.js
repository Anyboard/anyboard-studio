import {fabric} from 'fabric'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

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
  var lineLayer = []
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
    } else if (obj[i]['type'] === 'line') {
      lineLayer.push(obj[i])
    }
  }
  // Adds lists of objects to respective fabric groups
  var lineGroup = new fabric.Group(lineLayer)
  var textGroup = new fabric.Group(textLayer)
  var sectorGroup = new fabric.Group(sectorLayer)
  var bPathGroup = new fabric.Group(bPathLayer)
  var imageGroup = new fabric.Group(imageLayer)
  var fPathGroup = new fabric.Group(fPathLayer)
  // Clears old objects
  cvs.clear().renderAll()
  cvs.setBackgroundColor('white')
  // Adds groups to canvas
  cvs.add(lineGroup)
  cvs.add(imageGroup)
  cvs.add(bPathGroup)
  cvs.add(sectorGroup)
  cvs.add(fPathGroup)
  cvs.add(textGroup)
  // Restores objects from group to canvas to allow layerify to work multiple times
  restoreObjs(lineGroup, cvs)
  restoreObjs(imageGroup, cvs)
  restoreObjs(bPathGroup, cvs)
  restoreObjs(sectorGroup, cvs)
  restoreObjs(fPathGroup, cvs)
  restoreObjs(textGroup, cvs)
}

// Helping function for inserting sectors into json object
export const insertIntoDict = function (dict, key, value) {
  // If key is not initialized or some bad structure
  if (!(key in dict)) {
    dict[key] = value
  }
}

const colourDict = {
  '#4194D0': 5,
  '#166CA0': 2,
  '#112A95': 7,
  '#C047A3': 14,
  '#5E1014': 16,
  '#9B3235': 18,
  '#66C889': 21,
  '#30A747': 24,
  '#31682E': 30,
  '#FF9344': 31,
  '#D96623': 33,
  '#F4E658': 37
}

const colourNames = {
  '#4194D0': 'Light Blue',
  '#166CA0': 'Blue',
  '#112A95': 'Dark Blue',
  '#C047A3': 'Purple',
  '#5E1014': 'Dark Red',
  '#9B3235': 'Red',
  '#66C889': 'Light Green',
  '#30A747': 'Green',
  '#31682E': 'Dark Green',
  '#FF9344': 'Orange',
  '#D96623': 'Dark Orange',
  '#F4E658': 'Yellow'
}

export const getColorName = function (color) {
  return colourNames[color]
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
      // Makes sure only sectors get added
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
  'Start Sector': '#C047A3',
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
          obj['name'] = getColorName(obj['fill'])
        }
      }
    }
  }
}

export const renameSector = function (canvas, newName) {
  let selObj = canvas.getActiveObject()
  const obj = canvas.getObjects()
  const oldName = selObj['name']
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
    activeObj.set('name', getColorName(activeObj.fill))
    canvas.renderAll()
    renameSameSector(activeObj, canvas)
  } else if (activeObj != null && activeObj['type'] === 'path') {
    activeObj.stroke = sectorColor
    canvas.renderAll()
  }
}

function getFile (url, callback) {
  const xmlhttp = new XMLHttpRequest()
  xmlhttp.open('GET', url, false) // Must use false to properly get the files even if it's sync
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      callback(xmlhttp.response)
    }
  }
  xmlhttp.send()
}

export const makeZip = function (blob) {
  let zip = new JSZip()
  // dist folder
  let dist = zip.folder('dist')
  getFile('https://raw.githubusercontent.com/simonem/anyboard/firmwareWork/games/demo-anyPawn/dist/anyboard.js',
    function (gameFile) {
      dist.file('anyboard.js', gameFile)
    })

  // drivers folder
  let drivers = zip.folder('drivers')
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/drivers/bean.evothings.bluetooth.js',
    function (gameFile) {
      drivers.file('bean.evothings.bluetooth.js', gameFile)
    })

  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/drivers/discovery.evothings.bluetooth.js',
    function (gameFile) {
      drivers.file('discovery.evothings.bluetooth.js', gameFile)
    })

  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/drivers/rfduino.evothings.bluetooth.js',
    function (gameFile) {
      drivers.file('rfduino.evothings.bluetooth.js', gameFile)
    })

  // firmware
  let firmware = zip.folder('firmware')
  let rfduinoToken = firmware.folder('RFduino_token')
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/firmware/RFduino_token/RFduino_token.ino',
    function (gameFile) {
      rfduinoToken.file('RFduino_token.ino', gameFile)
    })

  // libs
  let libs = zip.folder('libs')
  let evothings = libs.folder('evothings')
  let easyble = evothings.folder('easyble')
  let util = evothings.folder('util')
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/libs/jquery-1.11.3.min.js',
    function (gameFile) {
      libs.file('jquery-1.11.3.min.js', gameFile)
    })
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/libs/evothings/evothings.js',
    function (gameFile) {
      evothings.file('evothings.js', gameFile)
    })
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/libs/evothings/easyble/easyble.js',
    function (gameFile) {
      easyble.file('easyble.js', gameFile)
    })
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/libs/evothings/util/util.js',
    function (gameFile) {
      util.file('util.js', gameFile)
    })

  // ui
  let ui = zip.folder('ui')
  let css = ui.folder('css')
  // let fonts = ui.folder('fonts')
  let images = ui.folder('images')
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/ui/perso.css',
    function (gameFile) {
      ui.file('perso.css', gameFile)
    })
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/ui/css/evothings-app.css',
    function (gameFile) {
      css.file('evothings-app.css', gameFile)
    })

  // ui/images
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/ui/images/arrow-left.svg',
    function (gameFile) {
      images.file('arrow-left.svg', gameFile)
    })
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/ui/images/arrow-right.svg',
    function (gameFile) {
      images.file('arrow-right.svg', gameFile)
    })
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/ui/images/logo.svg',
    function (gameFile) {
      images.file('logo.svg', gameFile)
    })
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/ui/images/menu.svg',
    function (gameFile) {
      images.file('menu.svg', gameFile)
    })

  // root folder
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/README.md',
    function (gameFile) {
      zip.file('README.md', gameFile)
    })
  getFile('https://raw.githubusercontent.com/simonem/anyboard/master/games/demo-anyPawn/evothings.json',
    function (gameFile) {
      zip.file('evothings.json', gameFile)
    })

  zip.file('index.html', blob) // Adds the index.html to zip
  zip.generateAsync({type: 'blob'}).then(function (content) {
    FileSaver.saveAs(content, 'game.zip')
  })
}

export const colorHexToRGB = function (hexCode) {
  let RGB = [
    hexCode.slice(1, 3),
    hexCode.slice(3, 5),
    hexCode.slice(5, 7)
  ]
  for (let i = 0; i < RGB.length; i++) {
    RGB[i] = parseInt(RGB[i], 16)
  }
  return RGB
}

/* converters from binary to decimal, and vice versa
   taken from http://stackoverflow.com/a/17210335 */

// converts binary string to a hexadecimal string
// returns an object with key 'valid' to a boolean value, indicating
// if the string is a valid binary string.
// If 'valid' is true, the converted hex string can be obtained by
// the 'result' key of the returned object
export const binaryToHex = function (s) {
  let i
  let k
  let part = ''
  let accum = ''
  let ret = ''
  for (i = s.length - 1; i >= 3; i -= 4) {
    // extract out in substrings of 4 and convert to hex
    part = s.substr(i + 1 - 4, 4)
    accum = 0
    for (k = 0; k < 4; k += 1) {
      if (part[k] !== '0' && part[k] !== '1') {
        // invalid character
        return { valid: false }
      }
      // compute the length 4 substring
      accum = accum * 2 + parseInt(part[k], 10)
    }
    if (accum >= 10) {
      // 'A' to 'F'
      ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret
    } else {
      // '0' to '9'
      ret = String(accum) + ret
    }
  }
  // remaining characters, i = 0, 1, or 2
  if (i >= 0) {
    accum = 0
    // convert from front
    for (let k = 0; k <= i; k += 1) {
      if (s[k] !== '0' && s[k] !== '1') {
        return { valid: false }
      }
      accum = accum * 2 + parseInt(s[k], 10)
    }
    // 3 bits, value cannot exceed 2^3 - 1 = 7, just convert
    ret = String(accum) + ret
  }
  return { valid: true, result: ret }
}

// converts hexadecimal string to a binary string
// returns an object with key 'valid' to a boolean value, indicating
// if the string is a valid hexadecimal string.
// If 'valid' is true, the converted binary string can be obtained by
// the 'result' key of the returned object
export const hexToBinary = function (s) {
  let i
  let ret = ''
  // lookup table for easier conversion. '0' characters are padded for '1' to '7'
  let lookupTable = {
    '0': '0000',
    '1': '0001',
    '2': '0010',
    '3': '0011',
    '4': '0100',
    '5': '0101',
    '6': '0110',
    '7': '0111',
    '8': '1000',
    '9': '1001',
    'a': '1010',
    'b': '1011',
    'c': '1100',
    'd': '1101',
    'e': '1110',
    'f': '1111',
    'A': '1010',
    'B': '1011',
    'C': '1100',
    'D': '1101',
    'E': '1110',
    'F': '1111'
  }
  for (i = 0; i < s.length; i += 1) {
    if (lookupTable.hasOwnProperty(s[i])) {
      ret += lookupTable[s[i]]
    } else {
      return { valid: false }
    }
  }
  return { valid: true, result: ret }
}
