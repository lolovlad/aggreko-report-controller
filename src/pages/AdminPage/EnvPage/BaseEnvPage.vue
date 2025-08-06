<script>
export default {
  name: "BaseEnvPage"
}
</script>

<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item title="Должность" @click="$router.push('/admin/env/profession')"></v-list-item>
      <v-list-item title="Тип шаблонов" @click="$router.push('/admin/env/type_blueprint')"></v-list-item>
      <v-list-item title="Тип оборудования шаблонов" @click="$router.push('/admin/env/type_equipment_blueprint')"></v-list-item>
      <v-list-item title="Тип ИО и СИ" @click="$router.push('/admin/env/type_device')"></v-list-item>
      <v-list-item title="Тип оборудования" @click="$router.push('/admin/env/type_equipment')"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <router-view>

  </router-view>
</template>

<style scoped>

</style>