<script>
import BlueprintService from "@/store/blueprint.service.js";
import SelectUser from "@/components/UI/Models/SelectUser.vue";
import SelectDevice from "@/components/UI/Models/SelectDevice.vue";
import SelectEquipment from "@/components/UI/Models/SelectEquipment.vue";
import moment from "moment-timezone";

export default {
  name: "CreateClaimForm",
  components: {SelectEquipment, SelectDevice, SelectUser},
  props: ["uuid"],
  data() {
    return {
      formValid: false,
      protocol: {
        date: null,
        object: null,
        protocols: [],
        list_workers: []
      },
      mainFile: null
    }
  },
  mounted() {
    this.loadSchema()
  },
  methods: {
    isProtocolComplete(item) {
      const r = item.remark
      return r.note?.trim() && r.comment?.trim() && r.conclusion?.trim()
    },
    parseDate(dateInput) {
      const date = new Date(dateInput);

      const months = [
        "Январь", "Февраль", "Март", "Апрель",
        "Май", "Июнь", "Июль", "Август",
        "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
      ];

      const day = date.getDate();
      const monthIndex = date.getMonth(); // 0-based
      const monthStr = months[monthIndex];
      const monthInt = String(monthIndex + 1).padStart(2, '0');
      const year = date.getFullYear();

      return {
        day,
        month: {
          str: monthStr,
          int: monthInt
        },
        year
      }
    },
    submitProtocol() {
      this.$refs.form.validate()
      if (!this.formValid) {
        alert('Пожалуйста, заполните все обязательные поля.')
        return
      }
      this.protocol.date = this.parseDate(this.protocol.date)
      this.$emit("create", this.protocol, this.mainFile)
    },

    loadSchema(){
      BlueprintService.getFileSchemas(this.uuid).then(schema => {
        this.protocol = schema
      })
    },
    formatDate(date){
      return moment(date).format('DD/MM/YYYY');
    },
  }
}
</script>

<template>
  <v-container fluid>
    <v-form ref="form" v-model="formValid">
      <!-- Общая информация -->
      <v-row>
        <v-col cols="12" md="6">
          <label>Время время следующей проверки *</label>
          <VueDatePicker
              v-model="protocol.date"
              locale="ru"
              :format="formatDate"
              utc="preserve"
          >
            >
            <template #input-icon>
              <img/>
            </template>
          </VueDatePicker>
        </v-col>
        <v-col cols="12" md="6">
          <select-equipment v-model="protocol.object"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="12">
          <v-file-input label="Файл" variant="underlined" v-model="mainFile" accept=".xlsx"/>
        </v-col>
      </v-row>

      <!-- Протоколы -->
      <v-expansion-panels variant="accordion" class="mt-6">
        <v-expansion-panel
            v-for="(item, index) in protocol.protocols"
            :key="index"
            :value="index"
        >
          <v-expansion-panel-title>
            <div class="d-flex justify-space-between align-center w-100">
              <span>Протокол №{{ index + 1 }}</span>
              <v-chip
                  :color="isProtocolComplete(item) ? 'green' : 'red'"
                  variant="flat"
                  size="small"
                  class="ms-auto"
              >
                {{ isProtocolComplete(item) ? 'Заполнен' : 'Не заполнен' }}
              </v-chip>
            </div>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-row>
              <v-col cols="12" md="12">
                <select-device v-model="item.list_equipment"/>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                    v-model="item.remark.note"
                    label="Примечание"
                    outlined
                    class="mb-2"
                />
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                    v-model="item.remark.comment"
                    label="Замечания"
                    outlined
                    class="mb-2"
                />
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                    v-model="item.remark.conclusion"
                    label="Заключение"
                    outlined
                />
              </v-col>
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Список сотрудников -->
      <v-divider class="my-6" />
      <v-row>
        <v-col cols="12" md="12">
          <select-user v-model="protocol.list_workers"/>
        </v-col>
      </v-row>

      <!-- Кнопка отправки -->
      <v-row class="mt-6">
        <v-col cols="12" class="text-right">
          <v-btn color="primary" @click="submitProtocol">Сохранить</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>