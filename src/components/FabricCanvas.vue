<template>
  <canvas id="fabric_canvas"></canvas>
</template>

<script>
  import {fabric as F} from 'fabric'
  import {mapState} from 'vuex'
  export default {
    name: 'FabricCanvas',
    data () {
      return {
        test: 'nothing'
      }
    },
    computed: {
      /* ...mapActions({
        setCanvas: 'setCanvas'
      }), */
      ...mapState({
        canvas: state => state.canvas
      })
    },
    watch: {
      canvas: function (value) {
        this.$forceUpdate()
      },
      deep: true
    },
    mounted () {
      const canvas = new F.Canvas('fabric_canvas', {
        isDrawingMode: false
      })
      canvas.setBackgroundColor('white')
      this.$store.dispatch('setCanvas', canvas)
    }
  }
</script>
