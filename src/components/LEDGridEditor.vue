<template>
  <div class="LEDGridEditor">
    <div>
      <label for="ledGridName">Pattern name:</label>
      <input id="ledGridName" type="text" />
    </div>
    <div id="ledGrid">
      <span v-for="(n,index) in grid" @click="toggleIndex(index)" :class="grid[index]:'active-led'">{{  }}</span>
    </div>
    <div>
      <button id="ledGridSubmitButton">Submit</button>
      <button id="ledGridCancelButton">Cancel</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LEDGridEditor',
    data () {
      return {
        grid: [
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false,
          false, false, false, false, false, false, false, false
        ]
      }
    },
    methods: {
      toggleIndex (n) {
        this.grid[n] = !this.grid[n]
        console.log(this.grid)
        console.log(n)
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
        border-radius: 50%;
        margin: 1px;
        flex-grow: 1;
        background: black;
      }
      span:hover{
        cursor: pointer;
        background: radial-gradient(#aaf3ff, #86cbd6, #456c72, #9a9a9a);
      }
      span:active{
        background: #aaf3ff !important;
      }
      span.active-led{
        background: radial-gradient(#aaf3ff, #86cbd6, #456c72, #9a9a9a);
      }
    }
  }
</style>
