<script>
import ClaimService from "@/store/claim.service.js";
import router from "@/router/router.js";
import {auth as $store} from "@/store/auth.model.js";

export default {
  name: "EditClaimForm",
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
        comment: null
      },
      mainFileClaimRef: null,
      editFileClaimRef: null,
      datetime: null,

      mainFileClaim: null,
      editFileClaim: null,
    }
  },
  methods:{
    getClaim(){
      ClaimService.get(this.uuidClaim).then((claim) => {
        this.editFileClaimRef = claim.download_link_edit
        this.mainFileClaimRef = claim.download_link_main
        this.claim.comment = claim.comment
        this.datetime = claim.datetime
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
    }
  },
  mounted() {
    this.getClaim()
  }
}
</script>

<template>
  <v-form @submit.prevent>
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

    <v-btn class="mt-4" type="submit" @click="saveChange" v-if="!readOnly">Сохранить</v-btn>
  </v-form>
</template>

<style scoped>

</style>