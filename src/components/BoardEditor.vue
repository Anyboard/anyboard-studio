<template>
  <div id="board_editor">
    <ul class="fabric_toolbar">
      <li>
        <IconButton icon="fa-window-restore" text="Add" tooltip="Create new sector"></IconButton>
        <div class="drop-right">
          <IconButton @click="makeShape" id="circle" icon="fa-circle" text="Circle" tooltip="Make a new circle sector"></IconButton>
          <IconButton @click="makeShape" id="rect"  icon="fa-square" text="Square" tooltip="Make a new square sector"></IconButton>
          <IconButton @click="makeShape" id="hexagon"  icon="fa-certificate" text="Polygon" tooltip="Make a new polygon sector"></IconButton>
          <IconButton @click="makeShape" id="triangle"  icon="fa-play" text="Triangle" tooltip="Make a new triangle sector"></IconButton>
        </div>
      </li>
      <li>
          <IconButton @click="centerObject" icon="fa-crosshairs" text="Center" tooltip="Center selected object"></IconButton>
      </li>
    
    </ul>
    <nav id="fabric_toolbar">
      <a @click="makeShape" id="circle">New Sector</a>
      <a @click="insertText">Insert Text</a>
      <a @click="toggleDraw">Toggle free drawing</a>
      <a @click="centerObject">Center Selected Object</a>

      <a @click="cloneObject">Clone Object</a>
      <a @click="deleteObject">Delete Object</a>
      <a @click="arrangeObject" id="back">Arrange Object</a>
      <a href="#">Free Drawing</a>

      <a href="#">Colorpicker</a>
      <a @click="clickImage">Upload Image</a>
      <input @change="uploadImage"type="file" id="image" style="display: none"/>
      <a @click="saveBoard">Save Board</a>

      <a @click="jsonDebug">JSON DEBUG</a>
    </nav>
    <FabricCanvas></FabricCanvas>
    <FabricInspector></FabricInspector>
    <choiceColor :colors='colors' radius='10em' @updateColor='updateColor'></choiceColor>
  </div>
</template>

<script type="text/javascript">
  import {choiceColor} from 'vue-circle-choice'
  export default {
    name: 'BoardEditor',
    data () {
      return {
        colors: [
          '#1ba6cc',
          '#189ba7',
          '#98c6ae',
          '#45a270',
          '#7cb325',
          '#eb9826'
        ],
        index: 0,
        color: '#1ba6cc'
      }
    },
    methods: {
      makeShape (event) {
        this.$store.dispatch('createShape', event.target.id)
      },
      insertText () {
        this.$store.dispatch('insertText')
      },
      toggleDraw () {
        this.$store.dispatch('toggleDraw')
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
      },
      jsonDebug () {
        this.$store.dispatch('jsonDebug')
      },
      updateColor ({ index, color }) {
        this.index = index
        this.color = color
      }
    },

    components: {
      FabricInspector: require('./FabricInspector.vue'),
      FabricCanvas: require('./FabricCanvas.vue'),
      IconButton: require('./IconButton.vue'),
      choiceColor: choiceColor
    }
  }
</script>

<style lang="SASS">
/**
* TOOLBAR
*/
$icon-size: 50px;

.fabric_toolbar {
  font-size:2em;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding:2px;
  background: #555;
  border-radius: 2px;
  color: #eae9e1;

  li {
    position: relative;
  }


  span:hover {
    color:#fff;
  }

  .icon {
    position: relative;
    height: $icon-size*1.1 !important;
    width: $icon-size !important;
    line-height: $icon-size - 5px !important;
    border-radius: 2px;
    border: 1px solid #555;

    span {
      position: absolute;
      bottom:2px;
      width: $icon-size;
      left:0;
      line-height: 8pt;
      font-size: 7pt;
      text-transform: uppercase;
    }
  }
  
  .icon:hover {
    border-color:#777 #444 #444 #777;
  }

  .icon:active {
    border-color:#444 #777 #777 #444;
  }

  .drop-right {
    position: absolute;
    display: none;
    left:$icon-size + 1px ;
    top:-$icon-size/4;
    width: 15px + ($icon-size*3);
    flex-direction: row;
    background: #666;
    border-radius: 4px;
    padding:4px;

    .icon {
      margin:0;
      float: left;
      margin:1px;
      border-color:#666;
    }

    .icon:hover {
    border-color:#777 #444 #444 #777;
  }

    .icon:active {
      border-color:#444 #777 #777 #444;
    }
  }


  li:hover > .drop-right {
    display: block;
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
<style src="../../node_modules/spectrum-colorpicker/spectrum.css"></style>
