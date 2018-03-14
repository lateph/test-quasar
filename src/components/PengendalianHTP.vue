<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center">
    <q-toolbar slot="header">
      <q-btn flat  @click="goBack()">
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title>
        Pengendalian HTP
      </q-toolbar-title>
      <q-btn flat @click="save()">
        Simpan
      </q-btn>
    </q-toolbar>
    <div style="width: 90vw;">
      <q-field>
        <q-input float-label="Keterangan" v-model="form.keterangan" type="textarea" :min-rows="5"  :error="$v.form.keterangan.$error"  />
      </q-field>
      <q-field>
        <q-input float-label="Material Type" v-model="form.materialType" type="text" :error="$v.form.materialType.$error"  />
      </q-field>
      <q-field>
        <q-input float-label="Material Quantity" v-model="form.materialQuantity" type="number" :error="$v.form.materialQuantity.$error"  />
      </q-field>
      <q-field>
        <q-input float-label="Material Unit" v-model="form.materialUnit" type="text" :error="$v.form.materialUnit.$error"  />
      </q-field>
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
    </div>
  </q-layout>
</template>

<script>
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, GoBack, QInput, QField, Toast, QSelect } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  components: {
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QInput,
    QField,
    QSelect
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
        vm.form.id = to.params.id
        vm.form.keterangan = vm.$store.getters.getNewPHtpById(to.params.id).keterangan
        vm.form.materialType = vm.$store.getters.getNewPHtpById(to.params.id).materialType
        vm.form.materialQuantity = vm.$store.getters.getNewPHtpById(to.params.id).materialQuantity
        vm.form.materialUnit = vm.$store.getters.getNewPHtpById(to.params.id).materialUnit
        vm.form.pestId = vm.$store.getters.getNewPHtpById(to.params.id).pestId
      }
    })
  },
  data () {
    return {
      canGoBack: window.history.length > 1,
      edit: false,
      form: {
        id: 0,
        keterangan: '',
        materialType: '',
        materialQuantity: '',
        materialUnit: '',
        pestId: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPestOptions'
    ])
  },
  validations: {
    form: {
      keterangan: { required },
      materialType: { required },
      materialQuantity: { required },
      materialUnit: { required },
      pestId: { required }
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    save () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        Toast.create('Please review fields again.')
      }
      else {
        if (this.edit) {
          this.$store.dispatch('editPHtp', {
            local_id: this.form.id,
            keterangan: this.form.keterangan,
            materialType: this.form.materialType,
            materialQuantity: this.form.materialQuantity,
            materialUnit: this.form.materialUnit,
            pestId: this.form.pestId
          })
            .then((response) => {
              this.form.keterangan = ''
              this.form.materialType = ''
              this.form.materialQuantity = ''
              this.form.materialUnit = ''
              this.form.pestId = ''
              window.history.back()
            })
            .catch((error) => {
              Toast.create(error.message)
            })
        }
        else {
          this.$store.dispatch('addPHtp', {
            keterangan: this.form.keterangan,
            materialType: this.form.materialType,
            materialQuantity: this.form.materialQuantity,
            materialUnit: this.form.materialUnit,
            pestId: this.form.pestId
          })
            .then((response) => {
              this.form.keterangan = ''
              this.form.materialType = ''
              this.form.materialQuantity = ''
              this.form.materialUnit = ''
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
  .add_img
    margin-left 0px !important
    margin-right 0px !important
    width calc(50% - 3px)
  .hapus_img
    margin-left 0px !important
    margin-right 0px !important
    width calc(50% - 3px)
</style>
