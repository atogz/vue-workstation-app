<template>
  <main>
    <app-header />
    <div class="flex flex-wrap">
      <div
        class="max-w-sm py-5 px-5 mt-5 rounded overflow-hidden shadow-lg"
        v-for="(project, index) in getProjects"
        :key="project.id"
        :class="{ 'ml-8': index > 0 }"
      >
        <img
          class="w-full h-56"
          :src="project.imageLink"
          alt="Sunset in the mountains"
        />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ project.name }}</div>
          <p class="text-gray-700 text-base">
            {{ project.description }}
          </p>
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
