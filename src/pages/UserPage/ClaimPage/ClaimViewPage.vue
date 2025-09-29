<script>
import ClaimTable from "@/components/Tabels/ClaimTable.vue";
import ClaimService from "@/store/claim.service";
import AddClaimForm from "@/components/Forms/Main/AddClaimForm.vue";

export default {
  name: "ClaimViewPage",
  components: {AddClaimForm, ClaimTable},
  data(){
    return{
    }
  },
  methods: {
    editClaim(uuidClaim){
      this.$router.push(`claim/edit/${uuidClaim}`)
    },
    loadClaim(claim){
      this.$refs.claimTable.loadItem(1)
    },
    deleteClaim(uuidClaim){
      ClaimService.deleteClaim(uuidClaim).then(()=>{
        this.$refs.claimTable.loadItem(1)
      })
    },
    updateStateClaim(uuidClaim){
      ClaimService.updateStateClaim(uuidClaim, 'under_consideration')
      .then(() => {
        this.$refs.claimTable.loadItem(1)
      })
    },
    downgradeStateClaim(uuidClaim){
      ClaimService.updateStateClaim(uuidClaim, 'draft')
          .then(() => {
            this.$refs.claimTable.loadItem(1)
          })
    },
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <claim-table @edit="editClaim"
                   @delete="deleteClaim"
                   @updateStateClaim="updateStateClaim"
                   @downgradeStateClaim="downgradeStateClaim"
                   ref="claimTable"/>
    </v-col>
    <add-claim-form @save="loadClaim"/>
  </v-row>
</template>

<style scoped>

</style>