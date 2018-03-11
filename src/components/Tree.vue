<template>
  <q-layout ref="layout" view="hHr LpR lFf" class="layout-padding docs-input row justify-center">
    <q-data-table
      :data="table"
      :config="config"
      :columns="columns"
      @refresh="refresh"
      @selection="selection"
      style="width: 90vw"
    >
      <template slot="col-message" slot-scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
      </template>
      <template slot="col-plantedAt" slot-scope="cell">
        <div class="my-label text-white bg-primary" @click="move(cell)">
          Audit
        </div>
      </template>

      <template slot="selection" slot-scope="props">
        <q-btn flat color="primary" @click="changeMessage(props)">
          <q-icon name="edit" />
        </q-btn>
        <q-btn flat color="primary" @click="deleteRow(props)">
          <q-icon name="delete" />
        </q-btn>
      </template>
    </q-data-table>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QDataTable,
  QField,
  QInput,
  QCheckbox,
  QSelect,
  QSlider,
  QBtn,
  QIcon,
  QTooltip,
  QCollapsible,
  clone,
  Toast
} from 'quasar'
export default {
  components: {
    QLayout,
    QDataTable,
    QField,
    QInput,
    QCheckbox,
    QSelect,
    QSlider,
    QBtn,
    QIcon,
    QTooltip,
    QCollapsible
  },
  methods: {
    changeMessage (props) {
      props.rows.forEach(row => {
        row.data.message = 'Gogu'
      })
    },
    deleteRow (props) {
      props.rows.forEach(row => {
        this.table.splice(row.index, 1)
      })
    },
    refresh (done) {
      this.timeout = setTimeout(() => {
        done()
      }, 5000)
    },
    selection (number, rows) {
      console.log(`selected ${number}: ${rows}`)
    },
    // rowClick (row) {
    //   console.log('clicked on a row', row)
    // },
    move (cell) {
      this.$store.dispatch('loadTree', cell.row.code).then(() => {
        this.$router.push('/audit/' + this.$route.params.id)
      }).catch(() => {
        Toast.create['negative']({
          html: `Data Pohon untuk barcode : ${cell.row.code} tidak ditemukan`
        })
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  data () {
    return {
      table: [],
      config: {
        title: 'Data Table',
        refresh: true,
        noHeader: false,
        columnPicker: true,
        leftStickyColumns: 1,
        rightStickyColumns: 0,
        bodyStyle: {
          maxHeight: 'auto'
        },
        rowHeight: '50px',
        responsive: true,
        pagination: {
          rowsPerPage: 5,
          options: [5, 10, 15, 30, 50, 500]
        },
        selection: false
      },
      columns: [
        {
          label: '-',
          field: 'plantedAt',
          filter: true,
          sort: false,
          type: 'string',
          width: '70px'
        },
        {
          label: 'Code',
          field: 'code',
          filter: true,
          sort: true,
          type: 'string',
          width: '200px'
        },
        {
          label: 'Company',
          field: 'companyName',
          filter: true,
          sort: true,
          type: 'string',
          width: '250px'
        },
        {
          label: 'Estate',
          field: 'estateName',
          filter: true,
          sort: true,
          type: 'string',
          width: '250px'
        },
        {
          label: 'Divisi',
          field: 'divisionName',
          filter: true,
          sort: true,
          type: 'string',
          width: '250px'
        },
        {
          label: 'Blok',
          field: 'blockName',
          filter: true,
          sort: true,
          type: 'string',
          width: '250px'
        },
        {
          label: 'Number',
          field: 'number',
          filter: true,
          sort: true,
          type: 'number',
          width: '120px'
        }
      ],
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'maxHeight',
      bodyHeight: 500
    }
  },
  watch: {
    pagination (value) {
      if (!value) {
        this.oldPagination = clone(this.config.pagination)
        this.config.pagination = false
        return
      }
      this.config.pagination = this.oldPagination
    },
    rowHeight (value) {
      this.config.rowHeight = value + 'px'
    },
    bodyHeight (value) {
      let style = {}
      if (this.bodyHeightProp !== 'auto') {
        style[this.bodyHeightProp] = value + 'px'
      }
      this.config.bodyStyle = style
    },
    bodyHeightProp (value) {
      let style = {}
      if (value !== 'auto') {
        style[value] = this.bodyHeight + 'px'
      }
      this.config.bodyStyle = style
    }
  },
  mounted: function () {
    this.$db.trees.toArray().then(rows => {
      this.table = rows
    })
  }
}
</script>

<style lang="stylus">
.my-label
  padding 5px
  border-radius 3px
  display inline-block
</style>