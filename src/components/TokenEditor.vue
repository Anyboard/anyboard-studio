<template>
  <div>
    <div id="tokenOptions">
      <p>Token Editor</p>
      <label class="switch" @click="updateNameType()">
        <input type="checkbox"/>
        <div class="slider round"></div>
      </label>
      <label id="tokenName">
        Name:
        <input type="text"/>
      </label>
      <label id="tokenColor">
        LED Color:
        <input type="color" value="#00ff00"/>
      </label>
      <p>Allowed actions:</p>
      <label>
        Vibrate:
        <input type="checkbox">
      </label>
      <label>
        Tap:
        <input type="checkbox">
      </label>
      <label>
        Double-tap:
        <input type="checkbox">
      </label>
      <label>
        Shake:
        <input type="checkbox">
      </label>
      <label>
        Tilt:
        <input type="checkbox">
      </label>
      <label>
        Turn:
        <input type="checkbox">
      </label>
      <label>
        TokenToken:
        <input type="checkbox">
      </label>
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
        this.$store.dispatch('token/updateNameType')
      }
    }
  }
</script>

<style>
  #tokenOptions {
    display: flex;
    flex-direction: column;
  }
</style>
