<template>
  <div id="tokenEditor">
    <button id="addNewToken">Add new token</button>
  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    name: 'tokenEditor',
    mounted () {
      var tokenEditor = document.getElementById('tokenEditor')
      var bit = document.getElementById('addNewToken')

      bit.addEventListener('click', function () {
        var nameChangeWrapper = document.createElement('div')
        var dynamicName = document.createElement('button')
        var staticName = document.createElement('button')

        dynamicName.appendChild(document.createTextNode('Dynamic Name'))
        staticName.appendChild(document.createTextNode('Static Name'))

        dynamicName.addEventListener('click', function () {
          buildTokenEditor(false)
          tokenEditor.removeChild(nameChangeWrapper)
        })

        staticName.addEventListener('click', function () {
          buildTokenEditor(true)
          tokenEditor.removeChild(nameChangeWrapper)
        })

        nameChangeWrapper.appendChild(dynamicName)
        nameChangeWrapper.appendChild(staticName)

        tokenEditor.appendChild(nameChangeWrapper)
        tokenEditor.removeChild(bit)
      })

      function buildTokenEditor (staticName) {
        if (staticName) {
          var nameLabel = document.createElement('label')
          var nameInput = document.createElement('input')
          var nameDescription = document.createElement('p')
          var nameContainer = document.createElement('div')

          nameInput.placeholder = 'token name'
          nameLabel.appendChild(document.createTextNode('Token name: '))
          nameDescription.appendChild(document.createTextNode('The token name should be something short and simple that can be used to immediately identify the token, e.g. "Dragon" or "King". If you wish to use the name to identfy the player, e.g. "Mom\'s token", instead use dynamic name'))
          nameDescription.className = 'option-description'
          nameContainer.id = 'name-container'

          nameContainer.appendChild(nameLabel)
          nameContainer.appendChild(nameInput)
          nameContainer.appendChild(nameDescription)
          tokenEditor.appendChild(nameContainer)
        }
        var customColorLabel = document.createElement('label')
        var customColorInput = document.createElement('input')
        var colorLabel = document.createElement('label')
        var colorInput = document.createElement('input')
        var vibrateLabel = document.createElement('label')
        var vibrateCheckbox = document.createElement('input')
        var shakeLabel = document.createElement('label')
        var shakeCheckbox = document.createElement('input')
        var tapLabel = document.createElement('label')
        var tapCheckbox = document.createElement('input')
        var doubleTapLabel = document.createElement('label')
        var doubleTapCheckbox = document.createElement('input')
        var tiltLabel = document.createElement('label')
        var tiltCheckbox = document.createElement('input')
        var turnLabel = document.createElement('label')
        var turnCheckbox = document.createElement('input')
        var tokentokenLabel = document.createElement('label')
        var tokentokenCheckbox = document.createElement('input')

        customColorLabel.appendChild(document.createTextNode('Use custom color'))
        customColorInput.type = 'checkbox'
        customColorInput.name = 'custom-color'

        colorLabel.appendChild(document.createTextNode('Token LED color'))
        colorInput.type = 'color'
        colorInput.value = '#00ff00'
        colorLabel.style = 'display:none'
        colorInput.style = 'display:none'

        vibrateLabel.appendChild(document.createTextNode('Vibration'))
        vibrateCheckbox.type = 'checkbox'
        tapLabel.appendChild(document.createTextNode('Tap'))
        tapCheckbox.type = 'checkbox'
        doubleTapLabel.appendChild(document.createTextNode('Double Tap'))
        doubleTapCheckbox.type = 'checkbox'
        shakeLabel.appendChild(document.createTextNode('Shake'))
        shakeCheckbox.type = 'checkbox'
        tiltLabel.appendChild(document.createTextNode('Tilt'))
        tiltCheckbox.type = 'checkbox'
        turnLabel.appendChild(document.createTextNode('Turn'))
        turnCheckbox.type = 'checkbox'
        tokentokenLabel.appendChild(document.createTextNode('Token-collide'))
        tokentokenCheckbox.type = 'checkbox'

        // hey

        tokenEditor.appendChild(customColorLabel)
        tokenEditor.appendChild(customColorInput)

        tokenEditor.appendChild(colorLabel)
        tokenEditor.appendChild(colorInput)

        tokenEditor.appendChild(document.createElement('br'))
        tokenEditor.appendChild(vibrateLabel)
        tokenEditor.appendChild(vibrateCheckbox)
        tokenEditor.appendChild(document.createElement('br'))
        tokenEditor.appendChild(tapLabel)
        tokenEditor.appendChild(tapCheckbox)
        tokenEditor.appendChild(document.createElement('br'))
        tokenEditor.appendChild(doubleTapLabel)
        tokenEditor.appendChild(doubleTapCheckbox)
        tokenEditor.appendChild(document.createElement('br'))
        tokenEditor.appendChild(shakeLabel)
        tokenEditor.appendChild(shakeCheckbox)
        tokenEditor.appendChild(document.createElement('br'))
        tokenEditor.appendChild(tiltLabel)
        tokenEditor.appendChild(tiltCheckbox)
        tokenEditor.appendChild(document.createElement('br'))
        tokenEditor.appendChild(turnLabel)
        tokenEditor.appendChild(turnCheckbox)
        tokenEditor.appendChild(document.createElement('br'))
        tokenEditor.appendChild(tokentokenLabel)
        tokenEditor.appendChild(tokentokenCheckbox)

        var submitButton = document.createElement('button')
        submitButton.appendChild(document.createTextNode('Create token'))

        var selectonator = document.querySelector('input[name=custom-color]')
        selectonator.addEventListener('change', function () {
          if (selectonator.checked) {
            colorLabel.style = 'display:block'
            colorInput.style = 'display:inline'
          } else {
            colorLabel.style = 'display:none'
            colorLabel.style = 'display:none'
          }
        })

        submitButton.addEventListener('click', function () {
          var tokenObject = {}
          var illegalActions = []
          if (vibrateCheckbox.checked === false) {
            illegalActions.push('vibrate')
          }
          if (tapCheckbox.checked === false) {
            illegalActions.push('tap')
          }
          if (doubleTapCheckbox.checked === false) {
            illegalActions.push('double-tap')
          }
          if (shakeCheckbox.checked === false) {
            illegalActions.push('shake')
          }
          if (tiltCheckbox.checked === false) {
            illegalActions.push('tilt')
          }
          if (turnCheckbox.checked === false) {
            illegalActions.push('turn')
          }
          if (tokentokenCheckbox.checked === false) {
            illegalActions.push('tokentoken')
          }
          if (customColorInput.checked) {
            illegalActions[0] = colorInput.value
          } else {
            illegalActions[0] = '#00ff00'
          }

          if (staticName) {
            tokenObject[nameInput.value] = illegalActions
          } else {
            // GENERATE DYNAMIC NAME HERE
            // MUST BE UNIQUE, SO IT MUST KNOW HOW MANY OTHER DYNAMIC TOKENS EXIST (but how??? Xd :) ) :)).
            tokenObject['token1'] = illegalActions
          }
          console.log(tokenObject)
        })

        tokenEditor.appendChild(document.createElement('br'))
        tokenEditor.appendChild(submitButton)
      }
    }
  }

</script>

<style>
  #name-container{
    margin: auto;
    width: 250px;
  }
  .option-description {
    font-style: italic;
    color: #aaaaaa;
    font-weight: 300;
    font-size: 65%;
    margin: auto;
  }
</style>
