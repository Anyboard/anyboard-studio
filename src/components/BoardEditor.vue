<template>
  <div id="board_editor">
    {{test}}
    <nav id="fabric_toolbar">
      <a @click="makeShape" id="circle">New Sector</a>
      <a @click="centerObject">Center Selected Object</a>
      <a @click="cloneObject">Clone Object</a>
      <a @click="deleteObject">Delete Object</a>

      <a @click="bringForward">Arrange Object</a>
      <a @click="insertText">Insert Text</a>
      <a href="#">Free Drawing</a>
      <a href="#">Colorpicker</a>
    </nav>
    <FabricCanvas></FabricCanvas>
    <FabricInspector></FabricInspector>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'BoardEditor',
    data () {
      return {
        test: 'nothing'
      }
    },
    methods: {
      makeShape (event) {
        this.$store.dispatch('createShape', event.target.id)
      },
      insertText () {
        this.$store.dispatch('insertText')
      },
      deleteObject () {
        this.$store.dispatch('deleteObject')
      },
      cloneObject () {
        this.$store.dispatch('cloneObject')
      },
      centerObject () {
        this.$store.dispatch('centerObject')
      },
      bringForward () {
        this.$store.dispatch('bringForward')
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
