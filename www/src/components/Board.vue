<template>
  <div> 
    Active Board: {{board}}
     <li v-for="list in lists">
      <list :listData="list"></list>
      </li>
  </div>
</template>

<script>
    // <button @click="createLists">Add List</button>
    // </li>
    //   <router-link :to="'/boards/'+board._id+'/lists/'+list._id">{{list.name}}</router-link> <span @click="removeLists(list)">x</span></li>
import List from './list'
export default {
  name: 'board',
  mounted(){
    this.$root.$data.store.actions.getBoard(this.$route.params.id)
    this.$root.$data.store.actions.getLists(this.$route.params.id)
  },
  computed:{
    board(){
      return this.$root.$data.store.state.activeBoard
    },
    lists(){
      return this.$root.$data.store.state.activeLists
    }
  },
  components: {
    List
  }
}
</script>

<style scoped>

</style>
