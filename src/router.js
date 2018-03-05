import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '/',
      // We point it to our component
      // where we defined our QLayout
      component: load('Main'),
      // Now we define the sub-routes.
      // These are getting injected into
      // layout (from above) automatically
      // by using <router-view> placeholder
      // (need to specify it in layout)
      children: [
        {
          path: 'snyc',
          component: load('Snyc')
        },
        {
          path: '/schedule',
          component: load('Schedule')
        },
        {
          path: '/tree',
          component: load('Tree')
        },
        {
          path: 'profile',
          component: load('Error404')
        },
        {
          path: 'table',
          component: load('Table')
        }
      ]
    },
    {
      path: '/audit',
      component: load('Audit')
    },
    {
      path: '/lilit/:id?',
      // We point it to our component
      // where we defined our QLayout
      component: load('Lilit')
    },
    {
      path: '/ihtp/:id?',
      component: load('IdentifikasiHTP')
    },
    {
      path: '/phtp/:id?',
      component: load('PengendalianHTP')
    },
    {
      path: '/sensus/:id?',
      component: load('Sensus')
    },
    {
      path: '/login',
      // We point it to our component
      // where we defined our QLayout
      component: load('Login')
    },
    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
