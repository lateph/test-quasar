<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center">
    <q-toolbar slot="header">
      <q-btn flat v-go-back=" '/audit' ">
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title>
        Ukuran Lilit Batang
      </q-toolbar-title>
      <q-btn flat @click="save()">
        <q-icon name="save" />
      </q-btn>
    </q-toolbar>
    <div style="width: 90vw;">
      <q-field>
        <q-input float-label="Ukuran Lilit Batang" v-model="form.ukuran" type="number" :error="$v.form.ukuran.$error" />
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
  data () {
    return {
      edit: false,
      form: {
        id: 0,
        ukuran: ''
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (to.params.id === undefined) {
        vm.edit = false
      }
      else {
        vm.edit = true
        vm.form.id = to.params.id
        vm.form.ukuran = vm.$store.getters.getNewLilitById(to.params.id).lilit_batang
      }
    })
  },
  validations: {
    form: {
      ukuran: { required }
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
          this.$store.dispatch('editLilit', {
            local_id: this.form.id,
            lilit_batang: this.form.ukuran
          })
            .then((response) => {
              this.form.ukuran = ''
              this.$router.push('/audit')
            })
            .catch((error) => {
              Toast.create(error.message)
            })
        }
        else {
          this.$store.dispatch('addLilit', {
            lilit_batang: this.form.ukuran
          })
            .then((response) => {
              this.form.ukuran = ''
              this.$router.push('/audit')
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
