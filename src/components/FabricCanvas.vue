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

      cvs.on('object:scaling', (e) => {
        const shape = e.target
        if (shape['type'] === 'rect' || shape['type'] === 'polygon' || shape['type'] === 'circle') {
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
        this.$store.dispatch('stateHandling')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      })
      cvs.on('path:created', (e) => {
        e.path.set('pathName', this.$store.getters.GET_DRAW_LAYER)
        e.path.set('name', 'Path')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      })
      cvs.on('object:added', (e) => {
        this.$store.dispatch('stateHandling')
        if (e.target['type'] === 'rect' || e.target['type'] === 'polygon' || e.target['type'] === 'circle') {
          e.target.minWidth = this.$store.getters.GET_MINWIDTH
          e.target.minHeight = this.$store.getters.GET_MINHEIGHT
        } else if (e.target['type'] === 'image') {
          e.target.name = 'Image'
        }
      })
      cvs.on('object:modified', () => {
        this.$store.dispatch('stateHandling')
        this.$store.dispatch('updateActiveObj')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      })
      cvs.on('object:selected', () => {
        this.$store.dispatch('updateActiveObj')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      })
      cvs.on('selection:cleared', () => {
        this.$store.dispatch('updateActiveObj')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      })

      /* cvs.on('canvas:cleared', () => {
        this.$store.dispatch('setCanvas', cvs)
      }) */
      this.$store.dispatch('setCanvas', cvs)
    }
  }
</script>

<style lang="SASS">
</style>
