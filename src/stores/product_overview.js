import { defineStore } from "pinia";

export const createWizardStore = defineStore("counter", {
  state: () => ({
    currentProduct: {},
  }),
  actions: {},
});
