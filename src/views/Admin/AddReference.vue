<template>
  <!-- Add Reference -->
  <div
    class="w-full bg-gray-100"
    :class="{
      'opacity-70': loading === true,
    }"
  >
    <div
      class="w-full max-w-7xl mx-auto bg-gray-100 px-3 py-10 flex justify-center flex-col gap-10"
    >
      <!-- Upload Images -->
      <div class="card mt-4">
        <p class="font-light">Referans Fotoğrafları Ekle</p>
        <FileUpload
          ref="fileUploadRef"
          :customUpload="true"
          :multiple="true"
          accept="image/*"
          :maxFileSize="1000000"
          @change="handleFileUpload"
        >
          <template #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </div>

      <!-- Save -->
      <Button
        class="bg-[#10b981] text-white px-5 p-2.5 mr-auto"
        label="Kaydet"
        @click="alertPopupVivible = true"
        :disabled="!isButtonDisabled"
      />

      <!-- Alert Popup -->
      <Dialog
        id="dlg"
        header="Uyarı"
        v-model:visible="alertPopupVivible"
        :style="{ width: '30vw' }"
        class="text-center"
      >
        <p>Ürünü Kaydetmek İstiyor musunuz ?</p>
        <div class="flex justify-center items-center mt-4 gap-4">
          <Button
            class="bg-[#10b981] text-white px-5 p-2.5"
            label="Kaydet"
            @click="saveReferences"
          />

          <Button
            class="bg-red-300 p-2.5"
            label="İptal Et"
            @click="alertPopupVivible = false"
          />
        </div>
      </Dialog>

      <!-- Feedback Messages -->
      <div class="fixed top-5 right-5 max-w-sm">
        <Message :hidden="!succesMessage" severity="success">Başarılı </Message>

        <Message :hidden="!errorMessage" severity="error"
          >Bir Şeyler Ters Gitti
        </Message>

        <Message :hidden="!warnMessage" severity="warn"
          >Lütfen Kutuları Eksiksiz Doldurun
        </Message>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpload from "primevue/fileupload";
import Button from "primevue/button";
import ConfirmPopup from "primevue/confirmpopup";
import Dialog from "primevue/dialog";
import Message from "primevue/message";

import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";

export default {
  components: {
    FileUpload,
    Button,

    ConfirmPopup,
    Dialog,
    Message,
  },
  data() {
    return {
      loading: false,
      imageUrls: [],
      alertPopupVivible: false,
      succesMessage: false,
      errorMessage: false,
      warnMessage: false,
      isButtonDisabled: false,
    };
  },
  methods: {
    async handleFileUpload(event) {
      const uploadedFiles = event.files || [];

      this.$nextTick(() => {
        this.isButtonDisabled = uploadedFiles.length === 0;
      });
    },

    // Save
    async saveReferences() {
      const storage = getStorage();
      this.loading = true;
      if (
        this.$refs.fileUploadRef.files &&
        this.$refs.fileUploadRef.files.length > 0
      ) {
        for (const file of this.$refs.fileUploadRef.files) {
          const storageRef = ref(
            storage,
            `references/${Date.now()}_${file.name}`
          );
          try {
            await uploadBytes(storageRef, file);
          } catch (error) {
            console.error("Dosya yükleme hatası: ", error);
            this.alertPopupVivible = false;
            this.errorMessage = true;
          }
        }

        this.succesMessage = true;
        this.loading = false;
        this.alertPopupVivible = false;
        window.location.reload();
      } else {
        this.alertPopupVivible = false;
        this.loading = false;
        this.warnMessage = true;
      }
    },
  },
};
</script>
