<template>
<div class="well well-sm">
    <div class="task">  
    {{taskData.name}}
    <form @submit.prevent="createComments(comment)">
      <input type="text" v-model="name" required placeholder="Create Comment">
      <button type="submit">+</button>
        <span @submit.prevent="removeComments(comment)">x</span>
    </form>
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
  data(){
      return {
        name: ''
      }
    },
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
      name: this.name,
      description: this.description,
      taskId: this.$route.params.id,
      listId: this.$route.params.id,
      boardId: this.$route.params.id
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