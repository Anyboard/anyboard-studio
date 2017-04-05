<template>
  <div id="app">
    <nav id="navigation">
      <a id="logo" href="#">Anyboard Studio</a>
      <a href="/#/boardeditor">File</a>
      <a href="#">Edit</a>
      <a href="#">Game</a>
      <a href="#">Help</a>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#navigation {
  background:#efefef;
  font-size: 12px;
  padding:0 1em;
  border-bottom:1px solid #000;
}

#navigation > a {
  color:#333;
  text-decoration: none;
  display:inline-block;
  font-family: Tahoma, Geneva, sans-serif;
}

#navigation > *:not(#logo) {
  font-size: 1em;
  padding:1.25em 2em 0.95em 2em;
  text-transform: uppercase;
}

#navigation > a:hover {
  background:#cdcdcd;
}

#navigation > #logo {
  font-size:1.5em;
  padding:.5em 2.5em;
  background-image: url('./assets/logo.svg');
  background-size: 1.5em 1.5em;
  background-position: .5em;
  background-repeat: no-repeat;
  letter-spacing: .1em;
  margin-right:2em;
}
</style>
