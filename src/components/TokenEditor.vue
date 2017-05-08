<template>
  <div>
    <div id="tokenOptions">
      <p>Token Editor</p>
      <label class="switch">
        Static name:
        <input type="checkbox" id="dynamicName" v-model="useDynamicName"/>
        <div class="slider round"></div>
      </label>
      <label id="nameInput" v-if="useDynamicName">
        Name:
        <input type="text" id="tokenName" v-model="staticName" placeholder="Write a token name"/>
      </label>
      <label>
        LED Color:
        <input id="tokenColor" value="#00ff00" type="color" list="colors" v-model="defaultLEDColor"/>
        <datalist id="colors">
          <option>#ff0000</option>
          <option>#00ff00</option>
          <option>#0000ff</option>
          <option>#ffff00</option>
          <option>#ff00ff</option>
          <option>#00ffff</option>
          <option>#ffffff</option>
        </datalist>
      </label>
      <p>Allowed actions:</p>
      <p>Haptics:</p>
      <label>
        LED Change:
        <input type="checkbox" v-model="allowLEDChange">
      </label>

      <label>
        Vibrate:
        <input type="checkbox" v-model="allowVibrate">
      </label>

      <p>Actions:</p>
      <label>
        Tap:
        <input type="checkbox" v-model="allowTap">
      </label>

      <label>
        Double-tap:
        <input type="checkbox" v-model="allowDoubleTap">
      </label>

      <label>
        Shake:
        <input type="checkbox" v-model="allowShake">
      </label>

      <label>
        Tilt:
        <input type="checkbox" v-model="allowTilt">
      </label>

      <label>
        Turn:
        <input type="checkbox" v-model="allowTurn">
      </label>

      <label>
        Token-token:
        <input type="checkbox" v-model="allowTokenToken">
      </label>
      <button @click="createToken" :disabled="disableButton">Create token</button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  // import {colorHexToRGB} from '../utilities/helpers.js'

  export default {
    name: 'TokenEditor',
    data () {
      return {
        useDynamicName: true,
        staticName: '',
        defaultLEDColor: '#00ff00',
        allowLEDChange: true,
        allowVibrate: true,
        allowTap: true,
        allowDoubleTap: true,
        allowShake: true,
        allowTilt: true,
        allowTurn: true,
        allowTokenToken: true,
        disableButton: true
      }
    },
    watch: {
      useDynamicName (val) {
        if (!val) {
          this.disableButton = false
        } else if (val && this.staticName === '') {
          this.disableButton = true
        }
      },
      staticName (val) {
        if (val !== '') {
          this.disableButton = false
        } else {
          this.disableButton = true
        }
      }
    },
    computed: {
      ...mapState('token', {
        savedTokens: state => state.savedTokens,
        selectedToken: state => state.selectedToken
      }),
      isNewToken: function () {
        return !this.savedTokens.hasOwnProperty(this.selectedToken)
      }
    },

    methods: {
      createToken () {
        let illegalActions = []
        if (!this.allowLEDChange) {
          illegalActions.push('ledchange')
        }
        if (!this.allowVibrate) {
          illegalActions.push('vibrate')
        }
        if (!this.allowTap) {
          illegalActions.push('tap')
        }
        if (!this.allowShake) {
          illegalActions.push('shake')
        }
        if (!this.allowDoubleTap) {
          illegalActions.push('doubleTap')
        }
        if (!this.allowTilt) {
          illegalActions.push('tilt')
        }
        if (!this.allowTurn) {
          illegalActions.push('turn')
        }
        if (!this.allowTokenToken) {
          illegalActions.push('tokenToken')
        }
        let payload = {
          dynamicName: this.useDynamicName,
          name: this.staticName,
          LEDColor: this.defaultLEDColor,
          illegalActions: illegalActions
        }
        this.$store.dispatch('token/saveToken', payload)
      },
      setTokenValues (token) {
        this.defaultLEDColor = token[0]
        if ('vibrate' in token) {
          this.allowVibrate = false
        }
        if ('ledchange' in token) {
          this.allowLEDChange = false
        }
        if ('tap' in token) {
          this.allowTap = false
        }
        if ('shake' in token) {
          this.allowShake = false
        }
        if ('doubleTap' in token) {
          this.allowDoubleTap = false
        }
        if ('tilt' in token) {
          this.allowTilt = false
        }
        if ('turn' in token) {
          this.allowTurn = false
        }
        if ('tokenToken' in token) {
          this.allowTokenToken = false
        }
      }
    }
  }
</script>

<style>
  #tokenOptions {
    display: flex;
    flex-direction: column;
    color: #eae9e1;
  }
</style>
