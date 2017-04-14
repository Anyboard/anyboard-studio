<template>
  <span class="icon is-medium" :alt="tooltip">
    <i :class="'fa ' + icon"></i>
    <span>{{text}}</span>
  </span>
</template>

<script type="text/javascript">
  export default {
    name: 'IconButton',
    data () { return {} },
    props: ['icon', 'text', 'tooltip']
  }
</script>

<style lang="SASS"></style>
