<template>
  <div> 
    Active Board: {{board}}
   <List></List>
  </div>
</template>

<script>
import List from './list'
export default {
  name: 'board',
  mounted(){
    this.$root.$data.store.actions.getBoard(this.$route.params.id)
  },
  computed:{
    board(){
      return this.$root.$data.store.state.activeBoard
    }
  },
  components: {
    List
  }
}
</script>

<style scoped>

</style>
