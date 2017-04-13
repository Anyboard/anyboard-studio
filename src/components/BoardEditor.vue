<template>
  <div id="board_editor">
    {{test}}
    <nav id="fabric_toolbar">
      <a @click="makeShape" id="rect">New Sector</a>
      <a href="#">Center Selected Object</a>
      <a href="#">Clone Object</a>
      <a href="#">Delete Object</a>

      <a href="#">Arrange Object</a>
      <a href="#">Insert Text</a>
      <a href="#">Free Drawing</a>
      <a href="#">Colorpicker</a>
    </nav>
    <FabricCanvas></FabricCanvas>
    <FabricInspector></FabricInspector>
  </div>
</template>

<script type="text/javascript">
  import {mapActions} from 'vuex'
  export default {
    name: 'BoardEditor',
    data () {
      return {
        test: 'nothing'
      }
    },
    computed: {
      ...mapActions(['createShape'])
    },
    methods: {
      makeShape (event) {
        this.$store.dispatch('createShape', event.target.id)
      }
    },
    components: {
      FabricInspector: require('./FabricInspector.vue'),
      FabricCanvas: require('./FabricCanvas.vue')
    }
  }
</script>

<style lang="SASS">
</style>
