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
      ...mapState('fabricInspector', {strokeDashArray: state => state.strokedasharray}),
      ...mapState('fabricInspector', {strokeWidth: state => state.strokewidth}),
      ...mapState('fabricInspector', {minWidth: state => state.minwidth}),
      ...mapState('fabricInspector', {minHeight: state => state.minheight})
    },
    methods: {
      updateSectorInfo () {
        const activeObj = this.$store.getters.GET_ACTIVEOBJ
        if (activeObj !== null) {
          if (activeObj.type === 'rect' || activeObj.type === 'circle' || activeObj.type === 'polygon') {
            this.$store.dispatch('fabricInspector/setName', 'Name: ' + activeObj.name)
            this.$store.dispatch('fabricInspector/setType', 'Type: ' + activeObj.type)
            this.$store.dispatch('fabricInspector/setHeight', 'Height: ' + activeObj.height * activeObj.scaleY)
            this.$store.dispatch('fabricInspector/setWidth', 'Width: ' + activeObj.width * activeObj.scaleX)
            this.$store.dispatch('fabricInspector/setFill', 'Color: ' + activeObj.fill)
            this.$store.dispatch('fabricInspector/setStroke', 'Stroke: ' + activeObj.stroke)
            this.$store.dispatch('fabricInspector/setStrokeDashArray', 'StrokeDashArray: ' + activeObj.strokeDashArray)
            this.$store.dispatch('fabricInspector/setStrokeWidth', 'StrokeWidth: ' + activeObj.strokeWidth)
            this.$store.dispatch('fabricInspector/setMinWidth', 'MinWidth: ' + activeObj.minWidth)
            this.$store.dispatch('fabricInspector/setMinHeight', 'MinHeight: ' + activeObj.minHeight)
          } else if (activeObj.type === 'image') {
            this.$store.dispatch('fabricInspector/setName', 'Name: ' + activeObj.name)
            this.$store.dispatch('fabricInspector/setType', 'Type: ' + activeObj.type)
            this.$store.dispatch('fabricInspector/setHeight', 'Height: ' + activeObj.height * activeObj.scaleY)
            this.$store.dispatch('fabricInspector/setWidth', 'Width: ' + activeObj.width * activeObj.scaleX)
            this.$store.dispatch('fabricInspector/setFill', 'Color: ')
            this.$store.dispatch('fabricInspector/setStroke', 'Stroke: ')
            this.$store.dispatch('fabricInspector/setStrokeDashArray', 'StrokeDashArray: ')
            this.$store.dispatch('fabricInspector/setStrokeWidth', 'StrokeWidth: ')
            this.$store.dispatch('fabricInspector/setMinWidth', 'MinWidth: ')
            this.$store.dispatch('fabricInspector/setMinHeight', 'MinHeight: ')
          } else if (activeObj.type === 'path') {
            this.$store.dispatch('fabricInspector/setName', 'Name: ' + activeObj.name)
            this.$store.dispatch('fabricInspector/setType', 'Type: ' + activeObj.type)
            this.$store.dispatch('fabricInspector/setFill', 'Color: ' + activeObj.stroke)
            this.$store.dispatch('fabricInspector/setHeight', 'Height: ')
            this.$store.dispatch('fabricInspector/setWidth', 'Width: ')
            this.$store.dispatch('fabricInspector/setStroke', 'Stroke: ')
            this.$store.dispatch('fabricInspector/setStrokeDashArray', 'StrokeDashArray: ')
            this.$store.dispatch('fabricInspector/setStrokeWidth', 'StrokeWidth: ')
            this.$store.dispatch('fabricInspector/setMinWidth', 'MinWidth: ')
            this.$store.dispatch('fabricInspector/setMinHeight', 'MinHeight: ')
          }
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
