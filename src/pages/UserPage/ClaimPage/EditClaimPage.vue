<script>
import {auth as $store} from "@/store/auth.model";
import ButtonBack from "@/components/UI/ButtonBack.vue";
import ClaimService from "@/store/claim.service.js";
import EditClaimForm from "@/components/Forms/Main/EditClaimForm.vue";
import CreateClaimForm from "@/components/Forms/Main/CreateClaimForm.vue";
import LoaderPage from "@/components/UI/LoaderPage.vue";

export default {
  name: "EditClaimPage",
  components: {LoaderPage, CreateClaimForm, EditClaimForm, ButtonBack},
  data(){
    return{
      tab: 'claim',
      uuidClaim: this.$route.params.uuid,
      load: false,
      claim: null,
      isUser: $store.state.user.type.system_name === "user",
      isReadOnly: false
    }
  },
  computed: {
    isDataDisabled(){
      const state = this.claim?.state_claim?.system_name
      return state === 'under_consideration' || state === 'accepted'
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
  watch: {
    tab(newVal){
      if(this.isDataDisabled && newVal === 'data'){
        this.$nextTick(()=>{ this.tab = 'claim' })
      }
    }
  },
  mounted() {
    this.getClaim()

  }
}
</script>

<template>
  <loader-page v-if="load === false"/>
  <v-container v-else>
    <v-tabs
        v-model="tab"
        align-tabs="center"
        color="deep-purple-accent-4"
    >
      <v-tab value="claim">Главная вкладка</v-tab>
      <v-tab value="data" :disabled="isDataDisabled">Данные</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab" class="overflow-visible">
      <v-tabs-window-item value="claim">
        <v-container>
          <edit-claim-form :uuidClaim="claim.uuid" :read-only="isReadOnly"/>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="data">
        <v-container>
          <create-claim-form :uuid="claim.uuid" @create="updateClaimData" ref="createClaimForm"/>
        </v-container>
      </v-tabs-window-item>


    </v-tabs-window>
    <button-back/>
  </v-container>
</template>

<style scoped>

</style>