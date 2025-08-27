<template>
  <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
  >
    <template v-slot:activator="{ props: activatorProps }">
      <fixed-button
          v-bind="activatorProps"
      />
    </template>

    <v-card>
      <v-toolbar>
        <v-btn
            icon="mdi-close"
            @click="dialog = false"
        ></v-btn>

        <v-toolbar-title>{{title}}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn
              text="Сохранить"
              variant="text"
              @click="saveAccident"
          ></v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                  label="Назвыание *"
                  variant="underlined"
                  v-model="claim.name"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <select-blueprint v-model="claim.blueprint"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <select-equipment v-model="claim.equipment"/>
            </v-col>
            <v-col cols="12" md="12">
              <small class="text-caption text-medium-emphasis">* - Поле обязательное</small>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ItemObjectSelection from "@/components/UI/ItemObjectSelection.vue";
import moment from 'moment-timezone';
import SelectEquipment from "@/components/UI/Models/SelectEquipment.vue";
import SelectBlueprint from "@/components/UI/Models/SelectBlueprint.vue";
import FixedButton from "@/components/UI/FixedButton.vue";
import ClaimService from "@/store/claim.service.js";
export default {
  name: "AddClaimForm",
  components: {FixedButton, SelectBlueprint, SelectEquipment, ItemObjectSelection},
  props: {
    title: {
      type: String,
      default: "Добавить АО"
    }
  },
  data(){
    return{
      dialog: false,
      step: 1,
      claim: {
        blueprint: null,
        equipment: null,
        name: null,
      },

      claimSchama: {
        blueprint: null,
        equipment: null,
        name: null,
      }
    }
  },
  methods: {
    validate(){
      if(this.claim.blueprint != null)
        if(this.claim.equipment != null)
          if(this.claim.name != null)
            return true
      return false
    },

    saveAccident(){
      if(this.validate()){
        ClaimService.add({
          name: this.claim.name,
          uuid_blueprint: this.claim.blueprint.uuid,
          uuid_equipment: this.claim.equipment.uuid,
        }).then(() => {
          this.$emit("save", this.claim)
          this.$nextTick(() => {
            this.clearForm()
            this.dialog = false
          })
        })
      }
    },
    clearForm(){
      Object.assign(this.claim, this.claimSchama)
    }
  }
}
</script>

<style scoped>

</style>