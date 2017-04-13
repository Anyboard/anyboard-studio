<template>
  <canvas id="fabric_canvas"></canvas>
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

      this.$store.dispatch('setCanvas', cvs)
    }
  }
</script>

<style lang="SASS">
</style>
