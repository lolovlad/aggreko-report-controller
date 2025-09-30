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
    <!-- Блок 1: Комментарии, загрузка файлов и сохранение -->
    <v-card class="mb-6 pa-4" elevation="2" color="grey-lighten-5">
      <v-card-title class="text-h6 text-primary mb-4">
        <v-icon class="mr-2">mdi-comment-text</v-icon>
        Комментарии и файлы
      </v-card-title>
      
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
        <v-col cols="12" sm="12" v-if="!readOnly">
          <v-file-input label="Главный файл" variant="underlined" v-model="claim.mainFile" accept=".docx"/>
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" sm="12" v-if="!readOnly">
          <v-file-input label="Файл с правками" variant="underlined" v-model="claim.editFile" accept=".docx"/>
        </v-col>
      </v-row>
      
      <v-row class="mt-4" v-if="!isUser">
        <v-col cols="auto">
          <v-btn 
            type="submit" 
            @click="saveChange"
            :style="{ backgroundColor: 'rgb(45, 53, 64)', color: 'white' }"
            prepend-icon="mdi-content-save"
          >
            Сохранить изменения
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Блок 2: Генерация файла и ссылки на скачивание -->
    <v-card class="pa-4" elevation="2" color="blue-lighten-5">
      <v-card-title class="text-h6 text-primary mb-4">
        <v-icon class="mr-2">mdi-file-document-edit</v-icon>
        Генерация и скачивание документов
      </v-card-title>
      
      <v-row>
        <v-col cols="12" sm="6">
          <v-card variant="outlined" class="pa-3" color="blue-lighten-4">
            <v-card-title class="text-subtitle-1 mb-2">
              <v-icon class="mr-2">mdi-cog</v-icon>
              Генерация файла
            </v-card-title>
            <p class="text-body-2 mb-3">Сгенерировать новый файл заявки на основе текущих данных</p>
            <generate-claim-button @confirm="generateFile" :uuid-claim="uuidClaim"/>
          </v-card>
        </v-col>
        
        <v-col cols="12" sm="6">
          <v-card variant="outlined" class="pa-3" color="green-lighten-4">
            <v-card-title class="text-subtitle-1 mb-2">
              <v-icon class="mr-2">mdi-download-multiple</v-icon>
              Скачать документы
            </v-card-title>
            <div class="d-flex flex-column gap-2">
              <v-btn 
                v-if="mainFileClaimRef"
                :href="mainFileClaimRef"
                variant="outlined"
                color="primary"
                prepend-icon="mdi-file-document"
                target="_blank"
              >
                Главный файл
              </v-btn>
              <v-btn 
                v-if="editFileClaimRef"
                :href="editFileClaimRef"
                variant="outlined"
                color="success"
                prepend-icon="mdi-file-document-edit"
                target="_blank"
              >
                Файл с правками
              </v-btn>
              <p v-if="!mainFileClaimRef && !editFileClaimRef" class="text-center">
                Нет доступных файлов для скачивания
              </p>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<style scoped>
/* Основной цвет текста */
.v-card,
.v-card-title,
.v-card-text,
p,
.v-textarea label,
.v-file-input label,
.v-btn {
  color: rgb(45, 53, 64) !important;
}

/* Стили для первого блока - комментарии и файлы */
.v-card:first-of-type {
  border-left: 4px solid #1976d2;
  transition: box-shadow 0.3s ease;
}

.v-card:first-of-type:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

/* Стили для второго блока - генерация и скачивание */
.v-card:last-of-type {
  border-left: 4px solid #4caf50;
  transition: box-shadow 0.3s ease;
}

.v-card:last-of-type:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

/* Стили для подблоков во втором блоке */
.v-card .v-card {
  transition: transform 0.2s ease;
}

.v-card .v-card:hover {
  transform: translateY(-2px);
}

/* Стили для ссылок скачивания */
a.text-decoration-none {
  color: rgb(45, 53, 64) !important;
  font-weight: 500;
  transition: color 0.2s ease;
}

a.text-decoration-none:hover {
  color: rgb(35, 43, 54) !important;
}

/* Стили для кнопок скачивания */
.v-btn[target="_blank"] {
  margin-bottom: 8px;
}

/* Исправление прозрачности текста */
.v-card-title,
.v-card-text,
.text-subtitle-1,
.text-body-2,
p {
  opacity: 1 !important;
  color: rgb(45, 53, 64) !important;
  padding-left: 0;
}

/* Стили для иконок */
.v-icon {
  color: rgb(45, 53, 64) !important;
}

/* Стили для кнопки сохранения */
.v-btn[type="submit"] {
  background-color: rgb(45, 53, 64) !important;
  color: white !important;
  border: 1px solid rgb(45, 53, 64) !important;
}

.v-btn[type="submit"]:hover {
  background-color: rgb(35, 43, 54) !important;
  border-color: rgb(35, 43, 54) !important;
}

.v-btn[type="submit"] .v-btn__content {
  color: white !important;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 600px) {
  .v-card {
    margin-bottom: 16px;
  }
  
  .v-card .v-card {
    margin-bottom: 12px;
  }
}
</style>