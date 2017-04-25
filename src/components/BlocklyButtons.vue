<template>
  <div style="display: inline">
    <a @click="exportCode" style="float:right">Export</a>
    <a @click="downloadCode" style="float:right">Save</a>
    <a @click="loadCode" style="float:right">Load</a>
    <input @change="uploadCode"type="file" id="upload" style="display: none"/>
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
      exportCode () {
        this.$store.dispatch('blockly/exportCode')
      },
      downloadCode () {
        this.$store.dispatch('blockly/downloadCode')
      },
      loadCode () {
        document.getElementById('upload').click()
      },
      uploadCode () {
        const reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = (event) => {
          const xmlObj = event.target.result
          this.$store.dispatch('blockly/uploadCode', xmlObj)
        }
        document.getElementById('upload').value = ''
      }
    }
  }
</script>

<style lang="SASS">
</style>
