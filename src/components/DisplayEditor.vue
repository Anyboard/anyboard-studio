<template>
  <div id="displayEditor">
    <label>Pattern name:</label><input id="ledGridName" type="text" value="pattern">
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

      $('#submitGrid').on('click', function () {
        var ledGridData = {name: '', bitstring: ''}
        var bitstring = ''
        for (var i = 0; i < 8; i++) {
          for (var j = 0; j < 8; j++) {
            var led = document.getElementById('led' + i + j)
            if (led.className === 'display-led active-led') {
              bitstring += '1'
            } else {
              bitstring += '0'
            }
          }
        }
        var namestring = document.getElementById('ledGridName').value
        if (namestring.includes(' ')) {
          alert('empty spaces not allowed in name!')
        } else {
          ledGridData.name = namestring
          ledGridData.bitstring = bitstring
          console.log(ledGridData)
        }
      })
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
    margin: 1px;

  }
  .display-led:hover{
    cursor: pointer;
    background: radial-gradient(#d7f473, #7a9324, #3e4c0e);
  }
  .inactive-led{
    background-color: black;
  }
  .active-led{
    background: radial-gradient(#d7f473, #7a9324, #3e4c0e);
  }

  .led-row{
    margin: auto;
    display: flex;
    flex-direction: row;
  }

</style>
