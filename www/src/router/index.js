import Vue from 'vue'
import Router from 'vue-router'
import Boards from 'components/Boards'
import Board from 'components/Board'
import Login from 'components/Login'
import Register from 'components/Register'
// import List from 'components/List'
// import Task from 'components/Task'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/boards',
      name: 'Boards',
      component: Boards
    },{
      path: '/boards/:id',
      name: 'Board',
      component: Board
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    // {
    //   path: '/list/:id/lists/:listId',
    //   name: 'List',
    //   component: List
    // },
    // {
    //   path: '/boards/:id/lists/:listId/tasks',
    //   name: 'Task',
    //   component: Task
    // }
  ]
})
