<template>
  <div> 
    Active Board: {{board}}
     <ul>
     <li v-for="list in lists">
      <list :list-data="list"></list>
    </li>
    </ul>
  </div>
</template>

<script>
import List from './list'
export default {
  name: 'board',
  mounted(){
    this.$root.$data.store.actions.getBoard(this.$route.params.id)
    this.$root.$data.store.actions.getLists(this.$route.params.id)
    // this.$root.$data.store.actions.createLists(this.$route.params.id)
    // this.$root.$data.store.actions.removeLists(this.$route.params.id)
  },
  computed:{
    board(){
      return this.$root.$data.store.state.activeBoard
    },
    lists(){
      return this.$root.$data.store.state.activeLists
      //return this.$root.$data.store.getLists
    }
  },
  components: {
    List
  }
}
</script>

<style scoped>

</style>
