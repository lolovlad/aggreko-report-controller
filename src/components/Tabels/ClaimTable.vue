<script>
import moment from "moment-timezone";
import ClaimService from "@/store/claim.service.js";
import DeleteButton from "@/components/UI/Buttons/DeleteButton.vue";
import EditButton from "@/components/UI/Buttons/EditButton.vue";
import SendForwardButton from "@/components/UI/Buttons/SendForwardButton.vue";
import SendBackButton from "@/components/UI/Buttons/SendBackButton.vue";
import {auth as $store} from "@/store/auth.model.js";
export default {
  name: "ClaimTable",
  components: {SendBackButton, SendForwardButton, EditButton, DeleteButton},
  data(){
    return{
      headers: [
        { title: 'UUID', key: 'uuid', sortable: false, value: item => `${item.uuid}`},
        { title: 'Время', key: 'datetime', sortable: false, value: item => {
            let dateNew = new Date(item.datetime)
            return moment(dateNew).format('DD.MM.YYYY HH:mm')
          }
        },
        { title: 'Автор', key: 'user', sortable: false, value: item => {
            let user = item.user
            return `${user.surname} ${user.name} ${user.patronymic}`
          }
        },
        { title: 'Главный файд', sortable: false, key: 'download_link_main'},
        { title: 'Состояние заявки', sortable: false, key: 'state_claim', value: item => {
            return `${item.state_claim.name}`
          }
        },
        {title: 'Действия', sortable: false, key: "actions"}
      ],
      items: [],
      totalItems: 0,
      loading: true,
      search: '',
      itemsPerPage: 20,
      page: 1,

      typeUser: $store.state.user.type.system_name,

      selectObject: "all",
      selectState: 0
    }
  },
  methods: {
    saveState(){
      this.$store.dispatch('page/saveState', {name: "claim", page: this.page, perItemPage: this.itemsPerPage})
    },
    deleteClaim(item){
      this.saveState()
      this.$emit("delete", item.uuid)
    },
    editClaim(item){
      this.saveState()
      this.$emit("edit", item.uuid)
    },
    updateStateClaim(item){
      this.saveState()
      this.$emit("updateStateClaim", item.uuid)
    },
    downgradeStateClaim(item){
      this.saveState()
      this.$emit("downgradeStateClaim", item.uuid)
    },
    updateSearchClaim(selectObject, selectState){
      this.selectObject = selectObject
      this.selectState = selectState
      this.loadItem(1)
    },
    loadItem({page=1, itemsPerPage=20}){
      this.loading = true
      if(this.search.length >= 0){
        const initialState = $store.state;
        if(initialState.nameTable === "claim"){
          page = initialState.pageNow
          itemsPerPage = initialState.perItemPage
          this.$store.dispatch('page/dropState')
        }
        ClaimService.getPage(page, itemsPerPage).then(
            response => {
              this.page = page
              this.items = response.data
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
        return ''
      }
    },

    getColor (state) {
      if (state === "Черновик") return 'black'
      else if (state === "На рассмотрении") return 'orange'
      else if (state === "На доработку") return 'red'
      else return 'green'
    },
    isForwardBackUser(item){
      if(this.typeUser === "user"){
        let dateNew = new Date(item.datetime)
        let now = new Date();
        let diffHours = (now - dateNew) / (1000 * 60 * 60)
        if(item.state_claim.system_name === 'under_consideration' && diffHours < 24)
          return true
        return false

      }else{
        return item.state_claim.system_name !== 'accepted'
      }
    },

    isUser(item){
      if(this.typeUser === "user"){
        if(item.state_claim.system_name === 'draft' || item.state_claim.system_name === 'under_development'){
          return true
        }else{
          return false
        }
      }else{
        return item.state_claim.system_name !== 'accepted'
      }
    }
  }
}
</script>

<template>
  <v-card
      title="Отчеты"
      flat
  >
    <template v-slot:text>
      <!--<search-claim-form
          @updateSelect="updateSearchClaim"
      />-->
    </template>
    <v-data-table-server
        :items="items"
        :headers="headers"
        v-model:items-per-page="itemsPerPage"
        :items-length="totalItems"
        :loading="loading"
        item-value="uuid"
        :page="page"
        @update:options="loadItem"
        :items-per-page-options="[
          {value: 20, title: '20'},
          {value: 40, title: '40'},
          {value: 100, title: '100'}
        ]"
        :items-per-page-text="'Количество элементов'"
        :loading-text="'Загрузка данных'"
        :no-data-text="'Данных не обнаружено'"
    >
      <template v-slot:[`item.state_claim`]="{ value }">
        <v-chip :color="getColor(value)">
          {{ value }}
        </v-chip>
      </template>
      <template v-slot:[`item.download_link_main`]="{ item }">
        <a :href="item.download_link_main">Скачать</a>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <delete-button @agree="deleteClaim(item)" v-if="isUser(item)"/>
        <edit-button @click="editClaim(item)"/>
        <send-forward-button
            v-if="isUser(item)"
            @click="updateStateClaim(item)"
            :type-user="typeUser"
        />
        <send-back-button
            v-if="isForwardBackUser(item)"
            @click="downgradeStateClaim(item)"
            :type-user="typeUser"
        />
      </template>
    </v-data-table-server>
  </v-card>
</template>

<style scoped>

</style>