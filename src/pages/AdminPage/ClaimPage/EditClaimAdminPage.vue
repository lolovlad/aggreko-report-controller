<script>
import ButtonBack from "@/components/UI/ButtonBack.vue";
import EditClaimForm from "@/components/Forms/Main/EditClaimForm.vue";
import {auth as $store} from "@/store/auth.model.js";

export default {
  name: "EditClaimAdminPage",
  components: {EditClaimForm, ButtonBack},
  data(){
    return{
      uuidClaim: this.$route.params.uuid,
      load: false,
    }
  },
}
</script>

<template>
  <v-container>
    <button-back/>
    <edit-claim-form :uuidClaim="uuidClaim"/>
  </v-container>
</template>

<style scoped>

</style>