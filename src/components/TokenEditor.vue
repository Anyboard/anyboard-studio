<template>
  <div>
    <button @click="synchronizeTokenStore()">CLICK ME</button>
    <div id="tokenOptions">
      <p>Token Editor</p>
      <label class="switch" @click="updateNameType()">
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
        <input id="tokenColor" type="color" v-model="defaultLEDColor"/>
      </label>
      <p>Allowed actions:</p>
      <label>
        LED Change:
        <input type="checkbox" v-model="allowLEDChange">
      </label>
      <label>
        Vibrate:
        <input type="checkbox" v-model="allowVibrate">
      </label>
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
  // import {mapState} from 'vuex'
  // import {colorHexToRGB} from '../utilities/helpers.js'

  export default {
    name: 'TokenEditor',
    data () {
      return {
        useDynamicName: false,
        staticName: '',
        defaultLEDColor: '#00ff00',
        disableButton: true,
        allowLEDChange: true,
        allowVibrate: true,
        allowTap: true,
        allowDoubleTap: true,
        allowShake: true,
        allowTilt: true,
        allowTurn: true,
        allowTokenToken: true
      }
    },
    computed: {},
    watch: {
      useDynamicName (val) {
        if (!val) {
          this.disableButton = false
        } else if (this.staticName === '') {
          this.disableButton = true
        } else {
          this.disableButton = false
        }
      },
      staticName (val) {
        console.log('TeSTING IAM HERE')
        if (val !== '') {
          this.disableButton = false
        } else {
          this.disableButton = true
        }
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
        if (!this.allowDoubleTap) {
          illegalActions.push('tap')
        }
        if (!this.allowShake) {
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
          dynamicName: this.allowDynamicName,
          name: this.staticName,
          LEDColor: this.defaultLEDColor,
          illegalActions: illegalActions
        }
        this.$store.dispatch('token/saveToken', payload)
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
