<template>
  <div class="f_inspector">
    <p>Fabric inspector</p>
    <collapse accordion>
      <collapse-item title="Colorpicker">
        <!--<ChoiceColor :colors='colors' radius='5em' v-on:updateColor='updateColor'></ChoiceColor>-->
        <div class="activecolor" :style="'background-color:' + colors[index]"></div>

        <div class="anypicker">
          <div v-for="(val,idx) in colors"
              @click="updateColorFabricVue(val,idx)"
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
        <p>{{stroke}}</p>
        <p>{{strokeDashArray}}</p>
        <p>{{strokeWidth}}</p>
        <p>Change object name</p>
        <input type="text" v-model="sectorname"/>
        <a @click="renameSectorFabricInspector">Change name</a>
        <br/>
        <input @change="changeGridSize" type="range" v-model="gridSize" min="25" max="100"/>
        <a class="inactivelink">{{gridSize}}</a>
      </collapse-item>
      <collapse-item title="Sectorlist" class="sector_list">
        <p v-for="(sector, key) in sectors" @click="spanMake(key)" :class="clicked === key ? 'is_clicked' : ''">
          {{key}} <span :style="'background-color:' + sector"></span> {{sector}}
          <span class="dropdown">
            <a @click="makeShape('rect',sector)">Make a rectangle</a>
            <a @click="makeShape('circle',sector)">Make a circle</a>
            <a @click="makeShape('triangle',sector)">Make a triangle</a>
          </span>
        </p>
      </collapse-item>

    </collapse>
  </div>
</template>


<script>
  import {mapState, mapActions} from 'vuex'
  import {choiceColor} from 'vue-circle-choice'

  const colorArray = [
    '#4194D0',  // 5
    '#166CA0',  // 2
    '#112A95',  // 7
    '#C047A3',  // 14
    '#5E1014',  // 16
    '#9B3235',  // 18
    '#66C889',  // 21
    '#30A747',  // 24
    '#31682E',  // 30
    '#FF9344',  // 31
    '#D96623',  // 33
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
        gridSize: 50,
        clicked: false
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
      ...mapState('fabricInspector', {sectors: state => state.sectors}),

      ...mapActions(['createShape', 'updateColor'])
    },

    selected: {
      currentColor: ''
    },
    methods: {
      spanMake (condition) {
        this.clicked = condition
      },

      makeShape (type, color) {
        this.$store.dispatch('updateColorSectorList', color)
        this.$store.dispatch('createShape', type)
      },

      // createIt () {
      //  this.$store.dispatch('CreateFromSectorList', state)
    // },
      renameSectorFabricInspector () {
        let sname = this.sectorname
        if (this.$store.getters.GET_ACTIVEOBJ !== null) {
          this.$store.dispatch('renameSector', sname)
          this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
          this.$store.dispatch('stateHandling')
          var keys = this.$store.getters.GET_USED_SECTORS
          this.$store.dispatch('fabricInspector/setPredefinedSectors', keys)
        }
      },
      updateColorFabricVue (color, index) {
        this.index = index
        this.color = color
        this.$store.dispatch('updateColor', color)
        this.$store.dispatch('updateActiveObj')
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
        this.$store.dispatch('stateHandling')
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

<style lang="SASS">
  .f_inspector {
    position: relative;
    width:250px;
    background: #555;
    color: #eae9e1;
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
      border:1px solid #000;
    }
  }

  .inactivelink {
    pointer-events: none;
    cursor: default;
    text-decoration: none;
    color: #eae9e1;
  }

  .card-header {
    background: #555;
    color: #eae9e1;
  }

  .card-header-title {
    color: #eae9e1!important;
  }
  .card-content {
    background: #555;
  }
  .content {
    color: #eae9e1!important;
  }
  .faux-border {
    transform: translate(-15%, -25%)!important;
  }

  .sector_list p {
    position: relative;
  }
  .sector_list p > span {
    display:inline-block;
    padding:5px;
  }

  .sector_list p .dropdown {
    position: absolute;
    display:none;
    left:-100%;
    top:0;
    right:0;
    width:50px;
    height:50px;
    background:#fff;
  }

  .sector_list p.is_clicked .dropdown {
    display: block;
  }
</style>
