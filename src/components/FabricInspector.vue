<template>
  <div>
   <p>Fabric inspector</p>
    <p>{{header}}</p>
    <p>{{name}}</p>
    <p>{{type}}</p>
    <p>{{height}}</p>
    <p>{{width}}</p>
    <p>{{fill}}</p>
    <p>{{stroke}}</p>
    <p>{{strokedasharray}}</p>
    <p>{{strokewidth}}</p>
    <p>{{maxheight}}</p>
    <p>{{minheight}}</p>
    <a @click="updateSectorInfo">Click here to update info about selected sector</a>
  </div>
</template>


<script>
  import {mapState} from 'vuex'
  export default {
    name: 'FabricInspector',
    data () {
      return {
        header: 'Properties for selected sector'
      }
    },
    computed: {
      ...mapState('fabricInspector', {height: state => state.height}),
      ...mapState('fabricInspector', {width: state => state.width}),
      ...mapState('fabricInspector', {type: state => state.type}),
      ...mapState('fabricInspector', {fill: state => state.fill}),
      ...mapState('fabricInspector', {name: state => state.name}),
      ...mapState('fabricInspector', {stroke: state => state.stroke}),
      ...mapState('fabricInspector', {strokedasharray: state => state.strokedasharray}),
      ...mapState('fabricInspector', {strokewidth: state => state.strokewidth}),
      ...mapState('fabricInspector', {strokewidth: state => state.maxheight}),
      ...mapState('fabricInspector', {strokewidth: state => state.minheight})
    },
    methods: {
      updateSectorInfo () {
        const activeObj = this.$store.getters.GET_ACTIVEOBJ
        if (activeObj !== null) {
          this.$store.dispatch('fabricInspector/setName', 'Name: ' + activeObj.name)
          this.$store.dispatch('fabricInspector/setType', 'Type: ' + activeObj.type)
          this.$store.dispatch('fabricInspector/setHeight', 'Height: ' + activeObj.height * activeObj.scaleY)
          this.$store.dispatch('fabricInspector/setWidth', 'Width: ' + activeObj.width * activeObj.scaleX)
          this.$store.dispatch('fabricInspector/setFill', 'Fill: ' + activeObj.fill)
          this.$store.dispatch('fabricInspector/setStroke', 'Stroke: ' + activeObj.stroke)
          this.$store.dispatch('fabricInspector/setStrokeDashArray', 'StrokeDashArray: ' + activeObj.strokeDashArray)
          this.$store.dispatch('fabricInspector/setStrokeWidth', 'StrokeWidth: ' + activeObj.strokeWidth)
          this.$store.dispatch('fabricInspector/setMaxHeight', 'MaxHeight: ' + activeObj.maxHeight)
          this.$store.dispatch('fabricInspector/setMinHeight', 'MinHeight: ' + activeObj.minHeight)
        }// TODO:  legge til color? og legge til sjekk for type slik at kun relevante verdier vises
      }
    }
  }
</script>

<style scoped>
 p {
   color: white;
 }
</style>
