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
            class="text-center block border border-indigo-500 rounded py-2 px-4 bg-indigo-500 hover:bg-indigo-700 text-white"
            href="#"
            >Задачи</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4"
            href="#"
            >Материалы</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4"
            href="#"
            >Бригада</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4"
            href="#"
            >Смета</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4"
            href="#"
            >Заметки</a
          >
        </li>
      </ul>
    </div>

    <div class="w-full flex flex-col" v-if="getTasks.length">
      <div class="w-full flex py-5 px-5">
        <p>Задач: {{ project.totalTasks }}</p>
        <p class="ml-10">
          Выполнено: {{ project.completedTasks }}
          <b>({{ completedProgress }}%)</b>
        </p>
      </div>
      <div class="w-full mt-5 border-t-2 py-5 px-5">
        <div
          class="w-full flex flex-col"
          v-for="project in getTasks"
          :key="project.project_id"
        >
          <div
            class="w-full py-5 px-5 mt-5 rounded overflow-hidden shadow-lg cursor-pointer border-2 border-gray-200 flex mt-5"
            v-for="task in project.tasks"
            :key="task.id"
          >
            <div class="w-full flex items-center justify-center">
              <div class="w-1/5 flex flex-col">
                <p class="text-xs text-gray-600">#{{ task.id }}</p>
                <p
                  class="w-1/2 py-2 px-2 text-center text-xs uppercase bg-red-300"
                  :class="{ 'bg-green-300': task.completed }"
                >
                  {{ task.completed ? "Выполнена" : "Не выполнена" }}
                </p>
                <p>{{ task.name }}</p>
              </div>
              <div class="w-3/5 text-sm text-gray-600 px-5 text-justify">
                <p>{{ task.description }}</p>
              </div>
              <button
                @click="task.completed = !task.completed, changeTaskStatus(task.completed)"
                class="w-1/5 text-right py-5 px-5 border-2 border-gray-500 bg-gray-500 text-white rounded flex items-center justify-center hover:bg-gray-700 "
              >
                изменить статус
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col" v-else>
      <div class="w-full flex py-5 px-5">
        <p>Задач пока не добавлено</p>
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
      projectTasks: []
    };
  },
  methods: {
    changeTaskStatus(status) {
      console.log('status ', status);
      if(status) {
        this.project.completedTasks++;
      }
      else {
        this.project.completedTasks--;
      }
    }
  },
  computed: {
    completedProgress() {
      const percentage = Math.floor(
        (this.project.completedTasks / this.project.totalTasks) * 100
      );
      return percentage;
    },
    getTasks() {
      return this.$store.getters.getProjectTasks;
    },
    getCompletedTasks() {
      const projects = this.getTasks;
      const tasks = projects.map(project => {
        return project.tasks.filter(item => item.completed === true);
      });
      return tasks;
    }
  },
  created() {
    this.$loading(true);
    this.$store.dispatch("GET_PROJECT_TASKS", this.project.id).then(() => {
      this.$loading(false);
    });
  }
};
</script>

<style scoped></style>
