<template>
  <div class="LEDGridEditor">
    <p>Led Grid Editor</p>
    <div v-if="isNewGrid">
      <label for="ledGridName">Pattern name:</label>
      <input id="ledGridName" class="normalinput" type="text" v-model="gridName" placeholder="Pattern name"/>
    </div>
    <div v-if="!isNewGrid">
      <label for="ledGridName">{{selectedGrid}}</label>
    </div>
    <div id="ledGrid">
      <span v-for="(n,index) in grid" @click="toggleIndex(index)" :class="n?'active-led':'false'" :key="index"></span>
    </div>
    <div>
      <button v-if="isNewGrid" id="ledGridSubmitButton" @click="submitGrid">Submit</button>
      <button v-if="!isNewGrid" id="ledGridUpdateButton" @click="updateGrid">Update</button>
      <button id="ledGridCancelButton" @click="clearGrid">Clear</button>
    </div>
    <div v-if="!isNewGrid">
      <button id="ledGridCopyButton" @click="copyGrid">Copy</button>
      <button id="ledGridDeleteButton" @click="deleteGrid">Delete</button>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'LEDGridEditor',
    data () {
      return {
        gridName: ''
      }
    },
    computed: {
      ...mapState('ledgrid', {
        grid: state => state.grid,
        selectedGrid: state => state.selectedGrid
      }),
      isNewGrid: function () {
        return this.selectedGrid === ''
      },
      gridString: function () {
        let n = ''
        for (let i = 0; i < this.grid.length; i++) {
          n += (this.grid[i] ? '1' : '0')
        }
        return n
      },
      cleanedGridName: function () {
        return this.gridName.length === 0 ? 'default' : this.gridName.toLowerCase()
      },
      validName: function () {
        if (this.gridName === '') {
          console.log('HEY???')
          return false
        } else {
          console.log('grid has a name')
          return true
        }
      }
    },
    methods: {
      toggleIndex (n) {
        this.$store.dispatch('ledgrid/changeGrid', n)
      },
      submitGrid () {
        if (this.validName) {
          this.$store.dispatch('ledgrid/saveGrid', {name: this.cleanedGridName, str: this.gridString})
          this.gridName = ''
        } else {
          document.getElementById('ledGridName').className = 'redflash'
          setTimeout(function () {
            document.getElementById('ledGridName').className = 'normalinput'
          }, 200)
        }
      },
      updateGrid () {
        this.$store.dispatch('ledgrid/updateGrid', {str: this.gridString})
      },
      clearGrid () {
        this.$store.dispatch('ledgrid/clearGrid')
      },
      copyGrid () {
        this.$store.dispatch('ledgrid/deselectGrid')
      },
      deleteGrid () {
        this.$store.dispatch('ledgrid/deleteGrid')
      }
    }
  }
</script>

<style lang="SASS" scoped>
  .LEDGridEditor{
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;

    > * {
      flex-grow: 1;
    }

    $ledWidth: 20px;

    #ledGrid{
      display: flex;
      flex-wrap: wrap;
      width: ($ledWidth+2)*8;

      span {
        height: $ledWidth;
        width: $ledWidth;
        border: 1px solid black;
        margin: 1px;
        flex-grow: 1;
        background: black;
      }
      span:hover{
        cursor: pointer;
        background: radial-gradient(#E5FFD0, #96F050, #5EDA00);
      }
      span:active{
        background: #96F050 !important;
      }
      span.active-led{
        background: radial-gradient(#E5FFD0, #96F050, #5EDA00);
      }
    }
  }
  .redflash{
    background-color: red;
  }
  .normalinput {
    background-color: white;
    transition: background-color 1s ease-in;
  }
</style>
