import { defineStore } from "pinia";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const createWizardStore = defineStore("wizardStore", {
  state: () => ({
    products: [],
  }),
  actions: {
    async search() {
      const searchedWord = localStorage.getItem("searchedWord");
      const db = getFirestore();
      const productsRef = collection(db, "products");

      const productSnapshot = await getDocs(productsRef);

      if (!productSnapshot.empty) {
        this.products = productSnapshot.docs
          .map((doc) => doc.data())
          .filter((product) => {
            const { title, description, model } = product;
            return (
              title.toLowerCase().includes(searchedWord.toLowerCase()) ||
              description.toLowerCase().includes(searchedWord.toLowerCase()) ||
              model.toLowerCase().includes(searchedWord.toLowerCase())
            );
          });

        console.log(this.products);
      } else {
        this.products = [];
        console.log("Ürün bulunamadı.");
      }

      this.$router.push("/search");
    },
  },
});
