<template>
  <div class="blockly-area">
    <div id="blockly-wrapper" style="height:100%; width:95%"></div>
  </div>
</template>

<script type="text/javascript">
  import {mapState} from 'vuex'
  export default {
    name: 'Blockly',
    data () {
      return {
        svg: null
      }
    },

    computed: {
      ...mapState('blockly', {blocklyState: state => state.blocklyState})
    },

    mounted () {
      this.$store.dispatch('blockly/blocklyInit')
    }
  }
</script>

<style lang="SASS">
.blockly-area, #blockly-wrapper {
  align-items: stretch;
  height: 100vh!important;
  width: 95vw!important;
}
  div[role=treeitem]{
    cursor: pointer;
  }
  .blocklyTreeLabel{
    cursor: pointer;
  }
</style>
