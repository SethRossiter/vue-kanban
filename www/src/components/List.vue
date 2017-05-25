<template>
    <div class="list">  
    Active List: {{list}}
    <button @click="createList">Add List</button>
    <ul>
      <li v-for="list in lists"><router-link :to="'/boards/:boardId/lists'+list._id">{{list.name}}</router-link> <span @click="removeList(list)">x</span></li>
    </ul>
    </div>
</template>


<script>
export default {
  name: 'list',
  mounted(){
    this.$root.$data.store.actions.getList(this.$route.params.id)
  },
  computed:{
    board(){
      return this.$root.$data.store.state.activeList
    }
  }
}
  
</script>


<style scoped>

</style>