<template>
  <div id = 'boardEditor'>
    <toolbar :buttons="tb" v-on:createRect="createRect" @createCircle="createCircle"></toolbar>
    <input type='button' id='square' value='New square sector'/>
    <input type='button' id='hexagon' value='New hexagon sector'/>
    <input type='text' id='colourPickerSector'/>
    <input type='button' id='colourChange' value='Change colour'/>
    <input type='file' id='image' style='display: none;'/>
    <!-- Workaround button to avoid ugly file text-->
    <input type="button" value="Upload image" onclick="document.getElementById('image').click();" />
    <input type='button' id='clone' value='Clone'/>
    <input type='button' id='delete' value='Delete'/>
    <input type='button' id='clearCanvas' value='Clear'/>
    <br/>
    <input type='button' id='center' value='Center object'/>
    <input type='button' id='moveUp' value='Move up'/>
    <input type='button' id='moveDown' value='Move down'/>
    <input type='button' id='drawing' value='Draw'/>
    <input type='text' id='drawColor'/>
    <input type='button' id='text' value='Text'/>
    <input type='button' id='save' value='Save image'/>
    <!-- For debugging and testing-->
    <input type='button' id='jayson' value='JSON'/>
    <div id='wrapper'>
      <canvas id='c' width = '947' height = '669'></canvas>
      <div id='container'>
        <div id='controls'>
          <span id='width'>10</span>
          <input type='range' value='10' min='1' max='100' id='drawingLineWidth'/>
          <br/>
          <input type='button' id='backgroundDrawing' value='Background Drawing' disabled/>
          <input type='button' id='foregroundDrawing' value='Foreground Drawing'/>
        </div>
        <div id='sectorTutorial'>
          <p>Sectors need a minimum size and have an yellow dashed border! Important bznz!!!</p>
          <input type='button' id='tutClose' value='Understood'/>
        </div>
        <div id='sectorAttr'>
          <input type='text' id='sectorName' value='Sector Name'/>
          <input type='button' id='renameSector' value='Rename'/>
        </div>
        <div id='sectorList'>
          <p>List of sectors</p>
          <ul id = 'tList'>
          </ul>
        </div>
        <div id='clearConfirm'>
          <p>Are you sure you want to clear the board?</p>
          <input type='button' id='confirmClearButton' value="Yes, I'm sure!"/>
          <input type='button' id='denyClearButton' value='No, nevermind!'/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {fabric} from 'fabric'
  import $ from 'jquery'
  import FileSaver from 'file-saver'
  import spectrum from 'spectrum-colorpicker' /* eslint no-unused-vars: off */
  // TODO: import store in root and still be able to use store in this component
  import store from '../store/store'

  var canvas
  var sectorColour = '#166CA0'
  var drawColour = '#000000'
  var drawLineWidth = 10
  var tutorialViewed = 0
  var freeDrawLayer = 'bottom'
  var usedColours = {}

  var colourDict = {
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

  var sectorDict = {
    'Start Sector': '#FB50A6',
    'Mid Sector': '#F4E658',
    'End Sector': '#30A747'
  }

  var sectorList = Object.keys(sectorDict)

  export default {
    name: 'boardEditor',
    data () {
      return {
        tb: [
          { text: 'RE', event: 'createRect' },
          { text: 'CI', event: 'createCircle' }
        ]
      }
    },
    components: {
      'toolbar': require('./Toolbar.vue')
    },
    methods: {
      createRect: function (properties) {
        properties = {
          top: Math.random() * 100 + 10,
          left: Math.random() * 100 + 10,
          width: Math.random() * 10 + 10,
          height: Math.random() * 10 + 10,
          fill: '#ff9900'
        }

        let rect = new fabric.Rect(properties)
        canvas.add(rect).setActiveObject()
        console.log('RECT!')
      },
      createCircle: function (properties) {
        properties = {
          top: Math.random() * 100 + 10,
          left: Math.random() * 100 + 10,
          width: Math.random() * 10 + 10,
          height: Math.random() * 10 + 10,
          fill: '#ff9900'
        }

        let circle = new fabric.Circle(properties)
        canvas.add(circle).setActiveObject()
        console.log('CIRC!')
      }
    },
    mounted () {
      // ######################################### CANVAS ##############################################################
      // ###############################################################################################################
      // Setting up Fabric.js canvas
      canvas = new fabric.Canvas('c', {
        isDrawingMode: false
      })
      canvas.setBackgroundColor('white')
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas)
      canvas.freeDrawingBrush.width = drawLineWidth
      canvas.freeDrawingBrush.color = drawColour
      loadState()
      updateSectorList()
      // ########################################## SECTORS ##############################################################
      // ###############################################################################################################
      // Function for creating rectangle
      function createRectangleSector (colour) {
        if (tutorialViewed === 0) {
          $('#sectorTutorial').css('display', 'block')
        }
        let rect = new fabric.Rect({
          width: 190,
          height: 190,
          fill: colour.toUpperCase(),
          stroke: '#ffd445',
          strokeDashArray: [15, 3],
          strokeWidth: 7,
          minHeight: 190,
          minWidth: 190,
          name: colour
        })
        renameSameSector(rect)
        canvas.add(rect).setActiveObject(rect)
        canvas.getActiveObject().center()
        layerify()
      }
      // Creates a new square sector
      $('#square').click(function () {
        createRectangleSector(sectorColour)
      })

      $('body').on('click', 'input.dynamicButtonRect', function () {
        createRectangleSector(event.target.id)
      })

      // Can create any regular polygon with set amount of sides and radius
      function regularPolygonPoints (sideCount, radius) {
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

      function createHexagonSector (colour) {
        if (tutorialViewed === 0) {
          $('#sectorTutorial').css('display', 'block')
        }
        let hexagon = new fabric.Polygon(regularPolygonPoints(6, 100), {
          fill: colour.toUpperCase(),
          stroke: '#ffd445',
          strokeDashArray: [15, 3],
          strokeWidth: 7,
          minHeight: 173,
          minWidth: 200,
          name: colour
        })
        renameSameSector(hexagon)
        canvas.add(hexagon).setActiveObject(hexagon)
        canvas.getActiveObject().center()
        layerify()
      }

      $('#hexagon').click(function () {
        createHexagonSector(sectorColour)
      })

      $('body').on('click', 'input.dynamicButtonHex', function () {
        createHexagonSector(event.target.id)
      })

      // Limited colour picker by swatches
      $('#colourPickerSector').spectrum({
        preferredFormat: 'hex',
        color: sectorColour,
        // Allows only our predefined colours to be picked
        showPaletteOnly: true,
        // Change or add colours here
        palette: [
          [
            '#166CA0',  // 2
            '#4194D0',  // 5
            '#112A95',  // 7
            '#C047A3',  // 14
            '#FB50A6'], // 15
          [
            '#5E1014',  // 16
            '#9B3235',  // 18
            '#FF483E',  // 20
            '#66C889',  // 21
            '#30A747'], // 24
          [
            '#31682E',  // 30
            '#FF9344',  // 31
            '#D96623',  // 33
            '#F6EA77',  // 36
            '#F4E658'   // 37
          ]
        ]
      })

      // Changes sector colour to chosen
      $('#colourPickerSector').change(function () {
        sectorColour = $('#colourPickerSector').val()
      })

      // Restricts size of object to a minimum required size
      canvas.observe('object:scaling', function (e) {
        var shape = e.target
        var minWidth = shape.get('minWidth')
        var minHeight = shape.get('minHeight')
        var actualWidth = shape.scaleX * shape.width
        var actualHeight = shape.scaleY * shape.height

        if (!isNaN(minWidth) && actualWidth <= minWidth) {
          // dividing minWidth by the shape.width gives us our 'min scale'
          shape.set({ scaleX: minWidth / shape.width })
        }

        if (!isNaN(minHeight) && actualHeight <= minHeight) {
          shape.set({ scaleY: minHeight / shape.height })
        }
      })

      // Hide tutorial
      $('#tutClose').click(function () {
        $('#sectorTutorial').css('display', 'none')
        tutorialViewed = 1
      })

      // Helping function to rename new sector to same name of other sectors of same type
      function _isContains (json, value) {
        let contains = false
        Object.keys(json).some(key => {
          contains = typeof json[key] === 'object' ? _isContains(json[key], value) : json[key] === value
          return contains
        })
        return contains
      }
      function renameSameSector (obj) {
        var objs = canvas.getObjects()
        if (_isContains(sectorDict, obj['fill'])) {
          obj['name'] = Object.keys(sectorDict)[Object.values(sectorDict).indexOf(obj['fill'])]
        } else {
          for (var i = 0, l = objs.length; i < l; ++i) {
            if (obj['fill'] === objs[i]['fill'] && objs[i]['name'] !== obj['name']) {
              console.log('Actual name found: ' + objs[i]['name'])
              obj['name'] = objs[i]['name']
              break
            } else {
              obj['name'] = obj['fill']
            }
          }
        }
      }
      // ##################################### OBJECT MANIPULATION #####################################################
      // ###############################################################################################################
      // Delete selected object
      $('#delete').click(function () {
        if (canvas.getActiveObject() != null) {
          canvas.getActiveObject().remove()
          layerify()
        } else if (canvas.getActiveGroup() != null) {
          canvas.getActiveGroup().forEachObject(function (o) { canvas.remove(o) })
          canvas.discardActiveGroup().renderAll()
        }
      })

      // Clone currently selected object
      $('#clone').click(function () {
        if (canvas.getActiveObject() != null) {
          var copyData = canvas.getActiveObject().toObject()
          fabric.util.enlivenObjects([copyData], function (objects) {
            objects.forEach(function (o) {
              o.set('top', o.top + 15)
              o.set('left', o.left + 15)
              renameSameSector(o)
              canvas.add(o)
              layerify()
            })
            canvas.renderAll()
          })
        }
      })

      // Center chosen object
      $('#center').click(function () {
        if (canvas.getActiveObject() != null) {
          canvas.getActiveObject().center()
          canvas.getActiveObject().setCoords()
        }
      })

      // Move object up and down
      $('#moveUp').click(function () {
        if (canvas.getActiveObject() != null) {
          canvas.bringForward(canvas.getActiveObject())
          layerify()
        }
      })

      $('#moveDown').click(function () {
        if (canvas.getActiveObject() != null) {
          canvas.sendBackwards(canvas.getActiveObject())
          layerify()
        }
      })

      // Change chosen sector to selected colour
      $('#colourChange').click(function () {
        var activeObj = canvas.getActiveObject()
        if (activeObj != null && (activeObj['type'] === 'rect' || activeObj['type'] === 'polygon')) {
          activeObj.set('fill', sectorColour.toUpperCase())
          activeObj.set('name', activeObj.fill)
          canvas.renderAll()
          renameSameSector(activeObj)
          $('#sectorName').val(activeObj['name'])
          saveState()
          updateSectorList()
          exportSectors()
        }
      })
      // Renaming sectors
      // Helping function for selection
      function getSelection () {
        return canvas.getActiveObject() == null ? canvas.getActiveGroup() : canvas.getActiveObject()
      }

      // See name of selected sector
      canvas.on('object:selected', function () {
        var selObj = getSelection()
        if (selObj['type'] === 'rect' || selObj['type'] === 'polygon') {
          $('#sectorAttr').css('display', 'block')
          $('#sectorName').val(selObj['name'])
        } else {
          $('#sectorAttr').css('display', 'none')
        }
      })

      canvas.on('selection:cleared', function () {
        $('#sectorAttr').css('display', 'none')
      })

      // Rename selected sector
      $('#renameSector').click(function () {
        var selObj = canvas.getActiveObject()
        var obj = canvas.getObjects()
        var oldName = selObj['name']
        var newName = $('#sectorName').val()
        if (oldName in sectorDict && oldName !== newName) {
          insertIntoDict(sectorDict, newName, selObj['fill'])
          delete sectorDict[oldName]
        }
        for (var i = 0, l = obj.length; i < l; ++i) {
          if (obj[i]['fill'] === selObj['fill']) {
            obj[i]['name'] = newName
          }
        }
        saveState()
        updateSectorList()
        exportSectors()
      })

      // Clear canvas
      $('#clearCanvas').click(function () {
        $('#clearConfirm').css('display', 'block')
      })
      $('#confirmClearButton').click(function () {
        $('#clearConfirm').css('display', 'none')
        canvas.clear().renderAll()
        saveState()
        updateSectorList()
        exportSectors()
      })
      $('#denyClearButton').click(function () {
        $('#clearConfirm').css('display', 'none')
      })
      // ######################################### FREE DRAWING ########################################################
      // ###############################################################################################################
      // Free drawing
      $('#drawing').click(function () {
        canvas.isDrawingMode = !canvas.isDrawingMode
        if (canvas.isDrawingMode) {
          $('#drawing').val('Stop drawing')
          $('#controls').css('display', 'block')
          layerify()
        } else {
          $('#drawing').val('Draw')
          $('#controls').css('display', 'none')
          layerify()
        }
      })

      // Free drawing colour picker
      $('#drawColor').spectrum({
        preferredFormat: 'hex',
        color: '#000000'
      })

      // Changes pencil colour to chosen
      $('#drawColor').change(function () {
        drawColour = $('#drawColor').val()
        canvas.freeDrawingBrush.color = drawColour
      })

      // Choose line width
      $('#drawingLineWidth').change(function () {
        $('#width').html($('#drawingLineWidth').val())
        drawLineWidth = parseInt($('#drawingLineWidth').val() || 1)
        canvas.freeDrawingBrush.width = drawLineWidth
      })

      // Adds path to layer
      canvas.on('path:created', function (e) {
        e.path.set('name', freeDrawLayer)
      })

      // Change layer of drawing
      $('#backgroundDrawing').click(function () {
        freeDrawLayer = 'bottom'
        $('#backgroundDrawing').attr('disabled', true)
        $('#foregroundDrawing').attr('disabled', false)
        layerify()
      })

      $('#foregroundDrawing').click(function () {
        freeDrawLayer = 'top'
        $('#backgroundDrawing').attr('disabled', false)
        $('#foregroundDrawing').attr('disabled', true)
        layerify()
      })
      // ######################################## IMAGE HANDLING #######################################################
      // ###############################################################################################################
      // Upload image, standard boilerplate code
      $('#image').change(function (e) {
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.onload = function (f) {
          var data = f.target.result
          fabric.Image.fromURL(data, function (img) {
            var oImg = img.set({angle: 0}).scale(0.5)
            canvas.add(oImg).renderAll()
            canvas.setActiveObject(oImg)
            canvas.getActiveObject().center()
            canvas.toDataURL({format: 'png', quality: 0.8})
            layerify()
          })
        }
        reader.readAsDataURL(file)
        $('#image')[0].value = ''
      })

      // ########################################## EDITABLE TEXT ######################################################
      // ###############################################################################################################
      // Add editable text objects
      $('#text').click(function () {
        layerify()
        var text = new fabric.IText('Text',
          {
            fill: '#ffffff',
            stroke: '#000000',
            strokeWidth: 1,
            fontFamily: 'Arial',
            fontSize: 60,
            textAlign: 'center'
          })
        canvas.add(text)
        canvas.setActiveObject(text)
        canvas.getActiveObject().center()
        layerify()
      })

      // ############################################ EXPORTING ########################################################
      // ###############################################################################################################
      // Save button
      $('#save').click(function () {
        if (canvas.getObjects().length > 0) {
          canvas.deactivateAll().renderAll()
          $('#c').get(0).toBlob(function (blob) {
            FileSaver.saveAs(blob, 'Board.png')
          })
        }
      })

      // Export sector colours to be used by Blockly.vue
      function exportSectors () {
        // Gets objects from the json object
        var sectors = canvas.getObjects()
        // Variables to get unique values
        var sectorType = []
        var sectorTypeObject = {}
        var unique = {}
        // Loops through all sectors and adds unique to a list
        for (var i = 0, l = sectors.length; i < l; ++i) {
          if (!unique.hasOwnProperty(sectors[i]['fill'])) {
            // Makes sure only rectangles or hexagons get added
            // May want to give all sectors a unique property to allow for more sector types in the future
            if (sectors[i]['type'] === 'rect' || sectors[i]['type'] === 'polygon') {
              sectorType.push(sectors[i]['fill'])
              insertIntoDict(sectorTypeObject, sectors[i]['name'], colourDict[sectors[i]['fill'].toUpperCase()])
              unique[sectors[i]['fill']] = 1
            }
          }
        }
        // Turns list into string and saves
        store.dispatch('SAVE_SECTORS', sectorTypeObject)
        store.dispatch('SAVE_COLOURS', sectorType)
      }

      // Helping function for inserting sectors into json object
      function insertIntoDict (dict, key, value) {
        // If key is not initialized or some bad structure
        if (!(key in dict)) {
          dict[key] = value
        }
      }
      // Method to update list of sectors
      function updateSectorList () {
        $('#sectorList ul').empty()
        var obj = canvas.getObjects()
        var colour = ''
        usedColours = {}
        sectorList = Object.keys(sectorDict)
        for (var i = 0; i < sectorList.length; i++) {
          insertIntoDict(usedColours, sectorList[i], sectorDict[sectorList[i]])
        }
        for (var z = 0, y = obj.length; z < y; ++z) {
          if (obj[z]['type'] === 'rect' || obj[z]['type'] === 'polygon') {
            insertIntoDict(usedColours, obj[z]['name'], obj[z]['fill'])
          }
        }
        for (var key in usedColours) {
          if (usedColours.hasOwnProperty(key)) {
            // console.log(key + ' -> ' + usedColours[key])
            colour = usedColours[key]
            let s = `<li>${key} <span style="background: ${colour}; display: inline-block; width:1em; height: 1em;"/>
            <input type="button" id="${colour}" class="dynamicButtonRect" value="Add Square"/>
            <input type="button" id="${colour}" class="dynamicButtonHex" value="Add Hexagon"/>
            </li>`
            $('#sectorList ul').append(s)
          }
        }
      }
      // Method to save state, change canvasState to store-store
      function saveState () {
        var canvasState = canvas.toDatalessJSON(['name'])
        store.dispatch('SAVE_CANVAS', canvasState)
      }

      // Method to load state, change where it loads from to store-store
      function loadState () {
        var state = store.getters.GET_CANVAS
        if (state !== 0) {
          canvas.loadFromDatalessJSON(state)
          updateSectorList()
        }
      }
      // Saves the state on canvas change
      canvas.on('object:added', function () {
        saveState()
        exportSectors()
        updateSectorList()
      })

      canvas.on('object:modified', function () {
        saveState()
        exportSectors()
        updateSectorList()
      })
      // ############################################## LAYERIFY #######################################################
      // ###############################################################################################################
      // Press escape to stop selecting object
      $(document).keyup(function (e) {
        if (e.keyCode === 27) {
          layerify()
        }
      })
      // Helping function for layerify
      function restoreObjs (group) {
        // Gets a list of objects from the group
        var items = group._objects
        // Restores the states of the objects from the group
        group._restoreObjectsState()
        // Removes the group object to canvas to avoid clogging with empty groups
        canvas.remove(group)
        // Goes through all objects and adds them to the canvas
        for (var i = 0, l = items.length; i < l; ++i) {
          canvas.add(items[i])
        }
      }
      // Layers types of objects, text > rects > paths > images
      function layerify () {
        // Sets up variables for all objects and lists for the types
        var obj = canvas.getObjects()
        var textLayer = []
        var sectorLayer = []
        var bPathLayer = []
        var fPathLayer = []
        var imageLayer = []
        // Adds each relevant object to their respective list
        for (var i = 0, l = obj.length; i < l; ++i) {
          if (obj[i]['type'] === 'rect' || obj[i]['type'] === 'polygon') {
            sectorLayer.push(obj[i])
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
        var sectorGroup = new fabric.Group(sectorLayer)
        var bPathGroup = new fabric.Group(bPathLayer)
        var imageGroup = new fabric.Group(imageLayer)
        var fPathGroup = new fabric.Group(fPathLayer)

        // Clears old objects
        canvas.clear().renderAll()
        canvas.setBackgroundColor('white')

        // Adds groups to canvas
        canvas.add(imageGroup)
        canvas.add(bPathGroup)
        canvas.add(sectorGroup)
        canvas.add(fPathGroup)
        canvas.add(textGroup)

        // Restores objects from group to canvas to allow layerify to work multiple times
        restoreObjs(imageGroup)
        restoreObjs(bPathGroup)
        restoreObjs(sectorGroup)
        restoreObjs(fPathGroup)
        restoreObjs(textGroup)
      }

      // ########################################## DEBUGGING AND TESTING ##############################################
      // ###############################################################################################################
      // Jsonify button for debugging
      $('#jayson').click(function () {
        console.log(JSON.stringify(canvas))
      })
    }
  }
</script>

<style>
  #boardEditor{
    width: 100%;
  }

  #c{
    margin: auto;
    border: 1px solid black;
    position: absolute;
  }

  #wrapper{
    position: relative;
  }

  #container{
    position: absolute;
    top: 0;
    left: auto;
    width: 20em;
    background-color: aliceblue;
  }
  #controls {
    position: relative;
    top: 0;
    left: auto;
    display: none;
  }

  #sectorTutorial {
    position: relative;
    top: 0;
    left: auto;
    display: none;
  }

  #sectorAttr {
    position: relative;
    top: 0;
    left: auto;
    display: none;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  #sectorList {
    position: relative;
    top: 0;
    left: auto;
    display: block;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  #clearConfirm {
    position: relative;
    top: 0;
    left: auto;
    display: none;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  /* Container made by fabric when creating a fabric canvas */
  .canvas-container{
    text-align: center;
    margin: auto;
    background-color: white;
  }

</style>

<style src="../../node_modules/spectrum-colorpicker/spectrum.css"></style>
