<script>
import DeleteButton from "@/components/UI/Buttons/DeleteButton.vue";
import EditTypeEquipmentBlueprintForm from "@/components/Forms/EnvForm/EditTypeEquipmentBlueprintForm.vue";
import EditTypeDeviceForm from "@/components/Forms/EnvForm/EditTypeDeviceForm.vue";
import EnvService from "@/store/env.service.js";

export default {
  name: "TypeDevice",
  components: {EditTypeDeviceForm, EditTypeEquipmentBlueprintForm, DeleteButton},
  data(){
    return{
      headers: [
        {title: 'Системное название', key: 'system_name', sortable: false},
        {title: 'Название', key: 'name', sortable: false},
        {title: 'Описание', key: 'description', sortable: false},
        {title: 'Действия', key: 'actions', sortable: false},
      ],
      data: []
    }
  },
  methods: {
    loadData(){
      EnvService.getTypeDevice().then(
          (data) => {
            this.data = data
          }
      )
    },
  },
  mounted() {
    this.loadData()
  }

}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <edit-type-device-form @add="loadData"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table-virtual
            :headers="headers"
            :items="data"
            hide-default-footer
        >
          <template v-slot:[`item.actions`]="{ item }">
            <delete-button @agree="deleteRegion(item.id)"/>
          </template>
        </v-data-table-virtual>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>