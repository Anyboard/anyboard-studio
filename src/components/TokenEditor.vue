<template>
  <div id="tokenEditor">
    <button id="addNewToken">Add new token</button>
  </div>
</template>

<script>

  import $ from 'jquery'

  export default {
    name: 'tokenEditor',
    data () {},
    mounted () {
      // var tokenState = 'nameSelect'
      var tokenFeatures = {}

      $('#addnewtoken').on('click', function () {
        var dynamicNameButton = document.createElement('button')
        dynamicNameButton.innerHTML = 'dynamic name'
        var staticNameButton = document.createElement('button')
        staticNameButton.innerHTML = 'static name'
        var nameSelectContainer = document.createElement('div')
        nameSelectContainer.appendChild(dynamicNameButton)
        nameSelectContainer.appendChild(staticNameButton)

        this.appendChild(nameSelectContainer)
        this.style = 'display:none'
      })

      console.log(tokenFeatures)
    }
  }

</script>

<style>
  #tokenEditor{
    border: 1px solid black;
  }
  .firstview-label{
    text-align: left;
    width: 11vw;
    display: inline-block;
  }
  #token-set-up{
    width: 40vw;
    margin: auto;
  }
  #token-set-up > label{
    text-align: left;
  }
  #token-set-up > input{
    //text-align: right;
  }
</style>
