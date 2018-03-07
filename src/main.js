// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
import 'swiper/dist/css/swiper.css'
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import VueCordova from 'vue-cordova'
import VueIdb from 'vue-idb'
import store from './store'
import Vuelidate from 'vuelidate'
import VueImg from 'v-img'

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

axios.defaults.baseURL = 'http://api.simap.server-development.net'
axios.defaults.headers.common['X-SIMAP-appKey'] = 'poiuyTREWQ1234509876'
axios.defaults.headers.common['X-SIMAP-appSecret'] = 'QWERTyuiop0987612345'
console.log(axios.defaults.headers)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueIdb)
Vue.use(VueCordova, {
  optionTestKey: 'optionTestValue'
})
Vue.use(VueLazyload)
Vue.use(Vuelidate)
Vue.use(VueImg)

export default new VueIdb({
  version: 3,
  database: 'pohon',
  schemas: [
    { conditions: 'id, name, updatedAt' },
    { schedules: 'id, companyName, estateName, divisionName, blockName, activity, startDate, endDate, target, productionQuantity, productionMeasurement, materialType, materialMeasurement' },
    { pests: 'id, name, updatedAt, createdAt' },
    { ihtpimages: '++local_id, id, pestId, treePestIdentificationId, updatedAt, imageUrl, flag' },
    { fileimages: 'imageUrl, base64' },
    { treeimages: '++local_id, id, treeId, imageUrl, flag, width, height, extension, base64' },
    { newihtpimages: '++local_id, id, pestId, treePestIdentificationId, updatedAt, imageUrl, base64, width, height, extension,flag' }, // treePestIdentificationId = local_id dari ihtps
    { pts: 'code, address, city, createdAt, name, parent, phone, type, updatedAt' },
    { kebuns: 'code, address, city, createdAt, name, parent, phone, type, updatedAt' },
    { bloks: 'code, address, city, createdAt, name, parent, phone, type, updatedAt' },
    { afdelings: 'code, address, city, createdAt, name, parent, phone, type, updatedAt' },
    { lilits: '++local_id, id, pohon_id, lilit_batang, karyawanid, checked_at, created_by, created_at, updated_by, updated_at, flag' },
    { sensuss: '++local_id, id, pohon_id, kondisi_id, karyawanid, checked_at, created_by, created_at, updated_by, updated_at, flag' },
    { ihtps: '++local_id, id, pohon_id, keterangan, karyawanid, checked_at, created_by, created_at, updated_by, updated_at, flag' },
    { phtps: '++local_id, id, pohon_id, keterangan, karyawanid, checked_at, created_by, created_at, updated_by, updated_at, flag' },
    { trees: 'id, blockCode, blockName, code, companyCode, companyName, divisionCode, divisionName, estateCode, estateName, latitude, longitude, number, plantedAt' }
  ]
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App').default),
    created () {
      router.push('/snyc')
      document.addEventListener('deviceReady', () => {
        cordova.plugins.notification.local.on('click', function (notification, state) {
          router.push('/schedule')
        }, this)
      }, false)
    }
  })
})
