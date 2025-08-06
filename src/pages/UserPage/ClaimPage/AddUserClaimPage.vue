<script>
import CreateClaimForm from "@/components/Forms/Main/CreateClaimForm.vue";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import ClaimService from "@/store/claim.service.js";
import router from "@/router/router.js";

export default {
  name: "AddUserClaimPage",
  components: {ButtonBack, CreateClaimForm},
  data(){
    return{
      load: false,
      uuid: this.$route.params.uuid,
    }
  },
  methods: {
    createClaim(protocols, file){
      const form = new FormData()
      let t = JSON.stringify(protocols)
      form.append("file_xlsx", file)
      form.append("schema", t)
      this.load = true
      ClaimService.add(this.uuid, form).then(
          (response) => {
            this.load = false
            router.push('/user/claim')
          }
      ).catch(error =>{
        this.load = false
      })
    }
  }
}
</script>

<template>
  <v-container fluid class="fill-height d-flex justify-center align-center" v-if="load">
    <v-progress-circular indeterminate size="64" color="rgb( 253,110,57)"></v-progress-circular>
  </v-container>
  <v-container v-else>
    <button-back/>
    <v-row>
      <v-col cols="12" md="12">
        <create-claim-form :uuid="uuid" @create="createClaim"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>