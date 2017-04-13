<template>
  <div id="board_editor">
    {{test}}
    <nav id="fabric_toolbar">
      <a @click="makeShape" id="circle">New Sector</a>
      <a @click="centerObject">Center Selected Object</a>
      <a @click="cloneObject">Clone Object</a>
      <a @click="deleteObject">Delete Object</a>

      <a @click="arrangeObject" id="back">Arrange Object</a>
      <a @click="insertText">Insert Text</a>
      <a href="#">Free Drawing</a>
      <a href="#">Colorpicker</a>

      <a @click="clickImage">Upload Image</a>
      <input @change="uploadImage"type="file" id="image" style="display: none"/>
      <a @click="saveBoard">Save Board</a>
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
      arrangeObject (event) {
        this.$store.dispatch('arrangeObject', event.target.id)
      },
      clickImage () {
        document.getElementById('image').click()
      },
      uploadImage (event) {
        this.$store.dispatch('uploadImage', event.target.files[0])
        document.getElementById('image').value = ''
      },
      saveBoard () {
        this.$store.dispatch('saveBoard')
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
