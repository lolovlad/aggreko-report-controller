<script>
import DeleteButton from "@/components/UI/Buttons/DeleteButton.vue";
import EnvService from "@/store/env.service.js";
import EditTypeBlueprintForm from "@/components/Forms/EnvForm/EditTypeBlueprintForm.vue";

export default {
  name: "TypeBlueprintPage",
  components: {EditTypeBlueprintForm, DeleteButton},
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
      EnvService.getTypeBlueprint().then(
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
        <edit-type-blueprint-form @addTypeBlueprint="loadData"/>
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