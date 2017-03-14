<template>
  <div id = 'boardEditor'>
    <toolbar :buttons="tb" v-on:createRect="createRect" @createCircle="createCircle"></toolbar>
    <canvas id='c' width = '947' height = '669'></canvas>
    <input type='button' id='square' value='New tile'/>
    <input type='text' id='colourPickerTile'/>
    <input type='button' id='save' value='Save image'/>
    <input type='file' id='image' value='Upload image'/>
    <input type='button' id='delete' value='Delete'/>
    <input type='button' id='drawing' value='Draw'/>
    <input type='text' id='drawColor'/>
    <input type='button' id='export' value='Export'/>
  </div>
</template>

<script>
  import {fabric} from 'fabric'
  import $ from 'jquery'
  import FileSaver from 'file-saver'
  import spectrum from 'spectrum-colorpicker' /* eslint no-unused-vars: off */

  var canvas
  var tileColour = '#000000'
  var drawColour = '#000000'
  var tiles = []
  var drawLineWidth = 30
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
      // Setting up Fabric.js canvas
      canvas = new fabric.Canvas('c', {
        isDrawingMode: false
      })
      canvas.backgroundColor = 'white'
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas)
      canvas.freeDrawingBrush.width = drawLineWidth
      canvas.freeDrawingBrush.color = drawColour
      // Creates a new square/tile and adds it to a list of tiles
      $('#square').click(function () {
        var rect = new fabric.Rect({
          top: 100,
          left: 200,
          width: 100,
          height: 100,
          fill: tileColour
        })
        tiles.push(rect)
        canvas.add(rect).setActiveObject(rect)
        canvas.bringToFront(rect)
      })
      // Save button
      $('#save').click(function () {
        if (canvas.getObjects().length > 0) {
          canvas.deactivateAll().renderAll()
          $('#c').get(0).toBlob(function (blob) {
            FileSaver.saveAs(blob, 'Board.png')
          })
        }
      })

      // Upload image, standard boilerplate code
      $('#image').change(function (e) {
        var file = e.target.files[0]
        var reader = new FileReader()
        reader.onload = function (f) {
          var data = f.target.result
          fabric.Image.fromURL(data, function (img) {
            var oImg = img.set({left: 0, top: 0, angle: 0}).scale(0.5)
            canvas.add(oImg).renderAll()
            canvas.setActiveObject(oImg)
            canvas.toDataURL({format: 'png', quality: 0.8})
            canvas.sendToBack(oImg)
          })
        }
        reader.readAsDataURL(file)
      })

      // Delete selected object
      $('#delete').click(function () {
        var index = tiles.indexOf(canvas.getActiveObject())
        if (index > -1) {
          tiles.splice(index, 1)
        }
        canvas.getActiveObject().remove()
      })

      // Free drawing
      $('#drawing').click(function () {
        canvas.isDrawingMode = !canvas.isDrawingMode
        if (canvas.isDrawingMode) {
          $('#drawing').val('Stop drawing')
        } else {
          $('#drawing').val('Draw')
          var obj = canvas.getObjects()
          for (var i = 0, l = obj.length; i < l; ++i) {
            if (obj[i]['type'] === 'path') {
              canvas.sendBackwards(obj[i])
            }
          }
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
            if (tiles[i]['type'] === 'rect') {
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

      // Limited colour picker by swatches
      $('#colourPickerTile').spectrum({
        preferredFormat: 'hex',
        color: '#000000',
        // Allows only our predefined colours to be picked
        showPaletteOnly: true,
        // Change or add colours here
        palette: [
          ['#000000',
            '#ff0000',
            '#00ff00',
            '#0000ff']
        ]
      })

      // Changes tile colour to chosen
      $('#colourPickerTile').change(function () {
        tileColour = $('#colourPickerTile').val()
      })

      // Free drawing colour picker
      $('#drawColor').spectrum({
        preferredFormat: 'hex',
        color: '#000000'
      })

      // Changes tile colour to chosen
      $('#drawColor').change(function () {
        drawColour = $('#drawColor').val()
        canvas.freeDrawingBrush.color = drawColour
      })
    }
  }
</script>

<style>
  #container{
    padding-left: 0;
    padding-right: 0;
    margin-left: 0.5em;
    margin-right: 0.5em;
    display: block;
  }

  #c{
    border: 1px solid black;
    text-align: center;
  }

</style>

<style src="../../node_modules/spectrum-colorpicker/spectrum.css"></style>
