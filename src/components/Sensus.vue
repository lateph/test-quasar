<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center">
    <q-toolbar slot="header">
      <q-btn flat  @click="goBack()">
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title>
        Sensus
      </q-toolbar-title>
      <q-btn flat @click="save()">
        Simpan
      </q-btn>
    </q-toolbar>
    <div style="width: 90vw;">
      <p class="caption">Status</p>
      <q-option-group
        color="secondary"
        type="radio"
        v-model="form.kondisi_id"
        :options="getConditionOptions"
        :error="$v.form.kondisi_id.$error"
      />
    </div>
  </q-layout>
</template>

<script>
import { QBtn, QIcon, QLayout, QToolbar, QToolbarTitle, GoBack, QOptionGroup, QField, Toast } from 'quasar'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    QBtn,
    QIcon,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QOptionGroup,
    QField
  },
  directives: {
    GoBack
  },
  computed: {
    ...mapGetters([
      'getConditionOptions'
    ])
  },
  data () {
    return {
      edit: false,
      form: {
        id: 0,
        kondisi_id: ''
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
        vm.form.kondisi_id = vm.$store.getters.getNewSensusById(to.params.id).kondisi_id
      }
    })
  },
  validations: {
    form: {
      kondisi_id: { required }
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
          this.$store.dispatch('editSensus', {
            local_id: this.form.id,
            kondisi_id: this.form.kondisi_id
          })
            .then((response) => {
              this.form.kondisi_id = ''
              window.history.back()
            })
            .catch((error) => {
              Toast.create(error.message)
            })
        }
        else {
          this.$store.dispatch('addSensus', {
            kondisi_id: this.form.kondisi_id
          })
            .then((response) => {
              this.form.kondisi_id = ''
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
