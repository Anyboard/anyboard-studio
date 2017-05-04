<template>
  <div>
    <div id="asset-listing">
      <collapse accordion>
        <collapse-item title="Tokens">
          <div class="asset-item" v-for="(token, key) in savedTokens">{{key}}</div>
        </collapse-item>
        <collapse-item title="LED Grids">
          <div class="asset-item" v-for="grid in savedGrids"></div>
        </collapse-item>
      </collapse>
    </div>
    
    <div id="asset_inspector">
      <LEDGridEditor></LEDGridEditor>
      <TokenEditor></TokenEditor>
      <div id="assetWrapper">
        <div id="assetTabWrapper">
          <div id="tokenTab" class="assetTab">
            <IconButton icon="fa-caret-right" text="Token"></IconButton>
          </div>
          <button @click="showToken">Token</button>
          <div id="ledgridTab" class="assetTab">
            <IconButton icon="fa-caret-right" text="Led Grid"></IconButton>
          </div>
          <button @click="showLedgrid">Ledgrid</button>
        </div>
        <div id="assetEditorWrapper">
          <LEDGridEditor></LEDGridEditor>
          <TokenEditor></TokenEditor>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapState} from 'vuex'

export default {
  data () {
    return {
      tokenTabClosed: true,
      ledgridTabClosed: true
    }
  },

  computed: {
    ...mapState('ledgrid', {savedGrids: state => state.savedGrids}),
    ...mapState('token', {savedTokens: state => state.savedTokens})
  },
  components: {
    LEDGridEditor: require('./LEDGridEditor.vue'),
    TokenEditor: require('./TokenEditor.vue'),
    IconButton: require('./IconButton.vue')
  },
  methods: {
    showToken () {
      console.log('11pressed')
    },
    showLedgrid () {
      console.log('222pressed')
    }
  }
}
</script>

<style lang="SASS">
#asset-listing {
  width:70vw;
  background:#383;

  .collapse-wrap {
    width:100%;
  }

  .asset-item {
    display: inline-block;
    width:5em;
    height: 5em;
    border-radius: 5px;
    padding:1em;
    background:#fff;
    margin:2px;
  }
}

#asset-inspector {
  width:30vw;
  background:#f90;
}

  .assetTab{
    width: 200px;
    border: 1px solid #2d2d2d;
    background-color: #3f3f3f;
    margin-bottom: -1px;
  }
  .assetTab:hover{
    cursor: pointer;
    background-color: #2d2d2d;
  }
  #assetWrapper{
    color: white;
    display: flex;
    align-items: stretch;
    flex-direction: row;
  }
  #assetTabWrapper {
    display: flex;
    align-items: stretch;
    flex-direction: column;
  }
  .icon.is-medium, .icon.is-small{
    display: inline !important;
  }
</style>
