<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-[80vh]"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="/Logos/sckn.png" alt="" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Kullanıcı Adı</label
          >
          <div class="mt-0.5">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              v-model="email"
            />
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Şifre</label
          >
          <div class="mt-0.5">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              v-model="password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="!email || !password"
            class="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Giriş
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("Successfully signed in", userCredential.user);
        this.$router.push("/lorem-seckn_bil-admin");
      } catch (error) {
        console.error("Error signing in:", error);
        console.error("Firebase detailed error:", error.code, error.message);
        alert(error.message);
      }
    },
  },
};
</script>
