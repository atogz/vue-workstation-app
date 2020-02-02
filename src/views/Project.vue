<template>
  <main>
    <app-header />
    {{ id }}
    {{ project }}
    <img :src="project.imageLink" alt="" class="max-w-xl"/>
  </main>
</template>

<script>
import DashboardHeader from "../components/DashboardHeader";

export default {
  components: {
    "app-header": DashboardHeader
  },
  props: {
    id: {
      type: Number
    },
    project: {
      type: Object
    }
  }
};
</script>

<style scoped></style>
