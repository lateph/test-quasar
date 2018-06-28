<template>
  <div class="layout-padding docs-btn row justify-center my-home">
    <div class="col-12">
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4" style="text-align:center;">
          <q-btn color="primary"  icon="autorenew" @click="sync()" round big></q-btn>
          </div>
        <div class="col-4"></div>
      </div>
      <div class="row">
        <div class="col-12" style="text-align:center;">
          <h6>Sinkronisasi data Umum</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4" style="text-align:center;"><q-btn color="primary"  icon="file download" @click="openModalS2()" round big></q-btn>  </div>
        <div class="col-4"></div>
      </div>
      <div class="row">
        <div class="col-12" style="text-align:center;">
          <h6>Sinkronisasi data spesifik</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4" style="text-align:center;"><q-btn color="primary"  icon="file upload" @click="upload()" round big></q-btn></div>
        <div class="col-4"></div>
      </div>
      <div class="row">
        <div class="col-12" style="text-align:center;">
          <h6>Upload Data</h6>
        </div>
      </div>
      <div class="row">
        <div class="col-12" style="text-align:center;">
          <img src="~assets/icon.png" width="265px" alt="">
        </div>
      </div>
    </div>
    
    <!-- Sinkronisasi data Umum -->
    <!-- Sinkronisasi data spesifik -->
    <!-- Upload Data -->
    
      
    

    <q-modal ref="selectBlokModal" minimized :content-css="{padding: '20px'}" no-esc-dismiss>
      <q-select
        filter
        color="secondary"
        float-label="Company"
        v-model="pt"
        :disable="ptDisabled"
        :options="listPt"
      />

      <q-select
        filter
        color="secondary"
        float-label="Estate"
        v-model="kebun"
        :disable="kebunDisabled"
        :options="listKebun"
      />

      <q-select
        filter
        color="secondary"
        float-label="Division"
        v-model="afdeling"
        :disable="afdelingDisabled"        
        :options="listAfdeling"
      />

      <q-select
        filter
        color="secondary"
        float-label="Block"
        v-model="blok"
        :disable="blokDisabled" 
        :options="listBlok"
      />
      <div class="modal-button-blok row">
        <q-btn color="red" @click="$refs.selectBlokModal.close()">Cancel</q-btn>
        <q-btn color="primary" @click="sync2()" :disabled="blok === ''">Next</q-btn>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { QBtn, QIcon, Toast, Dialog, QModal, QSelect, Loading, LocalStorage } from 'quasar'
var querystring = require('querystring')

export default {
  components: {
    QBtn,
    QIcon,
    QModal,
    QSelect
  },
  data () {
    return {
      canGoBack: window.history.length > 1,
      pt: '',
      kebun: '',
      blok: '',
      afdeling: '',
      ptDisabled: '',
      kebunDisabled: '',
      blokDisabled: '',
      afdelingDisabled: '',
      username: 'nizar.mahroussy@gmail.com',
      password: 'indonesia',
      listPt: [],
      listKebun: [],
      listAfdeling: [],
      listBlok: []
    }
  },
  watch: {
    pt: function (val) {
      this.loadKebun()
    },
    kebun: function (val) {
      this.loadAfdeling()
    },
    afdeling: function (val) {
      this.loadBlok()
    }
  },
  mounted () {
    this.loadPt()
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    loadPt () {
      this.pt = ''
      this.listPt = []
      this.$db.pts.each(pt => {
        this.listPt.push({ label: pt.name, value: pt.code })
      })
    },
    loadKebun () {
      this.kebun = ''
      this.listKebun = []
      this.$db.kebuns.where('parent').equals(this.pt).each(kebun => {
        this.listKebun.push({ label: kebun.name, value: kebun.code })
      })
    },
    loadAfdeling () {
      this.afdeling = ''
      this.listAfdeling = []
      this.$db.afdelings.where('parent').equals(this.kebun).each(afdeling => {
        this.listAfdeling.push({ label: afdeling.name, value: afdeling.code })
      })
    },
    loadBlok () {
      this.blok = ''
      this.listBlok = []
      this.$db.bloks.where('parent').equals(this.afdeling).each(blok => {
        this.listBlok.push({ label: blok.name, value: blok.code })
      })
    },
    async openModalS2 () {
      const data1 = await this.$store.dispatch('getUploadDataLilit')
      const data2 = await this.$store.dispatch('getUploadDataIHtp')
      const data3 = await this.$store.dispatch('getUploadDataPHtp')
      const data4 = await this.$store.dispatch('getUploadDataSensus')
      const data6 = (await this.$db.treeimages.where({flag: 2}).count()) + (await this.$db.treeimages.where({flag: 4}).count())

      if (Object.keys(data1).length > 0 || Object.keys(data2).length > 0 || Object.keys(data3).length > 0 || Object.keys(data4).length > 0 || data6 > 0) {
        Toast.create['negative']({
          html: 'You have new data please upload data to server first'
        })
      }
      else {
        console.log('asd')
        this.login(3)
      }
    },
    async sync () {
      let progress = {
        model: 0
      }
      const dialog = Dialog.create({
        title: 'Progress',
        message: 'Sync...',
        nobuttons: true,
        noBackdropDismiss: true,
        noEscDismiss: true,
        progress
      })
      try {
        // table conditions
        let data = await this.$http.post('sync')
        const conditions = data.data.data.conditions
        this.$db.conditions.clear()
        await this.$db.conditions.bulkAdd(conditions)
        progress.model = 20

        // table conditions
        const pests = data.data.data.pests
        this.$db.pests.clear()
        await this.$db.pests.bulkAdd(pests)
        progress.model = 25
        // table PT
        // let data = await this.$http.post('sync')
        const pts = data.data.data.organizations.PT
        this.$db.pts.clear()
        await this.$db.pts.bulkAdd(pts)
        progress.model = 40
        // table KEBUN
        // let data = await this.$http.post('sync')
        const kebuns = data.data.data.organizations.KEBUN
        this.$db.kebuns.clear()
        await this.$db.kebuns.bulkAdd(kebuns)
        progress.model = 60
        // table BLOK
        // let data = await this.$http.post('sync')
        const bloks = data.data.data.organizations.BLOK
        this.$db.bloks.clear()
        await this.$db.bloks.bulkAdd(bloks)
        progress.model = 80
        // table AFDELING
        // let data = await this.$http.post('sync')
        const afdelings = data.data.data.organizations.AFDELING
        this.$db.afdelings.clear()
        await this.$db.afdelings.bulkAdd(afdelings)
        progress.model = 100
        dialog.close()
        this.loadPt()

        Toast.create['positive']({
          html: 'Sinkornisasi data umum sukses'
        })
      }
      catch (error) {
        console.log(error)
        Toast.create['negative']({
          html: 'Sinkornisasi data gagal mohon cek storage / koneksi anda'
        })
      }
    },
    async sync2 () {
      this.$refs.selectBlokModal.close()
      Loading.show({message: 'Sinkornisasi data umum ... '})
      try {
        if (this.block === null) {
          throw new Error('Pilih Blok')
        }

        let responseSchedule = await this.$http.post('fetch/schedule/block/' + this.blok)
        Loading.show({message: 'Sinkornisasi data schedule ... '})
        this.$db.schedules.clear()
        await this.$db.schedules.bulkAdd(responseSchedule.data.data)

        if (window.cordova && responseSchedule.data.data.length > 0) {
          cordova.plugins.notification.local.cancelAll(() => {
            cordova.plugins.notification.local.schedule(responseSchedule.data.data.map(row => {
              var now = new Date(row.startDate).getTime()
              return {
                id: row.id,
                text: row.activity,
                trigger: { at: new Date(now + 7 * 60 * 60 * 1000) }
              }
            }))
          }, this)
        }

        let response = await this.$http.post('fetch/tree/block/' + this.blok)
        this.$db.trees.clear()
        await this.$db.trees.bulkAdd(response.data.data.trees)
        Loading.show({message: 'Sinkornisasi data lilit ... '})
        const lilits = await this.$http.post('fetch/tree-girth/block/' + this.blok)
        this.$db.lilits.clear()
        await this.$db.lilits.bulkAdd(lilits.data.data.treeGirths.map(x => {
          return {
            id: x.id,
            pohon_id: x.treeId,
            lilit_batang: x.value,
            checked_at: x.checkedAt,
            flag: 1
          }
        }))

        Loading.show({message: 'Sinkornisasi gambar pohon ... '})
        const treeimages = await this.$http.post('fetch/tree-image/block/' + this.blok)
        this.$db.treeimages.clear()
        await this.$db.treeimages.bulkAdd(treeimages.data.data.treeImages.map(x => {
          return {
            id: x.id,
            treeId: x.treeId,
            imageUrl: x.imageUrl,
            flag: 1
          }
        }))
        let downloadtreeimagetotal = treeimages.data.data.treeImages.length
        let countdownloadimagetreetoal = 0
        for (let file in treeimages.data.data.treeImages) {
          Loading.show({message: `Downloading Image ... ${countdownloadimagetreetoal} / ${downloadtreeimagetotal}`})
          let url = treeimages.data.data.treeImages[file].imageUrl
          let rfile = await this.$db.fileimages.where({imageUrl: url}).first()
          if (rfile === undefined) {
            let datadownloadimg = await this.$http.get(`${this.$http.defaults.baseURL}${url}`, { responseType: 'arraybuffer' })
            let image = btoa(
              new Uint8Array(datadownloadimg.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
            let base64data = `data:${datadownloadimg.headers['content-type'].toLowerCase()};base64,${image}`
            this.$db.fileimages.add({
              imageUrl: url,
              base64: base64data
            })
          }
          countdownloadimagetreetoal++
        }

        Loading.show({message: 'Sinkornisasi data sensus ... '})
        const sensuss = await this.$http.post('fetch/tree-census/block/' + this.blok)
        this.$db.sensuss.clear()
        await this.$db.sensuss.bulkAdd(sensuss.data.data.treeCensuses.map(x => {
          return {
            id: x.id,
            pohon_id: x.treeId,
            kondisi_id: x.conditionId,
            checked_at: x.checkedAt,
            flag: 1
          }
        }))
        Loading.show({message: 'Sinkornisasi data identifikasi htp ... '})
        const ihtps = await this.$http.post('fetch/tree-pest-identification/block/' + this.blok)
        this.$db.ihtps.clear()
        await this.$db.ihtps.bulkAdd(ihtps.data.data.treePestIdentifications.map(x => {
          return {
            id: x.id,
            pohon_id: x.treeId,
            pestId: x.pestId,
            keterangan: x.description,
            checked_at: x.checkedAt,
            flag: 1
          }
        }))
        Loading.show({message: 'Sinkornisasi data pengendalian htp ... '})
        const phtps = await this.$http.post('fetch/tree-pest-control/block/' + this.blok)
        this.$db.phtps.clear()
        await this.$db.phtps.bulkAdd(phtps.data.data.treePestControls.map(x => {
          return {
            id: x.id,
            pohon_id: x.treeId,
            keterangan: x.description,
            materialType: x.materialType,
            materialQuantity: x.materialQuantity,
            materialUnit: x.materialUnit,
            pestId: x.pestId,
            checked_at: x.checkedAt,
            flag: 1
          }
        }))
        LocalStorage.set('blok', this.blok)

        Loading.show({message: 'Sinkornisasi data Identification Image ... '})
        const ihtpimages = await this.$http.post('fetch/tree-pest-image/block/' + this.blok)
        this.$db.ihtpimages.clear()
        await this.$db.ihtpimages.bulkAdd(ihtpimages.data.data.treePestImages.map(x => {
          return {
            id: x.id,
            treePestIdentificationId: x.treePestIdentificationId,
            pestId: x.pestId,
            imageUrl: x.imageUrl,
            flag: 1
          }
        }))
        let downloadpesttotal = ihtpimages.data.data.treePestImages.length
        let countdownloadpesttoal = 0
        for (let file in ihtpimages.data.data.treePestImages) {
          Loading.show({message: `Downloading Image ... ${countdownloadpesttoal} / ${downloadpesttotal}`})
          let url = ihtpimages.data.data.treePestImages[file].imageUrl
          let rfile = await this.$db.fileimages.where({imageUrl: url}).first()
          if (rfile === undefined) {
            let datadownloadimg = await this.$http.get(`${this.$http.defaults.baseURL}${url}`, { responseType: 'arraybuffer' })
            let image = btoa(
              new Uint8Array(datadownloadimg.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
            let base64data = `data:${datadownloadimg.headers['content-type'].toLowerCase()};base64,${image}`
            this.$db.fileimages.add({
              imageUrl: url,
              base64: base64data
            })
          }
          countdownloadpesttoal++
        }

        // this.$refs.selectBlokModal.close()
        Toast.create['positive']({
          html: 'Sinkornisasi data spesifik sukses'
        })

        Loading.hide()
      }
      catch (error) {
        Loading.hide()
        if (error.response && error.response.status === 403) {
          this.login()
        }
        else {
          this.$refs.selectBlokModal.open()
          Toast.create['negative']({
            html: error.message
          })
        }
      }
    },
    async upload () {
      try {
        Loading.show({message: 'Uploading data lilit pohon'})
        const dataLilit = await this.$store.dispatch('getUploadDataLilit')
        await this.$http.post('maintain/tree-girth', querystring.stringify(dataLilit), {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        Loading.show({message: 'Sinkornisasi data lilit ... '})
        let blok = LocalStorage.get.item('blok')
        const lilits = await this.$http.post(`fetch/tree-girth/block/${blok}`)
        this.$db.lilits.clear()
        await this.$db.lilits.bulkAdd(lilits.data.data.treeGirths.map(x => {
          return {
            id: x.id,
            pohon_id: x.treeId,
            lilit_batang: x.value,
            checked_at: x.checkedAt,
            flag: 1
          }
        }))

        Loading.show({message: 'Uploading data sensus pohon'})
        const dataSensus = await this.$store.dispatch('getUploadDataSensus')
        await this.$http.post('maintain/tree-census', querystring.stringify(dataSensus), {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        Loading.show({message: 'Sinkornisasi data Sensus ... '})
        const sensuss = await this.$http.post(`fetch/tree-census/block/${blok}`)
        this.$db.sensuss.clear()
        await this.$db.sensuss.bulkAdd(sensuss.data.data.treeCensuses.map(x => {
          return {
            id: x.id,
            pohon_id: x.treeId,
            kondisi_id: x.conditionId,
            checked_at: x.checkedAt,
            flag: 1
          }
        }))

        Loading.show({message: `Sinkornisasi gambar htp`})
        let ihtpsupdate = await this.$db.ihtps.where({flag: 3}).toArray()
        for (let ihtpsxxx of ihtpsupdate) {
          let arToDelete = await this.$db.newihtpimages.where({'treePestIdentificationId': parseInt(ihtpsxxx.local_id)}).toArray()
          for (let row of arToDelete) {
            await this.$http.post('maintain/tree-pest-image', querystring.stringify({
              'pestImage[width]': row.width,
              'pestImage[height]': row.height,
              'pestImage[extension]': row.extension,
              'pestImage[binaryData]': row.base64,
              'pestImage[pestId]': row.pestId,
              'pestImage[treePestIdentificationId]': ihtpsxxx.id
            }), {
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            })

            await this.$db.newihtpimages.where('local_id').equals(row.local_id).delete()
          }
        }

        Loading.show({message: 'Uploading data identifikasi htp'})
        const dataihtps = await this.$store.dispatch('getUploadDataIHtp')
        let dataIdentificatoin = await this.$http.post('maintain/tree-pest-identification', querystring.stringify(dataihtps), {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        Loading.show({message: 'Sinkornisasi data  ... '})
        const ihtps = await this.$http.post('fetch/tree-pest-identification/block/' + blok)
        this.$db.ihtps.clear()
        await this.$db.ihtps.bulkAdd(ihtps.data.data.treePestIdentifications.map(x => {
          return {
            id: x.id,
            pohon_id: x.treeId,
            pestId: x.pestId,
            keterangan: x.description,
            checked_at: x.checkedAt,
            flag: 1
          }
        }))

        let totalImage = await this.$db.newihtpimages.count()
        console.log('total new image ', totalImage)
        Loading.show({message: 'Sinkornisasi gambar htp  ... '})
        let insertNewImagePest = dataIdentificatoin.data.data.insert
        let countImageHtp = 0
        if (insertNewImagePest) {
          for (var prop in insertNewImagePest) {
            let id = insertNewImagePest[prop].id
            await this.$db.ihtps.update(`${id}`, {flag: 3})
            let newihtp = await this.$db.ihtps.where({id: `${id}`}).first()
            await this.$db.newihtpimages.where({'treePestIdentificationId': parseInt(prop)}).modify({'treePestIdentificationId': parseInt(newihtp.local_id)})
          }
          for (var propx in insertNewImagePest) {
            let id = insertNewImagePest[propx].id
            let newihtp = await this.$db.ihtps.where({id: `${id}`}).first()
            let arToDelete = await this.$db.newihtpimages.where({'treePestIdentificationId': parseInt(newihtp.local_id)}).toArray()
            for (let row of arToDelete) {
              await this.$http.post('maintain/tree-pest-image', querystring.stringify({
                'pestImage[width]': row.width,
                'pestImage[height]': row.height,
                'pestImage[extension]': row.extension,
                'pestImage[binaryData]': row.base64,
                'pestImage[pestId]': row.pestId,
                'pestImage[treePestIdentificationId]': id
              }), {
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                }
              })

              await this.$db.newihtpimages.where('local_id').equals(row.local_id).delete()
              countImageHtp++
              Loading.show({message: `Sinkornisasi gambar htp  ${countImageHtp} / ${totalImage}... `})
            }
            await this.$db.ihtps.update(`${id}`, {flag: 1})
          }
        }
        insertNewImagePest = null

        let deleteimagepests = await this.$db.ihtpimages.where({flag: 4}).toArray()
        for (let row of deleteimagepests) {
          await this.$http.post('maintain/tree-pest-image-delete', querystring.stringify({
            'deletedTreePestImageId[]': row.id
          }), {
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          })
        }

        Loading.show({message: 'Sinkornisasi data Identification Image ... '})
        const ihtpimages = await this.$http.post('fetch/tree-pest-image/block/' + blok)
        this.$db.ihtpimages.clear()
        await this.$db.ihtpimages.bulkAdd(ihtpimages.data.data.treePestImages.map(x => {
          return {
            id: x.id,
            treePestIdentificationId: x.treePestIdentificationId,
            pestId: x.pestId,
            imageUrl: x.imageUrl,
            flag: 1
          }
        }))
        let downloadpesttotal = ihtpimages.data.data.treePestImages.length
        let countdownloadpesttoal = 0
        for (let file in ihtpimages.data.data.treePestImages) {
          Loading.show({message: `Downloading Image ... ${countdownloadpesttoal} / ${downloadpesttotal}`})
          let url = ihtpimages.data.data.treePestImages[file].imageUrl
          let rfile = await this.$db.fileimages.where({imageUrl: url}).first()
          if (rfile === undefined) {
            let datadownloadimg = await this.$http.get(`${this.$http.defaults.baseURL}${url}`, { responseType: 'arraybuffer' })
            let image = btoa(
              new Uint8Array(datadownloadimg.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
            let base64data = `data:${datadownloadimg.headers['content-type'].toLowerCase()};base64,${image}`
            this.$db.fileimages.add({
              imageUrl: url,
              base64: base64data
            })
          }
        }

        Loading.show({message: 'Uploading data pengendalian htp'})
        const dataphtps = await this.$store.dispatch('getUploadDataPHtp')
        await this.$http.post('maintain/tree-pest-control', querystring.stringify(dataphtps), {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        })
        Loading.show({message: 'Sinkornisasi data  ... '})
        const phtps = await this.$http.post('fetch/tree-pest-control/block/' + blok)
        this.$db.phtps.clear()
        await this.$db.phtps.bulkAdd(phtps.data.data.treePestControls.map(x => {
          return {
            id: x.id,
            pohon_id: x.treeId,
            keterangan: x.description,
            materialType: x.materialType,
            materialQuantity: x.materialQuantity,
            materialUnit: x.materialUnit,
            pestId: x.pestId,
            checked_at: x.checkedAt,
            flag: 1
          }
        }))

        let totalImagetree = await this.$db.treeimages.where({flag: 2}).count()
        Loading.show({message: 'Sinkornisasi gambar htp  ... '})
        let countImagetree = 0
        let imagestreeupload = await this.$db.treeimages.where({flag: 2}).toArray()
        for (let row of imagestreeupload) {
          await this.$http.post('maintain/tree-image', querystring.stringify({
            'treeImage[width]': row.width,
            'treeImage[height]': row.height,
            'treeImage[extension]': row.extension,
            'treeImage[binaryData]': row.base64,
            'treeImage[treeId]': row.treeId
          }), {
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          })

          await this.$db.treeimages.where('local_id').equals(row.local_id).delete()
          countImagetree++
          Loading.show({message: `Sinkornisasi gambar pohon  ${countImagetree} / ${totalImagetree}... `})
        }

        insertNewImagePest = null

        let deleteimagetree = await this.$db.treeimages.where({flag: 4}).toArray()
        for (let row of deleteimagetree) {
          await this.$http.post('maintain/tree-image-delete', querystring.stringify({
            'deletedTreeImageId[]': row.id
          }), {
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          })
        }

        Loading.show({message: 'Sinkornisasi gambar pohon ... '})
        const treeimages = await this.$http.post('fetch/tree-image/block/' + blok)
        this.$db.treeimages.clear()
        await this.$db.treeimages.bulkAdd(treeimages.data.data.treeImages.map(x => {
          return {
            id: x.id,
            treeId: x.treeId,
            imageUrl: x.imageUrl,
            flag: 1
          }
        }))
        let downloadtreeimagetotal = treeimages.data.data.treeImages.length
        let countdownloadimagetreetoal = 0
        for (let file in treeimages.data.data.treeImages) {
          Loading.show({message: `Downloading Image ... ${countdownloadimagetreetoal} / ${downloadtreeimagetotal}`})
          let url = treeimages.data.data.treeImages[file].imageUrl
          let rfile = await this.$db.fileimages.where({imageUrl: url}).first()
          if (rfile === undefined) {
            let datadownloadimg = await this.$http.get(`${this.$http.defaults.baseURL}${url}`, { responseType: 'arraybuffer' })
            let image = btoa(
              new Uint8Array(datadownloadimg.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
            let base64data = `data:${datadownloadimg.headers['content-type'].toLowerCase()};base64,${image}`
            this.$db.fileimages.add({
              imageUrl: url,
              base64: base64data
            })
          }
          countdownloadimagetreetoal++
        }

        Loading.hide()
        Toast.create['positive']({
          html: 'upload data umum sukses'
        })
      }
      catch (error) {
        Loading.hide()
        if (error.response && error.response.status === 403) {
          this.login(2)
        }
        else {
          Toast.create['negative']({
            html: error.message
          })
        }
      }
    },
    login (type) {
      const dLogin = Dialog.create({
        title: 'Login',
        form: {
          username: {
            type: 'text',
            label: 'Username',
            model: this.username
          },
          password: {
            type: 'password',
            label: 'Password',
            model: this.password
          }
        },
        buttons: [
          'Cancel',
          {
            label: 'Ok',
            handler: (data) => {
              Loading.show()
              this.username = data.username
              this.password = data.password
              this.$http.post('login', querystring.stringify({
                'User[username]': this.username,
                'User[password]': this.password
              }), {
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                }
              })
                .then(response => {
                  LocalStorage.set('user', response.data.data)
                  Toast.create['positive']({
                    html: 'Login sukses'
                  })
                  dLogin.close()
                  Loading.hide()
                  if (type === 2) {
                    this.upload()
                  }
                  else if (type === 3) {
                    Loading.show()
                    this.pt = response.data.data.companyCode ? response.data.data.companyCode : ''
                    this.ptDisabled = this.pt !== ''
                    const timeout = setTimeout(() => {
                      clearInterval(timeout)
                      this.kebun = response.data.data.estateCode ? response.data.data.estateCode : ''
                      this.kebunDisabled = this.kebun !== ''
                    }, 1000)
                    const timeout2 = setTimeout(() => {
                      clearInterval(timeout2)
                      this.afdeling = response.data.data.divisionCode ? response.data.data.divisionCode : ''
                      this.afdelingDisabled = this.afdeling !== ''
                    }, 2000)
                    const timeout3 = setTimeout(() => {
                      Loading.hide()
                      clearInterval(timeout3)
                      this.blok = response.data.data.blockCode ? response.data.data.blockCode : ''
                      this.blokDisabled = this.blok !== ''
                      this.$refs.selectBlokModal.open()
                    }, 3000)
                  }
                  else {
                    this.sync2()
                  }
                })
                .catch(error => {
                  Loading.hide()
                  console.log(error)
                })
            }
          }
        ]
      })
    },
    async logout () {
      var mydate = new Date('2014-04-03')
      console.log(mydate.toDateString())
      this.pt = 'AAS'
      const timeout = setTimeout(() => {
        clearInterval(timeout)
        this.kebun = 'GAAS'
      }, 1000)
      const timeout2 = setTimeout(() => {
        clearInterval(timeout2)
        this.afdeling = 'GAAS02'
      }, 2000)
      const timeout3 = setTimeout(() => {
        clearInterval(timeout3)
        this.blok = 'GAAS02F01'
      }, 3000)
    }
  }
}
</script>

<style lang="stylus">
  .my-home
    .q-btn
      margin 5px
  .modal-button-blok
    justify-content flex-end
    button
      margin-left 10px
</style>
