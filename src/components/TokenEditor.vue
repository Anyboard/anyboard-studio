<template>
  <div id="tokenEditor">
    <div id="token-set-up">
      <label class="firstview-label">Static name:</label><input class="token-input" type="checkbox"><br>
      <label class="firstview-label">Token name:</label><input class="token-input" type="text">

      <p>Enabled features:</p>
      <label class="firstview-label">Vibration:</label><input class="token-input" type="checkbox"><br>
      <label class="firstview-label">Shaking:</label><input class="token-input" type="checkbox"><br>
      <label class="firstview-label">LED Light:</label><input class="token-input" type="checkbox"><br>
      <label class="firstview-label">Top display:</label><input class="token-input" type="checkbox"><br>
      <label class="firstview-label">placeholder event:</label><input class="token-input" type="checkbox"><br>
      <label class="firstview-label">placeholder event:</label><input class="token-input" type="checkbox"><br>
      <label class="firstview-label">placeholder event:</label><input class="token-input" type="checkbox"><br>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'tokenEditor'
  }
</script>

<style>
  #tokenEditor{
    border: 1px solid black;
  }
  .firstview-label{
    text-align: left;
    width: 11vw;
    display: inline-block;
  }
  #token-set-up{
    width: 40vw;
    margin: auto;
  }
  #token-set-up > label{
    text-align: left;
  }
  #token-set-up > input{
    //text-align: right;
  }
</style>
