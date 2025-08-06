<template>
  <v-container>
    <button-back/>
    <v-row>
      <v-col cols="12" md="12">
        <edit-equipment-from
            :add-mode="addMode"
            :id-equipment="idEquipment"
            @add="addEquipment"
            @update="updateEquipment"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


import ButtonBack from "@/components/UI/ButtonBack.vue";
import EditEquipmentFrom from "@/components/Forms/EditEquipmentFrom.vue";
import EquipmentService from "@/store/equipment.service.js";

export default {
  name: "EditEquipmentPage",
  components: {EditEquipmentFrom, ButtonBack, },
  data(){
    return{
      idEquipment: this.$route.params.uuid_equip,
      addMode: (this.$route.params.uuid_equip === undefined),
    }
  },
  methods:{
    addEquipment(obj){
      EquipmentService.addEquipment(this.idObject, obj)
          .then(() => {
            this.$router.go(-1)
          })
    },
    updateEquipment(obj, uuid){
      EquipmentService.updateEquipment(uuid, obj)
          .then(()=>{
            this.$router.go(-1)
          })
    }
  }
}
</script>

<style scoped>

</style>