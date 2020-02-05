<template>
  <main class="py-5 px-5 bg-blue-100 flex justify-between items-center">
    <nav>
      <ul class="flex w-1/2">
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
    <div class="w-1/2 flex justify-end items-center">
      <div class="w-auto flex text-gray-600 font-semibold items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 512 512"
          width="20px"
          class="hovered-paths"
        >
          <g>
            <path
              d="m256 335.265625c-71.492188 0-129.65625 58.164063-129.65625 129.65625 0 4.136719.203125 8.226563.585938 12.261719 38.746093 22.699218 82.972656 34.816406 129.070312 34.816406s90.324219-12.117188 129.070312-34.816406c.382813-4.039063.585938-8.125.585938-12.261719 0-71.492187-58.164062-129.65625-129.65625-129.65625zm0 0"
              data-original="#000000"
              class="hovered-path active-path"
              data-old_color="#000000"
              fill="#718096"
            />
            <path
              d="m437.019531 74.980469c-48.351562-48.351563-112.636719-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.636719-74.980469 181.019531 0 68.378906 26.628906 132.667969 74.980469 181.019531 6.882812 6.886719 14.101562 13.3125 21.597656 19.300781 3.355469-62.859374 43.238281-116.175781 98.753906-139.066406-30.515625-19.894531-50.730469-54.320312-50.730469-93.386718 0-61.425782 49.972657-111.398438 111.398438-111.398438s111.398438 49.972656 111.398438 111.398438c0 39.066406-20.214844 73.492187-50.730469 93.386718 55.515625 22.890625 95.398437 76.207032 98.753906 139.066406 7.496094-5.988281 14.714844-12.417968 21.597656-19.300781 48.351563-48.351562 74.980469-112.640625 74.980469-181.019531 0-68.382812-26.628906-132.667969-74.980469-181.019531zm0 0"
              data-original="#000000"
              class="hovered-path active-path"
              data-old_color="#000000"
              fill="#718096"
            />
            <path
              d="m337.398438 223.867188c0-44.886719-36.515626-81.398438-81.398438-81.398438s-81.398438 36.515625-81.398438 81.398438c0 44.882812 36.515626 81.398437 81.398438 81.398437s81.398438-36.515625 81.398438-81.398437zm0 0"
              data-original="#000000"
              class="hovered-path active-path"
              data-old_color="#000000"
              fill="#718096"
            />
          </g>
        </svg>

        <span class="text-bold ml-2">{{ user.name }} {{ user.surname }}</span>
      </div>
      <div class="w-auto ml-5 py-2 px-2 rounded text-white bg-blue-500">
        <button @click="logout()" class="text-white">Выйти</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "DashboardHeader",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    logout() {
      window.location.reload();
    }
  },
  created() {
    this.user = this.$store.getters.getUser;
  }
};
</script>

<style scoped></style>
