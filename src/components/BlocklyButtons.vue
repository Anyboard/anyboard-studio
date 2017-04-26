<template>
  <div style="display: inline">
    <a @click="exportCode" style="float:right">Export</a>
    <a @click="downloadCode" style="float:right">Save</a>
    <a @click="addCode" style="float:right">Add code</a>
    <input @change="addCodeUpload"type="file" id="add" style="display: none"/>
    <a @click="loadCode" style="float:right">Load code</a>
    <input @change="loadCodeUpload"type="file" id="upload" style="display: none"/>
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
      addCode () {
        document.getElementById('add').click()
      },
      addCodeUpload () {
        const reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = (event) => {
          const xmlObj = event.target.result
          this.$store.dispatch('blockly/addCode', xmlObj)
        }
        document.getElementById('add').value = ''
      },
      loadCode () {
        document.getElementById('upload').click()
      },
      loadCodeUpload () {
        const reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = (event) => {
          const xmlObj = event.target.result
          this.$store.dispatch('blockly/loadCode', xmlObj)
        }
        document.getElementById('upload').value = ''
      }
    }
  }
</script>

<style lang="SASS">
</style>
