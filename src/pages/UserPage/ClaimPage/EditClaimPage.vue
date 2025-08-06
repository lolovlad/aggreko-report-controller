<script>
import {auth as $store} from "@/store/auth.model";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import ClaimService from "@/store/claim.service.js";
import EditClaimForm from "@/components/Forms/Main/EditClaimForm.vue";

export default {
  name: "EditClaimPage",
  components: {EditClaimForm, ButtonBack},
  data(){
    return{
      tab: null,
      uuidClaim: this.$route.params.uuid,
      load: false,
      claim: null,
      isUser: $store.state.user.type.system_name === "user",
      isReadOnly: false
    }
  },
  methods: {
    getClaim(){
      ClaimService.get(this.uuidClaim).then(claim => {
        this.claim = claim
        this.load = true
        this.infoReadOnly()
      })

    },

    infoReadOnly(){
      if(this.isUser){
        if(this.claim.state_claim.system_name === "under_consideration" || this.claim.state_claim.system_name === "accepted"){
          this.isReadOnly = true
        }
      }
    }
  },
  mounted() {
    this.getClaim()

  }
}
</script>

<template>
  <v-container v-if="load === false">

  </v-container>
  <v-container v-else>
    <button-back/>
    <edit-claim-form :uuidClaim="claim.uuid" :read-only="isReadOnly"/>
  </v-container>
</template>

<style scoped>

</style>