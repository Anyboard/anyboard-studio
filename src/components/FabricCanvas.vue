<template>
  <canvas id="fabric_canvas" width="700" height="450"></canvas>
</template>

<script>
  import {fabric} from 'fabric'
  import {mapState} from 'vuex'

  export default {
    name: 'FabricCanvas',

    data () {
      return {
        test: 'nothing'
      }
    },

    computed: {
      ...mapState(
        {canvas: state => state.fabricCanvas.canvas}
      )
    },

    mounted () {
      const cvs = new fabric.Canvas('fabric_canvas', {
        isDrawingMode: false,
        backgroundColor: 'white'
      })
      cvs.setHeight(1)
      cvs.setWidth(1)

      cvs.observe('object:scaling', function (e) {
        const shape = e.target
        if (shape['type'] === 'rect' || shape['type'] === 'poly' || shape['type'] === 'circle') {
          const minWidth = 200
          const minHeight = 200
          const actualWidth = shape.scaleX * shape.width
          const actualHeight = shape.scaleY * shape.height
          if (!isNaN(minWidth) && actualWidth <= minWidth) {
            // dividing minWidth by the shape.width gives us our 'min scale'
            shape.set({ scaleX: minWidth / shape.width })
          }
          if (!isNaN(minHeight) && actualHeight <= minHeight) {
            shape.set({ scaleY: minHeight / shape.height })
          }
        }
      })

      this.$store.dispatch('setCanvas', cvs)

    }
  }
</script>

<style lang="SASS">
</style>
