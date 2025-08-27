<script>
import ButtonBack from "@/components/UI/ButtonBack.vue";
import EditClaimForm from "@/components/Forms/Main/EditClaimForm.vue";
import {auth as $store} from "@/store/auth.model.js";
import LoaderPage from "@/components/UI/LoaderPage.vue";
import CreateClaimForm from "@/components/Forms/Main/CreateClaimForm.vue";
import ClaimService from "@/store/claim.service.js";

export default {
  name: "EditClaimAdminPage",
  components: {CreateClaimForm, LoaderPage, EditClaimForm, ButtonBack},
  data(){
    return{
      uuidClaim: this.$route.params.uuid,
      load: false,
      tab: null,
      claim: null
    }
  },
  methods: {
    getClaim(){
      ClaimService.get(this.uuidClaim).then(claim => {
        this.claim = claim
        this.load = true
      })
    },
    updateClaimData(protocol, file){
      const form = new FormData()
      let m = protocol.selectedProtocols.join(',')
      let t = JSON.stringify(protocol)

      form.append("file_xlsx", file)
      form.append("schema", t)
      form.append("protocols", m)
      ClaimService.updateClaimData(this.uuidClaim, form).then(claim => {
        this.$refs.createClaimForm.loadClaim()
      })
    }
  },
  mounted(){
    this.getClaim()
  }
}
</script>

<template>
  <loader-page v-if="load === false"/>
  <v-container v-else>
    <button-back/>

    <v-tabs
        v-model="tab"
        align-tabs="center"
        color="deep-purple-accent-4"
    >
      <v-tab value="claim">Главная вкладка</v-tab>
      <v-tab value="data">Данные</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab" class="overflow-visible">
      <v-tabs-window-item value="claim">
        <v-container>
          <edit-claim-form :uuidClaim="uuidClaim"/>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="data">
        <v-container>
          <create-claim-form :uuid="uuidClaim" @create="updateClaimData" ref="createClaimForm"/>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<style scoped>

</style>