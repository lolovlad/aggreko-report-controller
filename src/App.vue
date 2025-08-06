<script>
import {mapGetters} from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapGetters('notification', {
      notification: 'notification'
    })
  }
}
</script>

<template>
  <v-app>
    <router-view>

    </router-view>
    <v-snackbar
        v-model="notification.show"
        :color="notification.color"
        :timeout="notification.timeout"
        top
        right
    >
      {{ notification.message }}
    </v-snackbar>
  </v-app>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
