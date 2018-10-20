<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center">
    <q-toolbar slot="header">
      <q-btn flat  @click="goBack()">
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title>
        Rekam HPT
      </q-toolbar-title>
      <q-btn flat @click="save()">
        Simpan
      </q-btn>
    </q-toolbar>
    <div style="width: 90vw;">
      <q-field>
        <q-select
          filter
          color="secondary"
          float-label="HPT"
          v-model="form.pestId" type="textarea"
          :error="$v.form.pestId.$error"
          :options="getPestOptions"
        />
      </q-field>
      <q-field>
        <q-input float-label="Keterangan" v-model="form.keterangan" type="textarea" :min-rows="5"  :error="$v.form.keterangan.$error"  />
      </q-field>
    </div>

    <q-list separator class="audit-collapsible">
      <q-collapsible icon="track changes" label="Gambar" opened>
        <q-btn color="primary" class="full-width" icon="playlist add" @click="tambahGambar2()">Tambah</q-btn>          
        <div class="parent-galery-audit">    
          <div
            v-for="(img, index) in secondSlider"
            :key="index"
            class="galery-audit"
          >
            <div class="setengah-width">
              <q-btn round icon="delete sweep" color="primary" small @click="hapusGambar(index)"/>
              <img :src="img" v-img>
            </div>
          </div>
        </div>
      </q-collapsible>
    </q-list>
  </q-layout>
</template>

<script>
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, GoBack, QInput, QField, Toast, QGalleryCarousel, QModal, QSelect, QList, QCollapsible } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import MyCarousel from 'src/MyCarousel'
import { mapGetters } from 'vuex'
export default {
  components: {
    QModal,
    QSelect,
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QInput,
    QField,
    Toast,
    QGalleryCarousel,
    MyCarousel,
    QList,
    QCollapsible
  },
  directives: {
    GoBack
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (to.params.id === undefined) {
        vm.edit = false
      }
      else {
        vm.edit = true
        vm.newImages = []
        vm.editImages = []
        vm.form.id = to.params.id
        let ihtp = vm.$store.getters.getNewIHtpById(to.params.id)
        vm.form.keterangan = ihtp.keterangan
        vm.form.pestId = ihtp.pestId
        vm.$db.newihtpimages.where({'treePestIdentificationId': parseInt(to.params.id)}).each(row => {
          vm.newImages.push({
            width: row.width,
            height: row.height,
            extension: 'jpg',
            base64: row.base64,
            pestId: row.pestId
          })
        })
        if (ihtp.id) {
          vm.$db.ihtpimages.where({'treePestIdentificationId': parseInt(ihtp.id)}).toArray().then(rows => {
            rows.forEach(row => {
              vm.$db.fileimages.get(row.imageUrl).then(file => {
                vm.editImages.push({
                  ...row,
                  ...file
                })
              })
            })
          })
        }
      }
    })
  },
  data () {
    return {
      edit: false,
      pestId: '',
      form: {
        id: 0,
        keterangan: '',
        pestId: ''
      },
      newImages: [],
      editImages: [],
      curentIndex: 0,
      baseUrl: '',
      treeimages: []
    }
  },
  computed: {
    ...mapGetters([
      'getPestOptions'
    ]),
    secondSlider: function () {
      return [...this.activeEditImage.map(x => {
        return x.base64
      }), ...this.newImages.map(x => {
        return x.base64
      })]
    },
    activeEditImage: function () {
      return this.editImages.filter(x => {
        return x.flag !== 4
      })
    }
  },
  validations: {
    form: {
      keterangan: { required },
      pestId: { required }
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    tambahGambar () {
      this.$refs.selectBlokModal.open()
    },
    tambahGambar2 () {
      if (navigator && navigator.camera) {
        navigator.camera.getPicture(imageUrl => {
          this.newImages.push({
            width: 400,
            height: 400,
            extension: 'jpg',
            base64: 'data:image/jpeg;base64,' + imageUrl,
            pestId: this.pestId
          })
        }, error => {
          console.log(error)
        }, {
          targetWidth: 400,
          targetHeight: 400,
          quality: 50,
          destinationType: 0,
          encodingType: 0
        })
      }
      else {
        this.newImages.push({
          width: 250,
          height: 300,
          extension: 'jpg',
          base64: this.baseUrl,
          pestId: this.pestId
        })
      }
    },
    setIndex (event) {
      this.curentIndex = event
    },
    hapusGambar () {
      if (this.curentIndex < this.activeEditImage.length) {
        this.activeEditImage[this.curentIndex].flag = 4
      }
      else {
        let indexDelete = this.curentIndex - this.activeEditImage.length
        this.newImages.splice(indexDelete, 1)
      }
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        Toast.create('Please review fields again.')
      }
      else {
        if (this.edit) {
          this.$store.dispatch('editIHtp', {
            local_id: this.form.id,
            keterangan: this.form.keterangan,
            pestId: this.form.pestId
          })
            .then((response) => {
              this.$db.newihtpimages.where('treePestIdentificationId').equals(parseInt(this.form.id)).delete()
              this.newImages.forEach(element => {
                this.$db.newihtpimages.add({
                  pestId: element.pestId,
                  treePestIdentificationId: parseInt(this.form.id),
                  base64: element.base64,
                  width: element.width,
                  height: element.height,
                  extension: element.extension,
                  flag: 2
                })
              })
              this.editImages.filter(x => x.flag === 4).forEach(element => {
                this.$db.ihtpimages.update(element.local_id, {
                  flag: 4
                })
              })
              this.form.keterangan = ''
              this.form.pestId = ''
              window.history.back()
            })
            .catch((error) => {
              Toast.create(error.message)
            })
        }
        else {
          this.$store.dispatch('addIHtp', {
            keterangan: this.form.keterangan,
            pestId: this.form.pestId
          })
            .then((response) => {
              this.$db.newihtpimages.where('treePestIdentificationId').equals(response).delete()
              this.newImages.forEach(element => {
                this.$db.newihtpimages.add({
                  pestId: element.pestId,
                  treePestIdentificationId: response,
                  base64: element.base64,
                  width: element.width,
                  height: element.height,
                  extension: element.extension,
                  flag: 2
                })
              })
              this.form.keterangan = ''
              this.form.pestId = ''
              window.history.back()
            })
            .catch(() => {
              Toast.create('Please review fields again.')
            })
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  .q-btn
    margin 5px
</style>
