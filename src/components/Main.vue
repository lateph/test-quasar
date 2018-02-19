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
        <q-list-header>Main Menu</q-list-header>
        <q-side-link to="/snyc" item>
          <q-item-side icon="home" />
          <q-item-main label="Home"  />
        </q-side-link>
        <q-side-link to="/audit" item>
          <q-item-side icon="done all" />
          <q-item-main label="Audit" sublabel="" />
        </q-side-link>
        <q-side-link to="/schedule" item>
          <q-item-side icon="schedule" />
          <q-item-main label="Jadwal" sublabel="" />
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
  QSideLink
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
