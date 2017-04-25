<template>
  <div>
    <h1>I AM INVINCIBLE!</h1>
    <LEDGridEditor></LEDGridEditor>
    <TokenEditor></TokenEditor>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      nothing: null
    }
  },
  components: {
    LEDGridEditor: require('./LEDGridEditor.vue'),
    TokenEditor: require('./TokenEditor.vue')
  }
}
</script>
<style>

</style>
