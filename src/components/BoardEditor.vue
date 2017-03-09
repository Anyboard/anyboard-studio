<template>
  <div id = 'app'>
    <canvas id='c' width = '1000' height = '700'></canvas>
    <input type='button' id='square' value='Square'/>
    <input type='button' id='save' value='Save image'/>
    <input type='file' id='image' value='Upload image'/>
    <input type='color' id='picker'/>
    <input type='button' id='tiles' value='Tiles'/>
    <input type='button' id='delete' value='Delete'/>
    <input type='button' id='drawing' value='Draw'/>
    <input type='button' id='export' value='Export'/>
  </div>
</template>

<script>
  import {fabric} from 'fabric'
  import $ from 'jquery'
  import FileSaver from 'file-saver'

  var canvas
  var pickedColour = '#000000'
  var tiles = []
  var drawLineWidth = 30

  export default {
    name: 'boardEditor',
    data () {
      return {
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
      canvas.freeDrawingBrush.color = pickedColour

      // Set colour when color is picked using standard html5 picker
      $('#picker').change(function () {
        pickedColour = $('#picker').val()
        canvas.freeDrawingBrush.color = pickedColour
      })

      // Creates a new square/tile and adds it to a list of tiles
      $('#square').click(function () {
        var rect = new fabric.Rect({
          top: 100,
          left: 200,
          width: 100,
          height: 100,
          fill: pickedColour
        })
        tiles.push(rect)
        canvas.add(rect).setActiveObject(rect)
      })

      // Save button
      $('#save').click(function () {
        $('#c').get(0).toBlob(function (blob) {
          FileSaver.saveAs(blob, 'Board.png')
        })
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
          })
        }
        reader.readAsDataURL(file)
      })

      // Check current tiles and prints their colours. Can change what it gets to custom properties in the future
      // Mainly made to show how to get properties of tiles we make
      $('#tiles').click(function () {
        console.log(tiles)
        for (var i = 0; i < tiles.length; i++) {
          console.log(tiles[i].get('fill'))
        }
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
            tileType.push(tiles[i]['fill'])
            unique[tiles[i]['fill']] = 1
          }
        }
        // Turns list into string and saves
        var jsonString = JSON.stringify(tileType)
        var blobText = new Blob([jsonString])
        FileSaver.saveAs(blobText, 'tileTypes.txt')
      })
    }
  }
</script>

<style>
  canvas{
    border: 1px solid;
  }
</style>
