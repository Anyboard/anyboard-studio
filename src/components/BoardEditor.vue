<template>
  <div id="board_editor">
    <ul class="fabric_toolbar">
      <li>
        <IconButton icon="fa-window-restore" text="Sector" tooltip="Insert a new sector"></IconButton>
        <div class="drop-right">
          <IconButton @click.native="makeShape" id="circle" icon="fa-circle" text="Circle" tooltip="Make a new circle sector"></IconButton>
          <IconButton @click.native="makeShape" id="rect"  icon="fa-square" text="Square" tooltip="Make a new square sector"></IconButton>
          <IconButton @click.native="makeShape" id="triangle"  icon="fa-play" text="Triangle" tooltip="Make a new triangle sector"></IconButton>
        </div>
      </li>
      <li>
          <IconButton @click.native="centerObject" icon="fa-crosshairs" text="Center" tooltip="Center selected object"></IconButton>
      </li>
      <li>
        <IconButton @click.native="insertText" icon="fa-i-cursor" text="Text" tooltip="Insert a text element"></IconButton>
      </li>
      <li>
        <IconButton @click.native="cloneObject" icon="fa-clone" text="Clone" tooltip="Make a copy of selected object"></IconButton>
      </li>
      <li>
        <IconButton @click.native="deleteObject" icon="fa-window-close-o" text="Delete" tooltip="Delete selected object"></IconButton>
      </li>
      <li>
        <li>
        <IconButton icon="fa-exchange" text="Arrange" tooltip=""></IconButton>
        <div class="drop-right">
          <IconButton @click.native="arrangeObject" id="forward"  icon="fa-angle-up" text="Forward" tooltip="Bring selected object forward"></IconButton>
          <IconButton @click.native="arrangeObject" id="front"  icon="fa-angle-double-up" text="Front" tooltip="Bring selected object to the front"></IconButton>
          <IconButton @click.native="arrangeObject" id="backward"  icon="fa-angle-down" text="Backward" tooltip="Send selected object backwards"></IconButton>
          <IconButton @click.native="arrangeObject" id="back"  icon="fa-angle-double-down" text="Back" tooltip="Send selected object to the back"></IconButton>
        </div>
      </li>
      <li>
        <IconButton @click.native="toggleDraw" icon="fa-pencil" text="Drawing" tooltip="Toggle free drawing"></IconButton>
      </li>
    </ul>
    <nav id="fabric_toolbar">
      <a href="#">Colorpicker</a>
      <a @click="clickImage">Upload Image</a>
      <input @change="uploadImage"type="file" id="image" style="display: none"/>
      <a @click="saveBoard">Save Board</a>

      <a @click="changeColor">Change Color</a>
      <a @click="renameSector">Change name</a>
      <input type="text" id="sectorName"/>
      <a @click="jsonDebug">JSON DEBUG</a>

      <input type="range" value="20" min="1" max="100" @change="changeWidth" id="drawLineWidth"/>
      <a @click="changeDrawLayer">Change draw layer</a>
      <a @click="clearCanvas">Clear Board</a>
      <FabricInspector></FabricInspector>
    </nav>
    <FabricCanvas></FabricCanvas>

    <ChoiceColor :colors='colors' radius='10em' v-on:colorChange='updateColor'></ChoiceColor>
  </div>
</template>

<script type="text/javascript">
  import {choiceColor} from 'vue-circle-choice'
  export default {
    name: 'BoardEditor',
    data () {
      return {
        // TODO: Make picker have correct color on load
        colors: [
          '#166CA0',  // 2
          '#4194D0',  // 5
          '#112A95',  // 7
          '#C047A3',  // 14
          '#FB50A6',  // 15
          '#5E1014',  // 16
          '#9B3235',  // 18
          '#FF483E',  // 20
          '#66C889',  // 21
          '#30A747',  // 24
          '#31682E',  // 30
          '#FF9344',  // 31
          '#D96623',  // 33
          '#F6EA77',  // 36
          '#F4E658'   // 37
        ],
        index: 0,
        color: '#166CA0'
      }
    },
    methods: {
      makeShape (event) {
        this.$store.dispatch('createShape', event.target.parentElement.id)
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
        this.$store.dispatch('updateColor', color)
      },
      changeColor () {
        console.log('Color changed')
        this.$store.dispatch('changeColor')
      },
      renameSector () {
        this.$store.dispatch('renameSector', document.getElementById('sectorName').value)
      }
    },

    components: {
      FabricInspector: require('./FabricInspector.vue'),
      FabricCanvas: require('./FabricCanvas.vue'),
      IconButton: require('./IconButton.vue'),
      ChoiceColor: choiceColor
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

    span.text {
      position: absolute;
      bottom:2px;
      width: $icon-size;
      left:0;
      line-height: 8pt;
      font-size: 7pt;
      text-transform: uppercase;
    }

    span.tooltip {
      position:absolute;
      top:-1em;
      left:1em;
      background:#eae9e1;
      color:#555;
      width:auto;
      border:1px dotted #eae9e1;
      padding:2px;
      display: none;
      border-radius:2px;
    }
  }

  .icon:hover {
    border-color:#777 #444 #444 #777;
  }

  .icon:active {
    border-color:#444 #777 #777 #444;
  }

  .icon:hover > .tooltip {
    display: block;
  }

  .drop-right {
    position: absolute;
    display: none;
    left:$icon-size + 1px ;
    top:-2px;
    width: 20px + ($icon-size * 2);
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
