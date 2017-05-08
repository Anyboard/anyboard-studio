<template>
  <div>
    <div id="tokenOptions">
      <p>Token Editor</p>
      <label class="switch" v-if="isNewToken">
        Static name:
        <input type="checkbox" id="dynamicName" v-model="useDynamicName"/>
        <div class="slider round"></div>
      </label>
      <label v-if="!isNewToken">{{selectedToken}}</label>
      <label id="nameInput" v-if="useDynamicName && isNewToken">
        Name:
        <input type="text" id="tokenName" v-model="staticName" placeholder="Write a token name"/>
      </label>
      <label>
        LED Color:
        <input id="tokenColor" value="#00ff00" type="color" list="colors" :value="LEDColor" @input="updateLEDColor"/>
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
      <label @click="updateCheckbox('allowLEDChange')">
        LED Change:
        <input type="checkbox" :checked="allowLEDChange" >
      </label>

      <label @click="updateCheckbox('allowVibrate')">
        Vibrate:
        <input type="checkbox" :checked="allowVibrate"/>
      </label>

      <p>Actions:</p>
      <label @click="updateCheckbox('allowTap')">
        Tap:
        <input type="checkbox" :checked="allowTap"/>
      </label>

      <label @click="updateCheckbox('allowDoubleTap')">
        Double-tap:
        <input type="checkbox" :checked="allowDoubleTap"/>
      </label>

      <label @click="updateCheckbox('allowShake')">
        Shake:
        <input type="checkbox" :checked="allowShake"/>
      </label>

      <label @click="updateCheckbox('allowTilt')">
        Tilt:
        <input type="checkbox" :checked="allowTilt"/>
      </label>

      <label @click="updateCheckbox('allowTurn')">
        Turn:
        <input type="checkbox" :checked="allowTurn"/>
      </label>

      <label @click="updateCheckbox('allowTokenToken')">
        Token-token:
        <input type="checkbox" :checked="allowTokenToken"/>
      </label>
      <button @click="createToken" :disabled="disableButton" v-if="isNewToken">Create token</button>
      <button v-if="!isNewToken" @click="updateToken">Update</button>
      <div v-if="!isNewToken">
        <button id="tokenCopyButton" @click="copyToken">Copy</button>
        <button id="tokenDeleteButton" @click="deleteToken">Delete</button>
      </div>
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
        LEDColor: 'LEDColor',
        savedTokens: 'savedTokens',
        selectedToken: 'selectedToken',
        allowVibrate: state => state.attributes.allowVibrate,
        allowLEDChange: state => state.attributes.allowLEDChange,
        allowTap: state => state.attributes.allowTap,
        allowDoubleTap: state => state.attributes.allowDoubleTap,
        allowShake: state => state.attributes.allowShake,
        allowTilt: state => state.attributes.allowTilt,
        allowTurn: state => state.attributes.allowTurn,
        allowTokenToken: state => state.attributes.allowTokenToken
      }),
      isNewToken: function () {
        return this.selectedToken === ''
      }
    },

    methods: {
      createToken () {
        let payload = {
          dynamicName: this.useDynamicName,
          name: this.staticName
        }
        this.$store.dispatch('token/saveToken', payload)
      },
      updateToken () {
        this.$store.dispatch('token/updateToken')
      },
      copyToken () {
        this.$store.dispatch('token/deselectToken')
      },
      updateCheckbox (checkboxName) {
        console.log('OK')
        this.$store.dispatch('token/updateBooleanAttributes', checkboxName)
      },
      updateLEDColor (e) {
        this.$store.dispatch('token/changeLEDColor', e.target.value)
      },
      deleteToken () {
        this.$store.dispatch('token/deleteToken')
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
