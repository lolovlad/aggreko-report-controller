<script>
import BlueprintService from "@/store/blueprint.service.js";

export default {
  name: "UploadXlsxForm",
  data(){
    return {
      dialogUpload: false,
      file: null,
    }
  },
  props: ["uuid"],
  methods: {
    clearForm(){
      this.file = null
      this.dialogUpload = false
    },
    clickSubmit(){
      const form = new FormData()
      form.append("file", this.file)

      BlueprintService.uploadXlsxFile(this.uuid, form).then(() => {
        this.$nextTick(() => {
          this.dialogUpload = false
          this.file = null
        })
      })
    }
  }
}
</script>

<template>
  <v-dialog
      v-model="dialogUpload"
      max-width="500"
      persistent
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-tooltip text="Загрузить Xlsx" location="top">
        <template v-slot:activator="{ props }">
          <span v-bind="props">
            <v-icon
                class="me-2"
                size="small"
                v-bind="activatorProps"
            >
              mdi-file-excel
            </v-icon>
          </span>
        </template>
      </v-tooltip>
    </template>
    <v-card
        prepend-icon="mdi-file-export-outline"
        text="Загрузить"
        title="Загрузить отредактированный xlsx"
    >
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-file-input label="Файл" variant="underlined" v-model="file" accept=".xlsx"/>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <template v-slot:actions>
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
            @click="clickSubmit"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>