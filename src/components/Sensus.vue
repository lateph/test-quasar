<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center">
    <q-toolbar slot="header">
      <q-btn flat v-go-back=" '/audit' ">
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title>
        Sensus
      </q-toolbar-title>
      <q-btn flat>
        <q-icon name="save" />
      </q-btn>
    </q-toolbar>
    <div style="width: 90vw;">
      <p class="caption">Radio group</p>
      <q-option-group
        color="secondary"
        type="radio"
        v-model="ukuran"
        :options="[
          { label: 'Mati', value: 'op1' },
          { label: 'Hidup', value: 'op2' },
          { label: 'Kosong', value: 'op3' }
        ]"
      />
    </div>
  </q-layout>
</template>

<script>
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, GoBack, QOptionGroup, QField } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QOptionGroup,
    QField
  },
  directives: {
    GoBack
  },
  data () {
    return {
      canGoBack: window.history.length > 1,
      ukuran: 'op2'
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
