<template>
  <div>
    <div id="asset-listing">
      <collapse accordion>
        <collapse-item title="Tokens">
          <div class="asset-item" v-for="(token, key) in savedTokens" @click="showToken() + selectAsset('token',key)">{{limit(key)}}</div>
          <div class="new-asset-item fa fa-plus" @click="showToken() + newToken()"></div>
        </collapse-item>
        <collapse-item title="Display Patterns">
          <div
            class="asset-item"
            v-for="(grid, key) in savedGrids"
            @click="showLedgrid() + selectAsset('grid',key)">
            <SVGMatrix :code="grid" :key="key"></SVGMatrix>
            <span>{{limit(key)}}</span>
          </div>

          <div class="new-asset-item fa fa-plus" @click="showLedgrid() + newGrid()"></div>
        </collapse-item>
      </collapse>
    </div>

    <div id="asset_inspector">
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
    ...mapState('ledgrid', {savedGrids: 'savedGrids'}),
    ...mapState('token', {
      savedTokens: 'savedTokens',
      selectedToken: 'selectedToken'
    })
  },
  components: {
    LEDGridEditor: require('./LEDGridEditor.vue'),
    TokenEditor: require('./TokenEditor.vue'),
    IconButton: require('./IconButton.vue'),
    SVGMatrix: require('./SVGMatrix.vue')
  },
  methods: {
    limit (key) {
      let formattedString = key.charAt(0).toUpperCase()
      formattedString += key.substr(1, key.length).toLowerCase()
      if (formattedString.length > 7) {
        return formattedString.substr(0, 7) + '..'
      } else {
        return formattedString
      }
    },
    showToken () {
      this.asset_type = 'token'
    },
    showLedgrid () {
      this.asset_type = 'led'
    },
    selectAsset (type, key) {
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
    },
    newToken () {
      this.$store.dispatch('token/deselectToken')
      this.$store.dispatch('token/setStandardToken')
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
    font-size: .75em;
    width:6em;
    padding: 1em;
    border-radius: 5px;
    background: linear-gradient(135deg, #2d2d2d 0%,#2f2f2f 50%,#2c2c2c 50%,#2d2d2d 100%);
    color: #d4d4d4;
    margin:2px;
    color: black;
    text-align: center;

    .svg {
      width: 4em;
      height: 4em;

      .inactive {fill:#292929;}
      .active{ fill:#080; }
    }

    span {
      text-transform: capitalize;
      font-size: .8em;
      color: #efefef;
      text-shadow: 1px 1px 1px #1f1f1f;
    }
  }
  .asset-item:hover{
    background: #2c2c2c;
    cursor: pointer;
  }

  .new-asset-item {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    margin: 2px;
    line-height: 1.58em;
    border-radius: 50%;
    font-size: 3em;
    background: linear-gradient(135deg, #2d2d2d 0%,#2f2f2f 50%,#2c2c2c 50%,#2d2d2d 100%);
    color: #777;
    position: relative;
    top: 5px;
    box-shadow: 1px 1px 1px #1f1f1f;
    text-shadow: 1px 1px 2px #1f1f1f;
  }
  .new-asset-item:hover {
    background: #2c2c2c;
    color: #666;
    cursor: pointer;
    box-shadow: 1px 1px 0 #1f1f1f;
  }
}

#asset_inspector {
  width:50vw;
  padding: 30px;
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
  width: 100vw;
  padding: 0px;
  margin: 0px;
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
