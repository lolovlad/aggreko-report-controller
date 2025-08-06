<script>
import EnvService from "@/store/env.service.js";

export default {
  name: "EditTypeEquipmentBlueprintForm",
  props: {
    addMode: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    dialog: false,
    data: {
      id: 0,
      system_name: null,
      name: null,
      description: null
    },
    scemaData: {
      id: 0,
      system_name: null,
      name: null,
      description: null
    }
  }),
  methods: {
    saveData(){
      EnvService.addTypeEquipmentBlueprint(this.data).then(() => {
        this.clearForm()
        this.$emit("addTypeEquipmentBlueprint")
      })
    },
    clearForm(){
      Object.assign(this.data, this.scemaData)
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
        title="Тип шаблона"
    >
      <v-card-text>
        <v-row dense>
          <v-col
              cols="12"
              md="12"
          >
            <v-text-field
                label="Системное название *"
                type="text"
                v-model="data.system_name"
                required
            ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              md="12"
          >
            <v-text-field
                label="Название *"
                v-model="data.name"
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
                v-model="data.description"
                type="text"
                required
            ></v-textarea>
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis">* - Поле обязательное</small>
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
            @click="saveData"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>