<script>
import router from "@/router/router.js";

export default {
  name: "AccauntMenu",
  data(){
    return{
      menu: false,
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('auth/logout')
      router.push('/')
    },
    profilePageOpen(){
      router.push(`/profile`)
    },
  },
  computed: {
    fullName(){
      const user = this.$store.state.auth.user
      console.log(user, "info")
      if(user === null)
        return `Неизветно`
      if(user.name !== undefined){
        return `${user.surname} ${user.name[0]}. ${user.patronymic[0]}.`
      }
      return `Неизветно`
    },
    prof(){
      const user = this.$store.state.auth.user
      if(user === null)
        return `Неизветно`
      if(user.profession !== null){
        return `${user.profession.name}`
      }
      return "Неизветно"
    }
  }
}
</script>

<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          color="white"
          v-bind="props"
      >
        Аккаунт
      </v-btn>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item
            prepend-avatar="/account-icon-33.png"
            :subtitle="prof"
            :title="fullName"
        >
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item prepend-icon="mdi-cogs" title="Настройки" @click="profilePageOpen"/>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            variant="text"
            @click="menu = false"
        >
          Закрыть
        </v-btn>
        <v-btn
            color="primary"
            variant="text"
            @click="logout"
        >
          Выйти из аккаунта
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<style scoped>

</style>