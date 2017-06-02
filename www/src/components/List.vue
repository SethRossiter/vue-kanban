<template>
<div class="well well-sm">
  <div class="list" droppable="true" v-on:drop.capture="createTasks" ondragover="event.preventDefault()">
    Active List: {{listData.name}}  ---- {{listData.description}} ---- {{listData._id}}
    <div v-for="(task, i) in tasks" :key="i" :id="i" class="tasks" draggable="true" v-on:dragstart.capture="moving">
      <task :taskData="task"></task>
      <div @click="getDets" v-on:dragend="moveTasks">
      </div>
    </div>
  </div>
</div>
</template>


<script>
  import Task from './task'
  import draggable from 'vuedraggable'
  export default {
    name: 'list',
    //props recieves data
    props: ['listData'],
    mounted() {
      this.$store.dispatch('getTasks', this.listData)
        },
    computed: {
      tasks() {
       return this.$store.state.activeTasks[this.listData._id]
    }
    },
    methods: {
      getDets() {
        console.log(this.tasks.description)
      },
      createTasks(event) {
        var task = JSON.parse(event.dataTransfer.getData('text/javascript'))
        task.listId = this.listData._id
        this.$store.dispatch('moveTask', task)
      },
      moving(event) {
        console.log(event.target, event.target.id)
        var task = this.tasks[event.target.id]
        event.dataTransfer.setData('text/javascript', JSON.stringify(task))
        console.log('We are moving')
      },
      moveTasks() {
        let i = this.tasks.indexOf(this.tasks)
        this.tasks.splice(i, 1)
        this.$store.dispatch('moveTasks', tasks)
      }
    },
    components: {
      Task,
      draggable
    },
  }
</script>


<style scoped>
.well{
  background-color: orange;
}
</style>