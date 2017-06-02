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
  createLists: {},
  removeLists: {},
  removeBoard: {},
  activeTasks: {},
  createTasks: {},
  removeTasks: {},
  moveTasks: {},
  activeComments: {},
  createComments: {},
  removeComments: {},
  error: {},
  user: {}
}

let handleError = (state, err) => {
  state.error = err
}

export default new Vuex.Store({
  // ALL DATA LIVES IN THE STATE
  state,

  mutations: {
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard
    },
    activeLists(state, activeLists) {
      state.activeLists = activeLists.lists
    },
    activeTasks(state, activeTasks){
      state.activeTasks[activeTasks._id] = activeTasks.tasks
    },
    activeComments(state, activeComments){
      state.activeComments[activeComments._id] = activeComments.comments
    },
    user(state, user){
      state.user = user
    }
  },

  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  actions: {
    getBoards({ commit, dispatch }) {
      api('userboards')
        .then(res => {
          commit('setBoards', res.data.data)
        })
        .catch(handleError)
    },
    getBoard({ commit, dispatch }, id) {
      api('boards/' + id)
        .then(res => {
          commit('setActiveBoard', res.data.data)
        })
        .catch(handleError)
    },
    createBoard({ commit, dispatch }, board) {
      api.post('boards/', board)
        .then(res => {
          dispatch('getBoards')
        })
        .catch(handleError)
    },
    removeBoard({ commit, dispatch }, board) {
      api.delete('boards/' + board._id)
        .then(res => {
          dispatch('removeBoard')
        })
        .catch(handleError)
    },
    getLists({ commit, dispatch }, id) {
      api('/boards/' + id + '/lists/')
        .then(res => {
          commit('activeLists', res.data.data)
        })
        .catch(handleError)
    },
    createLists({ commit, dispatch }, list) {
      api.post('lists/', list)
        .then(res => {
          dispatch('getLists', list.boardId)
        })
        .catch(handleError)
    },
    removeLists({ commit, dispatch }, list) {
      api.delete('lists/' + list._id)
        .then(res => {
          dispatch('getLists')
        })
        .catch(handleError)
    },
    getTasks({ commit, dispatch }, list) {
      api('boards/' + list.boardId + '/lists/' + list._id + '/tasks')
        .then(res => {
          commit('activeTasks', res.data.data)
        })
        .catch(handleError)
    },
    moveTasks({ commit, dispatch }, task) {
      api.put('tasks/' + task._id, task)
        .then(res => {
          dispatch('getTasks', task.boardId, task.listId)
        })
        .catch(handleError)
    },
    createTasks({ commit, dispatch }, task) {
      api.post('task/', task._id, task)
        .then(res => {
          dispatch('getTasks', task.boardId, task.listId)
        })
        .catch(handleError)
    },
    createNewTasks({ commit, dispatch }, task) {
      api.post('task/', task._id, task)
        .then(res => {
          dispatch('getTasks', task.boardId, task.listId)
        })
        .catch(handleError)
    },
    removeTasks({ commit, dispatch }, task) {
      api.delete('task/' + task._id, task)
        .then(res => {
          dispatch('getTasks', task._id, task.listId)
        })
        .catch(handleError)
    },
    getComments({ commit, dispatch }, task) {
      api('boards/' + task.boardId + '/lists/' + task.listId + '/tasks/' + task._id + '/comments')
        .then(res => {
          commit('activeComments', res.data.data)
        })
        .catch(handleError)
    },
    removeComments({ commit, dispatch }, comment) {
      api.delete('comment/' + comment._id, comment)
        .then(res => {
          dispatch('getComments', comment._id, comment.taskId)
        })
        .catch(handleError)
    },
    createComments({ commit, dispatch }, comment) {
      api.post('comment/', comment._id, comment)
        .then(res => {
          dispatch('getTasks', comment.boardId, comment.listId, comment.taskId)
        })
        .catch(handleError)
    },
    login({ commit, dispatch }, user) {
      auth.post('login', user)
        .then(res => {
          console.log(res)
          if (res.data.error) {
            return handleError(res.data.error)
          }
          commit('user', res.data.data)
          router.push('/boards')
        })
        .catch(handleError)
    },
    register({ commit, dispatch }, user) {
      auth.post('register', user)
        .then(res => {
          console.log(res)
          if (res.data.error) {
            return handleError(res.data.error)
          }
          //LETS REDIRECT THE PAGE
          state.user = res.data//commit
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