<template>
  <div class="layout-padding docs-btn row justify-center">
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/ihtp')">Identifikasi HTP</q-btn> -->
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/phtp')">Pengendalian HTP</q-btn> -->
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/sensus')">Sensus</q-btn> -->

    <q-list inset-separator class="audit-collapsible">
      <q-collapsible icon="track changes" label="Ukur Lilit Batang" :sublabel="getNewLilit.length + ' New Data'">
        <div>    
          <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.replace('/lilit')">Tambah</q-btn>
          <q-data-table
            :data="getNewLilit"
            :config="config"
            :columns="columns"
          >
            <!-- Custom renderer for "message" column -->
            <div slot="col-message" slot-scope="cell">
              <span class="light-paragraph">{{cell.data}}</span>
            </div>

            <!-- Custom renderer for "source" column -->
            <div slot="col-source" slot-scope="cell">
              <span v-if="cell.data === 'Audit'" class="label text-white bg-primary">
                Audit
                <q-tooltip>Some data</q-tooltip>
              </span>
              <span v-else class="label text-white bg-negative">{{cell.data}}</span>
            </div>

            <!-- Custom renderer for "action" column with button for custom action -->
            <div slot='col-action' slot-scope='cell'>
              <q-btn color="primary" @click='doSomethingMethod(cell.row.id)'>View</q-btn>
            </div>

            <!-- Custom renderer when user selected one or more rows -->
            <div slot="selection" slot-scope="selection">
              <q-btn color="primary" @click="changeMessage(selection)">
                <i>edit</i>
              </q-btn>
              <q-btn color="primary" @click="deleteRow(selection)">
                <i>delete</i>
              </q-btn>
            </div>
          </q-data-table>
        </div>
      </q-collapsible>
      <q-collapsible icon="send" label="Outbox" sublabel="Empty">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </q-collapsible>
      <q-collapsible icon="drafts" label="Draft" sublabel="Draft a new email">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </q-collapsible>
    </q-list>
  </div>
</template>

<script>
import { QBtn, QIcon, QList, QCollapsible, QDataTable } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  components: {
    QBtn,
    QIcon,
    QList,
    QCollapsible,
    QDataTable
  },
  data () {
    return {
      config: {
        rowHeight: '40px',
        responsive: false
        // selection: 'single'
      },
      columns: [
        {
          label: 'Ukuran Lilit',
          field: 'lilit_batang',
          filter: true,
          sort: true,
          type: 'number'
        },
        {
          label: 'Create At',
          field: 'created_at',
          filter: true,
          sort (a, b) {
            return (new Date(a)) - (new Date(b))
          },
          format (value) {
            return new Date(value).toLocaleString()
          }
        },
      ],
      canGoBack: window.history.length > 1
    }
  },
  computed: {
    ...mapGetters([
      'getNewLilit'
    ])
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
  .audit-collapsible
    width 100%
</style>
