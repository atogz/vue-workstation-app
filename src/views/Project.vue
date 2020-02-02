<template>
  <main>
    <app-header />
    {{ id }}
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
    }
  }
};
</script>

<style scoped></style>
