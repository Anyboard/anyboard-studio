<template>
    <div class="toolbar">
        <any-button v-for="button in buttons" :key="button.id" :button-text="button.text" :event="button.event">{{button.event}}</any-button>
    </div>
</template>

<script>
  export default {
    name: 'anyToolbar',
    props: {
      buttons: {
        type: Array
      }
    },
    components: {
      'anyButton': require('./anyButton.vue')
    }
  }
</script>

<style>
.toolbar {
    display:flex;
    width:30px;
    position:absolute;
    top:10px;
    left:10px;
    height:auto;
    flex-direction: column;
    background: #f90;
}

.toolbar > * {
    flex:1, 0, auto;
    padding: 3%;
    width: 90%;
    margin:2%;
}

.toolbar > *:before {
  content: "";
  display: block;
  padding-top: 100%;
  float: left;
}

</style>
