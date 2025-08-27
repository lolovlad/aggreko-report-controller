<script>
import ClaimService from "@/store/claim.service.js";

export default {
  name: "GenerateClaimButton",
  data() {
    return {
      loading: false,
      show: false
    };
  },
  props: {
    isUser: {
      type: Boolean,
      default: false
    },
    uuidClaim: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue", "confirm"],
  methods: {
    confirm() {
      this.loading = true;
      ClaimService.updateFileClaim(this.uuidClaim).then(() => {
        this.$emit("confirm");
        this.show = false;
        this.loading = false;
      })
    },
    cancel() {
      this.show = false;
    }
  }
}
</script>

<template>
  <v-dialog v-model="show" max-width="400">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props"
             class="mt-4"
             v-if="!isUser"
             color="#36467A"
             dark
             prepend-icon="mdi-file-document-outline">
        Сгенерировать файл
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">Подтверждение</v-card-title>
      <v-card-text>Вы уверены, что хотите выполнить действие?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="cancel" :disabled="loading">
          Отмена
        </v-btn>
        <v-btn color="primary" text @click="confirm" :loading="loading">
          Да
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>