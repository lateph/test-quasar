import Vue from 'vue'
import Vuex from 'vuex'
import { LocalStorage } from 'quasar'
import moment from 'moment'

Vue.use(Vuex)

const state = {
  tree: null,
  code: null,
  id: null,
  lilits: [],
  iHtps: []
}

const getters = {
  getNewLilit: state => {
    return state.lilits.filter(lilit => lilit.flag === 1 || lilit.flag === 2 || lilit.flag === 3)
  },
  getNewLilitById: (state) => (id) => {
    return state.lilits.find(lilit => lilit.local_id === parseInt(id))
  },
  getNewIHtp: state => {
    return state.iHtps.filter(iHtp => iHtp.flag === 1 || iHtp.flag === 2 || iHtp.flag === 3)
  },
  getNewIHtpById: (state) => (id) => {
    return state.iHtps.find(iHtp => iHtp.local_id === parseInt(id))
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
  },
  setIHtp (state, iHtps) {
    state.iHtps = iHtps
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
        await dispatch('loadIHtp')
        resolve(tree)
      }
      catch (error) {
        reject(error)
      }
    })
  },
  addLilit ({ commit, state, dispatch }, lilit) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = LocalStorage.get.item('user')
        await v.$db.lilits.add({
          lilit_batang: lilit.lilit_batang,
          pohon_id: state.tree.id,
          checked_at: new Date().getTime(),
          created_at: new Date().getTime(),
          updated_at: new Date().getTime(),
          karyawanid: user ? user.employeeId : 0,
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
  editLilit ({ commit, state, dispatch, getters }, lilit) {
    return new Promise(async (resolve, reject) => {
      try {
        let editc = getters.getNewLilitById(lilit.local_id)
        let newValue = {
          ...lilit,
          checked_at: new Date().getTime(),
          updated_at: new Date().getTime()
        }
        if (editc.flag !== 2) {
          newValue.flag = 3
        }
        delete newValue.local_id
        await v.$db.lilits.update(parseInt(lilit.local_id), newValue)
        await dispatch('loadLilit')
        resolve()
      }
      catch (error) {
        reject(error)
      }
    })
  },
  deleteLilit ({ commit, state, dispatch, getters }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        let editc = getters.getNewLilitById(id)
        console.log(editc)
        if (editc.flag === 2) {
          await v.$db.lilits.delete(parseInt(id))
        }
        else {
          await v.$db.lilits.update(parseInt(id), {
            flag: 4
          })
        }
        await dispatch('loadLilit')
        resolve()
      }
      catch (error) {
        reject(error)
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
        reject(error)
      }
    })
  },
  getUploadDataLilit () {
    return new Promise(async (resolve, reject) => {
      try {
        let data = []
        const newRows = await v.$db.lilits.where({flag: 2}).toArray()
        newRows.forEach(row => {
          data[`record[insert][${row.local_id}][treeId]`] = row.pohon_id
          data[`record[insert][${row.local_id}][value]`] = row.lilit_batang
          data[`record[insert][${row.local_id}][checkedAt]`] = moment(row.checked_at).format('YYYY-MM-DD HH:mm:ss')
        })
        const updateRows = await v.$db.lilits.where({flag: 3}).toArray()
        updateRows.forEach(row => {
          data[`record[update][${row.id}][value]`] = row.lilit_batang
          data[`record[update][${row.id}][checkedAt]`] = moment(row.checked_at).format('YYYY-MM-DD HH:mm:ss')
        })
        const deleteRows = await v.$db.lilits.where({flag: 4}).toArray()
        deleteRows.forEach(row => {
          data[`record[delete][${row.local_id}]`] = row.id
        })
        resolve(data)
      }
      catch (error) {
        reject(error)
      }
    })
  },
  addIHtp ({ commit, state, dispatch }, iHtp) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = LocalStorage.get.item('user')
        await v.$db.ihtps.add({
          keterangan: iHtp.keterangan,
          pohon_id: state.tree.id,
          checked_at: new Date().getTime(),
          created_at: new Date().getTime(),
          updated_at: new Date().getTime(),
          karyawanid: user ? user.employeeId : 0,
          flag: 2
        })
        await dispatch('loadIHtp')
        resolve()
      }
      catch (error) {
        reject(error)
        console.log(error)
      }
    })
  },
  editIHtp ({ commit, state, dispatch, getters }, iHtp) {
    return new Promise(async (resolve, reject) => {
      try {
        let editc = getters.getNewIHtpById(iHtp.local_id)
        let newValue = {
          ...iHtp,
          checked_at: new Date().getTime(),
          updated_at: new Date().getTime()
        }
        if (editc.flag !== 2) {
          newValue.flag = 3
        }
        delete newValue.local_id
        await v.$db.ihtps.update(parseInt(iHtp.local_id), newValue)
        await dispatch('loadIHtp')
        resolve()
      }
      catch (error) {
        reject(error)
      }
    })
  },
  deleteIHtp ({ commit, state, dispatch, getters }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        let editc = getters.getNewIHtpById(id)
        console.log(editc)
        if (editc.flag === 2) {
          await v.$db.ihtps.delete(parseInt(id))
        }
        else {
          await v.$db.ihtps.update(parseInt(id), {
            flag: 4
          })
        }
        await dispatch('loadIHtp')
        resolve()
      }
      catch (error) {
        reject(error)
      }
    })
  },
  loadIHtp ({ commit, state }, code) {
    return new Promise(async (resolve, reject) => {
      try {
        const iHtps = await v.$db.ihtps.where({pohon_id: state.tree.id}).toArray()
        commit('setIHtp', iHtps)
        resolve(iHtps)
      }
      catch (error) {
        reject(error)
      }
    })
  },
  getUploadDataIHtp () {
    return new Promise(async (resolve, reject) => {
      try {
        let data = []
        const newRows = await v.$db.ihtps.where({flag: 2}).toArray()
        newRows.forEach(row => {
          data[`record[insert][${row.local_id}][treeId]`] = row.pohon_id
          data[`record[insert][${row.local_id}][description]`] = row.keterangan
          data[`record[insert][${row.local_id}][checkedAt]`] = moment(row.checked_at).format('YYYY-MM-DD HH:mm:ss')
        })
        const updateRows = await v.$db.ihtps.where({flag: 3}).toArray()
        updateRows.forEach(row => {
          data[`record[update][${row.id}][description]`] = row.keterangan
          data[`record[update][${row.id}][checkedAt]`] = moment(row.checked_at).format('YYYY-MM-DD HH:mm:ss')
        })
        const deleteRows = await v.$db.ihtps.where({flag: 4}).toArray()
        deleteRows.forEach(row => {
          data[`record[delete][${row.local_id}]`] = row.id
        })
        resolve(data)
      }
      catch (error) {
        reject(error)
      }
    })
  },
  setSynced () {
    return new Promise(async (resolve, reject) => {
      try {
        v.$db.lilits.where('flag').equal(2).modify({flag: 0})
        v.$db.lilits.where('flag').equal(3).modify({flag: 0})
        v.$db.lilits.where('flag').equal(4).modify({flag: 0})
        resolve()
      }
      catch (error) {
        reject(error)
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
