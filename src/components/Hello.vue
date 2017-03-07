<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
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
// import editor from '../components/Editor.vue'

var canvas

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // Setting up Fabric.js canvas
    canvas = new fabric.Canvas('c')
    canvas.clear()

    // Purple rectangle
    $('#purple').click(function () {
      var rect = new fabric.Rect({
        top: 100,
        left: 200,
        width: 100,
        height: 100,
        fill: 'purple'
      })
      canvas.add(rect)
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
      canvas.add(rect)
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
      canvas.add(rect)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

canvas{
  border: 1px solid;
}
</style>
