<template>
  <div>
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
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      tokenTabClosed: true,
      ledgridTabClosed: true
    }
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
<style lang="SASS" scoped>
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
