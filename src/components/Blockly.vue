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
      console.log(`\n\n===== MOUNTED: ${Date.now()} ======`)
      this.$store.dispatch('blockly/blocklyInit')
    },

    watch: {
      blocklyState: function (newa) {
        console.log('123123')
      }
    }
  }
</script>

<style lang="SASS">
.blockly-area, #blockly-wrapper {
  align-items: stretch;
}
</style>
