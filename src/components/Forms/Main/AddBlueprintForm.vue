<script>
import EnvService from "@/store/env.service.js";
import BlueprintService from "@/store/blueprint.service.js";
import FixedButton from "@/components/UI/FixedButton.vue";

export default {
  name: "AddBlueprintForm",
  components: {FixedButton},
  data(){
    return{
      dialog: false,
      snackbar: false,
      message: null,
      loading: false,

      listTypeBlueprint: [],
      listTypeEquipmentBlueprint: [],

      blueprint: {
        name: null,
        id_type: null,
        id_plant: null,
        file_blueprint: null
      },
      schemeBlueprint:{
        name: null,
        id_type: null,
        id_plant: null,
        file_blueprint: null
      },
      nameRule: [
        v => !!v || 'Название не заполнена',
      ],
      typeBlueprintRule: [
        v => !!v || 'Тип не выбран',
      ],
      typeEquipmentBlueprintRule: [
        v => !!v || 'Тип оборудованния не выбран',
      ],
      fileBlueprintRule: [
        v => !!v || 'Файл не выбран',
      ]
    }
  },
  methods: {
    loadTypeBlueprint(){
      EnvService.getTypeBlueprint()
          .then(
              (typeBlueprint) => {
                this.listTypeBlueprint = typeBlueprint
              }
          )
    },
    loadTypeEquipmentBlueprint(){
      EnvService.getTypeEquipmentBlueprint()
          .then(
              (typeEquipmentBlueprint) => {
                this.listTypeEquipmentBlueprint = typeEquipmentBlueprint
              }
          )
    },
    async add(){
      const valid = await this.$refs.form.validate()
      if(valid.valid){
        this.loading = true
        const form = new FormData()
        for (const key in this.blueprint) {
          const value = this.blueprint[key]
          if (value !== null && value !== undefined) {
            form.append(key, value)
          }
        }
        BlueprintService.add(form).then(() => {
          this.$nextTick(() => {
            Object.assign(this.blueprint, this.schemeBlueprint)
            this.dialog = false
            this.$emit("add")
          })
        }).finally(() => {
          this.loading = false
        })
      }
    },
  },
  mounted() {
    this.loadTypeBlueprint()
    this.loadTypeEquipmentBlueprint()
  }
}
</script>

<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
  >
    <template v-slot:activator="{ props: activatorProps }">
      <fixed-button
          v-bind="activatorProps"
      />
    </template>
    <v-card>
      <v-toolbar>
        <v-btn
            icon="mdi-close"
            @click="dialog = false"
            :disabled="loading"
        >
          <v-progress-circular
              v-if="loading"
              indeterminate
              size="20"
              width="2"
              style="color: white"
          />
        </v-btn>

        <v-toolbar-title>Добавить шаблон</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
              variant="text"
              @click="add"
              :disabled="loading"
          >
            <v-progress-circular
                v-if="loading"
                indeterminate
                size="16"
                width="2"
                style="color: white; margin-right: 8px"
            />
            <span v-if="!loading">Сохранить</span>
            <span v-else>Сохранение...</span>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                  type="text"
                  v-model="blueprint.name"
                  label="Название шаблона *"
                  variant="underlined"
                  accept="*"
                  :rules="nameRule"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                  label="Тип *"
                  :items="listTypeBlueprint"
                  item-title="name"
                  item-value="id"
                  variant="underlined"
                  v-model="blueprint.id_type"
                  :rules="typeBlueprintRule"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                  label="Тип оборудованния *"
                  :items="listTypeEquipmentBlueprint"
                  item-title="name"
                  item-value="id"
                  variant="underlined"
                  v-model="blueprint.id_plant"
                  :rules="typeEquipmentBlueprintRule"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-file-input
                  v-model="blueprint.file_blueprint"
                  label="Шаблон *"
                  accept="*"
                  prepend-icon="mdi-border-color"
                  show-size
                  :rules="fileBlueprintRule"
              ></v-file-input>
            </v-col>
          </v-row>
          <small class="text-caption text-medium-emphasis">* - Поле обязательное</small>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>