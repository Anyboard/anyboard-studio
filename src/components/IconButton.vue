<template>
  <div :id="id" class="vtb_ib">
    <span class="icon is-medium">
      <i :class="'fa ' + icon"></i>
    </span>
    <span class="vtb_text">{{text}}</span>
    <span v-if="tooltip" class="vtb_tooltip">{{tooltip}}</span>
  </div>
  
</template>

<script type="text/javascript">
  export default {
    name: 'IconButton',
    data () { return {} },
    props: ['icon', 'text', 'tooltip', 'id']
  }
</script>

<style lang="SASS">
</style>
