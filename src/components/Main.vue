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
        Quasar App
        <div slot="subtitle">Running on Quasar v{{$q.version}}</div>
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <!--
        Use <q-side-link> component
        instead of <q-item> for
        internal vue-router navigation
      -->

      <q-list no-border link inset-delimiter>
        <q-list-header>Tree Master Data</q-list-header>
        <q-item @click="launch('http://quasar-framework.org')">
          <q-item-side icon="dashboard" />
          <q-item-main label="Block" sublabel="Data Master Area Pohon" />
        </q-item>
        <q-item @click="launch('http://forum.quasar-framework.org')">
          <q-item-side icon="art track" />
          <q-item-main label="Tree By Block" sublabel="Data Master Pohon" />
        </q-item>
        <q-list-header>Schedule and Audit</q-list-header>
        <q-item @click="launch('https://gitter.im/quasarframework/Lobby')">
          <q-item-side icon="schedule" />
          <q-item-main label="Schedule" sublabel="Jadwal pekerja untuk melakukan audit" />
        </q-item>
        <q-item @click="launch('https://twitter.com/quasarframework')">
          <q-item-side icon="done all" />
          <q-item-main label="Audit" sublabel="Audit pada pohon" />
        </q-item>
        <q-list-header>Report</q-list-header>
        <q-item @click="launch('https://gitter.im/quasarframework/Lobby')">
          <q-item-side icon="content cut" />
          <q-item-main label="Harvesting" />
        </q-item>
        <q-item @click="launch('https://twitter.com/quasarframework')">
          <q-item-side icon="landscape" />
          <q-item-main label="Plantation" />
        </q-item>
        <q-list-header>Other</q-list-header>
        <q-item @click="launch('https://twitter.com/quasarframework')">
          <q-item-side icon="sync" />
          <q-item-main label="Syncronize"/>
        </q-item>
        <q-item @click="launch('https://twitter.com/quasarframework')">
          <q-item-side icon="settings overscan" />
          <q-item-main label="Scan QR Code"/>
        </q-item>        
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
  QCard
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
    QCard
  },
  data () {
    return {
    }
  },
  methods: {
    launch (url) {
      openURL(url)
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
