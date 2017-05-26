<template>
    <div class="list">  
    Active List: {{listData}}
    </div>
</template>


<script>
    // buttons belong in template
    // <button @click="removeLists">X</button>
    // <button @click="createLists">Add new List</button>
export default {
  name: 'list',
  //props recieves data
  props: ['list-data'],
  mounted(){
    // this.$root.$data.store.actions.createLists(this.$route.params.id)
    // this.$root.$data.store.actions.removeLists(this.$route.params.id)
  },
 
  }
  
</script>


<style scoped>

</style>