<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.2 8.2" class="svg">
    <circle v-for="(is_active, index) in codearray" 
      :class="is_active === '1' ? 'active' : 'inactive'" 
      :cx="0.5 + (index % 8)" 
      :cy="0.5 + Math.floor(index / 8)" 
      r="0.45"
    />  
  </svg>
</template>
<script type="text/javascript">
  import {hexToBinary} from '../utilities/helpers.js'
  export default {
    name: 'SVGMatrix',
    data () {
      return {}
    },
    props: ['code'],
    computed: {
      codearray: function () {
        let arr = this.code
        console.log(arr)
        arr = hexToBinary(arr).result
        console.log(arr)
        arr = arr.split('')
        console.log(arr)

        return arr
      }
    }
  }
</script>
