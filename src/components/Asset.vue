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
    </div>
  </div>
</template>
<script type="text/javascript">
import {mapState} from 'vuex'

export default {
  data () {
    return {
      nothing: null
    }
  },

  computed: {
    ...mapState('ledgrid', {savedGrids: state => state.savedGrids}),
    ...mapState('token', {savedTokens: state => state.savedTokens})
  },
  components: {
    LEDGridEditor: require('./LEDGridEditor.vue'),
    TokenEditor: require('./TokenEditor.vue')
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
</style>
