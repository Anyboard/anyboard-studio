<template>
  <div id="board_editor">
    {{test}}
    <ul class="fabric_toolbar">
      <IconButton icon="fa-home" text="Home" tooltip="Go home"></IconButton>
    </ul>

    <FabricCanvas class="content"></FabricCanvas>
    <FabricInspector class="inspector"></FabricInspector>
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
