<template>
  <div class="LEDGridEditor">
    <div>
      <label for="ledGridName">Pattern name:</label>
      <input id="ledGridName" type="text" v-model="gridName" placeholder="Pattern name"/>
    </div>
    <div id="ledGrid">
      <span v-for="(n,index) in grid" @click="toggleIndex(index)" :class="n?'active-led':'false'" :key="index"></span>
    </div>
    <div>
      <button id="ledGridSubmitButton" @click="submitGrid">Submit</button>
      <button id="ledGridCancelButton">Cancel</button>
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
      ...mapState('ledgrid', {grid: state => state.grid}),
      gridString: function () {
        let n = ''
        for (let i = 0; i < this.grid.length; i++) {
          n += (this.grid[i] ? '1' : '0')
        }
        return n
      },

      cleanedGridName: function () {
        return this.gridName.length === 0 ? 'default' : this.gridName.toLowerCase()
      }
    },
    methods: {
      toggleIndex (n) {
        this.$store.dispatch('ledgrid/setGrid', n)
      },
      submitGrid () {
        this.$store.dispatch('ledgrid/saveGrid', {name: this.cleanedGridName, str: this.gridString})
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
        background: radial-gradient(#aaf3ff, #86cbd6, #456c72);
      }
      span:active{
        background: #aaf3ff !important;
      }
      span.active-led{
        background: radial-gradient(#aaf3ff, #86cbd6, #456c72);
      }
    }
  }
</style>
