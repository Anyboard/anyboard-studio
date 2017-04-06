<template>
  <div id="displayEditor">
    <div class="input-row">
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
    </div>
    <div class="input-row">
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
    </div>
    <div class="input-row">
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
    </div>
    <div class="input-row">
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
    </div>
    <div class="input-row">
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
    </div>
    <div class="input-row">
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
    </div>
    <div class="input-row">
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
    </div>
    <div class="input-row">
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
      <div class="display-led inactive-led"></div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'displayEditor'
  }

  $('.display-led').toggle(function () {
  },
  function () {

  })

</script>

<style>
  #displayEditor{
    border: 1px solid black;
    margin: auto;
  }
  .display-led{
    height: 20px;
    width: 20px;

    border: 2px solid black;
    border-radius: 50%;
    margin: 3px;

  }
  .display-led:hover{
    cursor: pointer;
  }
  .inactive-led{
    background-color: black;
  }
  .active-led{
    background-color: mediumaquamarine;
  }

  .input-row{
    display: flex;
    flex-direction: column;
  }
  #displayEditor{
    display: flex;
    flex-direction: row;
    width: 240px;
    margin-top: 10px;
  }

</style>
