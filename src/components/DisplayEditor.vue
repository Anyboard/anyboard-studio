<template>
  <div id="displayEditor">
    <div id="led-grid"></div>
    <button id="submitGrid">Submit</button>
    <button id="cancelGrid">Cancel</button>
  </div>
</template>

<script>

  import $ from 'jquery'

  export default {
    name: 'displayEditor',
    data () {},
    mounted () {
      // Creating grid of led-lights
      var gridParent = document.getElementById('led-grid')
      for (var i = 0; i < 8; i++) {
        var row = document.createElement('div')
        row.className = 'led-row'
        row.id = 'row' + i

        for (var j = 0; j < 8; j++) {
          var ledLight = document.createElement('div')
          ledLight.className = 'display-led inactive-led'
          ledLight.id = 'led' + i + j
          row.appendChild(ledLight)
        }
        gridParent.appendChild(row)
      }

      // Attaching event listeners to each led light
      $('.led-row').on('click', '*', function () {
        if (this.className === 'display-led inactive-led') {
          this.className = 'display-led active-led'
        } else {
          this.className = 'display-led inactive-led'
        }
      })

      // create data matrix based on pattern of led-divs.

      function collectionOfData () {
        $('#submitGrid').on('click', function () {
          var matrix = [[], [], [], [], [], [], [], []]
          for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
              var led = document.getElementById('led' + i + j)
              if (led.className === 'display-led active-led') {
                matrix[i][j] = 1
              } else {
                matrix[i][j] = 0
              }
            }
          }
          console.log(matrix)
        })
      }
      collectionOfData()
      /*
      function collectData () {
        $('#submitGrid').on('click', '.led-row *', function () {
          var matrix = [[], [], [], [], [], [], [], []]
          if (this.className === 'display-led inactive-led') {
            matrix[this.id.charAt(0)][this.id.charAt(1)] = 0
          } else {
            matrix[this.id.charAt(0)][this.id.charAt(1)] = 1
          }
        })
      }

      $('#submitGrid').on('click', function () {
        console.log(collectData())
      })
      */
    }
  }
</script>

<style>
  #led-grid{
    border: 1px solid black;
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 240px;
    margin-top: 10px;
  }
  .display-led{
    height: 20px;
    width: 20px;

    border: 2px solid black;
    border-radius: 50%;
    margin: 3px;

  }
  .display-led:hover{
    cursor: pointer;
    background-color: mediumaquamarine;
  }
  .inactive-led{
    background-color: black;
  }
  .active-led{
    background-color: mediumaquamarine;
  }

  .led-row{
    display: flex;
    flex-direction: row;
  }

</style>
