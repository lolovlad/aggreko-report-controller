<script>
import EnvService from "@/store/env.service";
import DeleteButton from "@/components/UI/Buttons/DeleteButton.vue";

export default {
  name: 'ProfessionalTable',
  components: {DeleteButton},
  data(){
    return{
      headers: [
        { title: 'id', align: 'start', sortable: false, key: 'id',  value: item => {
            return item.id
          }
        },
        { title: 'Системное имя', key: 'system_name', sortable: false, align: 'start', value: item => {
            return item.system_name
          }
        },
        { title: 'Название', key: 'name', sortable: false, align: 'start', value: item => `${item.name}` },
        { title: 'Действия', key: "actions", sortable: false, align: 'center' }
      ],
      profession: [],
      loading: true,
    }
  },
  methods: {
    loadItem() {
      this.loading = true

      EnvService.getProfUser().then(
          profs => {
            this.profession = profs
            console.log(this.profession)
            this.loading = false
          })
    },
    deleteProf(uuid){
      this.$emit("deleteProf", uuid)
    },
  },
  mounted() {
    this.loadItem()
  }

}

</script>

<template>
  <v-card
      title="Должности"
      flat
  >
    <v-data-table-virtual
        :headers="headers"
        :items="profession"
        item-value="id"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <delete-button @agree="deleteProf(item.id)"/>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

<style scoped>

</style>