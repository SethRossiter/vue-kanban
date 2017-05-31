<template>
  <div class="list" droppable="true" v-on:drop.capture="addTasks" ondragover="event.preventDefault()">
    Active List: {{listData}}
    <div v-for="(task, i) in tasks"
    :key="i" :id="i" class="tasks" draggable="true" v-on:dragstart.capture="moving">
      <task :taskData="task"></task>
      <div @click="getDets" v-on:dragend="moveTasks">
      </div>
    </div>
  </div>
</template>


<script>
  // <div class="list">  
  // Active List: {{listData}}
  // <draggable v-model="tasks" @start="drag=true" @end="drag=false">
  // </draggable>
  // </div>
  import Task from './task'
  import draggable from 'vuedraggable'
  export default {
    name: 'list',
    //props recieves data
    props: ['list-data', 'task-data'],
    mounted() {
      this.$root.$data.store.actions.getTasks(this.listData.boardId, this.listData._id)
    },
    computed: {
      tasks() {

        var tasks = this.$root.$data.store.state.tasks
        if (tasks) {
          return tasks[this.listData._id]
        }
        return {}
      }
    },
    methods: {
      getDets() {
        console.log(this.tasks.description)
      }, 
      addTasks(event) {
        var task = JSON.parse(event.dataTransfer.getData('text/javascript'))
        task.listId = this.listData._id
        this.$root.$data.store.actions.moveTask(task)
        debugger


        //this.$http.put('/tasks/' + id, id)
      },
      moving(event) {
        
        console.log(event.target, event.target.id)
        var task = this.tasks[event.target.id]
        event.dataTransfer.setData('text/javascript', JSON.stringify(task))
        console.log('We are moving')
      },
      createLists() {
        this.$root.$data.store.actions.createLists({
          name: 'Testing list creation',
          description: 'list list list'
        })
      },
      removeLists(list) {
        this.$root.$data.store.actions.removeLists(list)
      },
      moveTasks() {
        let i = this.tasks.indexOf(this.tasks)
        this.tasks.splice(i, 1)
        this.$root.$data.store.actions.moveTasks(tasks)
      }
    },
    components: {
      Task,
      draggable
    },

  }

</script>


<style scoped>

</style>