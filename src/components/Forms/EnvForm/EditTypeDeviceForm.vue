<script>
import EnvService from "@/store/env.service.js";

export default {
  name: "EditTypeDeviceForm",
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    dialog: false,
    typeDevice: {
      id: null,
      name: null,
      system_name: null,
      description: null
    },
    scemaTypeDevice: {
      id: null,
      name: null,
      system_name: null,
      description: null
    }
  }),
  methods: {
    save(){
      EnvService.addTypeDevice(this.typeDevice).then(() => {
        this.clearForm()
        this.$emit("add")
      }).catch((e) => {
        console.log(e)
      })
    },
    clearForm(){
      Object.assign(this.typeDevice, this.scemaTypeDevice)
      this.dialog = false
    }
  }
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-plus"
          text="Добавить"
          variant="tonal"
          v-bind="activatorProps"
      ></v-btn>
    </template>

    <v-card
        prepend-icon="mdi-plus"
        title="Тип ИО и СИ"
    >
      <v-card-text>
        <v-row dense>
          <v-col
              cols="12"
              md="12"
          >
            <v-text-field
                label="Название *"
                type="text"
                v-model="typeDevice.system_name"
                required
            ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              md="12"
          >
            <v-text-field
                label="Название на рус *"
                v-model="typeDevice.name"
                type="text"
                required
            ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              md="12"
          >
            <v-textarea
                label="Описание"
                v-model="typeDevice.description"
                type="text"
                required
            ></v-textarea>
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis">*Поле обязательное</small>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            text="Закрыть"
            variant="plain"
            @click="clearForm"
        ></v-btn>

        <v-btn
            color="primary"
            text="Сохранить"
            variant="tonal"
            @click="save"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>