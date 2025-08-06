<script>
import DeviceService from "@/store/device.service.js";
import EditUserForm from "@/components/Forms/EditUserForm.vue";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import EditDeviceForm from "@/components/Forms/Main/EditDeviceForm.vue";

export default {
  name: "EditDevicePage",
  components: {EditDeviceForm, ButtonBack, EditUserForm},
  data(){
    return{
      idDevice: this.$route.params.id,
      addMode: (this.$route.params.id === undefined),
    }
  },
  methods:{
    add(data){
      DeviceService.add(data)
          .then(() => {
            this.$router.push(`/admin/device/`)
          })
    },
    update(data){
      DeviceService.update(this.idDevice, data)
          .then(() => {
            this.$router.push(`/admin/device/`)
          })
    }
  }
}
</script>

<template>
  <v-container>
    <button-back/>
    <v-row>
      <v-col cols="12" md="12">
        <edit-device-form
            :add-mode="addMode"
            :id-device="idDevice"
            @add="add"
            @update="update"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>