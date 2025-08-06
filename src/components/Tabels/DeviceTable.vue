<script>
import DeleteButton from "@/components/UI/Buttons/DeleteButton.vue";
import EditButton from "@/components/UI/Buttons/EditButton.vue";
import {page as $store} from "@/store/page.model.js";
import DeviceService from "@/store/device.service.js";
import moment from 'moment-timezone';

export default {
  name: "DeviceTable",
  components: {EditButton, DeleteButton},
  data(){
    return{
      itemsPerPage: 20,
      headers: [
        { title: 'Название', align: 'start', sortable: false, key: 'name'},
        { title: 'Тип', key: 'type', align: 'start', sortable: false, value: item => `${item.type.name}` },
        { title: 'Погрешности', key: 'error', align: 'start', sortable: false},
        { title: 'Код', key: 'code', align: 'start', sortable: false},
        { title: 'Дата послденей проверки', key: 'date_check_last', align: 'start', sortable: false, value: item => {
            let dateNew = new Date(item.date_check_last)
            return moment(dateNew).format('DD.MM.YYYY')
          }
        },
        { title: 'Дата следующей проверки', key: 'date_check_next', align: 'start', sortable: false, value: item => {
            let dateNew = new Date(item.date_check_next)
            return moment(dateNew).format('DD.MM.YYYY')
          }
        },
        { title: 'Действия', key: "actions", sortable: false, align: 'center' }
      ],
      data: [],
      totalItems: 0,
      loading: true,
      search: '',
      page: 1,
    }
  },
  methods: {
    loadItem({page = 1, itemsPerPage = 20}) {
      if (this.search.length === 0) {
        const initialState = $store.state;
        if (initialState.nameTable === "device") {
          page = initialState.pageNow
          itemsPerPage = initialState.perItemPage
          this.$store.dispatch('page/dropState')
        }
        DeviceService.getPage(page, itemsPerPage).then(
            response => {
              this.page = page
              this.data = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      } else {
        DeviceService.search(this.search).then(
            response => {
              this.data = response.data
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },
    saveState() {
      this.$store.dispatch('page/saveState', {name: "device", page: this.page, perItemPage: this.itemsPerPage})
    },
    update(uuid) {
      this.saveState()

      this.$emit("update", uuid)
    },
    deleteDevice(uuid) {
      this.saveState()

      this.$emit("delete", uuid)
    },
  },
  watch: {
    search(){
      this.loadItem({page: 1, itemsPerPage: 20})

    }
  },
  mounted() {
    const initialState = $store.state;
    if(initialState.nameTable === "device"){
      this.loadItem({page: initialState.pageNow, itemsPerPage: initialState.perItemPage})
      this.$store.dispatch('page/dropData')
    }
  }
}
</script>

<template>
  <v-card
      title="ИО и СИ"
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
        :items="data"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
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
      <template v-slot:[`item.actions`]="{ item }">
        <delete-button @agree="deleteDevice(item.id)" />
        <edit-button @click="update(item.id)" />
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

</style>