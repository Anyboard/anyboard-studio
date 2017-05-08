<template>
  <div>
    <div id="asset-listing">
      <collapse accordion>
        <collapse-item title="Tokens">
          <div class="asset-item" v-for="(token, key) in savedTokens" @click="showToken() + selectAsset('token',key)">{{key}}</div>
        </collapse-item>
        <collapse-item title="LED Grids">
          <div class="asset-item" v-for="(grid, key) in savedGrids" @click="showLedgrid() + selectAsset('grid',key)">{{key}}</div>
          <div class="asset-item" @click="showLedgrid() + newGrid()">NEW</div>
        </collapse-item>
      </collapse>
    </div>

    <div id="asset_inspector">
      <p style="color:#fff; font-size:2em;"> Inspector: </br> {{selectedToken}}</p>
      <LEDGridEditor v-if="asset_type === 'led'"></LEDGridEditor>
      <TokenEditor v-if="asset_type === 'token'" chosen="chosenAsset"></TokenEditor>
    </div>
  </div>
</template>

<script type="text/javascript">
import {mapState} from 'vuex'

export default {
  data () {
    return {
      asset_type: 'led'
    }
  },

  computed: {
    ...mapState('ledgrid', {savedGrids: state => state.savedGrids}),
    ...mapState('token', {
      savedTokens: state => state.savedTokens,
      selectedToken: state => state.selectedToken
    })
  },
  components: {
    LEDGridEditor: require('./LEDGridEditor.vue'),
    TokenEditor: require('./TokenEditor.vue'),
    IconButton: require('./IconButton.vue')
  },
  methods: {
    showToken () {
      this.asset_type = 'token'
    },
    showLedgrid () {
      this.asset_type = 'led'
    },
    selectAsset (type, key) {
      console.log(key)
      console.log('type: ' + type)
      if (type === 'token') {
        this.$store.dispatch('token/selectToken', key)
      } else if (type === 'grid') {
        this.$store.dispatch('ledgrid/selectGrid', key)
      }
      this.type = type
    },
    newGrid () {
      this.$store.dispatch('ledgrid/deselectGrid')
      this.$store.dispatch('ledgrid/clearGrid')
      console.log(this.savedGrids)
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
