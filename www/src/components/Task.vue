<template>
<div class="well well-sm">
    <div class="task">  
    {{taskData}}
    <span @click="removeTasks(task)">x</span>
    <button @click="createTasks">Add Task</button>
    <ul>
     <li v-for="comment in comments">
      <comment :commentData="comment"></comment>
    </li>
    </ul>
    </div>
  </div>
</template>


<script>
import Comment from './comment'
export default {
  name: 'task',
  //props recieves data
  props: ['taskData'],
 mounted(){
    this.$store.dispatch('getComments', this.taskData)
  },  
  computed: {
    comments(){
      return this.$store.state.activeComments[this.taskData._id]
    }
  },
  methods:{
  createComments(){
    this.$store.dispatch('createComments', {
      name: 'Testing comments creation',
      description: 'comments comments comments'
    })
  },
  removeComments(comments){
    this.$store.dispatch('removeComments', comments)
  }
  },

  components:{
    Comment
  }

}
  
</script>


<style scoped>
.well{
  background-color: purple;
}

</style>