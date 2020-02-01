<template>
  <main>
    <ul class="flex py-5 px-5 bg-blue-100">
      <li class="mr-3">
        <router-link to="/dashboard/projects">
          <a class="inline-block py-1 px-3" href="#">Объекты</a>
        </router-link>
      </li>
      <li class="mr-3">
        <a
          class="inline-block hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3"
          href="#"
          >Бригады</a
        >
      </li>
      <li class="mr-3" v-if="user.role === 'admin'">
        <a
          class="inline-block hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3"
          href="#"
          >Управление</a
        >
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    async test() {
      try {
        await this.$store.dispatch("GET_USER_DATA");
      } catch (e) {
        this.error = e;
      }
    }
  },
  created() {
    this.user = this.$store.getters.getUser;
  }
};
</script>

<style scoped></style>
