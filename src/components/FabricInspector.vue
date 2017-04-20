<template>
  <div>
   <p>Fabric inspector</p>
    <a @click="updateSectorInfo">Click here to update info about selected sector</a>
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

  </div>
</template>


<script>
  import {mapState} from 'vuex'

  export default {
    name: 'FabricInspector',
    data () {
      return {
        header: 'Properties for selected sector',
        sectorname: 'Insert Sector Name'
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
      updateSectorInfo () {
        this.$store.dispatch('fabricInspector/updateInfo', this.$store.getters.GET_ACTIVEOBJ)
      },
      renameSector2 () {
        let sname = this.sectorname
        console.log(sname)
        if (this.$store.getters.GET_ACTIVEOBJ !== null) {
          this.$store.dispatch('renameSector', sname)
        }
      }
    }
  }
</script>

<style scoped>
 p {
   color: white;
 }
</style>
