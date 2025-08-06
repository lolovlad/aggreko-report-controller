<template>
  <v-app-bar color="rgb( 253,110,57)"
             prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title @click="$route.push('/')">Aggreko-report</v-app-bar-title>
    <template v-slot:append>
      <accaunt-menu/>
    </template>
  </v-app-bar>
  <v-navigation-drawer
      v-model="drawer"
      temporary
  >
    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-account" title="Пользователи" @click="userPage"/>
      <v-list-item prepend-icon="mdi-engine" title="Оборудованние" @click="equipmentPage"/>
      <v-list-item prepend-icon="mdi-note-multiple" title="ИО и СИ" @click="devicePage"/>
      <v-list-item prepend-icon="mdi-note-multiple" title="Шаблоны" @click="blueprintPage"/>
      <v-list-item prepend-icon="mdi-file-alert" title="Отчеты" @click="claimPage"/>
    </v-list>

    <template v-slot:append>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-cog-outline" title="Настройки" @click="envPage"/>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
import router from "@/router/router";
import AccauntMenu from "@/components/UI/AccauntMenu.vue";


export default {
  name: "CustomAdminHeader",
  components: {AccauntMenu},
  data(){
    return{
      drawer: false,

      fav: true,
      message: false,
      hints: true,
    }
  },
  methods:{
    userPage(){
      router.push('/admin/user')
    },
    equipmentPage(){
      router.push('/admin/equipment')
    },
    blueprintPage(){
      router.push('/admin/blueprint')
    },
    claimPage(){
      router.push('/admin/claim')
    },
    devicePage(){
      router.push('/admin/device')
    },
    envPage(){
      router.push('/admin/env')
    }
  },
}
</script>

<style scoped>

</style>