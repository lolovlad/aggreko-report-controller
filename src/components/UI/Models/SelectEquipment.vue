<script>
import EquipmentService from "@/store/equipment.service.js";

export default {
  name: "SelectEquipment",
  props: {
    modelValue: {
      type: Object,
      default: () => null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    textBtn: {
      type: String,
      default: "Выбрать оборудование"
    }
  },
  data: () => ({
    dialog: false,
    equipment: [],
    loading: false,
    search: '',
    selected: null,
    headers: [
      { title: 'Наименование', key: 'name', align: 'start', sortable: false },
      { title: 'Тип', key: 'type.name', align: 'start', sortable: false },
      { title: 'Код', key: 'code', align: 'start', sortable: false },
    ],
    itemsPerPage: 20,
    page: 1,
    totalItems: 0,
  }),
  watch: {
    search() {
      this.loadItem({ page: this.page, itemsPerPage: this.itemsPerPage });
    }
  },
  methods: {
    select(item) {
      this.selected = item;
      this.$emit("update:modelValue", item);
    },
    loadItem({ page = 1, itemsPerPage = 20 }) {
      this.loading = true;
      if (this.search.length === 0) {
        console.log(page, itemsPerPage)
        EquipmentService.getEquipmentPage(page, itemsPerPage)
            .then(response => {
              this.page = page;
              this.equipment = response.data;
              this.totalItems = parseInt(response.headers["x-count-page"]) * parseInt(response.headers["x-count-item"]);
              this.itemsPerPage = parseInt(response.headers["x-count-item"]);
              this.loading = false;
            })
            .catch(err => {
              console.error(err);
              this.loading = false;
            });
      } else {
        EquipmentService.searchEquipment(this.search)
            .then(response => {
              this.equipment = response;
              this.loading = false;
            })
            .catch(err => {
              console.error(err);
              this.loading = false;
            });
      }
    },
  },
  mounted() {
    this.selected = this.modelValue;
    this.loadItem({ page: this.page, itemsPerPage: this.itemsPerPage });
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
        <v-col cols="auto" v-if="modelValue">
          <v-chip closable :disabled="loading" @click:close="select(null)">
            {{ modelValue.name }}
          </v-chip>
        </v-col>
        <v-col cols="auto">
          <v-btn
              class="text-none font-weight-regular"
              prepend-icon="mdi-cog"
              variant="tonal"
              v-bind="activatorProps"
              :disabled="readonly"
          >{{ textBtn }}</v-btn>
        </v-col>
      </v-row>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
                v-model="search"
                label="Поиск по названию"
                hide-details
                single-line
            />
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row>
          <v-col cols="12">
            <v-data-table-server
                :headers="headers"
                :items="equipment"
                :loading="loading"
                item-value="id"
                :items-length="totalItems"
                :page="page"
                v-model:items-per-page="itemsPerPage"
                :items-per-page-options="[
                  {value: 20, title: '20'},
                  {value: 40, title: '40'},
                  {value: 100, title: '100'}
                ]"
                :items-per-page-text="'Количество элементов'"
                :loading-text="'Загрузка данных'"
                :no-data-text="'Данных не найдено'"
                hover
            >
              <template #item="{ item }">
                <tr @click="select(item)" style="cursor: pointer;">
                  <td>{{ item.name }}</td>
                  <td>{{ item.type?.name || 'Нет данных' }}</td>
                  <td>{{ item.code || 'Нет данных' }}</td>
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