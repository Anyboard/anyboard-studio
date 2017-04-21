<template>
  <div id="app">
    <nav id="navigation">
      <span class="left">
        <a href="/#/" class="logo">Anyboard Studio</a>
      </span>
      
      <a href="/#/board">Board Editor</a>
      <a href="/#/assets">Game Assets</a>
      <a href="/#/code">Code Builder</a>
      
      <span class="right">
        <router-view name="extras"></router-view>
      </span>
    </nav>

    <router-view id="wrapper"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="SASS">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

#wrapper {
  display:flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: stretch;
  font-size:11pt;
  overflow:hidden;
  padding:5em 2em;
  height:100%;
  min-height: 100%;
  justify-content: center;

  a { color:#f50; }
  a:hover { border-bottom:1px dotted currentColor; }
  p { margin-bottom:1em; }
  > * {
    flex-grow: 1;
    margin:1em;
  }
}

#navigation {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  background:#efefef;
  padding:0 1em;
  border-bottom:1px solid #000;
  text-align: center;
  box-shadow:1em 0 1em #000;

  span {
    flex-grow: 2;
    background: #f90;
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

  a {
    color:#333;
    text-decoration: none;
    display:inline-block;
    font-family: Tahoma, Geneva, sans-serif;
    padding:1.25em 2em 0.95em 2em;
  }

  a:hover {
    background:#cdcdcd;
  }

  a:not(#logo) {
    text-transform: uppercase;
  }

  span a#logo {
    display:block;
    font-size:1.5em;
    background-image: url('./assets/logo.svg');
    background-size: 1.5em 1.5em;
    background-position: .5em;
    background-repeat: no-repeat;
    letter-spacing: .1em;
  }
}

</style>
