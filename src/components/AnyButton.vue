<template>
  <a class="anyButton" @click="emitEvent">{{ buttonText }}</a>
</template>

<script>
  export default {
    name: 'anyButton',
    props: {
      buttonText: {
        name: 'text',
        validator: function (value) {
          let regex = /^[a-zA-Z]+[\w-_]+$/i
          if (value.length < 2) console.warn('Buttontext is too short')
          return ((typeof value === 'string' && regex.test(value)) ? value : false)
        }
      },
      event: {
        type: String
      }
    },
    methods: {
      emitEvent: function () {
        this.$emit(event)
      }
    }
  }
</script>

<style>
.anyButton { background: #333; color:#fff; }
.anyButton:hover { background: #555; }
</style>
