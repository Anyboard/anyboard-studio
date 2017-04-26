<template>
  <div class="f_inspector">
    <p>Fabric inspector</p>
    <collapse accordion>
      <collapse-item title="Colorpicker">
        <!--<ChoiceColor :colors='colors' radius='5em' v-on:updateColor='updateColor'></ChoiceColor>-->
        <div class="activecolor" :style="'background-color:' + colors[index]"></div>
        
        <div class="anypicker">
          <div v-for="(val,idx) in colors" 
              @click="updateColor(val,idx)" 
              :style="'background-color:' + val" 
              :key="idx">
          </div>
        </div>
        

      </collapse-item>
      <collapse-item title="Object properties" actived id="objectProps">
        <p>{{header}}</p>
        <p>{{name}}</p>
        <p>{{type}}</p>
        <p>{{fill}}</p>
        <p>{{height}}</p>
        <p>{{width}}</p>
        <p>{{minHeight}}</p>
        <p>{{minWidth}}</p>
        <p>{{stroke}}</p>
        <p>{{strokeDashArray}}</p>
        <p>{{strokeWidth}}</p>
        <p>Change object name</p>
        <input type="text" v-model="sectorname"/>
        <a @click="renameSector2">Change name</a>
        <br/>
        <input @change="changeGridSize" type="range" v-model="gridSize" min="25" max="100"/>
        <a>{{gridSize}}</a>
      </collapse-item>
    </collapse>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import {choiceColor} from 'vue-circle-choice'

  const colorArray = [
    '#166CA0',  // 2
    '#4194D0',  // 5
    '#112A95',  // 7
    '#C047A3',  // 14
    '#FB50A6',  // 15
    '#5E1014',  // 16
    '#9B3235',  // 18
    '#FF483E',  // 20
    '#66C889',  // 21
    '#30A747',  // 24
    '#31682E',  // 30
    '#FF9344',  // 31
    '#D96623',  // 33
    '#F6EA77',  // 36
    '#F4E658'   // 37
  ]
  export default {
    name: 'FabricInspector',
    data () {
      return {
        header: 'Properties for selected object',
        sectorname: 'Insert Name',
        // TODO: Make picker have correct color on load
        colors: colorArray,
        index: 0,
        color: colorArray[0],
        gridSize: 50
      }
    },
    computed: {
      ...mapState('fabricInspector', {height: state => state.height}),
      ...mapState('fabricInspector', {width: state => state.width}),
      ...mapState('fabricInspector', {type: state => state.type}),
      ...mapState('fabricInspector', {fill: state => state.fill}),
      ...mapState('fabricInspector', {name: state => state.name}),
      ...mapState('fabricInspector', {stroke: state => state.stroke}),
      ...mapState('fabricInspector', {strokeDashArray: state => state.strokedasharray}),
      ...mapState('fabricInspector', {strokeWidth: state => state.strokewidth}),
      ...mapState('fabricInspector', {minWidth: state => state.minwidth}),
      ...mapState('fabricInspector', {minHeight: state => state.minheight})
    },
    methods: {
      renameSector2 () {
        let sname = this.sectorname
        if (this.$store.getters.GET_ACTIVEOBJ !== null) {
          this.$store.dispatch('renameSector', sname)
          this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
        }
      },
      updateColor (color, index) {
        this.index = index
        this.color = color
        this.$store.dispatch('updateColor', color)
        this.$store.dispatch('updateActiveObj')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      },
      changeGridSize () {
        this.$store.dispatch('changeGridSize', this.gridSize)
      }
    },
    components: {
      ChoiceColor: choiceColor
    }
  }
</script>

<style lang="SASS">
  .f_inspector {
    position: relative;
    width:250px;
  }

  .activecolor {
      width:50px;
      height:50px;
      border:3px solid #222;
    }

  .anypicker {    
    div {
      display: inline-block;
      width:25px;
      height: 25px;
      border:1px solid #fff;
    }
  }


  #objectProps > p{
    color: black;
  }
  .faux-border {
    transform: translate(-15%, -25%)!important;
  }
</style>
