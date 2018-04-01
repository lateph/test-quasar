<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center" style="width: 100%">
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.push('/ihtp')">Identifikasi HTP</q-btn> -->
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.push('/phtp')">Pengendalian HTP</q-btn> -->
    <!-- <q-btn color="primary" class="full-width" icon="" @click="$router.push('/sensus')">Sensus</q-btn> -->
    <q-toolbar slot="header">
      <q-btn flat @click="goBack()">
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title v-if="$route.params.id === '1'">
        Detail Pohon
      </q-toolbar-title>
      <q-toolbar-title v-if="$route.params.id === '2'">
        Lilit Pohon
      </q-toolbar-title>
      <q-toolbar-title v-if="$route.params.id === '3'">
        Identifikasi HPT
      </q-toolbar-title>
      <q-toolbar-title v-if="$route.params.id === '4'">
        Pengendalian HPT
      </q-toolbar-title>
      <q-toolbar-title v-if="$route.params.id === '5'">
        Sensus
      </q-toolbar-title>
    </q-toolbar>

    <q-card inline class="audit-card">
      <q-list>
        <q-item>
          <q-item-side>
            <q-item-tile color="primary" icon="code" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>Kode</q-item-tile>
            <q-item-tile sublabel>{{tree.code}}</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item v-if="$route.params.id === '1'">
          <q-item-side>
            <q-item-tile color="red" icon="view quilt" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>Blok</q-item-tile>
            <q-item-tile sublabel>{{tree.blockCode}}</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item v-if="$route.params.id === '1'">
          <q-item-side>
            <q-item-tile color="amber" icon="location on" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>Lat, Long</q-item-tile>
            <q-item-tile sublabel>{{tree.latitude}}, {{tree.longitude}}</q-item-tile>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-side>
            <q-item-tile color="blue-grey" icon="format list numbered" />
          </q-item-side>
          <q-item-main>
            <q-item-tile label>Number</q-item-tile>
            <q-item-tile sublabel>{{tree.number}}</q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
      <q-card-separator  v-if="$route.params.id === '1'"/>
      <q-list separator class="audit-collapsible"  v-if="$route.params.id === '1'">
        <q-collapsible icon="track changes" label="Gambar" :sublabel="treeimages.length + ' New Data'">
          <q-btn color="primary" class="full-width" icon="playlist add" @click="tambahGambar()">Tambah</q-btn>          
          <div class="parent-galery-audit">    
            <div
              v-for="img in treeimages"
              :key="img.id"
              class="galery-audit"
            >
              <div class="setengah-width">
                <q-btn round icon="delete sweep" color="primary" small @click="deleteImageTree(img.local_id)"/>
                <img :src="img.base64" v-img>
              </div>
            </div>
          </div>
        </q-collapsible>
      </q-list>
    </q-card>

    <div v-if="$route.params.id === '2'" style="width: 90vw">
      <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.push('/lilit/')">Tambah</q-btn>
      <q-data-table :data="getNewLilit" :config="config" :columns="columns">
        <!-- Custom renderer for "message" column -->
        <div slot="col-message" slot-scope="cell">
          <span class="light-paragraph">{{cell.data}}</span>
        </div>

        <template slot="col-id" slot-scope="cell">
          <div class="my-label text-white bg-primary" @click="$router.push('/lilit/' + cell.row.local_id)">
            Edit
          </div>
          <div class="my-label text-white bg-primary" @click="deleteLilit(cell.row.local_id)">
            Delete
          </div>
        </template>

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
          <q-btn color="primary" @click="$router.push('/lilit/' + selection.rows[0].data.local_id)">
            <i>edit</i>
          </q-btn>
          <q-btn color="primary" @click="deleteLilit(selection.rows[0].data.local_id)">
            <i>delete</i>
          </q-btn>
        </div>
      </q-data-table>
    </div>

    <div v-if="$route.params.id === '3'" style="width: 90vw">
      <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.push('/ihtp/')">Tambah</q-btn>
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
          <q-btn color="primary" @click="$router.push('/ihtp/' + selection.rows[0].data.local_id)">
            <i>edit</i>
          </q-btn>
          <q-btn color="primary" @click="deleteIHtp(selection.rows[0].data.local_id)">
            <i>delete</i>
          </q-btn>
        </div>

        <template slot="col-id" slot-scope="cell">
          <div class="my-label text-white bg-primary" @click="$router.push('/ihtp/' + cell.row.local_id)">
            Edit
          </div>
          <div class="my-label text-white bg-primary" @click="deleteIHtp(cell.row.local_id)">
            Delete
          </div>
        </template>
      </q-data-table>
    </div>

    <div v-if="$route.params.id === '4'" style="width: 90vw">
      <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.push('/phtp/')">Tambah</q-btn>
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
          <q-btn color="primary" @click="$router.push('/phtp/' + selection.rows[0].data.local_id)">
            <i>edit</i>
          </q-btn>
          <q-btn color="primary" @click="deletePHtp(selection.rows[0].data.local_id)">
            <i>delete</i>
          </q-btn>
        </div>

        <template slot="col-id" slot-scope="cell">
          <div class="my-label text-white bg-primary" @click="$router.push('/phtp/' + cell.row.local_id)">
            Edit
          </div>
          <div class="my-label text-white bg-primary" @click="deletePHtp(cell.row.local_id)">
            Delete
          </div>
        </template>
      </q-data-table>
    </div>

    <div v-if="$route.params.id === '5'" style="width: 90vw">
      <q-btn color="primary" class="full-width" icon="playlist add" @click="$router.push('/sensus/')">Tambah</q-btn>
      <q-data-table
        :data="getNewSensus"
        :config="config3"
        :columns="columnsSensus"
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
          <q-btn color="primary" @click="$router.push('/sensus/' + selection.rows[0].data.local_id)">
            <i>edit</i>
          </q-btn>
          <q-btn color="primary" @click="deleteSensus(selection.rows[0].data.local_id)">
            <i>delete</i>
          </q-btn>
        </div>

        <template slot="col-id" slot-scope="cell">
          <div class="my-label text-white bg-primary" @click="$router.push('/sensus/' + cell.row.local_id)">
            Edit
          </div>
          <div class="my-label text-white bg-primary" @click="deleteSensus(cell.row.local_id)">
            Delete
          </div>
        </template>
      </q-data-table>
    </div>
  </q-layout>
</template>

<script>
import { QLayout, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QCollapsible, QDataTable, GoBack, QCard, QCardMedia, QItem, QItemSide, QItemTile, QItemMain, QCardSeparator, QGallery } from 'quasar'
import { mapGetters, mapState } from 'vuex'
import moment from 'moment'
import MyCarousel from 'src/MyCarousel'

export default {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QCollapsible,
    QDataTable,
    QCard,
    QCardMedia,
    QItem,
    QItemSide,
    QItemTile,
    QItemMain,
    QCardSeparator,
    QGallery,
    MyCarousel
  },
  directives: {
    GoBack
  },
  data () {
    return {
      baseUrl: '',
      config: {
        rowHeight: '40px',
        responsive: false,
        // selection: 'single',
        pagination: {
          rowsPerPage: 7
        }
        // selection: 'single'
      },
      config3: {
        rowHeight: '40px',
        responsive: false,
        // selection: 'single',
        pagination: {
          rowsPerPage: 7
        }
        // selection: 'single'
      },
      config2: {
        rowHeight: '40px',
        responsive: true,
        // selection: 'single',
        pagination: {
          rowsPerPage: 7
        }
        // selection: 'single'
      },
      columns: [
        {
          label: 'Action',
          field: 'id',
          filter: true,
          sort: false,
          type: 'string',
          width: '150px'
        },
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
          label: 'Action',
          field: 'id',
          filter: true,
          sort: false,
          type: 'string',
          width: '150px'
        },
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
          label: 'Action',
          field: 'id',
          filter: true,
          sort: false,
          type: 'string',
          width: '150px'
        },
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
        },
        {
          label: 'HPT',
          field: 'pestId',
          filter: true,
          sort: true,
          type: 'string',
          width: '250px',
          format: (value, row) => {
            let pest = this.pests.find((row) => row.id === value)
            if (pest) {
              return pest.name
            }
            else {
              return ''
            }
          }
        }
      ],
      columnsPHtps: [
        {
          label: 'Action',
          field: 'id',
          filter: true,
          sort: false,
          type: 'string',
          width: '150px'
        },
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
        },
        {
          label: 'Material',
          field: 'materialQuantity',
          filter: true,
          sort: true,
          type: 'string',
          width: '250px',
          format (value, row) {
            return `${row.materialQuantity} ${row.materialUnit} ${row.materialType}`
          }
        },
        {
          label: 'HPT',
          field: 'pestId',
          filter: true,
          sort: true,
          type: 'string',
          width: '250px',
          format: (value, row) => {
            let pest = this.pests.find((row) => row.id === value)
            if (pest) {
              return pest.name
            }
            else {
              return ''
            }
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
    ]),
    ...mapState(['tree', 'treeimages', 'pests'])
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
    },
    deleteImageTree (id) {
      this.$store.dispatch('deleteTreeImage', id)
    },
    async tambahGambar () {
      if (navigator && navigator.camera) {
        navigator.camera.getPicture(async (imageUrl) => {
          await this.$db.treeimages.add({
            width: 400,
            height: 400,
            extension: 'jpg',
            base64: 'data:image/jpeg;base64,' + imageUrl,
            treeId: this.tree.id,
            flag: 2
          })
          this.$store.dispatch('reloadtreeimage')
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
        await this.$db.treeimages.add({
          width: 400,
          height: 400,
          extension: 'jpg',
          base64: this.baseUrl,
          treeId: this.tree.id,
          flag: 2
        })
        this.$store.dispatch('reloadtreeimage')
      }
    }
  }
}
</script>

<style lang="stylus">
  .q-btn
    margin 5px
  .responsive
    .setnowrap
      white-space pre-line !important
  .audit-card
    width 90vw
    margin 0
  .parent-galery-audit
    display flex
    flex-direction row
    flex-wrap wrap
    .q-icon
      font-size 18px !important
    .setengah-width
      position: relative;
      padding-top: 10px;
    button
      position: absolute
      right: -10px
      top: 0px
      width: 30px !important
      height: 30px !important
    .galery-audit
      flex-basis 50%
      padding-right 10px
      img
        width 100%
        border-radius 3px
</style>
