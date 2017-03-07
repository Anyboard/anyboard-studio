<template>
  <div id = 'app'>
    <canvas id='c' width = '1000' height = '700'></canvas>
    <input type='button' id='square' value='Square'/>
    <input type='button' id='save' value='Save image'/>
    <input type='file' id='image' value='Upload image'/>
    <input type='color' id='picker'/>
  </div>
</template>

<script>
  import {fabric} from 'fabric'
  import $ from 'jquery'
  import FileSaver from 'file-saver'

  var canvas
  var pickedColour = '000000f'

  export default {
    name: 'editor',
    data () {
      return {
      }
    },
    mounted () {
      // Setting up Fabric.js canvas
      canvas = new fabric.Canvas('c')
      canvas.backgroundColor = 'white'

      // Set colour
      $('#picker').change(function () {
        pickedColour = $('#picker').val()
      })

      // Square
      $('#square').click(function () {
        var rect = new fabric.Rect({
          top: 100,
          left: 200,
          width: 100,
          height: 100,
          fill: pickedColour
        })
        canvas.add(rect).setActiveObject(rect)
      })

      // Save button
      $('#save').click(function () {
        $('#c').get(0).toBlob(function (blob) {
          FileSaver.saveAs(blob, 'Board.png')
        })
      })

      // Upload image
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
    }
  }
</script>

<style>
  canvas{
    border: 1px solid;
  }
</style>
