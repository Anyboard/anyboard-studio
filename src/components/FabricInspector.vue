<template>
  <div>
   <p>Fabric inspector</p>
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
        header: 'Properties for selected object',
        sectorname: 'Insert Name'
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
      }
    }
  }
</script>

<style scoped>
 p {
   color: white;
 }
</style>
