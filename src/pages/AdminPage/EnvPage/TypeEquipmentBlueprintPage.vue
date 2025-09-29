<script>
import EditTypeBlueprintForm from "@/components/Forms/EnvForm/EditTypeBlueprintForm.vue";
import DeleteButton from "@/components/UI/Buttons/DeleteButton.vue";
import EnvService from "@/store/env.service.js";
import EditTypeEquipmentBlueprintForm from "@/components/Forms/EnvForm/EditTypeEquipmentBlueprintForm.vue";

export default {
  name: "TypeEquipmentBlueprintPage",
  components: {EditTypeEquipmentBlueprintForm, DeleteButton, EditTypeBlueprintForm},
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
      EnvService.getTypeEquipmentBlueprint().then(
          (data) => {
            this.data = data
          }
      )
    },
    deleteCastome(id){
      EnvService.deleteTypeEquipmentBlueprint(id).then(()  => {
        this.loadData()
      })
    }
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
        <edit-type-equipment-blueprint-form @addTypeEquipmentBlueprint="loadData"/>
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
            <delete-button @agree="deleteCastome(item.id)"/>
          </template>
        </v-data-table-virtual>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>