<script>
import UserService from "@/store/user.service.js";
import DeviceService from "@/store/device.service.js";
import moment from "moment-timezone";

export default {
  name: "SelectDevice",
  props: {
    modelValue: {
      type: Object
    },
    readonly: {
      type: Boolean,
    },
    textBtn: {
      type: String,
      default: "Выбрать приборы"
    }
  },
  data: () => ({
    dialog: false,
    device: [],

    loading: false,
    search: '',
    selected: [],

    content: {},
    headers: [
      { title: 'Название', align: 'start', sortable: false, key: 'name'},
      { title: 'Тип', key: 'type', align: 'start', sortable: false, value: item => `${item.type.name}` },
      { title: 'Код', key: 'code', align: 'start', sortable: false},
    ],
    itemsPerPage: 20,
    page: 1,
    totalItems: 0,

  }),
  computed: {
    allSelected() {
      return this.selected.length === 5
    },
  },

  watch: {
    search(){
      DeviceService.search(this.search)
          .then(devices => {
            this.device = devices
          })
    }
  },

  methods: {
    formatDate(isoString){
      return moment(isoString).format('DD.MM.YYYY');
    },
    add(device){
      device.date_check_last = this.formatDate(device.date_check_last)
      device.date_check_next  = this.formatDate(device.date_check_next)
      this.content[device.id] = device
      this.handleInput()
    },

    deleteDevice(id){
      delete this.content[id]
      this.handleInput()
    },
    handleInput(){
      this.$emit("update:modelValue", this.content)
    },
    loadItem({page=1, itemsPerPage=20}){
      this.loading = true
      if(this.search.length === 0){
        UserService.getPageUser(page, itemsPerPage)
            .then(response => {
              this.page = page
              this.equipment = response.data
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"])
              this.itemsPerPage = parseInt(response.headers["x-count-item"])
              this.loading = false
            })
            .catch(
                (response) => {
                  console.log(response)
                }
            )
      }else{
        UserService.searchUsers(this.search).then(
            response => {
              this.users = response
              this.loading = false
            }
        ).catch(
            (response) => {
              console.log(response)
            }
        )
      }
    },
  },
  mounted() {
    for(let i of this.modelValue){
      i.date_check_last = this.formatDate(i.date_check_last)
      i.date_check_next  = this.formatDate(i.date_check_next)
      this.content[i.id] = i
    }
    DeviceService.search(this.search)
        .then(devices => {
          this.device = devices
        })
    this.handleInput()
  }
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="800"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-row align="center" justify="start">
        <v-col cols="auto" v-if="Object.keys(content).length > 0">
          <v-table density="compact" class="mb-2">
            <thead>
            <tr>
              <th class="text-left">Название</th>
              <th class="text-left">Тип</th>
              <th class="text-left">Код</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in modelValue" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.type.name || 'Нет данных'}}</td>
              <td>{{ item.code || 'Нет данных'}}</td>
            </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
          <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-tablet-cellphone"
              variant="tonal"
              v-bind="activatorProps"
              :disabled="readonly"
          >{{textBtn}}</v-btn>
        </v-col>
      </v-row>
    </template>
    <v-card>
      <v-container>
        <v-row align="center" justify="start">
          <v-col
              v-for="item in this.modelValue"
              :key="item.id"
              class="py-1 pe-0"
              cols="auto"
          >
            <v-chip
                :disabled="loading"
                closable
                @click:close="deleteDevice(item.id)"
            >
              {{ item.name }}
            </v-chip>
          </v-col>

          <v-col v-if="!allSelected" cols="12">
            <v-text-field
                ref="searchField"
                v-model="search"
                label="Поиск по Названию"
                hide-details
                single-line
            ></v-text-field>
          </v-col>
        </v-row>
        <v-divider v-if="!allSelected"></v-divider>
        <v-row>
          <v-col cols="12" md="12">
            <v-data-table-server
                :headers="headers"
                :items="device"
                :loading="loading"
                item-value="id"
                v-model:items-per-page="itemsPerPage"
                :items-length="totalItems"

                :page="page"

                :items-per-page-options="[
                  {value: 20, title: '20'},
                  {value: 40, title: '40'},
                  {value: 100, title: '100'}
                ]"
                :items-per-page-text="'Количество элементов'"
                :loading-text="'Закгрузка данных'"
                :no-data-text="'Данных не обнаружено'"
                hover
            >
              <template #item="{item}">
                <tr @click="add(item)" style="cursor: pointer;">
                  <td>{{ item.name }}</td>
                  <td>{{ item.type.name || 'Нет данных'}}</td>
                  <td>{{ item.code || 'Нет данных'}}</td>
                </tr>
              </template>
            </v-data-table-server>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>