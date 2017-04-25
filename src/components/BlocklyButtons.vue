<template>
  <a @click="exportCode" style="float:right">Export</a>
</template>

<script type="text/javascript">
  export default {
    name: 'BlocklyButtons',
    data () {
      return {
      }
    },
    methods: {
      exportCode () {
        this.$store.dispatch('blockly/exportCode')
      }
    }
  }
</script>

<style lang="SASS">
</style>
