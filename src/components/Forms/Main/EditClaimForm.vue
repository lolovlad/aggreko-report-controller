<script>
import ClaimService from "@/store/claim.service.js";
import router from "@/router/router.js";
import {auth as $store} from "@/store/auth.model.js";
import GenerateClaimButton from "@/components/UI/Buttons/GenerateClaimButton.vue";
import LoaderPage from "@/components/UI/LoaderPage.vue";

export default {
  name: "EditClaimForm",
  components: {LoaderPage, GenerateClaimButton},
  props: {
    uuidClaim: {
      type: String,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      isUser: $store.state.user.type.system_name === "user",
      claim: {
        mainFile: null,
        editFile: null,
        comment: null,
        stateClaim: null
      },
      mainFileClaimRef: null,
      editFileClaimRef: null,
      datetime: null,

      mainFileClaim: null,
      editFileClaim: null,

      loader: true
    }
  },
  methods:{
    getClaim(){
      ClaimService.get(this.uuidClaim).then((claim) => {
        this.editFileClaimRef = claim.download_link_edit
        this.mainFileClaimRef = claim.download_link_main
        this.claim.comment = claim.comment
        this.datetime = claim.datetime
        this.claim.stateClaim = claim.state_claim

        this.loader = false
      })
    },
    saveChange(){
      let form = new FormData()
      if (this.claim.mainFile) {
        form.append("file_main", this.claim.mainFile)
      }

      if (this.claim.editFile) {
        form.append("file_edit", this.claim.editFile)
      }

      if (this.claim.comment !== null && this.claim.comment !== undefined) {
        form.append("comment", this.claim.comment)
      }
      ClaimService.updateClaim(this.uuidClaim, form).then(()=>{
          router.back(-1)
      })
    },
    generateFile(){
      this.getClaim()
    }
  },
  mounted() {
    this.getClaim()
  }
}
</script>

<template>
  <loader-page v-if="loader"/>
  <v-form @submit.prevent v-else>
    <v-row>
      <v-col cols="12" sm="12">
        <v-textarea
            label="Комментарии"
            variant="underlined"
            auto-grow
            v-model="claim.comment"
            :readonly="isUser"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2" v-if="mainFileClaimRef">
        <a :href="mainFileClaimRef">Скачать главный файл</a>
      </v-col>
      <v-col cols="12" sm="2" v-else>
        <p>Файл не загружен</p>
      </v-col>
      <v-col cols="12" sm="10" v-if="!readOnly">
        <v-file-input label="Файл" variant="underlined" v-model="claim.mainFile" accept=".docx"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2" v-if="editFileClaimRef">
        <a :href="editFileClaimRef">Скачать файл с правками</a>
      </v-col>
      <v-col cols="12" sm="2" v-else>
        <p>Файл не загружен</p>
      </v-col>
      <v-col cols="12" sm="10" v-if="!readOnly">
        <v-file-input label="Файл" variant="underlined" v-model="claim.editFile" accept=".docx"/>
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="auto" v-if="!isUser && claim.stateClaim.system_name === 'accepted'">
        <generate-claim-button @confirm="generateFile" :uuid-claim="uuidClaim"/>
      </v-col>
      <v-col cols="auto" v-if="!isUser">
        <v-btn class="mt-4" type="submit" @click="saveChange">Сохранить</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<style scoped>

</style>