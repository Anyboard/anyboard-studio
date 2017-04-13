<template>
  <li>
      <span class="icon is-large">
        <i :class="'fa ' + icon"></i>
      </span>
      
      <span>
        <b>{{text}}</b>
        {{tooltip}}
      </span>
  </li>
</template>

<script type="text/javascript">
  export default {
    name: 'IconButton',
    data () { return {} },
    props: ['icon', 'text', 'tooltip']
  }
</script>

<style lang="SASS">
</style>
