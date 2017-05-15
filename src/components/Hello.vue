<template>
  <div>
    <div class="hello">
      <h1>Welcome to Anyboard Studio</h1>
      <p>
        This is a simple web application for building custom hybrid board games. It utilises Evothings to run the games
        and we use the Fabric.js and Blockly.js libs for building the games.
      </p>

      <p>Head over to the <a>docs</a> for information on how to get started on your fully personal game.</p>

      <h2>How to get started</h2>
      <h3> Board editor </h3>
      <p>
      This is where you will design the board that your game will use. Use the toolbar on the left side to select
        different sectors. The sectors can have different colors, sizes and shapes. You can manipulate the sectors in
        different ways by using the different tools in the toolbar. You can also upload images, free draw and toggle
        the grid function on and off. Hover the mouse over the different icons for a brief explanation of the function.
      The color of a sector represents a certain event that will be triggered when a pawn is on the sector. E.g, when a
        pawn is on a sector colored red, the player might lose a point and have the grid display a X. The logic for the
        events that are triggered when a pawn lands on a certain sector is defined in the code builder.
      When you are done editing your game board you can print it by downloading it as a image file by clicking on the
        download button in the toolbar.
      </p>
      <h3>Game assets</h3>
      <p>
      This tab contains various functions for editing the cards printed by the Anydeck, a list of available token grids
        and a mode for customising your own grids. You can also edit various tokens properties, such as name and
        valid actions.
      </p>
      <h3>Code builder</h3>
      <p>
      This is where you define the logic of your game. The code is represented by blocks, and it’s your job to put
        these blocks together however you may please to create the logic for your gamerules. The different parts of
        the logic are sorted in different categories to the left.  For example, if you want a certain token to vibrate
        on a certain sector, your code block may look something like this:
      </p>
        <img src="../assets/dragonlogic.png" alt="Code logic example">
        <p>When you are done making the logic for your game, hit the export button in the top right corner.
          This will you give a HTML file that contains the code for your game. Place the HTML file inside the
          game folder.
        </p>
      <h3>EvoThings</h3>
      <p>
      Open EvoThings on the computer and click the Connect tab. Click on the Get Key button to generate a key.
        Open up the EvoThings application on the smart phone and type in the key. Click connect and wait for a screen
        that says “Connected”. Go back in to EvoThings on the computer and click on the My Apps tab. Locate the game
        in the list called AnyboardGameDemo and click on Run. The game is now running on the smartphone in the
        EvoThings application. Click on Discover bluetooth devices and select the Anypawn. The Anypawn is now
        connected to the phone which is running the code you created with the code builder.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="SASS" scoped>
.hello {
  max-width:500px;
  margin:0 auto;
  color:#fff;

  h1, h2, h3, h4, h5, h6 {
  margin-bottom:.5em;
  padding:0;
  text-align: center;
  font-weight: lighter;
  color:#f50;
  }

  h1 { font-size:2em; }
  p { text-align: justify; }
}
</style>
