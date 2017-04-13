<template>
  <canvas id="fabric_canvas" width="300" height="300"></canvas>
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
        isDrawingMode: false,
        backgroundColor: 'white'
      })

      this.$store.dispatch('setCanvas', canvas)
    }
  }
</script>
