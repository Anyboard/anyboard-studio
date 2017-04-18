<template>
  <div>
   <p>Fabric inspector</p>
    <p>{{header}}</p>
    <p>{{paragraph}}</p>
    <a @click="getHeight">Click here to see a tiles height</a>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    name: 'FabricInspector',
    data () {
      return {
        header: 'Click on a tile to see it"s properties.'
      }
    },
    computed: {
      ...mapState('fabricInspector', {paragraph: state => state.paragraph})
    },
    methods: {
      getHeight () {
        this.$store.dispatch('fabricInspector/setParagraph', this.$store.getters.GET_HEIGHT)
        this.$store.dispatch('stateHandling')
      }
    }
  }
</script>

<style scoped>
 p {
   color: white;
 }
</style>
