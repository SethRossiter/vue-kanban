import axios from 'axios'
import router from '../router'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})
let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  boards: [],
  activeBoard: {},
  activeLists: [],
  error: {},
  tasks: {},
  comments: {},
  user: {}
}

let handleError = (state, err) => {
  state.error = err
}

export default new Vuex.Store({
  // ALL DATA LIVES IN THE STATE
  state,

  mutations:{
    setBoards(state, boards){
      state.boards = boards
    },
    setActiveBoard(state, activeBoard){
      state.activeBoard = activeBoard
    }
  },

  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  actions: {
    getBoards({commit, dispatch}) {
      api('userboards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(handleError)
    },
    getBoard({commit, dispatch}, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(handleError)
    },
    createBoard({commit, dispatch}, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(handleError)
    },
    removeBoard(board) {
      api.delete('boards/' + board._id)
        .then(res => {
          this.getBoards()
        })
        .catch(handleError)
    },
    getLists(id) {
      api('/boards/' + id + '/lists/')
        .then(res => {
          state.activeLists = res.data.data.lists
        })
        .catch(handleError)
    },
    createLists(list) {
      api.post('lists/', list)
        .then(res => {
          this.getLists()
        })
        .catch(handleError)
    },
    removeLists(list) {
      api.delete('lists/' + list._id)
        .then(res => {
          this.getLists()
        })
        .catch(handleError)
    },
    getTasks(boardId, listId) {
      api('boards/' + boardId + '/lists/' + listId + '/tasks')
        .then(res => {
          //Vue.set(state.tasks, listId, res.data.data.tasks)
          state.tasks[listId] = res.data.data.tasks
        })
        .catch(handleError)
    },
    moveTask(task) {
      api.put('tasks/' + task._id, task)
        .then(res => {
          this.getTasks(task.boardId, task.listId)
        })
        .catch(handleError)
    },
    createTask(task) {
      api.post('task/', task)
        .then(res => {
          this.getTasks()
        })
        .catch(handleError)
    },
    removeTask(task) {
      api.delete('task/' + task._id)
        .then(res => {
          this.getTasks()
        })
        .catch(handleError)
    },
    getComments(boardId, listId, taskId) {
      Vue.set(state.comments, taskId, [])
      api('boards/' + boardId + '/lists/' + listId + '/tasks/' + taskId + '/comments')
        .then(res => {

          state.comments[taskId] = res.data.data.comments
        })
        .catch(handleError)
    },
    //     createBoard(board) {
    //   api.post('boards/', board)
    //     .then(res => {
    //       this.getBoards()
    //     })
    //     .catch(handleError)
    // },
    // removeBoard(board) {
    //   api.delete('boards/' + board._id)
    //     .then(res => {
    //       this.getBoards()
    //     })
    //     .catch(handleError)
    // },
    login(user) {
      auth.post('login', user)
        .then(res => {
          console.log(res)
        })
        .catch(handleError)
    },
    register(user) {
      auth.post('register', user)
        .then(res => {
          console.log(res)
          if (res.data.error) {
            return handleError(res.data.error)
          }
          //LETS REDIRECT THE PAGE
          state.user = res.data
          router.push('/boards')
        })
        .catch(handleError)
    },
    getAuth() {
      auth('authenticate')
        .then(res => {
          if (!res.data.data) {
            return router.push('/login')
          }
          debugger
          state.user = res.data.data
          router.push('/boards')
        }).catch(err => {
          router.push('/login')
        })
    },
    clearError() {
      state.error = {}
    }
  }
})