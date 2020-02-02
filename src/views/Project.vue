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
            class="text-center block border border-blue-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-700 text-white"
            href="#"
            >Задачи</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-gray-200 text-teal-600 hover:bg-gray-200 py-2 px-4"
            href="#"
            >Материалы</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-gray-200 text-teal-600 hover:bg-gray-200 py-2 px-4"
            href="#"
            >Бригада</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-gray-200 text-teal-600 hover:bg-gray-200 py-2 px-4"
            href="#"
            >Смета</a
          >
        </li>
        <li class="flex-1 mr-2">
          <a
            class="text-center block border border-white rounded hover:border-gray-200 text-teal-600 hover:bg-gray-200 py-2 px-4"
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
          <div class="w-full" v-for="task in project.tasks" :key="task.id">
            {{ task }}
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
  methods: {},
  computed: {
    completedProgress() {
      const percentage =
        (this.project.completedTasks / this.project.totalTasks) * 100;
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
