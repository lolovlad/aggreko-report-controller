<script>
import moment from "moment/moment";
import BlueprintService from "@/store/blueprint.service.js";
import {page as $store} from "@/store/page.model.js";
import DeleteButton from "@/components/UI/Buttons/DeleteButton.vue";
import EditButton from "@/components/UI/Buttons/EditButton.vue";
import UploadXlsxForm from "@/components/Forms/Optimal/UploadXlsxForm.vue";
import AddButton from "@/components/UI/Buttons/AddButton.vue";
import UploadDocxForm from "@/components/Forms/Optimal/UploadDocxForm.vue";
import blueprintService from "@/store/blueprint.service.js";

export default {
  name: "BlueprintTable",
  components: {UploadDocxForm, AddButton, UploadXlsxForm, EditButton, DeleteButton},
  props: {
    mode: {
      type: String,
      default: "admin",
    }
  },
  data(){
    return{
      headers: [
        {title: 'Название', sortable: false, key: 'name'},
        {title: 'Дата редактирования', sortable: false, key: 'datetime', value: item => {
            let dateNew = new Date(item.last_datetime_edit)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }},
        {title: 'Тип шаблона', sortable: false, key: 'type', value: item => {return item.type.name}},
        {title: 'Тип оборудованния', sortable: false, key: 'plant', value: item => {return item.plant.name}},
        {title: 'Шаблон XLSX', sortable: false, key: 'download_link'},
        {title: 'Управление', sortable: false, key: 'actions'}
      ],
      blueprint: [],
      totalItems: 0,
      loading: true,
      search: "",
      page: 1,
      itemsPerPage: 20
    }
  },
  methods: {
    loadItem({page=1, itemsPerPage=20}){
      if(this.search.length === 0){
        const initialState = $store.state;
        if(initialState.nameTable === "blueprint"){
          page = initialState.pageNow
          itemsPerPage = initialState.perItemPage
          this.$store.dispatch('page/dropState')
        }
        BlueprintService.getPageBlueprint(page, itemsPerPage).then(
            (response) => {
              console.log(response.data)
              this.page = page
              this.blueprint = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }else{
        BlueprintService.searchBlueprint(this.search).then(
            response => {
              this.blueprint = response.data
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },
    saveState(){
      this.$store.dispatch('page/saveState', {name: "blueprint", page: this.page, perItemPage: this.itemsPerPage})
    },
    deleteBlueprint(uuid){
      this.saveState()
      blueprintService.deleteBlueprint(uuid).then(() => {
        this.loadItem({page: 1, itemsPerPage: 20})
      })
    }
  },
  watch: {
    search(){
      this.loadItem({page: 1, itemsPerPage: 20})
    }
  },
  mounted() {
    if(this.mode === "admin"){
      this.headers.splice(
          this.headers.length - 1,
          0,
          {title: 'Шаблон Docx', sortable: false, key: 'download_link_docx'});
    }
    const initialState = $store.state;
    if(initialState.nameTable === "blueprint"){
      this.loadItem({page: initialState.pageNow, itemsPerPage: initialState.perItemPage})
      this.$store.dispatch('page/dropData')
    }
  }
}
</script>

<template>
  <v-card
      title="Шаблоны"
      flat
  >
    <template v-slot:text>
      <v-text-field
          v-model="search"
          label="Поиск"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
      ></v-text-field>
    </template>

    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :page="page"
        :headers="headers"
        :items="blueprint"
        :items-length="totalItems"
        :loading="loading"
        item-value="uuid"
        @update:options="loadItem"
        :items-per-page-options="[
          {value: 20, title: '20'},
          {value: 40, title: '40'},
          {value: 100, title: '100'},
      ]"
        :items-per-page-text="'Количество элементов'"
        :loading-text="'Закгрузка данных'"
        :no-data-text="'Данных не обнаружено'"
    >
      <template v-slot:[`item.download_link`]="{ item }">
        <a
            :href="item.download_link"
        >
          Скачать
        </a>
      </template>
      <template v-slot:[`item.download_link_docx`]="{ item }" v-if="mode === 'admin'">
        <a
            :href="item.download_link_docx"
        >
          Скачать
        </a>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <delete-button v-if="mode === 'admin'" @agree="deleteBlueprint(item.uuid)"/>
        <upload-xlsx-form :uuid="item.uuid" v-if="mode === 'admin'"/>
        <upload-docx-form :uuid="item.uuid" v-if="mode === 'admin'"/>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

</style>