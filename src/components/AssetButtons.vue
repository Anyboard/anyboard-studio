<template>
  <div style="display: inline">
    <a @click="downloadTokens" style="float:right">Save Tokens</a>
    <a @click="downloadGrids" style="float:right">Save Grids</a>
    <a @click="loadTokens" style="float:right">Upload Tokens</a>
    <input @change="loadTokensUpload"type="file" id="tokens" style="display: none"/>
    <a @click="loadGrids" style="float:right">Upload Grids</a>
    <input @change="loadGridsUpload"type="file" id="grids" style="display: none"/>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'BlocklyButtons',
    data () {
      return {
      }
    },
    methods: {
      downloadTokens () {
        this.$store.dispatch('token/downloadTokens')
      },
      downloadGrids () {
        this.$store.dispatch('token/downloadGrids')
      },
      loadTokens () {
        document.getElementById('tokens').click()
      },
      loadTokensUpload () {
        const reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = (event) => {
          const jsonObj = JSON.parse(event.target.result)
          this.$store.dispatch('token/uploadTokens', jsonObj)
        }
        document.getElementById('tokens').value = ''
      },
      loadGrids () {
        document.getElementById('grids').click()
      },
      loadGridsUpload () {
        const reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = (event) => {
          const xmlObj = event.target.result
          this.$store.dispatch('ledgrid/uploadGrids', xmlObj)
        }
        document.getElementById('grids').value = ''
      }
    }
  }
</script>

<style lang="SASS">
</style>
