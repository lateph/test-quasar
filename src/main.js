// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
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

Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Vue.mixin({
  data: function () {
    return {
      get API_URL () {
        return 'http://localhost/myapp/public/api/'
      }
    }
  },
  methods: {
    setHeader: () => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
    }
  }
})

Vue.use(VueCordova, {
  optionTestKey: 'optionTestValue'
})
Vue.use(VueLazyload)

Vue.cordova.on('deviceready', () => {
  console.log('Cordova : device is ready !')
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App').default),
    created () {
      console.log(navigator)
      console.log(Vue.cordova.plugins)
      if (localStorage.getItem('access_token')) {
        this.setHeader()
        router.push('/')
      }
      else {
        router.push('/login')
      }
    }
  })
})

console.log('adsads')
document.addEventListener('deviceready', onDeviceReady, false)
function onDeviceReady () {
  console.log('taek')
  console.log(navigator.camera)
}
