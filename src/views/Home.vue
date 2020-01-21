<template>
  <main>
    {{ getAuth }}
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getAuth() {
      return this.$store.getters.isAuthorized;
    }
  }
};
</script>
