<template>
  <!-- Contact Form -->
  <div
    class="w-full bg-[url(/public/OurMissionBg.jpg)] bg-center bg-cover mt-20 relative top-16 h-[600px] py-10"
  >
    <h2 class="text-white text-center font-bold text-4xl mb-10">
      Bizimle İletişime Geç
    </h2>

    <form
      id="contact"
      action="https://formspree.io/f/xleykkol"
      method="POST"
      class="max-w-xl px-3 w-full mx-auto flex flex-col"
    >
      <label for="Mail" class="text-gray-400">Email*</label>
      <input
        required
        class="p-2.5 w-full rounded-md"
        placeholder="Email"
        type="email"
        name="email"
        id="Mail"
      />

      <label for="message" class="text-gray-400 mt-4">Mesaj*</label>
      <textarea
        style="resize: none"
        required
        class="rounded-md p-2.5 w-full"
        placeholder="Mesajınız"
        name="message"
        id="message"
        cols="30"
        rows="8"
        maxlength="1000"
      ></textarea>

      <Button class="mx-auto w-full mt-4" type="submit" :buttonType="'blue'"
        >Gönder</Button
      >
    </form>
  </div>
</template>

<script>
import Button from "./Common/Button.vue";

export default {
  components: { Button },
};
</script>
