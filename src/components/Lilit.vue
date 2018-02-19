<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center">
    <q-toolbar slot="header">
      <q-btn flat v-go-back=" '/audit' ">
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title>
        Ukuran Lilit Batang
      </q-toolbar-title>
      <q-btn flat>
        <q-icon name="save" />
      </q-btn>
    </q-toolbar>
    <div style="width: 90vw;">
      <q-field>
        <q-input float-label="Ukuran Lilit Batang" v-model="ukuran" type="number" />
      </q-field>
    </div>
  </q-layout>
</template>

<script>
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, GoBack, QInput, QField } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QInput,
    QField
  },
  directives: {
    GoBack
  },
  data () {
    return {
      canGoBack: window.history.length > 1,
      ukuran: ''
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="stylus">
  .q-btn
    margin 5px
</style>
