<template>
    <div class="list">  
    Active List: {{listData}}
    <ul>
     <li v-for="task in tasks">
      <task :taskData="task"></task>
    </li>
    </ul>
    </div>
</template>


<script>
import Task from './task'

export default {
  name: 'list',
  //props recieves data
  props: ['list-data', 'task-data'],
  mounted(){
     this.$root.$data.store.actions.getTasks(this.listData.boardId, this.listData._id)
  },
  computed: {
    tasks(){
      
      var tasks = this.$root.$data.store.state.tasks
      if(tasks){
      return tasks[this.listData._id]
      }
      return {}
    }
  },
  methods:{
  createLists(){
    this.$root.$data.store.actions.createLists({
      name: 'Testing list creation',
      description: 'list list list'
    })
  },
  removeLists(list){
    this.$root.$data.store.actions.removeLists(list)
  },
  moveTasks(){
    this.$root.$data.store.actions.moveTasks(tasks)
  }
},
  components:{
    Task
  },
 
  }
  
</script>


<style scoped>

</style>