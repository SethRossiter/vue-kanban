<template>
<div class="well">
    Active Board: {{board}}
  <div class="well"> 
      <span @click="removeLists(list)">x</span>
    <button @click="createLists">Add List</button>
     <li v-for="list in lists">
      <list :listData="list"></list>
      </li>
  </div>
</div>
</template>

<script>
import List from './list'
export default {
  name: 'boards',
  mounted(){
    this.$store.dispatch('getBoard', this.$route.params.id)
    this.$store.dispatch('getLists', this.$route.params.id)
  },
  computed:{
    board(){
      return this.$store.state.activeBoard

    },
    lists(){
      return this.$store.state.activeLists
    }
  },
  methods:{
        createLists(){
      this.$store.dispatch('createLists', {
        name: 'Testing list creation',
        description: 'blarg'
      })
    },
    removeLists(list){
      this.$store.dispatch('removeLists', list)
  }
  },
  components: {
    List
  }
}
</script>

<style scoped>
.well{
 color: black;
}

span{
  color: red;
}

</style>
