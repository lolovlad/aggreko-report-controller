<script>
import BlueprintTable from "@/components/Tabels/BlueprintTable.vue";
import BlueprintService from "@/store/blueprint.service.js";
import FixedButton from "@/components/UI/FixedButton.vue";
import {createRouter as $route} from "vue-router";
import AddBlueprintForm from "@/components/Forms/Main/AddBlueprintForm.vue";

export default {
  name: "ViewUserBlueprintPage",
  components: {AddBlueprintForm, FixedButton, BlueprintTable},
  methods: {
    $route,
    addClaim(uuidBlueprint) {
      this.$router.push(`blueprint/create_claim/${uuidBlueprint}`)
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
        <blueprint-table ref="blueprintTable"
                         :mode="'user'"
                         @addClaim="addClaim"

        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>