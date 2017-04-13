<template>
  <div>
   <p>Hei på deg min kogg</p>
    <p>{{header}}</p>
    <p>{{paragraph}}</p>
    <a @click="hei">LIKER JEG Å KOGEEEEEEEEEEE</a>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    name: 'FabricInspector',
    data () {
      return {
        header: 'det må jo kogges der det kogges kan og jeg håper at jeg kan KOGGE DEEEEEEG der det kogges kan :) har du sett mitt gode ark'
      }
    },
    computed: {
      ...mapState('fabricInspector', {paragraph: state => state.paragraph})
    },
    methods: {
      hei () {
        this.$store.commit('fabricInspector/SET_PARAGRAPH', 'serr har du kogga :O')
      }
    }
  }
</script>

<style scoped>
</style>
