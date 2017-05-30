<template>
  <div> 
    Active Board: {{board}}
     <li v-for="list in lists">
      <list :listData="list"></list>
    </li>
    </ul>
  </div>
</template>

<script>
    //  <ul>
    // // <button @click="createList">Add List</button>
    // // <ul>
    // //   <span @click="removeList(list)">x</span>
    // // </ul>
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
