<template>
  <div id = 'app'>
    <canvas id='c' width = '1000' height = '700'></canvas>
    <input type='button' id='purple' value='Purple square'/>
    <input type='button' id='yellow' value='Yellow square'/>
    <input type='button' id='green' value='Green square'/>
    <input type='button' id='save' value='Save image'/>
  </div>
</template>

<script>
  import {fabric} from 'fabric'
  import $ from 'jquery'
  import FileSaver from 'file-saver'

  var canvas

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

      // Purple rectangle
      $('#purple').click(function () {
        var rect = new fabric.Rect({
          top: 100,
          left: 200,
          width: 100,
          height: 100,
          fill: 'purple'
        })
        canvas.add(rect).setActiveObject(rect)
      })

      // Yellow rectangle
      $('#yellow').click(function () {
        var rect = new fabric.Rect({
          top: 100,
          left: 400,
          width: 100,
          height: 100,
          fill: 'yellow'
        })
        canvas.add(rect).setActiveObject(rect)
      })

      // Green rectangle
      $('#green').click(function () {
        var rect = new fabric.Rect({
          top: 100,
          left: 600,
          width: 100,
          height: 100,
          fill: 'green'
        })
        canvas.add(rect).setActiveObject(rect)
      })

      // Save button
      $('#save').click(function () {
        $('#c').get(0).toBlob(function (blob) {
          FileSaver.saveAs(blob, 'Board.png')
        })
      })
    }
  }
</script>

<style>
  canvas{
    border: 1px solid;
  }
</style>
