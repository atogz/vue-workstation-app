<template>
  <main class="container mx-auto flex justify-center">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
            >Логин</label
          >
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Логин"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
            >Пароль</label
          >
          <input
            v-model="password"
            :class="{ 'border-red-500': error }"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p class="text-red-500 text-xs italic" v-if="error">{{ error }}</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
            type="button"
            @click="login()"
          >
            Войти
          </button>
          <input
            v-model="password"
            :class="{ 'border-red-500': error }"
            class="test"
            id="password1"
            type="password"
            placeholder="2321312"
          />
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    async login() {
      try {
        await this.$store
          .dispatch("LOGIN", {
            username: this.username,
            password: this.password
          })
          .then(() => {
            this.$router.push("/dashboard");
          });
      } catch (e) {
        this.error = e;
      }
    }
  }
};
</script>

<style></style>
