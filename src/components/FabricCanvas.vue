<template>
  <canvas id="fabric_canvas" :width="fullWidth - 325" :height="fullHeight * 0.9"></canvas>
</template>

<script>
  import {fabric} from 'fabric'
  import {mapState} from 'vuex'

  export default {
    name: 'FabricCanvas',

    data () {
      return {
        fullHeight: 0,
        fullWidth: 0
      }
    },

    computed: {
      ...mapState(
        {canvas: state => state.fabricCanvas.canvas}
      )
    },

    beforeMount () {
      this.fullWidth = document.documentElement.clientWidth
      this.fullHeight = document.documentElement.clientHeight
    },

    mounted () {
      const cvs = new fabric.Canvas('fabric_canvas', {
        isDrawingMode: false,
        backgroundColor: 'white'
      })

      cvs.on('path:created', (e) => {
        e.path.set('pathName', this.$store.getters.GET_DRAW_LAYER)
        e.path.set('name', 'Path')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      })

      cvs.on('object:added', (e) => {
        if (this.$store.getters.GET_GRIDADDED) {
          this.$store.dispatch('stateHandling')
          if (e.target['type'] === 'rect' || e.target['type'] === 'polygon' || e.target['type'] === 'circle') {
            e.target.minScaleLimit = 1
          }
        }
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
        var keys = this.$store.getters.GET_USED_SECTORS
        this.$store.dispatch('fabricInspector/setPredefinedSectors', keys)
      })

      cvs.on('object:modified', () => {
        if (this.$store.getters.GET_GRIDADDED) {
          this.$store.dispatch('stateHandling')
          this.$store.dispatch('updateActiveObj')
          this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
          var keys = this.$store.getters.GET_USED_SECTORS
          this.$store.dispatch('fabricInspector/setPredefinedSectors', keys)
        }
      })

      cvs.on('object:selected', (e) => {
        const target = e.target
        if (target.type === 'group') {
          target.lockScalingX = true
          target.lockScalingY = true
        }
        this.$store.dispatch('updateActiveObj')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
        var keys = this.$store.getters.GET_USED_SECTORS
        this.$store.dispatch('fabricInspector/setPredefinedSectors', keys)
      })

      cvs.on('selection:cleared', () => {
        this.$store.dispatch('updateActiveObj')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
        var keys = this.$store.getters.GET_USED_SECTORS
        this.$store.dispatch('fabricInspector/setPredefinedSectors', keys)
      })

      cvs.on('object:moving', (e) => {
        if (this.$store.getters.GET_GRIDMODE) {
          let size = this.$store.getters.GET_GRIDSIZE
          e.target.set({
            left: Math.round(e.target.left / size) * size,
            top: Math.round(e.target.top / size) * size
          })
        }
      })

      this.$store.dispatch('setCanvas', cvs)
    }
  }
</script>

<style lang="SASS">
</style>
