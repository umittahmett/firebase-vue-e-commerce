<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileUpload" />
  </div>
</template>

<script>
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { getStorage, uploadBytes, ref } from "firebase/storage";

export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    async handleFileUpload() {
      const fileInput = this.$refs.fileInput;
      this.file = fileInput.files[0];

      const storage = getStorage();
      const storageRef = ref(
        storage,
        `products_images/${Date.now()}_${this.file.name}`
      );

      try {
        uploadBytes(storageRef, this.file).then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
      } catch (error) {
        console.error("Dosya yükleme hatası: ", error);
      }
    },
  },
};
</script>
