<template>
  <div>
   <p>Fabric inspector</p>
    <collapse accordion>
      <collapse-item title="Colorpicker">
        <ChoiceColor :colors='colors' radius='10em' v-on:updateColor='updateColor'></ChoiceColor>
      </collapse-item>
      <collapse-item title="Object properties" actived>
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
      </collapse-item>
    </collapse>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  import {choiceColor} from 'vue-circle-choice'

  export default {
    name: 'FabricInspector',
    data () {
      return {
        header: 'Properties for selected object',
        sectorname: 'Insert Name',
        // TODO: Make picker have correct color on load
        colors: [
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
        ],
        index: 0,
        color: '#166CA0'
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
      updateColor ({ index, color }) {
        this.index = index
        this.color = color
        this.$store.dispatch('updateColor', color)
        this.$store.dispatch('updateActiveObj')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      }
    },
    components: {
      ChoiceColor: choiceColor
    }
  }
</script>

<style scoped>
 p {
   color: black;
 }
</style>
