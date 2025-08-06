<script>
import EnvService from "@/store/env.service.js";
import ButtonAgrea from "@/components/UI/ButtonAgrea.vue";
import moment from 'moment-timezone';

export default {
  name: "EditDeviceForm",
  components: {ButtonAgrea},
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
    idDevice: {
      type: BigInt,
      default: null
    }
  },
  data(){
    return{
      device: {
        name: null,
        id_type: 1,
        error: null,
        code: null,
        date_check_last: Date.now(),
        date_check_next: Date.now()
      },

      nameRules: [
        v => !!v || 'Назывние не заполнена',
        v => (!!v && v.length >= 2 && v.length <= 500) || 'Назывние может быть длинной от 2 до 500 символа'
      ],
      errorRules: [
        v => !!v || 'Погрешность не заполнена',
        v => (!!v && v.length >= 1 && v.length <= 250) || 'Погрешность может быть длинной от 1 до 251 символов'
      ],
      codeRules: [
        v => !!v || 'Заводской номер не заполнен',
        v => (!!v && v.length >= 4 && v.length <= 50) || 'Заводской номер может быть длинной от 4 до 51 символов'
      ],
      typeRules: [
        v => !!v || 'Тип не выбран',
      ],

      typeDevice: []
    }
  },
  methods: {
    loadTypeDevice(){
      EnvService.getTypeDevice().then((typeDevice)  => {
        this.typeDevice = typeDevice
      })
    },
    formatDate(date){
      return moment(date).format('DD/MM/YYYY');
    },
    async add(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.$emit("add", this.device)
    },
    async update(){
      const valid = await this.$refs.form.validate()
      if(valid.valid)
        this.$emit("updateUser", this.device)
    },
  },
  mounted() {
    this.loadTypeDevice()
  }
}
</script>

<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12" md="12">
        <v-text-field
            type="text"
            v-model="device.name"
            label="Название *"
            variant="underlined"
            :rules="nameRules"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-select
            v-model="device.id_type"
            :items="typeDevice"
            item-title="name"
            item-value="id"
            label="Тип *"
            variant="underlined"
            :rules="typeRules"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
            type="text"
            v-model="device.error"
            label="Погрешность *"
            variant="underlined"
            :rules="errorRules"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            type="text"
            v-model="device.code"
            label="Код *"
            variant="underlined"
            :rules="codeRules"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <label>Время последний проверки *</label>
        <VueDatePicker
            v-model="device.date_check_last"
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
        <label>Время время следующей проверки *</label>
        <VueDatePicker
            v-model="device.date_check_next"
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
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <small class="text-caption text-medium-emphasis">* - Поле обязательное</small>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" v-if="addMode">
        <button-agrea @click="add">Сохранить</button-agrea>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <button-agrea @click="update">Обновить</button-agrea>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>