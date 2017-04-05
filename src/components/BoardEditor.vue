<template>
  <div id="board_editor">
    {{test}}
    <collapse accordion>
      <collapse-item title="Collapsible Group Item #1">Lorem ipsum dolor sit amet, consectetur
        adipiscing elit lorem ipsum dolor sit amet,
        consectetur adipiscing elit</collapse-item>
      <collapse-item title="Collapsible Group Item #2" actived>Lorem ipsum dolor sit amet, consectetur
        adipiscing elit lorem ipsum dolor sit amet,
        consectetur adipiscing elit</collapse-item>
      <collapse-item title="Collapsible Group Item #3">Lorem ipsum dolor sit amet, consectetur
        adipiscing elit lorem ipsum dolor sit amet,
        consectetur adipiscing elit</collapse-item>
    </collapse>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'BoardEditor',
  data () {
    return {
      test: 'nothing'
    }
  },
  components: {
  }
}
</script>

<style type="text/css">
#board_editor {
  padding:2em;
}
</style>
