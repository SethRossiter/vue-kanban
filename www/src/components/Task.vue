<template>
    <div class="task">  
    {{taskData}}
    <ul>
     <li v-for="comment in comments">
      <comment :commentData="comment"></comment>
    </li>
    </ul>
    </div>
</template>


<script>
import Comment from './comment'
export default {
  name: 'task',
  //props recieves data
  props: ['task-data'],
 mounted(){
    this.$root.$data.store.actions.getComments(this.taskData.boardId,this.taskData.listId, this.taskData._id)
  },  
  computed: {
    comments(){
      var comments = this.$root.$data.store.state.comments
      return comments[this.taskData._id]
    }
  },
  methods:{
  createTasks(){
    this.$root.$data.store.actions.createTasks({
      name: 'Testing task creation',
      description: 'task task task'
    })
  },
  removeTasks(task){
    this.$root.$data.store.actions.removeTasks(task)
  },
  },

  components:{
    Comment
  }

}
  
</script>


<style scoped>
</style>