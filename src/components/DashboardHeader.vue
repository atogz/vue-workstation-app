<template>
  <nav>
    <ul class="flex py-5 px-5 bg-blue-100">
      <li class="mr-3">
        <router-link
          class="inline-block py-1 px-3"
          to="/projects"
          active-class="bg-blue-500 border border-blue-500 rounded text-white"
        >
          Объекты
        </router-link>
      </li>
      <li class="mr-3">
        <a
          class="inline-block hover:border-gray-200 border-0 rounded text-blue-500 hover:bg-gray-200 py-1 px-3"
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
  </nav>
</template>

<script>
export default {
  name: "DashboardHeader",
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = this.$store.getters.getUser;
  }
};
</script>

<style scoped></style>
