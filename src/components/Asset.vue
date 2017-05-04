<template>
  <div>
    <div id="assetWrapper">
      <div id="assetTabWrapper" class="assetSection">
        <div id="tokenTab" class="assetTab">
          <IconButton icon="fa-caret-right" text="Token"></IconButton>
        </div>
        <button @click="printTokens">Token</button>

        <div id="ledgridTab" class="assetTab">
          <IconButton icon="fa-caret-right" text="Led Grid"></IconButton>
        </div>
        <button @click="printGrids">Ledgrid</button>
      </div>

      <div id="assetEditorWrapper" class="assetSection">
        <LEDGridEditor></LEDGridEditor>
        <TokenEditor></TokenEditor>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      ledgrids: this.$store.getters.GET_SAVEDLEDGRIDS,
      tokens: this.$store.getters.GET_SAVEDTOKENS
    }
  },
  watch: {
    ledgrids (val) {
      let hook = document.getElementById('ledgridTab')
      for (let key in val) {
        hook.appendChild.document.createTextNode(key)
      }
    }
  },
  components: {
    LEDGridEditor: require('./LEDGridEditor.vue'),
    TokenEditor: require('./TokenEditor.vue'),
    IconButton: require('./IconButton.vue')
  },
  methods: {
    printTokens (context) {
      console.log(this.$store.getters.GET_SAVEDTOKENS)
      console.log(context)
    },
    printGrids (context) {
      console.log(this.$store.getters.GET_SAVEDLEDGRIDS)
      console.log(context.rootGetters)
    }
  },
  mounted () {
    let hook = document.getElementById('ledgridTab')
    for (let key in this.ledgrids) {
      hook.appendChild.document.createTextNode(key)
    }
  }
}
</script>
<style lang="SASS" scoped>
  .assetSection {
    margin-left: -1px;
    width: 40vw;
    border: 1px solid black;
    padding: 5px;
  }
  .assetTab{
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
