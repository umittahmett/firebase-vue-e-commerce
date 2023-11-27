<template>
  <div
    class="w-full bg-gray-100"
    :class="{
      'opacity-70': loading === true,
    }"
  >
    <div class="w-full max-w-7xl mx-auto bg-gray-100 px-3 py-10">
      <Button
        class="bg-[#10b981] text-white px-5 p-2.5"
        label="Özellik Ekle"
        @click="AddInput()"
        icon="pi pi-plus"
      />

      <p class="font-light mt-4">Kategori Adı</p>
      <InputText
        class="w-full max-w-[400px] p-2.5"
        type="text"
        v-model="categoryName"
        placeholder="Kategori Adı"
      />

      <div
        v-for="numInput in Inputs"
        :key="numInput"
        class="flex items-end justify-start gap-2"
      >
        <div>
          <p class="font-light mt-4">Özellik</p>
          <div class="flex justify-start items-center gap-2">
            <InputText
              class="w-full max-w-[400px] p-2.5"
              type="text"
              v-model="numInput.name"
              placeholder="Özellik Adı"
            />

            <InputText
              class="w-full max-w-[400px] p-2.5"
              type="text"
              v-model="numInput.unit_name"
              placeholder="Değer"
            />
          </div>
        </div>

        <Button
          class="bg-[#10b981] text-white px-5 p-2.5"
          icon="pi pi-times"
          severity="danger"
          aria-label="Cancel"
          @click="DeleteInput(numInput.id)"
        />
      </div>

      <!-- Save -->
      <Button
        class="bg-[#10b981] text-white px-5 p-2.5 mt-8"
        label="Kaydet"
        @click="alertPopupVivible = true"
      />

      <!-- Allow Popup -->
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
            @click="saveCategory"
          />

          <Button
            class="bg-red-300 p-2.5"
            label="İptal Et"
            @click="alertPopupVivible = false"
          />
        </div>
      </Dialog>

      <!-- Messages -->
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
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ConfirmPopup from "primevue/confirmpopup";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";
import Message from "primevue/message";

import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export default {
  components: {
    FileUpload,
    Toast,
    Button,
    Dropdown,
    InputText,
    Textarea,
    InputNumber,
    ConfirmPopup,
    Dialog,
    Message,
  },
  data() {
    return {
      loading: false,
      alertPopupVivible: false,
      succesMessage: false,
      errorMessage: false,
      warnMessage: false,
      featureTypes: [],
      features: null,
      categoryName: "",
      saveButtonDisabled: false,
      Inputs: [
        {
          id: 0,
          name: null,
          unit_name: null,
        },
      ],
    };
  },
  methods: {
    AddInput() {
      this.Inputs.push({
        id: this.Inputs.length + 1,
        name: "",
        unit_name: "",
      });
    },

    DeleteInput(id) {
      this.Inputs = this.Inputs.filter((input) => input.id !== id);
    },

    async saveCategory() {
      this.loading = true;

      if (this.categoryName) {
        this.alertPopupVivible = false;
        this.succesMessage = true;

        try {
          const db = getFirestore();

          const categoriesCollection = collection(db, "categories");
          const catCollRef = await addDoc(categoriesCollection, {
            name: this.categoryName,
          });
          const updatedCategoryDoc = doc(db, "categories", catCollRef.id);
          await updateDoc(updatedCategoryDoc, { id: catCollRef.id });

          const prodCatFeaturesCollection = collection(
            db,
            "product_cetegory_features"
          );

          const batch = writeBatch(db);

          this.Inputs.forEach((featureType) => {
            const newDocRef = doc(prodCatFeaturesCollection);
            // feature nesnesine id ekleyerek Firestore'a ekle
            batch.set(newDocRef, {
              id: newDocRef.id,
              name: featureType.name,
              unit_name: featureType.unit_name,
              category_id: catCollRef.id,
            });
          });

          // İşlem yığınını gerçekleştir
          await batch.commit();

          this.succesMessage = true;
          this.loading = false;
          window.location.reload();
        } catch (error) {
          console.log(error);
          this.errorMessage = true;
          this.loading = false;
        }
      } else {
        console.log("kutulari eksiksiz doldurun");
        this.warnMessage = true;
      }
    },

    valueControl() {
      if (this.categoryName) {
        let isAnyInputEmpty = false;

        this.Inputs.forEach((input) => {
          if (!input.name) {
            isAnyInputEmpty = true;
          }
        });

        this.saveButtonDisabled = isAnyInputEmpty;
      } else {
        this.saveButtonDisabled = true;
      }

      console.log("Save Button Disabled: ", this.saveButtonDisabled);
    },
  },

  async mounted() {},
};
</script>
