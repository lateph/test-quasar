<template>
  <div class="layout-padding docs-btn row justify-center">
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/ihtp')">Identifikasi HTP</q-btn> -->
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/phtp')">Pengendalian HTP</q-btn> -->
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.replace('/sensus')">Sensus</q-btn> -->

    <q-list inset-separator class="audit-collapsible">
      <q-collapsible icon="track changes" label="Ukur Lilit Batang" :sublabel="getNewLilit.length + ' New Data'">
        <div>    
          <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.replace('/lilit/')">Tambah</q-btn>
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
              <q-btn color="primary" @click="$router.replace('/lilit/' + selection.rows[0].data.local_id)">
                <i>edit</i>
              </q-btn>
              <q-btn color="primary" @click="deleteLilit(selection.rows[0].data.local_id)">
                <i>delete</i>
              </q-btn>
            </div>
          </q-data-table>
        </div>
      </q-collapsible>
      <q-collapsible icon="zoom in" label="Identifikasi HTP" :sublabel="getNewIHtp.length + ' New Data'">
        <div>    
          <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.replace('/ihtp/')">Tambah</q-btn>
          <q-data-table
            :data="getNewIHtp"
            :config="config2"
            :columns="columnsIHtps"
            class="set-table-wrap"
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
              <q-btn color="primary" @click="$router.replace('/ihtp/' + selection.rows[0].data.local_id)">
                <i>edit</i>
              </q-btn>
              <q-btn color="primary" @click="deleteIHtp(selection.rows[0].data.local_id)">
                <i>delete</i>
              </q-btn>
            </div>
          </q-data-table>
        </div>
      </q-collapsible>
      <q-collapsible icon="build" label="Pengendalian HTP" :sublabel="getNewPHtp.length + ' New Data'">
        <div>    
          <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.replace('/phtp/')">Tambah</q-btn>
          <q-data-table
            :data="getNewPHtp"
            :config="config2"
            :columns="columnsPHtps"
            class="set-table-wrap"
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
              <q-btn color="primary" @click="$router.replace('/phtp/' + selection.rows[0].data.local_id)">
                <i>edit</i>
              </q-btn>
              <q-btn color="primary" @click="deletePHtp(selection.rows[0].data.local_id)">
                <i>delete</i>
              </q-btn>
            </div>
          </q-data-table>
        </div>
      </q-collapsible>
      <q-collapsible icon="description" label="Sensus" :sublabel="getNewSensus.length + ' New Data'">
        <div>    
          <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.replace('/sensus/')">Tambah</q-btn>
          <q-data-table
            :data="getNewSensus"
            :config="config3"
            :columns="columnsSensus"
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
              <q-btn color="primary" @click="$router.replace('/sensus/' + selection.rows[0].data.local_id)">
                <i>edit</i>
              </q-btn>
              <q-btn color="primary" @click="deleteSensus(selection.rows[0].data.local_id)">
                <i>delete</i>
              </q-btn>
            </div>
          </q-data-table>
        </div>
      </q-collapsible>
    </q-list>
  </div>
</template>

<script>
import { QBtn, QIcon, QList, QCollapsible, QDataTable } from 'quasar'
import { mapGetters } from 'vuex'
import moment from 'moment'

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
        responsive: false,
        selection: 'single',
        pagination: {
          rowsPerPage: 7
        }
        // selection: 'single'
      },
      config3: {
        rowHeight: '40px',
        responsive: false,
        selection: 'single',
        pagination: {
          rowsPerPage: 7
        }
        // selection: 'single'
      },
      config2: {
        rowHeight: '40px',
        responsive: true,
        selection: 'single',
        pagination: {
          rowsPerPage: 7
        }
        // selection: 'single'
      },
      columns: [
        {
          label: 'Ukuran',
          field: 'lilit_batang',
          filter: true,
          sort: true,
          width: '100px',
          style: {'text-align': 'right'},
          type: 'number'
        },
        {
          label: 'Checked At',
          field: 'checked_at',
          filter: true,
          width: '200px',
          sort (a, b) {
            return (new Date(a)) - (new Date(b))
          },
          format (value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      ],
      columnsSensus: [
        {
          label: 'Kondisi',
          field: 'kondisi_id',
          filter: true,
          sort: true,
          width: '120px',
          type: 'text',
          format: (value) => {
            return this.$store.getters.textKondisi(value)
          }
        },
        {
          label: 'Checked At',
          field: 'checked_at',
          filter: true,
          width: '200px',
          sort (a, b) {
            return (new Date(a)) - (new Date(b))
          },
          format (value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      ],
      columnsIHtps: [
        {
          label: 'Keterangan',
          field: 'keterangan',
          filter: true,
          sort: true,
          classes: 'setnowrap',
          width: '200px',
          // style: {'text-align': 'right'},
          type: 'number'
        },
        {
          label: 'Checked At',
          field: 'checked_at',
          filter: true,
          width: '200px',
          sort (a, b) {
            return (new Date(a)) - (new Date(b))
          },
          format (value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      ],
      columnsPHtps: [
        {
          label: 'Keterangan',
          field: 'keterangan',
          filter: true,
          sort: true,
          classes: 'setnowrap',
          width: '200px',
          // style: {'text-align': 'right'},
          type: 'number'
        },
        {
          label: 'Checked At',
          field: 'checked_at',
          filter: true,
          width: '200px',
          sort (a, b) {
            return (new Date(a)) - (new Date(b))
          },
          format (value) {
            return moment(value).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      ],
      canGoBack: window.history.length > 1
    }
  },
  computed: {
    ...mapGetters([
      'getNewLilit',
      'getNewIHtp',
      'getNewSensus',
      'getNewPHtp'
    ])
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    deleteLilit (id) {
      this.$store.dispatch('deleteLilit', id)
    },
    deleteIHtp (id) {
      this.$store.dispatch('deleteIHtp', id)
    },
    deletePHtp (id) {
      this.$store.dispatch('deletePHtp', id)
    },
    deleteSensus (id) {
      this.$store.dispatch('deleteSensus', id)
    }
  }
}
</script>

<style lang="stylus">
  .q-btn
    margin 5px
  .audit-collapsible
    width 100%
  .responsive
    .setnowrap
      white-space pre-line !important
</style>
