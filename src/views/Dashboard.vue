<template>
  <main>
    <button class="bg-blue-500" @click="test()">test</button>
    <div>123</div>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async test() {
      try {
        await this.$store.dispatch("GET_USER_DATA");
      } catch (e) {
        this.error = e;
      }
    }
  }
};
</script>

<style scoped></style>
