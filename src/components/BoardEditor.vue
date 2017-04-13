<template>
  <div id="board_editor">
    <ul class="fabric_toolbar">
      <IconButton icon="fa-home" text="Home" tooltip="Go home"></IconButton>
    </ul>

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
      FabricCanvas: require('./FabricCanvas.vue'),
      IconButton: require('./IconButton.vue')
    }
  }
</script>

<style lang="SASS">

/**
* TOOLBAR 
*/
.fabric_toolbar {
  font-size:2em;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding:0;


  li {
    position: relative;
    color: #fff;
    padding:.25em;
    background-color:#555;
    border-bottom:1px solid #333;
    border-top:1px solid #777;
  }

  li:first-of-type {
    border-top-left-radius: .2em;
    border-top-right-radius: .2em;
  }

  li:last-of-type {
    border-bottom-left-radius: .2em;
    border-bottom-right-radius: .2em;
  }

  li > svg {
    width:1em;
    height:1em;
    color:#bbb;
    fill:currentColor;
  }

  li:hover > svg {
    color:#fff;
  }

  li > span {
    visibility: hidden;
    position: absolute;
    display: block;
    width: 0px;
    font-size:.5em;
    height:2.4em;
    overflow: hidden;
    left:105%;
    top:-1px;
    padding:.5em .5em;
    background:#c0c1b5;
    border-top-right-radius: .5em;
    border-bottom-right-radius: .5em;
    -webkit-transition: width .15s;
    transition: width .15s;
    border-top:1px solid #777;
    border-bottom:1px solid #777;
    border-right:1px solid #333;
    color:#333;
  }

  li:hover {
    background:#666;
    border-top-right-radius: .0em;
    border-bottom-right-radius: .0em;
  }

  li:hover > span{
    visibility: visible;
    width:250px;
  }
}

/**
* CONTENT
*/ 
.content, .canvas_container {
  flex-grow:10;
  min-width: 580px;
  min-height: 300px;
  background-color:#fff;
  border:1px solid #000;
  margin:0 1em;
}

.inspector {
  flex-grow:3;
  min-width: 200px;
  background:#888;
  border-radius:.2em;
}
</style>
