<template>
  <div style="display: inline">
    <a @click="downloadBoard" style="float:right">Save</a>
    <a @click="loadBoard" style="float:right">Load</a>
    <a @click="saveBoard" style="float:right">Download Image</a>
    <a @click="printBoard" style="float:right">Print</a>
    <input @change="uploadBoard"type="file" id="upload" style="display: none"/>
  </div>
</template>

<script type="text/javascript">
  export default {
    name: 'BoardButtons',
    data () {
      return {
      }
    },
    methods: {
      downloadBoard () {
        this.$store.dispatch('downloadBoard')
      },
      loadBoard () {
        document.getElementById('upload').click()
      },
      uploadBoard () {
        const reader = new FileReader()
        reader.readAsText(event.target.files[0])
        reader.onload = (event) => {
          const jsonObj = JSON.parse(event.target.result)
          this.$store.dispatch('uploadBoard', jsonObj)
        }
        document.getElementById('upload').value = ''
      },
      saveBoard () {
        this.$store.dispatch('saveBoard')
      },
      printBoard () {
        this.$store.dispatch('makePrintableBoard')

        const board = this.$store.getters.GET_PRINTABLE_BOARD
        const windowUrl = 'about:blank'
        const uniqueName = new Date()
        const windowName = 'Print' + uniqueName.getTime()
        const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0')

        printWindow.document.write("<img src='" + board + "'/>")
        setTimeout(function () { // Needs to wait for the document to finish writing (yes, just one ms is enough)
          printWindow.document.close()
          printWindow.focus()
          printWindow.print()
          printWindow.close()
        }, 1)
      }
    }
  }
</script>

<style lang="SASS">
</style>
