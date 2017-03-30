<template>
  <div id="app">
    <div id="container_div">
      <h3>{{header}}</h3>
      <p>{{paragraph}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeiHvorDetKogges',
    data () {
      return {
        header: 'det må jo kogges der det kogges kan og jeg håper at jeg kan KOGGE DEEEEEEG der det kogges kan :) har du sett mitt gode ark',
        paragraph: 'jeg digger å kogge deg men bare å kogge deg der det kogges kan for en kogg er ikke noe å bli opprørt over nei du må jo bare ta det med ro med ditt ark din forbanna knark haha!:)'
      }
    }
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Lato');
  h3{
    color: #262626;
    font-weight: 600;
    font-family: 'Lato', Helvetica, sans-serif;
  }
  p{
    color: #262626;
    font-weight: 300;
    font-family: Georgia, serif;
  }
  #container_div{
    width: 50%;
    left: 50%;
  }
</style>
