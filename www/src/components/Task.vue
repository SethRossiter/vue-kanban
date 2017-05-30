<template>
    <div class="task">  
    Active List: {{taskData}}
    </div>
</template>


<script>

export default {
  name: 'task',
  //props recieves data
  props: ['task-data'],
  mounted(){

  },
 
  }
  
</script>


<style scoped>

</style>