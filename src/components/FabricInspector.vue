<template>
  <div class="headex">
   <p>Hei på deg min kogg</p>
    <p>{{header}}</p>
    <p>{{paragraph}}</p>
    <p>{{computed}}</p>
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
  @import url('https://fonts.googleapis.com/css?family=Lato');
  h3{
    color: #262626;
    font-weight: 600;
    font-family: 'Lato', Helvetica, sans-serif;
  }
  p{
    color: #262626;
    font-weight: 300;
    font-family: Georgia, serif;
  }
  #container_div{
    width: 50%;
    left: 50%;
  }
</style>
