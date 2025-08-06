<template>
  <v-container>
    <button-back/>
    <v-row>
      <v-col cols="12" md="12">
        <equipment-table
            @update="updateEquipment"
            @delete="deleteEquipment"
            ref="equipmentTable"

        />
      </v-col>
    </v-row>
  </v-container>
  <fixed-button @click="openAddEquipPage"/>
</template>

<script>
import ButtonBack from "@/components/UI/ButtonBack.vue";
import EquipmentService from "@/store/equipment.service.js";
import EquipmentTable from "@/components/Tabels/EquipmentTable.vue";
import FixedButton from "@/components/UI/FixedButton.vue";
export default {
  name: "ViewEquipmentAdminPage",
  components: {FixedButton, EquipmentTable, ButtonBack},
  data(){
    return{
      dialogDelete: false
    }
  },
  methods:{
    updateEquipment(uuid){
      this.$router.push(`/admin/equipment/edit/${uuid}`)
    },
    deleteEquipment(uuid){
      EquipmentService.deleteEquipment(uuid)
          .then(()=>{
            this.$refs.equipmentTable.loadItem({page: 1, itemsPerPage: 20})
          })
    },
    openAddEquipPage(){
      this.$refs.equipmentTable.saveState()
      this.$router.push(`/admin/equipment/add`)
    }
  }
}
</script>

<style scoped>

</style>