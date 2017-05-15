<template>
  <div id="app">
    <nav id="navigation">
      <span class="left">
        <a href="/#/" class="logo">Anyboard Studio</a>
      </span>

      <span class="middle">
        <a href="/#/board">Board Editor</a>
        <a href="/#/assets">Game Assets</a>
        <a href="/#/code">Code Builder</a>
      </span>

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
}

#wrapper {
  display:flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: stretch;
  font-size:11pt;
  padding:3em .5em;
  height:100%;
  min-height: 100%;
  height: auto !important;
  justify-content: center;

  a { color:#f50; }
  a:hover { border-bottom:1px dotted currentColor; }
  p { margin-bottom:1em; }
  > * {
    margin:2px;
  }
}

#navigation {
  position: fixed;
  display: flex;
  top:0;
  left:0;
  width:100%;
  background:#efefef;
  padding:0 1em;
  border-bottom:1px solid #000;
  text-align: center;
  box-shadow:1em 0 1em #000;
  z-index: 100;

  span {
    flex-grow: 1;
  }

  .left {
    text-align: left;
  }


  .right {
    text-align: right;
  }

  @media (max-width: 1024px) {
    .right {
      position: relative;
      z-index: initial;
    }

    .right:before {
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: 2em;
      padding:10px;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      content: "\f0c9";
      color:#555;
    }

    .right > div {
      display: none;
      position: absolute;
      top:46px;
      right: 0;
    }

    .right > div > a {
      display: block;
    }

    .right:hover > div {
      display: block;
      background: #efefef;
      border:1px solid #000;
      border-top:0px;
      box-shadow:5px 7px 10px 0 rgba(0,0,0,0.5);
      z-index: -1;
    }

    .right:hover:before {
      transform: rotate(90deg);
    }


  }

  a {
    display:inline-block;
    line-height:18px;
    padding:10px;
    font-size:13px;
    color:#333;
    font-family: Tahoma, Geneva, sans-serif;
    text-transform: uppercase;
  }

  a:hover {
    background:#cdcdcd;
  }


  span a.logo {
    background-image: url('./assets/logo.svg');
    background-size: 25px 25px;
    background-position: 5px;
    background-repeat: no-repeat;
    text-transform: none;
    padding-left:35px;
    font-size:16px;
  }
}

</style>
