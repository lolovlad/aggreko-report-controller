<script>
import CustomUserTable from "@/components/Tabels/CustomUserTable.vue";
import UserTool from "@/components/UserTool.vue";
import FixedButton from "@/components/UI/FixedButton.vue";
import DeviceTable from "@/components/Tabels/DeviceTable.vue";
import {createRouter as $route} from "vue-router";
import ExportCsvForm from "@/components/Forms/ExportCsvForm.vue";
import DeviceService from "@/store/device.service.js";

export default {
  name: "ViewDevicePage",
  components: {ExportCsvForm, DeviceTable, FixedButton, UserTool, CustomUserTable},
  methods: {
    $route,
    update(id){
      this.$router.push(`/admin/device/edit/${id}`)
    },
    deleteDevice(id){
      DeviceTable.deleteDev(id)
          .then(()=>{
            this.$refs.deviceTable.loadItem({page: 1, itemsPerPage: 20})
          })
    },
    openAddDevicePage(){
      this.$refs.deviceTable.saveState()
      this.$router.push(`/admin/device/add`)
    },
    exportCsvFile(file){
      let form = new FormData()
      if (file !== null)
        form.append("file", file)
      DeviceService.exportFile(form).then(
          this.$refs.exportCsvForm.clearForm()
      )
    },
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <export-csv-form @export="exportCsvFile" ref="exportCsvForm"/>
      </v-col>
      <v-col cols="12" md="12">
        <DeviceTable
            ref="deviceTable"
            @delete="deleteDevice"
            @update="update"/>
      </v-col>
    </v-row>
   <fixed-button @click="openAddDevicePage"/>
  </v-container>
</template>

<style scoped>

</style>