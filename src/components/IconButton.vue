<template>
  <span class="icon is-medium" :id="id">
    <i :class="'fa ' + icon"></i>
    <span class="text">{{text}}</span>
    <span v-if="tooltip" class="tooltip">{{tooltip}}</span>
  </span>
</template>

<script type="text/javascript">
  export default {
    name: 'IconButton',
    data () { return {} },
    props: ['icon', 'text', 'tooltip', 'id']
  }
</script>

<style lang="SASS"></style>
