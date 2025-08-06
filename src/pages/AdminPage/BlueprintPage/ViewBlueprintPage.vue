<script>
import BlueprintTable from "@/components/Tabels/BlueprintTable.vue";
import BlueprintService from "@/store/blueprint.service.js";
import FixedButton from "@/components/UI/FixedButton.vue";
import {createRouter as $route} from "vue-router";
import AddBlueprintForm from "@/components/Forms/Main/AddBlueprintForm.vue";

export default {
  name: "ViewBlueprintPage",
  components: {AddBlueprintForm, FixedButton, BlueprintTable},
  methods: {
    $route,
    edit(uuidClaim) {
      this.$router.push(`blueprint/edit/${uuidClaim}`)
    },
    deleteB(uuidClaim) {
      BlueprintService.deleteClaim(uuidClaim).then(() => {
        this.$refs.claimTable.loadItem({page: 1, itemsPerPage: 20})
      })
    },
    save(){
      this.$refs.blueprintTable.saveState()
      this.$refs.blueprintTable.loadItem(1)
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <blueprint-table @edit="edit"
                         @delete="deleteB"
                         ref="blueprintTable"/>
      </v-col>
    </v-row>
    <add-blueprint-form @add="save"/>
  </v-container>
</template>

<style scoped>

</style>