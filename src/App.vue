<template>
  <div id="app">
    <a href="/#/blockly">Blockly</a>
    <a href="/#/">Board Editor</a>
    <a href="/#/tokenEditor">Token</a>
    <a href="/#displayEditor">display grid</a>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body{
    background-color: #555555;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
