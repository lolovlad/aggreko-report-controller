<script>
export default {
  name: "AddButton"
}
</script>

<template>
  <v-tooltip text="Создать" location="top">
    <template v-slot:activator="{ props }">
      <span v-bind="props" @click="this.$emit('click')">
        <v-icon
            class="me-2"
            size="small"
        >
          mdi-plus
        </v-icon>
      </span>
    </template>
  </v-tooltip>
</template>

<style scoped>

</style>