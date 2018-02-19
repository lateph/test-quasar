<template>
  <div class="layout-padding docs-btn row justify-center">
    <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/lilit')">Ukur Lilit Batang</q-btn>
    <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/ihtp')">Identifikasi HTP</q-btn>
    <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/phtp')">Pengendalian HTP</q-btn>
    <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/sensus')">Sensus</q-btn>
  </div>
</template>

<script>
import { QBtn, QIcon } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon
  },
  data () {
    return {
      canGoBack: window.history.length > 1
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
