<template>
  <main>
    <app-header />
    <div class="flex w-full py-5 px-5 items-center">
      <div class="w-1/2 flex max-w-full border-2 rounded">
        <div class="w-full flex items-center justify-around">
          <div class="w-1/3">
            <img :src="project.imageLink" alt="" />
          </div>
          <div class="w-2/3 text-center uppercase">
            <h3 class="text-xl">{{ project.name }}</h3>
          </div>
        </div>
      </div>
      <ul class="flex w-full ml-10">
        <li class="flex-1 mr-2">
          <a
            @click="activeScreen = 'tasks'"
            :class="{
              'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500':
                activeScreen === 'tasks'
            }"
            class="text-center block border border-white rounded hover:border-indigo-200 hover:bg-indigo-200 py-2 px-4 text-indigo-600"
            href="#"
            >Задачи</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            @click="activeScreen = 'materials'"
            :class="{
              'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500':
                activeScreen === 'materials'
            }"
            class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4"
            href="#"
            >Материалы</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            @click="activeScreen = 'brigade'"
            :class="{
              'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500':
                activeScreen === 'brigade'
            }"
            class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4"
            href="#"
            >Бригада</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            @click="activeScreen = 'estimate'"
            :class="{
              'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500':
                activeScreen === 'estimate'
            }"
            class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4"
            href="#"
            >Смета</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            @click="activeScreen = 'notes'"
            :class="{
              'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500':
                activeScreen === 'notes'
            }"
            class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4"
            href="#"
            >Заметки</a
          >
        </li>
      </ul>
    </div>

    <div class="w-full" v-if="activeScreen === 'tasks'">
      <div class="w-full flex flex-col" v-if="getProjectData.tasks.length">
        <div class="w-full flex py-5 px-5">
          <p>Задач: {{ getProjectData.tasks.length }}</p>
        </div>
        <div class="w-full mt-5 border-t-2 py-5 px-5">
          <div
            class="w-full py-5 px-5 mt-5 rounded overflow-hidden shadow-lg cursor-pointer border-2 border-gray-200 flex mt-5"
            v-for="task in getProjectData.tasks"
            :key="task.id"
          >
            <div class="w-full flex items-center justify-center">
              <div class="w-1/5 flex flex-col">
                <p class="text-xs flex items-center text-gray-600 pb-2">
                  #{{ task.id }}
                  <span class="ml-3 text-gray-800 font-bold text-lg">{{
                    task.name
                  }}</span>
                </p>
                <p
                  class="w-full flex justify-center h-12 items-center py-2 px-2 text-center text-sm uppercase bg-red-300"
                  :class="{ 'bg-green-300': task.completed }"
                >
                  {{ task.completed ? "Выполнена" : "Не выполнена" }}
                </p>
              </div>
              <div class="w-3/5 ml-10 text-sm text-gray-600 px-5 text-justify">
                <p>{{ task.description }}</p>
              </div>
              <button
                @click="
                  (task.completed = !task.completed),
                    changeTaskStatus(task.completed)
                "
                class="w-1/5 ml-20 py-5 px-5 border-2 border-gray-500 bg-gray-500 text-white rounded flex items-center justify-center hover:bg-gray-700 "
              >
                изменить статус
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col" v-else>
        <div class="w-full flex py-5 px-5">
          <p>Задач пока не добавлено1</p>
        </div>
      </div>
    </div>

    <div class="w-full" v-if="activeScreen === 'materials'">
      <div class="w-full flex flex-col" v-if="getProjectData.materials.length">
        <div class="w-full flex py-5 px-5">
          <p>Материалов: 3123 на сумму 32312 руб.</p>
        </div>
        <div
          class="w-full py-5 px-5 mt-5 rounded overflow-hidden shadow-lg cursor-pointer border-2 border-gray-200 flex mt-5"
          v-for="material in getProjectData.materials"
          :key="material.id"
        >
          <div class="w-full flex items-center justify-center">
            <div class="w-1/5 flex flex-col">
              <p class="text-xs flex items-center text-gray-600 pb-2">
                #{{ material.id }}
                <span class="ml-3 text-gray-800 font-bold text-lg">{{
                  material.name
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col" v-else>
        <div class="w-full flex py-5 px-5">
          <p>Задач пока не добавлено 2</p>
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
  props: {
    id: {
      type: Number
    },
    project: {
      type: Object
    }
  },
  data() {
    return {
      projectTasks: [],
      projectMaterials: [],
      activeScreen: "tasks"
    };
  },
  methods: {
    changeTaskStatus(status) {
      console.log("status ", status);
      if (status) {
        this.project.completedTasks++;
      } else {
        this.project.completedTasks--;
      }
    }
  },
  computed: {
    //todo  getter for completed tasks
    // completedProgress() {
    //   const percentage = Math.floor(
    //     (this.getProjectData.tasks.length / this.project.totalTasks) * 100
    //   );
    //   return percentage;
    // },
    getProjectData() {
      return this.$store.getters.getProjectData;
    }
  },
  created() {
    this.$loading(true);
    this.$store.dispatch("GET_PROJECT_DATA", this.project.id).then(() => {
      this.$loading(false);
    });
  }
};
</script>

<style scoped>
.text-white {
  color: #fff !important;
}
</style>
