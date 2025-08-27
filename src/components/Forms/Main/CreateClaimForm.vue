<script>
import SelectUser from "@/components/UI/Models/SelectUser.vue";
import SelectDevice from "@/components/UI/Models/SelectDevice.vue";
import SelectEquipment from "@/components/UI/Models/SelectEquipment.vue";
import moment from "moment-timezone";
import ClaimService from "@/store/claim.service.js";

export default {
  name: "CreateClaimForm",
  components: {SelectEquipment, SelectDevice, SelectUser},
  props: ["uuid"],
  data() {
    return {
      formValid: false,
      fileRules: [v => !!v || 'Прикрепите файл (.xlsx)'],
      selectedProtocolsRules: [v => (v && v.length > 0) || 'Выберите хотя бы один протокол'],
      protocol: {
        date: null,
        object: null,
        protocols: [],
        list_workers: [],
        selectedProtocols: []
      },
      mainFile: null,
      linkMain: null,
      linkBlueprint: null,
      load: true
    }
  },
  mounted() {
    this.loadClaim()
  },
  methods: {
    isProtocolComplete(item) {
      const remark = item.remark || {}

      const noteOk = !!remark.note && remark.note.toString().trim().length > 0
      const commentOk = !!remark.comment && remark.comment.toString().trim().length > 0
      const conclusionOk = !!remark.conclusion && remark.conclusion.toString().trim().length > 0
      const deviceOk = item.list_equipment && Object.keys(item.list_equipment).length > 0

      return noteOk && commentOk && conclusionOk && deviceOk
    },
    submitProtocol() {
      this.$refs.form.validate()

      // Если базовые поля формы (rules) не валидны — не продолжаем
      if (!this.formValid) return

      // Доп.проверка без уведомлений: должен быть файл и выбранные протоколы
      if (!this.mainFile) return
      if (!this.protocol.selectedProtocols || this.protocol.selectedProtocols.length === 0) return

      // Проверяем ТОЛЬКО выбранные протоколы: наличие прибора и заполненность трех полей remark
      const selectedByName = new Set(this.protocol.selectedProtocols || [])
      for (const item of this.protocol.protocols || []) {
        if (!selectedByName.has(item.name)) continue

        const remark = item.remark || {}
        const noteOk = !!remark.note && remark.note.toString().trim().length > 0
        const commentOk = !!remark.comment && remark.comment.toString().trim().length > 0
        const conclusionOk = !!remark.conclusion && remark.conclusion.toString().trim().length > 0
        const deviceOk = item.list_equipment && Object.keys(item.list_equipment).length > 0

        if (!(noteOk && commentOk && conclusionOk && deviceOk)) {
          this.formValid = false
          return
        }
      }

      this.$emit("create", this.protocol, this.mainFile)
    },

    loadClaim(){
      ClaimService.get(this.uuid).then(claim => {
        this.protocol = claim.blueprint_json_file
        // Значения по умолчанию для remark + инициализация list_equipment
        const defaultRemark = {
          note: 'Нет',
          comment: 'Нет',
          conclusion: 'Оборудование соответствует требованиям НТД'
        }
        for (const p of (this.protocol.protocols || [])) {
          console.log(p)
          p.remark = {
            ...defaultRemark,
          }
        }

        this.linkBlueprint = claim.blueprint.download_link
        this.linkMain = claim.download_link_xlsx_blueprint
        this.load = false
      })
    },
  },
  computed: {
    allProtocolNames() {
      return this.protocol.protocols
          .filter(item => item.name)
          .map(item => item.name)
    }
  }
}
</script>

<template>
  <v-container v-if="load">

  </v-container>
  <v-container fluid v-else>
    <v-form ref="form" v-model="formValid">
      <v-row>
        <v-col cols="12" sm="6" v-if="linkBlueprint">
          <a :href="linkBlueprint">Скачать главный файл</a>
        </v-col>
        <v-col cols="12" sm="6" v-if="linkMain">
          <a :href="linkMain">Скачать заполненый файл</a>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-file-input label="Файл" variant="underlined" v-model="mainFile" accept=".xlsx" :rules="fileRules"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
              v-model="protocol.selectedProtocols"
              :items="allProtocolNames"
              label="Выберите протоколы"
              multiple
              chips
              clearable
              :rules="selectedProtocolsRules"
          />
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