<template>
  <main>
    <app-header />
    <div class="flex flex-wrap py-5 px-5">
      <div
        class="w-1/4 flex flex-col"
        v-for="project in getProjects"
        :key="project.id"
      >
        <div class="w-full">
          {{ project.name }}
        </div>
        <div class="w-full mt-5">
          {{ project.id }}
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import DashboardHeader from "../components/DashboardHeader";

export default {
  components: {
    "app-header": DashboardHeader
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {},
  computed: {
    getProjects() {
      return this.$store.getters.getProjects;
    }
  },

  created() {
    this.$loading(true);
    this.$store.dispatch("GET_PROJECTS").then(() => {
      this.$loading(false);
    });
  }
};
</script>

<style scoped></style>
