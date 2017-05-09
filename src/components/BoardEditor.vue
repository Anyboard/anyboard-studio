<template>
  <div>
    <div class="vtb">
      <div class="vtb_dd">
        <IconButton icon="fa-window-restore" text="Sector"></IconButton>
        <div class="vtb_dropout">
          <IconButton @click.native="makeShape" id="circle" icon="fa-circle" text="Circle" tooltip="Make a new circle sector"></IconButton>
          <IconButton @click.native="makeShape" id="rect"  icon="fa-square" text="Square" tooltip="Make a new square sector"></IconButton>
          <IconButton @click.native="makeShape" id="triangle"  icon="fa-play" text="Triangle" tooltip="Make a new triangle sector"></IconButton>
        </div>
      </div>

      <IconButton @click.native="centerObject" icon="fa-crosshairs" text="Center" tooltip="Center selected object"></IconButton>
      <IconButton @click.native="insertText" icon="fa-i-cursor" text="Text" tooltip="Insert a text element"></IconButton>
      <IconButton @click.native="clickImage" icon="fa-image" text="Image" tooltip="Upload an image"></IconButton>
      <input @change="uploadImage"type="file" id="image" style="display: none"/>
      <IconButton @click.native="cloneObject" icon="fa-clone" text="Clone" tooltip="Make a copy of selected object"></IconButton>


      <IconButton @click.native="deleteObject" icon="fa-window-close-o" text="Delete" tooltip="Delete selected object"></IconButton>
      <IconButton @click.native="clearCanvas" icon="fa-eraser" text="Clear" tooltip="Clear the entire board"></IconButton>

      <div class="vtb_dd">
        <IconButton icon="fa-exchange" text="Arrange"></IconButton>
        <div class="vtb_dropout">
          <IconButton @click.native="arrangeObject" id="forward"  icon="fa-angle-up" text="Forward" tooltip="Bring selected object forward"></IconButton>
          <IconButton @click.native="arrangeObject" id="front"  icon="fa-angle-double-up" text="Front" tooltip="Bring selected object to the front"></IconButton>
          <IconButton @click.native="arrangeObject" id="backward"  icon="fa-angle-down" text="Backward" tooltip="Send selected object backwards"></IconButton>
          <IconButton @click.native="arrangeObject" id="back"  icon="fa-angle-double-down" text="Back" tooltip="Send selected object to the back"></IconButton>
        </div>
      </div>


      <IconButton @click.native="toggleDraw" icon="fa-pencil" text="Drawing" tooltip="Toggle free drawing"></IconButton>
      <IconButton @click.native="changeGridMode" icon="fa-square-o" text="Grid" tooltip="Change grid mode"></IconButton>
      <IconButton @click.native="jsonDebug" icon="fa-at" text="DEBUG" tooltip="Log json debug"></IconButton>
    </div>

    <FabricCanvas></FabricCanvas>
    <FabricInspector></FabricInspector>


  </div>
</template>

<script type="text/javascript">
  import {findAncestor} from '../utilities/helpers.js'

  export default {
    name: 'BoardEditor',
    data () {
      return {
      }
    },
    methods: {
      makeShape (event) {
        let ancestor = findAncestor(event.target, 'vtb_ib')
        this.$store.dispatch('createShape', ancestor.id)
      },
      insertText () {
        this.$store.dispatch('insertText')
      },
      toggleDraw () {
        this.$store.dispatch('toggleDraw')
      },
      changeWidth () {
        this.$store.dispatch('changeWidth', document.getElementById('drawLineWidth').value)
      },
      changeDrawLayer () {
        this.$store.dispatch('changeDrawLayer')
      },
      changeDrawColor () {
        this.$store.dispatch('changeDrawColor', '#000000')
      },
      deleteObject () {
        this.$store.dispatch('deleteObject')
      },
      cloneObject () {
        this.$store.dispatch('cloneObject')
      },
      clearCanvas () {
        this.$store.dispatch('clearCanvas')
      },
      centerObject () {
        this.$store.dispatch('centerObject')
      },
      arrangeObject (event) {
        let ancestor = findAncestor(event.target, 'vtb_ib')
        this.$store.dispatch('arrangeObject', ancestor.id)
      },
      clickImage () {
        document.getElementById('image').click()
      },
      uploadImage (event) {
        this.$store.dispatch('uploadImage', event.target.files[0])
        document.getElementById('image').value = ''
      },
      jsonDebug () {
        this.$store.dispatch('jsonDebug')
      },
      changeGridMode () {
        this.$store.dispatch('changeGridMode')
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
$icon-size: 45px;

.vtb {
  display: block;
  z-index: 99;
  padding:2px;
  border-radius: 2px;
  color: #eae9e1;
  background:#555;
}

.vtb_ib {
  width:$icon-size;
  text-align: center;
  position:relative;
  background: #555;
  border:1px solid #555;
}

.vtb_ib:hover {
  border-color:#777 #444 #444 #777;
}

.vtb_ib:active {
  border-color:#444 #777 #777 #444;
}

.vtb_dd {
  width:$icon-size;
  text-align: center;
  position: relative;
  background: #555;
}

.vtb_dd > div.vtb_dropout {
  display: none;
  position: absolute;
  text-align: left;
  left:46px;
  top:-3px;
  background:#555;
  margin-right:-999px;
  padding:3px;
  border-radius:2px;
}

.vtb_dd:hover > div.vtb_dropout {
  display: block;
}

.vtb_dd > div .vtb_ib {
  display: inline-block;
}

.vtb_text {
  font-size: 6pt;
  line-height: 8pt;
  text-transform: uppercase;
  display: inline-block;
  width:$icon-size;
}


.vtb_tooltip {
  position:absolute;
  top:-5px;
  left:95%;
  background:#eae9e1;
  color:#555;
  margin-right:-9999px;
  border:1px dotted #eae9e1;
  padding:2px;
  display: none;
  border-radius:2px;
  z-index:999;
}

.vtb_ib:hover > .vtb_tooltip {
  display: inline-block;
}

.canvas_container {
  flex-grow:10;
  min-width: 580px;
  min-height: 300px;
  background-color:#fff;
  border:1px solid #000;
  margin:0 1em;
  overflow: hidden;
}

.inspector {
  flex-grow:3;
  min-width: 200px;
  background:#888;
  border-radius:.2em;
}
</style>
