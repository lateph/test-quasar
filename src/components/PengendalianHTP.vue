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
        <q-icon name="save"  @click="save()"/>
      </q-btn>
    </q-toolbar>
    <div style="width: 90vw;">
      <q-field>
        <q-input float-label="Keterangan" v-model="form.keterangan" type="textarea" :min-rows="5"  :error="$v.form.keterangan.$error"  />
      </q-field>
    </div>
  </q-layout>
</template>

<script>
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, GoBack, QInput, QField, Toast } from 'quasar'
import { required } from 'vuelidate/lib/validators'

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
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (to.params.id === undefined) {
        vm.edit = false
      }
      else {
        vm.edit = true
        vm.form.id = to.params.id
        vm.form.keterangan = vm.$store.getters.getNewPHtpById(to.params.id).keterangan
      }
    })
  },
  data () {
    return {
      canGoBack: window.history.length > 1,
      edit: false,
      form: {
        id: 0,
        keterangan: ''
      }
    }
  },
  validations: {
    form: {
      keterangan: { required }
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
            keterangan: this.form.keterangan
          })
            .then((response) => {
              this.form.keterangan = ''
              window.history.back()
            })
            .catch((error) => {
              Toast.create(error.message)
            })
        }
        else {
          this.$store.dispatch('addPHtp', {
            keterangan: this.form.keterangan
          })
            .then((response) => {
              this.form.keterangan = ''
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
