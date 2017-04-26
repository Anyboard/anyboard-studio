<template>
  <div>
    <p>Fabric inspector</p>
    <collapse accordion>
      <collapse-item title="Colorpicker">
        <ChoiceColor :colors='colors' radius='10em' v-on:updateColor='updateColor'></ChoiceColor>
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
      <collapse-item title="Predefined sectors">
        <p>{{start_sector}}</p>
        <p>{{mid_sector}}</p>
        <p>{{end_sector}}</p>
      </collapse-item>

    </collapse>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import {choiceColor} from 'vue-circle-choice'

  const colorArray = [
    '#166CA0',  // 2 blue
    '#4194D0',  // 5 lightBlue
    '#112A95',  // 7 darkBlue
    '#C047A3',  // 14 purple
    '#FB50A6',  // 15 pink
    '#5E1014',  // 16 darkBrown
    '#9B3235',  // 18 lightBrown
    '#FF483E',  // 20 red
    '#66C889',  // 21 lightGreen
    '#30A747',  // 24 green
    '#31682E',  // 30 darkGreen
    '#FF9344',  // 31 sandyBrown
    '#D96623',  // 33 brown
    '#F6EA77',  // 36 lemonYellow
    '#F4E658'   // 37 yellow
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
      ...mapState('fabricInspector', {minHeight: state => state.minheight}),
      ...mapState('fabricInspector', {start_sector: state => state.start_sector}),
      ...mapState('fabricInspector', {mid_sector: state => state.mid_sector}),
      ...mapState('fabricInspector', {end_sector: state => state.end_sector})
    },
    methods: {
      renameSector2 () {
        let sname = this.sectorname
        if (this.$store.getters.GET_ACTIVEOBJ !== null) {
          this.$store.dispatch('renameSector', sname)
          this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
        }
      },
      setPredefinedSectors () {
        var keys = this.$store.getters.GET_USED_SECTORS
        this.$store.dispatch('fabricInspector/setPredefinedSectors', keys)
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

<style>
  #objectProps > p{
    color: black;
  }
  .faux-border {
    transform: translate(-31%, -41%)!important;
  }
</style>
