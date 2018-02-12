<template>
  <div class="card-examples layout-padding home-page">
    <div v-for="kategori in kategoris" :key="kategori.id">
      <blockquote>
        <p>{{kategori.name}}</p>
        <small>Show All</small>
      </blockquote>
      <swiper class="my-swipe" :options="swiperOption">
        <swiper-slide v-for="item in kategori.items" :key="item.id">
          <q-card class="my-card">
            <q-card-media>
              <div v-lazy:background-image="item.profilePics[0]"></div>
            </q-card-media>
            <q-item class="penjual">
              <q-item-side v-bind:avatar="item.user.profilePic"  v-if="item.user.profilePic"/>
              <div class="q-item-side q-item-side-left q-item-section" v-if="item.user.profilePic == false">
                <avatar v-bind:username="item.user.name" :size="25"></avatar>
              </div>
              <q-item-main label="Test"></q-item-main>
            </q-item>
            <q-card-title class="title-penjual">
              {{item.name}}
              <span slot="subtitle" color="secondary">{{item.price}}</span>
            </q-card-title>
          </q-card>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Avatar from 'vue-avatar'
import { QBtn, QIcon, QCard, QCardTitle, QCardSeparator, QCardMain, QCardMedia, QItem, QItemSide, QItemTile, QItemMain } from 'quasar'

export default {
  components: {
    QBtn,
    QIcon,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QCardMedia,
    swiper,
    swiperSlide,
    QItem,
    QItemSide,
    QItemTile,
    QItemMain,
    Avatar
  },
  data () {
    return {
      canGoBack: window.history.length > 1,
      kategoris: [],
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 1,
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 1
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 1
          },
          639: {
            slidesPerView: 2.2,
            spaceBetween: 1
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 1
          }
        }
      }
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    getHome () {
      this.$http
        .get(this.API_URL + 'home')
        .then(response => {
          this.kategoris = response.data
        })
        .catch((err) => console.log(err))
    }
  },
  mounted: function () {
    this.getHome()
  }
}
</script>

<style lang="stylus">
.home-page
  .error-code
    height 50vh
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
    margin-top -50px
    width 80vw
    max-width 600px
    padding 25px
    > i
      font-size 5rem
  .q-card
    margin 0
  .my-card
    margin 3px
  .penjual
    padding 10px 5px 0px 10px
    height 25px
    min-height 25px
    .q-item-side
      min-width auto
    img
      width 25px
      height 25px
  .q-card-media
    > div
      height 150px
      background-size cover
  .title-penjual
    padding 0 0 10px 10px
    .q-card-title
      font-size 14px
      font-weight 700
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    .q-card-subtitle
      color #ff9700
  blockquote
    position relative
    ::before
      content ''
    p
      margin 0
    small
      position absolute
      top 10px
      right 0
      line-height 24px
</style>
