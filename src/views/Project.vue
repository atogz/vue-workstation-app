<template>
  <main>
    <app-header />
    <div class="flex w-full py-5 px-5 items-center">
      <div class="w-1/3 flex max-w-full rounded">
        <div class="w-full flex items-center">
          <div class="w-1/3">
            <img class="rounded" :src="project.imageLink" alt="" />
          </div>
          <div class="w-2/3 text-left ml-5 uppercase">
            <h3 class="text-xl font-bold">{{ project.name }}</h3>
          </div>
        </div>
      </div>
      <div class="flex w-2/3 justify-end">
        <ul class="flex w-1/2">
          <li class="flex-1 mr-2">
            <a
              @click="activeScreen = 'tasks'"
              :class="{
                'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500 font-bold ':
                  activeScreen === 'tasks'
              }"
              class="text-center block border border-white rounded hover:border-indigo-200 hover:bg-indigo-200 py-2 px-4 text-indigo-600 cursor-pointer"
              >Задачи</a
            >
          </li>
          <li class="flex-1 mr-2">
            <a
              @click="activeScreen = 'materials'"
              :class="{
                'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500 font-bold ':
                  activeScreen === 'materials'
              }"
              class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4 cursor-pointer"
              >Материалы</a
            >
          </li>
          <li class="flex-1 mr-2">
            <a
              @click="activeScreen = 'estimate'"
              :class="{
                'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500 font-bold ':
                  activeScreen === 'estimate'
              }"
              class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4 cursor-pointer"
              >Смета</a
            >
          </li>
          <li class="flex-1 mr-2">
            <a
              @click="activeScreen = 'brigades'"
              :class="{
                'bg-indigo-500 text-white hover:bg-indigo-700 border-indigo-500 font-bold':
                  activeScreen === 'brigades'
              }"
              class="text-center block border border-white rounded hover:border-indigo-200 text-indigo-600 hover:bg-indigo-200 py-2 px-4 cursor-pointer"
              >Бригада</a
            >
          </li>
        </ul>
      </div>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div class="w-full" v-if="activeScreen === 'tasks'">
        <div class="w-full flex flex-col" v-if="getProjectData.tasks.length">
          <div class="w-full flex items-center">
            <div class="w-2/3 flex flex-col py-5 px-5">
              <p>
                Задач:
                <span class="text-lg ml-1 font-bold">{{
                  getProjectData.tasks.length
                }}</span>
              </p>
              <p>
                Выполнено:
                <span class="text-lg ml-1 font-bold">
                  {{ getCompletedTasks.length }} ({{ progress }}%)</span
                >
              </p>
            </div>
            <div class="w-1/3">
              <button
                @click="addTask()"
                class="ml-auto mr-10 py-2 px-2 border-2 border-green-400 bg-green-400 text-white rounded flex items-center justify-center hover:bg-green-600 "
              >
                добавить задачу
              </button>
            </div>
          </div>

          <div class="w-full border-t-2 py-5 px-5">
            <transition-group name="fade" mode="out-in">
              <div
                class="w-full py-5 px-5 mt-5 rounded overflow-hidden shadow cursor-pointer border-2 border-gray-200 flex mt-5"
                v-for="(task, index) in getProjectData.tasks"
                :key="task.id"
              >
                <div class="w-full flex items-center justify-between py-5 px-5">
                  <div class="w-auto flex flex-col">
                    <p class="text-xs flex items-center text-gray-600 pb-2">
                      #{{ task.id }}
                      <span class="ml-3 text-gray-800 font-bold text-lg">{{
                        task.name
                      }}</span>
                    </p>
                    <p
                      class="w-full flex justify-center h-12 items-center py-2 px-2 text-center text-sm rounded uppercase bg-red-300"
                      :class="{ 'bg-green-300': task.completed }"
                    >
                      {{ task.completed ? "Выполнена" : "Не выполнена" }}
                    </p>
                    <p class="mt-5 text-sm text-gray-500">
                      <i>Дедлайн:</i> <b>{{ task.deadline }}</b>
                    </p>
                  </div>
                  <div
                    class="w-4/6 text-sm text-gray-600 px-5 text-justify"
                  >
                    <p class="mr-auto">{{ task.description }}</p>
                  </div>
                  <div class="w-1/6 flex flex-col">
                    <button
                      v-if="!tasksDeletionPending.includes(task.id)"
                      @click="
                        (task.completed = !task.completed),
                          changeTaskStatus(task.completed)
                      "
                      class="w-full py-5 px-5 border-2 border-gray-500 bg-gray-500 text-white rounded flex items-center justify-center hover:bg-gray-700 "
                    >
                      изменить статус
                    </button>
                    <button
                      v-if="task.deletable || getUserData.role === 'admin'"
                      @click="deleteTask(index)"
                      class="w-full mt-5 py-5 px-5 border-2 border-red-500 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-700 "
                    >
                      удалить
                    </button>

                    <button
                      @click="requestTaskDeletion(task.id)"
                      v-if="
                        !task.deletable &&
                          !tasksDeletionPending.includes(task.id) &&
                          getUserData.role !== 'admin'
                      "
                      class="w-full mt-5 py-5 px-5 border-2 border-red-500 text-red-500 rounded flex items-center justify-center hover:bg-red-500 sm:hover:text-white"
                    >
                      запросить удаление
                    </button>
                    <transition name="slide-fade" mode="out-in">
                      <div
                        class="w-full text-center uppercase text-sm text-orange-500"
                        v-if="tasksDeletionPending.includes(task.id)"
                      >
                        <p>Отправлен запрос на удаление</p>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
        <div class="w-full flex flex-col" v-else>
          <div class="w-full flex py-5 px-5">
            <p>Задач пока не добавлено</p>
            <button
              @click="addTask()"
              class="ml-auto mr-10 py-2 px-2 border-2 border-green-400 bg-green-400 text-white rounded flex items-center justify-center hover:bg-green-600 "
            >
              добавить задачу
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade" mode="out-in">
      <div class="w-full" v-if="activeScreen === 'materials'">
        <div
          class="w-full flex flex-col"
          v-if="getProjectData.materials.length"
        >
          <div class="w-full flex py-5 px-5 items-center justify-between">
            <div class="w-2/3 flex flex-col">
              <p>
                Позиций закуплено:
                <span class="text-lg ml-1 font-bold"
                  >{{ getProjectData.materials.length }}
                  <i class="font-normal">
                    ({{
                      getMaterialsTotalCount > 0 ? getMaterialsTotalCount : 0
                    }}
                    ед.)</i
                  >
                </span>
              </p>
              <p>
                Сумма:
                <span class="text-lg ml-1 font-bold">
                  {{ getMaterialsTotalCost > 0 ? getMaterialsTotalCost : 0 }}
                  <i class="font-normal">руб.</i>
                </span>
              </p>
            </div>
            <div class="w-1/3">
              <button
                @click="addMaterial()"
                class="float-right py-2 px-2 border-2 border-green-400 bg-green-400 text-white rounded flex items-center justify-center hover:bg-green-600 "
              >
                добавить материал
              </button>
            </div>
          </div>
          <div class="w-full border-t-2 flex flex-col px-5 py-5">
            <transition-group name="fade" mode="out-in">
              <div
                class="w-full px-5 py-5 mt-5 rounded overflow-hidden shadow cursor-pointer border-2 border-gray-200 flex mt-5"
                v-for="(material, index) in getProjectData.materials"
                :key="material.id"
              >
                <div class="w-full flex items-center justify-center">
                  <div class="w-1/5 flex flex-col">
                    <p class="text-xs flex items-center text-gray-600 pb-2">
                      #{{ material.id }}
                    </p>
                  </div>
                  <div class="w-1/5 flex">
                    <p class="ml-3 text-gray-700 text-lg">
                      {{ material.name }}
                    </p>
                  </div>
                  <div class="w-1/5 flex items-center justify-center">
                    <span
                      v-if="material.count > 0"
                      class="border-2 border-gray-400 rounded px-2 py-2 text-lg text-gray-500"
                      @click="material.count--"
                      >-</span
                    >
                    <p class="ml-3 text-gray-800 text-lg">
                      <b>{{ material.count > 0 ? material.count : 0 }}</b>
                      <i> {{ material.baseMeasure }}.</i>
                    </p>
                    <span
                      class="border-2 border-gray-400 rounded px-2 py-2 text-lg text-gray-500 ml-2"
                      @click="material.count++"
                      >+</span
                    >
                  </div>
                  <div class="w-2/5 flex items-center">
                    <p class="ml-3 text-gray-800 text-lg ml-auto mr-20">
                      <b>{{
                        material.basePrice * material.count > 0
                          ? material.basePrice * material.count
                          : 0
                      }}</b>
                      <i> руб.</i>
                    </p>
                    <transition name="fade" mode="out-in" v-if="material">
                      <button
                        v-if="
                          material.deletable || getUserData.role === 'admin'
                        "
                        @click="removeMaterial(index)"
                        class="py-2 px-2 mim-w-32  w-40 border-2 border-red-500 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-700 "
                      >
                        удалить
                      </button>
                      <button
                        v-if="
                          !material.deletable &&
                            !materialsDeletionPending.includes(material.id) &&
                            getUserData.role !== 'admin'
                        "
                        @click="requestMaterialDeletion(material.id)"
                        class="py-2 px-2 mim-w-32 max-w-40 w-auto  w-40 border-2 border-red-500 text-red-500 rounded flex items-center justify-center hover:bg-red-500 sm:hover:text-white"
                      >
                        запросить удаление
                      </button>
                      <div
                        class="w-auto mr-3 text-center uppercase text-sm text-orange-500"
                        v-if="materialsDeletionPending.includes(material.id)"
                      >
                        <p>Отправлен запрос на удаление</p>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <div class="w-full flex flex-col" v-else>
          <div class="w-full flex py-5 px-5 items-center">
            <p>Материалов пока не добавлено</p>
            <button
              @click="addMaterial()"
              class="ml-auto mr-10 py-2 px-2 border-2 border-green-400 bg-green-400 text-white rounded flex items-center justify-center hover:bg-green-600 "
            >
              добавить материал
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade" mode="out-in">
      <div class="w-full" v-if="activeScreen === 'estimate'">
        <div class="w-full flex flex-col" v-if="getProjectData.jobs.length">
          <div class="w-full flex py-5 px-5 items-center justify-between">
            <div class="w-1/3 flex flex-col">
              <p>
                Количество работ:
                <span class="text-lg ml-1 font-bold"
                  >{{ getProjectData.jobs.length }}
                </span>
              </p>
              <!--              <p>-->
              <!--                Материалов затрачено (ед.):-->
              <!--                <span class="text-lg ml-1 font-bold">-->
              <!--                  {{ getJobsTotalCount > 0 ? getJobsTotalCount : 0 }}</span-->
              <!--                >-->
              <!--              </p>-->

              <p>
                Сумма:
                <span class="text-lg ml-1 font-bold">
                  {{ getJobsTotalCost > 0 ? getJobsTotalCost : 0 }}
                  <i class="font-normal">руб.</i>
                </span>
              </p>
            </div>
            <transition name="fade" mode="out-in">
              <div class="w-1/3 flex flex-col" v-if="googleDocsLink">
                <span class="text-xs text-gray-500 uppercase"
                  >ссылка на смету</span
                >
                <span class="select-all"> {{ googleDocsLink }}</span>
              </div>
            </transition>

            <div class="w-1/3 flex justify-end">
              <button
                @click="addJob()"
                class=" py-2 px-2 border-2 border-green-400 bg-green-400 text-white rounded flex items-center justify-center hover:bg-green-600 "
              >
                добавить работу
              </button>
              <button
                @click="uploadToGoogle()"
                class="py-2 ml-5 px-2 border-2 border-orange-400 bg-orange-400 text-white rounded flex items-center justify-center hover:bg-orange-600 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20pt"
                  version="1.1"
                  viewBox="-53 1 511 511.99906"
                  width="20pt"
                >
                  <g id="surface1">
                    <path
                      d="M 276.410156 3.957031 C 274.0625 1.484375 270.84375 0 267.507812 0 L 67.777344 0 C 30.921875 0 0.5 30.300781 0.5 67.152344 L 0.5 444.84375 C 0.5 481.699219 30.921875 512 67.777344 512 L 338.863281 512 C 375.71875 512 406.140625 481.699219 406.140625 444.84375 L 406.140625 144.941406 C 406.140625 141.726562 404.65625 138.636719 402.554688 136.285156 Z M 279.996094 43.65625 L 364.464844 132.328125 L 309.554688 132.328125 C 293.230469 132.328125 279.996094 119.21875 279.996094 102.894531 Z M 338.863281 487.265625 L 67.777344 487.265625 C 44.652344 487.265625 25.234375 468.097656 25.234375 444.84375 L 25.234375 67.152344 C 25.234375 44.027344 44.527344 24.734375 67.777344 24.734375 L 255.261719 24.734375 L 255.261719 102.894531 C 255.261719 132.945312 279.503906 157.0625 309.554688 157.0625 L 381.40625 157.0625 L 381.40625 444.84375 C 381.40625 468.097656 362.113281 487.265625 338.863281 487.265625 Z M 338.863281 487.265625 "
                      style=" stroke:none;fill-rule:nonzero;fill:rgb(255,255,255);fill-opacity:1;"
                    />
                    <path
                      d="M 305.101562 401.933594 L 101.539062 401.933594 C 94.738281 401.933594 89.171875 407.496094 89.171875 414.300781 C 89.171875 421.101562 94.738281 426.667969 101.539062 426.667969 L 305.226562 426.667969 C 312.027344 426.667969 317.59375 421.101562 317.59375 414.300781 C 317.59375 407.496094 312.027344 401.933594 305.101562 401.933594 Z M 305.101562 401.933594 "
                      style=" stroke:none;fill-rule:nonzero;fill:rgb(255,255,255);fill-opacity:1;"
                    />
                    <path
                      d="M 140 268.863281 L 190.953125 214.074219 L 190.953125 349.125 C 190.953125 355.925781 196.519531 361.492188 203.320312 361.492188 C 210.125 361.492188 215.6875 355.925781 215.6875 349.125 L 215.6875 214.074219 L 266.640625 268.863281 C 269.113281 271.457031 272.332031 272.820312 275.667969 272.820312 C 278.636719 272.820312 281.730469 271.707031 284.078125 269.480469 C 289.027344 264.78125 289.398438 256.988281 284.699219 252.042969 L 212.226562 174.253906 C 209.875 171.78125 206.660156 170.296875 203.199219 170.296875 C 199.734375 170.296875 196.519531 171.78125 194.171875 174.253906 L 121.699219 252.042969 C 117 256.988281 117.371094 264.902344 122.316406 269.480469 C 127.511719 274.179688 135.300781 273.808594 140 268.863281 Z M 140 268.863281 "
                      style=" stroke:none;fill-rule:nonzero;fill:rgb(255,255,255);fill-opacity:1;"
                    />
                  </g>
                </svg>
                <span class="ml-1">Google Docs</span>
              </button>
            </div>
          </div>

          <div class="w-full flex-flex-col px-5 py-5 border-t-2">
            <transition-group name="fade" mode="out-in">
              <div
                class="w-full py-5 px-5 mt-5 rounded overflow-hidden shadow cursor-pointer border-2 border-gray-200 flex mt-5"
                v-for="(job, index) in getProjectData.jobs"
                :key="job.id"
              >
                <div class="w-full flex items-center justify-center">
                  <div class="w-1/5 flex flex-col">
                    <p class="text-xs flex items-center text-gray-600 pb-2">
                      #{{ job.id }}
                    </p>
                  </div>
                  <div class="w-1/5 flex">
                    <p class="ml-3 text-gray-700 text-lg">
                      {{ job.name }}
                    </p>
                  </div>
                  <div class="w-1/5 flex items-center justify-center">
                    <span
                      v-if="job.count > 0"
                      class="border-2 border-gray-400 rounded px-2 py-2 text-lg text-gray-500"
                      @click="job.count--"
                      >-</span
                    >
                    <p class="ml-3 text-gray-800 text-lg">
                      <b>{{ job.count > 0 ? job.count : 0 }}</b>
                      <i> {{ job.baseMeasure }}.</i>
                    </p>
                    <span
                      class="border-2 border-gray-400 rounded px-2 py-2 text-lg text-gray-500 ml-2"
                      @click="job.count++"
                      >+</span
                    >
                  </div>
                  <div class="w-2/5 flex items-center">
                    <p class="ml-3 text-gray-800 text-lg ml-auto mr-20">
                      <b>{{
                        job.basePrice * job.count > 0
                          ? job.basePrice * job.count
                          : 0
                      }}</b>
                      <i> руб.</i>
                    </p>
                    <transition name="fade" mode="out-in" v-if="job">
                      <button
                        v-if="job.deletable || getUserData.role === 'admin'"
                        @click="removeJob(index)"
                        class="py-2 px-2 mim-w-32  w-40 border-2 border-red-500 bg-red-500 text-white rounded flex items-center justify-center hover:bg-red-700 "
                      >
                        удалить
                      </button>
                      <button
                        v-if="
                          !job.deletable &&
                            !jobsDeletionPending.includes(job.id) &&
                            getUserData.role !== 'admin'
                        "
                        @click="requestJobDeletion(job.id)"
                        class="py-2 px-2 mim-w-32 max-w-40 w-auto  w-40 border-2 border-red-500 text-red-500 rounded flex items-center justify-center hover:bg-red-500 sm:hover:text-white"
                      >
                        запросить удаление
                      </button>
                      <div
                        class="w-auto mr-3 text-center uppercase text-sm text-orange-500"
                        v-if="jobsDeletionPending.includes(job.id)"
                      >
                        <p>Отправлен запрос на удаление</p>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <div class="w-full flex flex-col" v-else>
          <div class="w-full flex py-5 px-5 items-center">
            <p>Смета пока не заполнялась</p>
            <button
              @click="addJob()"
              class="ml-auto mr-10 py-2 px-2 border-2 border-green-400 bg-green-400 text-white rounded flex items-center justify-center hover:bg-green-600 "
            >
              добавить работу
            </button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade" mode="out-in">
      <div class="w-full px-5 py-5" v-if="activeScreen === 'brigades'">
        <div
          class="w-full flex"
          :class="{ 'flex-wrap': getProjectData.brigades.length > 2 }"
        >
          <div
            class="w-1/2 flex flex-col pr-5 mt-5"
            v-for="brigade in getProjectData.brigades"
            :key="brigade.id"
          >
            <div class="w-full flex justify-between items-baseline">
              <span class="text-sm text-blue-600 uppercase font-semibold"
                >Бригада {{ brigade.id }}</span
              >
              <button
                @click="addEmployee(brigade.id)"
                class="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              >
                добавить сотрудника
              </button>
            </div>
            <transition-group name="fade" mode="out-in">
              <div
                class="w-full flex items-center px-5 py-5 rounded overflow-hidden shadow border-2 border-gray-200 mt-2"
                v-for="(employee, index) in brigade.employees"
                :key="employee.id"
              >
                <span class="text-xs text-gray-700">
                  {{ employee.id }}
                </span>
                <span class="ml-5">
                  {{ employee.name }}
                </span>
                <button
                  @click="removeEmployee(brigade.id, index)"
                  class="py-2 ml-auto px-2 border-2 border-red-400 bg-red-400 text-white rounded flex items-center justify-center hover:bg-red-600 "
                >
                  удалить
                </button>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </transition>
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
      activeScreen: "tasks",
      totalMaterialsCount: 0,
      totalMaterialsCost: 0,
      tasksDeletionPending: [],
      materialsDeletionPending: [],
      totalJobsCount: 0,
      totalJobsCost: 0,
      jobsDeletionPending: [],
      googleDocsLink: ""
    };
  },
  methods: {
    addTask() {
      let itemOne = {
        id: 4324,
        name: "Задача 4324",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "22.03.2020",
        completed: false,
        deletable: true
      };
      let itemTwo = {
        id: 5212,
        name: "Задача 5212",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "22.03.2020",
        completed: false,
        deletable: true
      };
      let itemThree = {
        id: 312312,
        name: "Задача 32131",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "22.03.2020",
        completed: false,
        deletable: true
      };

      let randomPick = Math.floor(Math.random() * 3);

      if (randomPick === 0) {
        return this.getProjectData.tasks.unshift(itemOne);
      } else if (randomPick === 1) {
        return this.getProjectData.tasks.unshift(itemTwo);
      } else {
        return this.getProjectData.tasks.unshift(itemThree);
      }
    },
    changeTaskStatus(status) {
      console.log("status ", status);
      if (status) {
        this.project.completedTasks++;
      } else {
        this.project.completedTasks--;
      }
    },
    deleteTask(index) {
      return this.getProjectData.tasks.splice(index, 1);
    },
    requestTaskDeletion(id) {
      this.tasksDeletionPending.push(id);
    },

    addMaterial() {
      let itemOne = {
        id: 51,
        name: "Ламинат",
        basePrice: 250,
        baseMeasure: "м2",
        count: 1,
        deletable: true
      };
      let itemTwo = {
        id: 52,
        name: "Краска акриловая",
        basePrice: 250,
        baseMeasure: "бан",
        count: 1,
        deletable: true
      };

      let itemThree = {
        id: 53,
        name: "Цемент, мешок",
        basePrice: 780,
        baseMeasure: "шт",
        count: 1,
        deletable: true
      };

      let randomPick = Math.floor(Math.random() * 3);

      if (randomPick === 0) {
        return this.getProjectData.materials.unshift(itemOne);
      } else if (randomPick === 1) {
        return this.getProjectData.materials.unshift(itemTwo);
      } else {
        return this.getProjectData.materials.unshift(itemThree);
      }
    },
    removeMaterial(index) {
      return this.getProjectData.materials.splice(index, 1);
    },
    requestMaterialDeletion(id) {
      this.materialsDeletionPending.push(id);
    },

    addJob() {
      let itemOne = {
        id: 51,
        name: "Бурение скважины",
        basePrice: 2250,
        baseMeasure: "м2",
        count: 1,
        deletable: true
      };
      let itemTwo = {
        id: 52,
        name: "Работы с электропроводкой",
        basePrice: 600,
        baseMeasure: "м",
        count: 1,
        deletable: true
      };

      let itemThree = {
        id: 53,
        name: "Укладка фундамента",
        basePrice: 1100,
        baseMeasure: "м2",
        count: 1,
        deletable: true
      };

      let randomPick = Math.floor(Math.random() * 3);

      if (randomPick === 0) {
        return this.getProjectData.jobs.unshift(itemOne);
      } else if (randomPick === 1) {
        return this.getProjectData.jobs.unshift(itemTwo);
      } else {
        return this.getProjectData.jobs.unshift(itemThree);
      }
    },
    removeJob(index) {
      return this.getProjectData.jobs.splice(index, 1);
    },
    requestJobDeletion(id) {
      this.jobsDeletionPending.push(id);
    },
    uploadToGoogle() {
      this.$loading(true);
      const fakeUpload = () => {
        return setTimeout(() => {
          this.$loading(false);
          this.googleDocsLink =
            "https://docs.google.com/document/d/1KZs7zdin74/";
        }, 500);
      };
      fakeUpload();
    },

    addEmployee(id) {
      const newEmployee = {
        id: 6,
        name: "София Жлобенко"
      };
      const currentBrigade = this.getProjectData.brigades.find(brigade => {
        return brigade.id === id;
      });
      return currentBrigade.employees.push(newEmployee);
    },
    removeEmployee(brigadeId, index) {
      const currentBrigade = this.getProjectData.brigades.find(brigade => {
        return brigade.id === brigadeId;
      });
      return currentBrigade.employees.splice(index, 1);
    }
  },

  computed: {
    getUserData() {
      return this.$store.getters.getUser;
    },
    progress() {
      return Math.floor(
        (this.getCompletedTasks.length / this.getProjectData.tasks.length) * 100
      );
    },
    getProjectData() {
      return this.$store.getters.getProjectData;
    },
    getCompletedTasks() {
      return this.getProjectData.tasks.filter(item => {
        return item.completed === true;
      });
    },
    getMaterialsTotalCount() {
      const materials = this.getProjectData.materials;
      return materials.reduce((total, currentValue) => {
        return total + currentValue.count;
      }, this.totalMaterialsCount);
    },
    getMaterialsTotalCost() {
      const materials = this.getProjectData.materials;
      return materials.reduce((total, currentValue) => {
        return total + currentValue.basePrice * currentValue.count;
      }, this.totalMaterialsCost);
    },
    getJobsTotalCount() {
      const jobs = this.getProjectData.jobs;
      return jobs.reduce((total, currentValue) => {
        return total + currentValue.count;
      }, this.totalMaterialsCount);
    },
    getJobsTotalCost() {
      const jobs = this.getProjectData.jobs;
      return jobs.reduce((total, currentValue) => {
        return total + currentValue.basePrice * currentValue.count;
      }, this.totalMaterialsCost);
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
