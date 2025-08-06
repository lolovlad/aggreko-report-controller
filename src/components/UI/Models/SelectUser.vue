<script>
import UserService from "@/store/user.service.js";
import axios from "axios";

export default {
  name: "SelectUser",
  props: {
    modelValue: {
      type: Object
    },
    readonly: {
      type: Boolean,
    },
    textBtn: {
      type: String,
      default: "Выбрать инженеров"
    }
  },
  data: () => ({
    dialog: false,
    users: [],

    loading: false,
    search: '',
    selected: [],

    content: {},
    headers: [
      { title: 'ФИО', align: 'start', sortable: false, key: 'name',  value: item => {
          if(item.name !== null)
            return `${item.surname} ${item.name[0]}. ${item.patronymic[0]}.`
          return "Нет"
        }
      },
      { title: 'Должность', key: 'profession', align: 'start', sortable: false, value: item => {
          if(item.profession === null)
            return "Нет"
          return item.profession.name
        }
      },
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
      UserService.searchUsers(this.search)
          .then(users => {
            this.users = users
          })
    }
  },

  methods: {
    add(user){
      this.content[user.uuid] = user
      this.handleInput()
    },

    deleteUser(uuid){
      delete this.content[uuid]
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
      this.content[i.uuid] = i
    }
    UserService.searchUsers(this.search)
        .then(users => {
          this.users = users
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
          <v-chip-group>
            <v-chip v-for="item in this.modelValue" :key="item.uuid">{{ item.surname }} {{item.name[0]}}. {{item.patronymic[0]}}. ({{item.profession.name}})</v-chip>
          </v-chip-group>
        </v-col>
        <v-col cols="auto">
          <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-account"
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
              :key="item.uuid"
              class="py-1 pe-0"
              cols="auto"
          >
            <v-chip
                :disabled="loading"
                closable
                @click:close="deleteUser(item.uuid)"
            >
              {{ item.surname }} {{item.name[0]}}. {{item.patronymic[0]}}.
            </v-chip>
          </v-col>

          <v-col v-if="!allSelected" cols="12">
            <v-text-field
                ref="searchField"
                v-model="search"
                label="Поиск по ФИО"
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
                :items="users"
                :loading="loading"
                item-value="uuid"
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
                  <td>{{ item.surname }} {{item.name[0]}}. {{item.patronymic[0]}}.</td>
                  <td>{{ item.profession.name || 'Нет данных'}}</td>
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