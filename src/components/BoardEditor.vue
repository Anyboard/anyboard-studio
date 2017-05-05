<template>
  <div>
    <div class="vtb">
      <IconButton icon="fa-window-restore" text="Sector" nested="true">
        <IconButton class="vtb_ib" @click.native="makeShape" id="circle" icon="fa-circle" text="Circle" tooltip="Make a new circle sector"></IconButton>
        <IconButton class="vtb_ib"  @click.native="makeShape" id="rect"  icon="fa-square" text="Square" tooltip="Make a new square sector"></IconButton>
        <IconButton class="vtb_ib"  @click.native="makeShape" id="triangle"  icon="fa-play" text="Triangle" tooltip="Make a new triangle sector"></IconButton>
      </IconButton>

    
      <IconButton @click.native="centerObject" icon="fa-crosshairs" text="Center" tooltip="Center selected object"></IconButton>
      <IconButton @click.native="insertText" icon="fa-i-cursor" text="Text" tooltip="Insert a text element"></IconButton>
      <IconButton @click.native="clickImage" icon="fa-image" text="Image" tooltip="Upload an image"></IconButton>
      <input @change="uploadImage"type="file" id="image" style="display: none"/>
      <IconButton @click.native="cloneObject" icon="fa-clone" text="Clone" tooltip="Make a copy of selected object"></IconButton>
    
    
      <IconButton @click.native="deleteObject" icon="fa-window-close-o" text="Delete" tooltip="Delete selected object"></IconButton>
      <IconButton @click.native="clearCanvas" icon="fa-eraser" text="Clear" tooltip="Clear the entire board"></IconButton>
      
      <IconButton icon="fa-exchange" text="Arrange" nested="true">
        <IconButton @click.native="arrangeObject" id="forward"  icon="fa-angle-up" text="Forward" tooltip="Bring selected object forward"></IconButton>
        <IconButton @click.native="arrangeObject" id="front"  icon="fa-angle-double-up" text="Front" tooltip="Bring selected object to the front"></IconButton>
        <IconButton @click.native="arrangeObject" id="backward"  icon="fa-angle-down" text="Backward" tooltip="Send selected object backwards"></IconButton>
        <IconButton @click.native="arrangeObject" id="back"  icon="fa-angle-double-down" text="Back" tooltip="Send selected object to the back"></IconButton>
      </IconButton>
    
      <IconButton @click.native="toggleDraw" icon="fa-pencil" text="Drawing" tooltip="Toggle free drawing"></IconButton>
      <IconButton @click.native="changeGridMode" icon="fa-square-o" text="Grid" tooltip="Change grid mode"></IconButton>
      <IconButton @click.native="jsonDebug" icon="fa-at" text="DEBUG" tooltip="Log json debug"></IconButton>
    </div>

    <FabricCanvas></FabricCanvas>
    <FabricInspector></FabricInspector>


  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'BoardEditor',
    data () {
      return {
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
        this.$store.dispatch('arrangeObject', event.target.id)
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

.fabric_toolbar {
  font-size:2em;
  display: block;
  list-style-type: none;
  padding:2px;
  background: #555;
  border-radius: 2px;
  color: #eae9e1;
  z-index:99;
  width:$icon-size + 4 ;

  li {
    position: relative;
  }


  span:hover {
    color:#fff;
  }

  .icon {
    position: relative;
    display:block;
    height: $icon-size * 1.2 !important;
    width: $icon-size !important;
    line-height: $icon-size - 5px !important;
    border-radius: 2px;
    border: 1px solid #555;
  }

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

.vtb {
  display: block;
  z-index: 99;
  padding:2px;
  border-radius: 2px;
  color: #eae9e1;
}

.vtb_ib {
  width:$icon-size;
  text-align: center;
  position:relative;
  background: #555;
}

.vtb_dd {
  width:$icon-size;
  text-align: center;
  position: relative;
  background: #555;
}

.vtb_dd > div {
  display: none;
  position: absolute;
  text-align: left;
  left:50px;
  top:0px;
  background:#808;
}

.vtb_dd:hover > div {
  display: block;
}

.vtb_dd > div .vtb_ib {
  display: inline-block;
}

.vtb_text {
  font-size: 8pt;
  line-height: 8pt;
  text-transform: uppercase;
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
