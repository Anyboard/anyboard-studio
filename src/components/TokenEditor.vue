<template>
  <div>
    <div id="tokenOptions">
      <p>Token Editor</p>
      <label class="switch" @click="updateNameType()">
        Dynamic name:
        <input type="checkbox" id="dynamicName"/>
        <div class="slider round"></div>
      </label>
      <label id="nameInput">
        Name:
        <input type="text" id="tokenName"/>
      </label>
      <label>
        LED Color:
        <input id="tokenColor" type="color" value="#00ff00" list="colors"/>
        <datalist id=colors>
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
      <label>
        LED Change:
        <input type="checkbox" @click="updateLEDAllowed">
      </label>
      <label>
        Vibrate:
        <input type="checkbox" @click="updateVibrate">
      </label>
      <label>
        Tap:
        <input type="checkbox" @click="updateTap">
      </label>
      <label>
        Double-tap:
        <input type="checkbox" @click="updateDtap">
      </label>
      <label>
        Shake:
        <input type="checkbox" @click="updateShake">
      </label>
      <label>
        Tilt:
        <input type="checkbox" @click="updateTilt">
      </label>
      <label>
        Turn:
        <input type="checkbox" @click="updateTurn">
      </label>
      <label>
        Token-token:
        <input type="checkbox" @click="updateTokentoken">
      </label>
      <button @click="setTokenValues()">Create token</button>
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
        nothing: null
      }
    },
    computed: {},
    methods: {
      updateNameType () {
        if (document.getElementById('dynamicName').checked) {
          document.getElementById('nameInput').style = 'display: none'
        } else {
          document.getElementById('nameInput').style = 'display: block'
        }
        this.$store.dispatch('token/updateNameType')
      },
      updateLEDAllowed () {
        this.$store.dispatch('token/updateLEDAllowed')
      },
      updateVibrate () {
        this.$store.dispatch('token/updateVibrate')
      },
      updateTap () {
        this.$store.dispatch('token/updateTap')
      },
      updateDtap () {
        this.$store.dispatch('token/updateDtap')
      },
      updateShake () {
        this.$store.dispatch('token/updateShake')
      },
      updateTilt () {
        this.$store.dispatch('token/updateTilt')
      },
      updateTurn () {
        this.$store.dispatch('token/updateTurn')
      },
      updateTokentoken () {
        this.$store.dispatch('token/updateTokentoken')
      },
      setTokenValues () {
        console.log(document.getElementById('tokenColor').value)
        let data = [
          document.getElementById('tokenColor').value,
          document.getElementById('tokenName').value
        ]
        this.$store.dispatch('token/submitToken', data)
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
