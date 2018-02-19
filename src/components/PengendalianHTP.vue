<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center">
    <q-toolbar slot="header">
      <q-btn flat v-go-back=" '/audit' ">
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title>
        Pengendalian HTP
      </q-toolbar-title>
      <q-btn flat>
        <q-icon name="save" />
      </q-btn>
    </q-toolbar>
    <div style="width: 90vw;">
      <q-gallery-carousel dots infinite :src="secondSlider" actions></q-gallery-carousel>
      <q-btn class="add_img" icon="add" color="primary">Tambah</q-btn>
      <q-btn class="hapus_img" icon="delete" color="negative">Hapus</q-btn>
      <q-field>
        <q-input float-label="Keterangan" v-model="ukuran" type="textarea" :min-rows="5" />
      </q-field>
    </div>
  </q-layout>
</template>

<script>
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, GoBack, QInput, QField, QGalleryCarousel } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QInput,
    QField,
    QGalleryCarousel
  },
  directives: {
    GoBack
  },
  data () {
    return {
      canGoBack: window.history.length > 1,
      ukuran: '',
      secondSlider: [
        'statics/mountains.jpg',
        'statics/parallax1.jpg',
        'statics/parallax2.jpg'
      ]
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
  .add_img
    margin-left 0px !important
    margin-right 0px !important
    width calc(50% - 3px)
  .hapus_img
    margin-left 0px !important
    margin-right 0px !important
    width calc(50% - 3px)
</style>
