<template>
  <custom-admin-header/>
  <v-main>
    <router-view>

    </router-view>
    <scroll-to-top-button/>
  </v-main>
</template>

<script>
import ScrollToTopButton from "@/components/UI/Buttons/ScrollToTopButton.vue";
import CustomAdminHeader from "@/components/CustomAdminHeader.vue";
export default {
  name: "AdminMainPage",
  components: {CustomAdminHeader, ScrollToTopButton}
}
</script>

<style scoped>

</style>