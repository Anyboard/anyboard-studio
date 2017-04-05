<template>
  <div>
    <form id="pastebin">
      <textarea @change="clean" v-model="pastedata" placeholder="Paste your data here"></textarea>
      <button @click="clean">Clean paste</button>
      <button v-clipboard:copy="emails">Copy E-Mails</button>
    </form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Pastebin',
  data () {
    return {
      pastedata: ''
    }
  },

  computed: {
    ...mapGetters(['emails'])
  },

  methods: {
    clean () {
      let lines = this.pastedata.split('\n')
      let headers = lines[0].split('\t')
      let emailIndex = headers.indexOf('E-Mail')
      let payload = {}
      let existingEmails = []

      for (let n = 1; n < lines.length; n++) {
        let values = lines[n].split('\t')
        let email = values[emailIndex].toLowerCase()

        if (email !== '' && existingEmails.indexOf(email) === -1) {
          payload[values[0]] = {}

          for (let m = 1; m < values.length; m++) {
            payload[values[0]][headers[m]] = values[m]
          }

          existingEmails.push(email)
        }
      }
      console.log(existingEmails)
      this.$store.dispatch('update', {lines: payload, emails: existingEmails})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #pastebin > textarea {
    width: 100%;
    min-height:290px;
  }
</style>
