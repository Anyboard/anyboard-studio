<template>
  <a @click="export" style="float:right">Export</a>
</template>

<script type="text/javascript">
  export default {
    name: 'BlocklyButtons',
    data () {
      return {
      }
    },
    methods: {
      export () {
        // TODO: Actually export to html file instead of console logging
        this.$store.dispatch('blockly/logCode')
      }
    }
  }
</script>

<style lang="SASS">
</style>
