import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tree: null,
  code: null,
  id: null,
  lilits: []
}

const getters = {
  getNewLilit: state => {
    return state.lilits
  }
}

const mutations = {
  setTree (state, tree) {
    state.tree = tree
    state.code = tree.code
    state.id = tree.id
  },
  setLilit (state, lilits) {
    state.lilits = lilits
  }
}

const v = new Vue()
const actions = {
  loadTree ({ commit, dispatch }, code) {
    return new Promise(async (resolve, reject) => {
      try {
        const tree = await v.$db.trees.where({code: code}).first()
        commit('setTree', tree)
        await dispatch('loadLilit')
        resolve(tree)
      }
      catch (error) {
      }
    })
  },
  addLilit ({ commit, state, dispatch }, lilit) {
    return new Promise(async (resolve, reject) => {
      try {
        await v.$db.lilits.add({
          lilit_batang: lilit.lilit_batang,
          pohon_id: state.tree.id,
          checked_at: new Date().getTime(),
          created_at: new Date().getTime(),
          updated_at: new Date().getTime(),
          flag: 2
        })
        await dispatch('loadLilit')
        resolve()
      }
      catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  loadLilit ({ commit, state }, code) {
    return new Promise(async (resolve, reject) => {
      try {
        const lilits = await v.$db.lilits.where({pohon_id: state.tree.id}).toArray()
        commit('setLilit', lilits)
        resolve(lilits)
      }
      catch (error) {
      }
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
