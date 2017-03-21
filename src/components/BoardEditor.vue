<template>
  <div id = 'boardEditor'>
    <toolbar :buttons="tb" v-on:createRect="createRect" @createCircle="createCircle"></toolbar>
    <input type='button' id='square' value='New square tile'/>
    <input type='button' id='hexagon' value='New hexagon tile'/>
    <input type='text' id='colourPickerTile'/>
    <input type='file' id='image' style='display: none;'/>
    <!-- Workaround button to avoid ugly file text-->
    <input type="button" value="Upload image" onclick="document.getElementById('image').click();" />
    <input type='button' id='clone' value='Clone'/>
    <input type='button' id='delete' value='Delete'/>
    <input type='button' id='drawing' value='Draw'/>
    <input type='text' id='drawColor'/>
    <input type='button' id='text' value='Text'/>
    <input type='button' id='save' value='Save image'/>
    <!-- For debugging and testing-->
    <input type='button' id='export' value='Export'/>
    <input type='button' id='jayson' value='JSON'/>
    <div id='wrapper'>
      <canvas id='c' width = '947' height = '669'></canvas>
      <div id='container'>
        <div id='controls'>
          <span id='width'>20</span>
          <input type='range' value='20' min='1' max='100' id='drawingLineWidth'/>
        </div>
        <div id='tileTutorial'>
          <p>Tiles need a minimum size and have an orange dashed border! Important bznz!!!</p>
          <input type='button' id='tutClose' value='Understood'/>
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
  import store from '../vuex/store'

  var canvas
  var tileColour = '#000000'
  var drawColour = '#000000'
  var drawLineWidth = 30
  var tutorialViewed = 0

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
      // ########################################## TILES ##############################################################
      // ###############################################################################################################
      // Creates a new square tile
      $('#square').click(function () {
        if (tutorialViewed === 0) {
          $('#tileTutorial').css('display', 'block')
        }
        let rect = new fabric.Rect({
          width: 150,
          height: 150,
          fill: tileColour,
          stroke: '#ffd445',
          strokeDashArray: [6, 1.5],
          strokeWidth: 2,
          minHeight: 100,
          minWidth: 100
        })
        canvas.add(rect).setActiveObject(rect)
        canvas.getActiveObject().center()
        layerify()
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

      $('#hexagon').click(function () {
        if (tutorialViewed === 0) {
          $('#tileTutorial').css('display', 'block')
        }
        let hexagon = new fabric.Polygon(regularPolygonPoints(6, 60), {
          fill: tileColour,
          stroke: '#ffd445',
          strokeDashArray: [6, 1.5],
          strokeWidth: 2,
          minHeight: 105,
          minWidth: 120
        })
        canvas.add(hexagon).setActiveObject(hexagon)
        canvas.getActiveObject().center()
        layerify()
      })

      // Limited colour picker by swatches
      $('#colourPickerTile').spectrum({
        preferredFormat: 'hex',
        color: tileColour,
        // Allows only our predefined colours to be picked
        showPaletteOnly: true,
        // Change or add colours here
        palette: [
          ['#000000',
            '#ffffff'],
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

      // Changes tile colour to chosen
      $('#colourPickerTile').change(function () {
        tileColour = $('#colourPickerTile').val()
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
        $('#tileTutorial').css('display', 'none')
        tutorialViewed = 1
      })
      // ##################################### OBJECT MANIPULATION #####################################################
      // ###############################################################################################################
      // Delete selected object
      $('#delete').click(function () {
        if (canvas.getActiveObject() != null) {
          canvas.getActiveObject().remove()
          layerify()
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
              canvas.add(o)
              layerify()
            })
            canvas.renderAll()
          })
        }
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
            fontSize: 30,
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

      // Export function to JSON
      $('#export').click(function () {
        // Exports the canvas to a json object
        var exportedCanvas = canvas.toObject()
        // Gets only objects from the json object
        var tiles = exportedCanvas['objects']
        // Variables to get unique values
        var tileType = []
        var unique = {}
        // Loops through all tiles and adds unique to a list
        for (var i = 0, l = tiles.length; i < l; ++i) {
          if (!unique.hasOwnProperty(tiles[i]['fill'])) {
            // Makes sure only rects (tiles) get added
            if (tiles[i]['type'] === 'rect' || tiles[i]['type'] === 'polygon') {
              tileType.push(tiles[i]['fill'])
              unique[tiles[i]['fill']] = 1
            }
          }
        }
        // Turns list into string and saves
        var jsonString = JSON.stringify(tileType).replace(/"/g, '\'')
        var blobText = new Blob([jsonString])
        FileSaver.saveAs(blobText, 'tileTypes.txt')
      })

      // Method to save state, change canvasState to vuex-store
      function saveState () {
        var canvasState = canvas.toDatalessJSON()
        store.dispatch('SAVE_CANVAS', canvasState)
      }

      // Method to load state, change where it loads from to vuex-store
      function loadState () {
        var state = store.getters.GET_CANVAS
        if (state !== 0) {
          canvas.loadFromDatalessJSON(state)
        }
      }

      // Saves the state on canvas change
      canvas.on('object:added', function () {
        saveState()
      })

      canvas.on('object:modified', function () {
        saveState()
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
        var tileLayer = []
        var pathLayer = []
        var imageLayer = []
        // Adds each relevant object to their respective list
        for (var i = 0, l = obj.length; i < l; ++i) {
          if (obj[i]['type'] === 'rect' || obj[i]['type'] === 'polygon') {
            tileLayer.push(obj[i])
          } else if (obj[i]['type'] === 'path') {
            pathLayer.push(obj[i])
          } else if (obj[i]['type'] === 'image') {
            imageLayer.push(obj[i])
          } else if (obj[i]['type'] === 'i-text') {
            textLayer.push(obj[i])
          }
        }
        // Adds lists of objects to respective fabric groups
        var textGroup = new fabric.Group(textLayer)
        var tileGroup = new fabric.Group(tileLayer)
        var pathGroup = new fabric.Group(pathLayer)
        var imageGroup = new fabric.Group(imageLayer)

        // Clears old objects
        canvas.clear().renderAll()
        canvas.setBackgroundColor('white')

        // Adds groups to canvas
        canvas.add(imageGroup)
        canvas.add(pathGroup)
        canvas.add(tileGroup)
        canvas.add(textGroup)

        // Restores objects from group to canvas to allow layerify to work multiple times
        restoreObjs(imageGroup)
        restoreObjs(pathGroup)
        restoreObjs(tileGroup)
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
  }
  #controls {
    position: relative;
    top: 0;
    left: auto;
    background-color: aliceblue;
    display: none;
  }

  #tileTutorial {
    position: relative;
    top: 0;
    left: auto;
    background-color: aliceblue;
    display: none;
  }

  /* Container made by fabric when creating a fabric canvas */
  .canvas-container{
    text-align: center;
    margin: auto;
    background-color: white;
  }

</style>

<style src="../../node_modules/spectrum-colorpicker/spectrum.css"></style>
