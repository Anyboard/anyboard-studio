<template>
  <div>
    <h1>I AM INVINCIBLE!</h1>
    <LEDGridEditor></LEDGridEditor>
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
    LEDGridEditor: require('./LEDGridEditor.vue')
  }
}
</script>
<style>

</style>
