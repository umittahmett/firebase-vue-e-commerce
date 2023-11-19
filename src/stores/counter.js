import { defineStore } from "pinia";
import { getFirestore, collection, getDocs } from "firebase/firestore";
export const createWizardStore = defineStore("counter", {
  state: () => ({
    products: [],
    loading: false,
    emptyResult: false,
    priceRanges: [],
  }),
  actions: {
    async search() {
      this.loading = true;
      this.emptyResult = false;
      const searchedWordMethod = JSON.parse(
        localStorage.getItem("searchedWord")
      );
      const searchedWord = searchedWordMethod;

      const searchedCategoryMethod = JSON.parse(
        localStorage.getItem("searchedCategory")
      );
      const searchedCategory = searchedCategoryMethod;
      const db = getFirestore();
      const productsRef = collection(db, "products");

      const productSnapshot = await getDocs(productsRef);

      if (!productSnapshot[0]) {
        this.products = productSnapshot.docs
          .map((doc) => doc.data())
          .filter((product) => {
            const { title, description, model, category_id } = product;
            if (searchedWord.addingDate > searchedCategory.addingDate) {
              return (
                title.toLowerCase().includes(searchedWord.word.toLowerCase()) ||
                description
                  .toLowerCase()
                  .includes(searchedWord.word.toLowerCase()) ||
                model.toLowerCase().includes(searchedWord.word.toLowerCase())
              );
            } else {
              return category_id == searchedCategory.category_id;
            }
          });
        this.loading = false;

        if (!this.products[0]) {
          this.emptyResult = true;
          console.log("Ürün bulunamadı.");
          this.loading = false;
        }
      } else {
        console.log("Ürün bulunamadı.");
        this.loading = false;
      }

      const allPrices = this.products.map((product) =>
        product.discount
          ? (product.price * product.discount) / 100
          : product.price
      );

      const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
      const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;
      this.priceRanges = [];

      for (let i = 0; i < 5; i++) {
        const rangeWidth = (maxPrice - minPrice) / 5;
        const minRange = minPrice + i * rangeWidth;
        const maxRange = minPrice + (i + 1) * rangeWidth;

        // Fiyat aralığında en az bir ürün var mı kontrol et
        const hasProductsInRange = this.products.some(
          (product) =>
            (product.discount
              ? (product.price * product.discount) / 100
              : product.price) >= minRange &&
            (product.discount
              ? (product.price * product.discount) / 100
              : product.price) < maxRange
        );

        if (hasProductsInRange) {
          this.priceRanges.push({
            id: i,
            min: Math.floor(minRange / 1000) * 1000,
            max: Math.ceil(maxRange / 1000) * 1000,
            activity: false,
          });
        }
      }
    },

    addSearchedCategory(category_id) {
      const now = Date.now();
      const data = {
        category_id: category_id,
        category_name:
          category_id == 0
            ? "Bilgisayar"
            : category_id == 1
            ? "Laptop"
            : category_id == 2
            ? "Monitör"
            : category_id == 3
            ? "Güvenlik Kamerası"
            : "kategori",

        addingDate: now,
      };

      localStorage.setItem("searchedCategory", JSON.stringify(data));
    },
  },
});
