import { defineStore } from "pinia";
import { getFirestore, collection, getDocs } from "firebase/firestore";
export const createWizardStore = defineStore("counter", {
  state: () => ({
    products: [],
    loading: false,
    emptyResult: false,
    priceRanges: [],
    navbarAndFooterVisibility: true,
    feedBackMessageVisible: false,
  }),

  actions: {
    // Search
    async search() {
      this.loading = true;
      this.emptyResult = false;
      const searchedWordMethod = localStorage.getItem("searchedWord");
      const searchedCategoryMethod = localStorage.getItem("searchedCategory");

      // Control SearchedWord and searchedCategory
      const searchedWord = searchedWordMethod
        ? JSON.parse(searchedWordMethod)
        : null;
      const searchedCategory = searchedCategoryMethod
        ? JSON.parse(searchedCategoryMethod)
        : null;

      const db = getFirestore();
      const productsRef = collection(db, "products");
      const productSnapshot = await getDocs(productsRef);

      if (productSnapshot.docs.length > 0) {
        this.products = productSnapshot.docs
          .map((doc) => doc.data())
          .filter((product) => {
            const { title, description, model, category_name, category_id } =
              product;
            if (searchedWord && searchedCategory) {
              if (searchedWord.addingDate > searchedCategory.addingDate) {
                return (
                  (title &&
                    title
                      .toLowerCase()
                      .includes(searchedWord.word.toLowerCase())) ||
                  (description &&
                    description
                      .toLowerCase()
                      .includes(searchedWord.word.toLowerCase())) ||
                  (model &&
                    model
                      .toLowerCase()
                      .includes(searchedWord.word.toLowerCase())) ||
                  (category_name &&
                    category_name
                      .toLowerCase()
                      .includes(searchedWord.word.toLowerCase()))
                );
              } else {
                return category_id == searchedCategory.category_id;
              }
            } else if (!searchedWord && searchedCategory) {
              return category_id == searchedCategory.category_id;
            } else if (searchedWord && !searchedCategory) {
              return (
                (title &&
                  title
                    .toLowerCase()
                    .includes(searchedWord.word.toLowerCase())) ||
                (description &&
                  description
                    .toLowerCase()
                    .includes(searchedWord.word.toLowerCase())) ||
                (model &&
                  model
                    .toLowerCase()
                    .includes(searchedWord.word.toLowerCase())) ||
                (category_name &&
                  category_name
                    .toLowerCase()
                    .includes(searchedWord.word.toLowerCase()))
              );
            } else {
              return (
                category_name &&
                category_name.toLowerCase().includes("Bilgisayar")
              );
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

      // Get Price Ranges
      const prices = this.products.map((product) => {
        const discountedPrice = product.discount
          ? product.price - (product.price * product.discount) / 100
          : product.price;
        return discountedPrice;
      });

      const uniquePrices = Array.from(new Set(prices));

      uniquePrices.sort((a, b) => a - b);

      const priceRanges = [];
      const numRanges = 5;
      const rangeWidth = uniquePrices.length / numRanges;

      for (let i = 0; i < numRanges; i++) {
        const startIndex = Math.floor(i * rangeWidth);
        const endIndex =
          i === numRanges - 1
            ? uniquePrices.length
            : Math.floor((i + 1) * rangeWidth);

        if (endIndex > startIndex) {
          const minPrice = uniquePrices[startIndex];
          const maxPrice = uniquePrices[endIndex - 1];

          priceRanges.push({
            id: i,
            min: Math.floor(minPrice / 1000) * 1000,
            max: Math.ceil(maxPrice / 1000) * 1000,
            activity: false,
          });
        }
      }

      this.priceRanges = priceRanges;
    },

    // Add Searched Category
    addSearchedCategory(category_id, category_name) {
      const now = Date.now();
      const data = {
        category_id: category_id,
        category_name: category_name,
        addingDate: now,
      };

      localStorage.setItem("searchedCategory", JSON.stringify(data));

      if (this.$route.path.includes("/search")) {
        window.location.reload();
      } else {
        this.$router.push("/search");
      }

      console.log(this.$router.path);
    },
  },
});
