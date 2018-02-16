<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
   <q-toolbar color="primary" slot="header">
    <!--
      For Toolbar title, we use
      QToolbarTitle component
    -->
    <q-toolbar-title>
      Login
    </q-toolbar-title>
    <!--
      In a Toolbar, buttons are best
      configured as "flat" and with an icon,
      but any button will do
    -->

  </q-toolbar>
  <div class="error-page window-height window-width bg-light column items-center no-wrap">
    <div class="error-code bg-primary flex items-center content-center justify-center">
      
    </div>
    <div>
      <div inverted color="white" align="justify" class="login-place error-card shadow-4 bg-white column items-center justify-center no-wrap">
        <q-field
          icon="account circle"
        >
          <q-input v-model="username" float-label="Username" />
        </q-field>

        <q-field
          icon="lock"
        >
          <q-input v-model="password" float-label="Password" />
        </q-field>

        <q-btn color="primary" class="full-width" v-on:click="login()">
          Login
        </q-btn>
      </div>
    </div>
  </div>
  </q-layout>
</template>

<script>

import {
  QBtn,
  QIcon,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QTabs,
  QTab,
  QTabPane,
  QField,
  QInput
} from 'quasar'
import Vue from 'vue'

export default {
  name: 'index',
  components: {
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QTab,
    QTabs,
    QTabPane,
    QField,
    QInput
  },
  data () {
    return {
      username: '',
      password: '',
      canGoBack: window.history.length > 1
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    login () {
      this.$router.push('/')
      // this.$http
      //   .post(this.API_URL + 'login', {
      //     email: this.username,
      //     password: this.password
      //   })
      //   .then(response => {
      //     localStorage.setItem('access_token', response.data.data.api_token)
      //     localStorage.setItem('profile', response.data.data)
      //     this.$router.push('/')
      //   })
      //   .catch((err) => console.log(err))
    },
    test () {
      navigator.camera.getPicture((imageURI) => {
        window.alert('Photo URI : ' + imageURI)
      }, (message) => {
        window.alert('FAILED : ' + message)
      }, {
        quality: 50,
        destinationType: Vue.cordova.camera.DestinationType.FILE_URI,
        sourceType: 0
      })
    }
  }
}
</script>

<style lang="stylus">
.error-page
  .error-code
    height calc(40vh - 50px)
    width 100%
    padding-top 15vh
    @media (orientation: landscape) { 
      font-size 30vw
    }
    @media (orientation: portrait) { 
      font-size 30vh
    }
    color rgba(255, 255, 255, .2)
    overflow hidden
  .error-card
    border-radius 2px
    width 80vw
    max-width 600px
    padding 25px
    > i
      font-size 5rem
  .tabs-utama
    margin-top -100px
  .login-place
    margin-top -100px
  .camera
    i
      height 70px
      width 70px
      font-size 70px
      margin 0
</style>
