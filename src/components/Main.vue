<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        SIMAP
      </q-toolbar-title>

      <q-btn
        flat
        @click="scan()"
        v-if="$router.history.current.path === '/tree/' + $router.history.current.params.id"
      >
        Scan QR Code
      </q-btn>
    </q-toolbar>

    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>Main Menu</q-list-header>
        <q-side-link to="/snyc" item>
          <q-item-side icon="home" />
          <q-item-main label="Home"  />
        </q-side-link>
        <q-side-link item to="/tree/1">
          <q-item-side icon="photo library" />
          <q-item-main label="Data Pohon" sublabel="" />
        </q-side-link>
        <q-side-link item to="/tree/2">
          <q-item-side icon="track changes" />
          <q-item-main label="Ukur Lilit Batang" sublabel="" />
        </q-side-link>
        <q-side-link item to="/tree/3">
          <q-item-side icon="zoom in" />
          <q-item-main label="Identifikasi HPT" sublabel="" />
        </q-side-link>
        <q-side-link item to="/tree/4">
          <q-item-side icon="build" />
          <q-item-main label="Pengendalian HPT" sublabel="" />
        </q-side-link>
        <q-side-link item to="/tree/5">
          <q-item-side icon="description" />
          <q-item-main label="Sensus Kondisi Pohon" sublabel="" />
        </q-side-link>
        <q-side-link to="/schedule" item>
          <q-item-side icon="schedule" />
          <q-item-main label="Jadwal Kegiatan" sublabel="" />
        </q-side-link>   
      </q-list>
    </div>

    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->
    <!-- <div class="layout-padding logo-container non-selectable no-pointer-events">
      <div class="logo" :style="position">
        <img src="~assets/quasar-logo-full.svg">
      </div>
    </div> -->
    <router-view />
  </q-layout>
</template>

<script>
import {
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QCard,
  QSideLink,
  Toast
} from 'quasar'

export default {
  name: 'index',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QCard,
    QSideLink
  },
  data () {
    return {
    }
  },
  methods: {
    launch (url) {
      openURL(url)
    },
    scan () {
      this.$refs.layout.hideLeft()
      if (window.cordova !== undefined) {
        cordova.plugins.barcodeScanner.scan(
          result => {
            let barcode = result.text
            this.$store.dispatch('loadTree', barcode).then(() => {
              this.$router.push('/audit/' + this.$router.history.current.params.id)
            }).catch(() => {
              Toast.create['negative']({
                html: `Data Pohon untuk barcode : ${barcode} tidak ditemukan`
              })
            })
          },
          function (error) {
            alert('Scanning failed: ' + error)
          }
        )
      }
      else {
        let barcode = 'AAS.GAAS02F010001'
        this.$store.dispatch('loadTree', barcode).then(() => {
          this.$router.push('/audit/' + this.$router.history.current.params.id)
        }).catch(() => {
          Toast.create['negative']({
            html: `Data Pohon untuk barcode : ${barcode} tidak ditemukan`
          })
        })
      }
    }
  }
}
</script>

<style lang="stylus">
.logo-container
  width 255px
  height 242px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>
