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
    name: 'BloremKnipsum',
    data () {
      return {
        header: 'Å hei! hvor det blor når jeg knipser der det blor BLO BLO BLO HEI',
        paragraph: 'Blorem knipsum dolor sit amet, consectetur adipiscing elit. Nulla volutpat, eros nec tempus viverra, metus risus dapibus metus, ut porta dui dolor ac metus. Phasellus sapien ipsum, sodales non dapibus nec, commodo non diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc at metus non velit posuere sodales. Maecenas eget lacus justo. Donec ultricies iaculis pulvinar. Nunc eget augue auctor, auctor est vel, malesuada urna. Nam nec euismod metus. Ut et porttitor risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque vehicula tempus mi, quis egestas leo vestibulum ac. Sed luctus neque eget semper dictum. Donec sit amet rutrum quam, vel bibendum lectus. Nunc ut ligula in enim molestie gravida. Nullam maximus pretium euismod. Donec id tristique purus, non mattis erat. you found a hidden easterKNEGG! :)'
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
