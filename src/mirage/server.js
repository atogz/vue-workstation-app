import { Server } from "miragejs";
const server = new Server();
let token = null; //check token for every request
let tasksDb = [
  {
    project_id: 1,
    tasks: [
      {
        id: 1,
        name: "Задача 1",
        description: "Описание задачи 1",
        deadline: "22.03.2020",
        completed: true
      },
      {
        id: 2,
        name: "Задача 2",
        description: "Описание задачи 2",
        deadline: "12.11.2020",
        completed: false
      }
    ]
  },
  {
    project_id: 1,
    tasks: [
      {
        id: 3,
        name: "Задача 3",
        description: "Описание задачи 3",
        deadline: "22.03.2020",
        completed: true
      },
      {
        id: 4,
        name: "Задача 4",
        description: "Описание задачи 4",
        deadline: "12.11.2020",
        completed: false
      }
    ]
  }
];

//routes
server.post("/api/auth/login", (schema, request) => {
  let attrs = JSON.parse(request.requestBody);
  if (attrs.username === "ivan.ivanov" && attrs.password === "12345") {
    token = `f${(+new Date() + Math.floor(Math.random())).toString(16)}`; // instead of JWT for testing purposes
    return {
      success: true,
      token: token,
      user: {
        id: 2,
        name: "ivan",
        surname: "ivanov",
        role: "manager"
      }
    };
  } else if (
    attrs.username === "nikolay.trofimov" &&
    attrs.password === "12345"
  ) {
    token = `f${(+new Date() + Math.floor(Math.random())).toString(16)}`; // instead of JWT for testing purposes
    return {
      success: true,
      token: token,
      user: {
        id: 1,
        name: "nikolay",
        surname: "trofimov",
        role: "admin"
      }
    };
  } else {
    return {
      success: false,
      error: "Неверный логин или пароль"
    };
  }
});

server.get("/api/projects", (schema, request) => {
  if (
    request.queryParams.token === token &&
    request.queryParams.userRole !== "admin"
  ) {
    return {
      success: true,
      projects: [
        {
          id: 1,
          name: 'Объект "Лианозово"',
          imageLink:
            "https://f4.mirkvartir.me/custom/6a/6a18d55b-8580-4e6a-bfb6-b9aba0208920.jpg",
          totalCost: 250000,
          totalTasks: 124,
          tasksCompleted: 68
        },
        {
          id: 2,
          name: 'Объект "Чехов, коттедж"',
          imageLink:
            "https://korteksplus.ru/assets/img/repair_service/remont-pod-kluch-v-krasnodarskom-krae.jpg",
          totalCost: 382313,
          totalTasks: 43,
          tasksCompleted: 11
        }
      ]
    };
  } else {
    //для админа, видит все объекты
    return {
      success: true,
      projects: [
        {
          id: 1,
          name: 'Объект "Лианозово"',
          imageLink:
            "https://f4.mirkvartir.me/custom/6a/6a18d55b-8580-4e6a-bfb6-b9aba0208920.jpg",
          totalCost: 250000,
          totalTasks: 124,
          tasksCompleted: 68
        },
        {
          id: 2,
          name: 'Объект "Чехов, коттедж"',
          imageLink:
            "https://korteksplus.ru/assets/img/repair_service/remont-pod-kluch-v-krasnodarskom-krae.jpg",
          totalCost: 3823135,
          totalTasks: 43,
          tasksCompleted: 11
        },
        {
          id: 3,
          name: 'Объект "Домодедово"',
          imageLink:
            "https://www.biletik.aero/upload/resize_cache/medialibrary/414/compressed/414ba724f06584b7f17a86e57df08aad.jpg",
          totalCost: 689090,
          totalTasks: 66,
          tasksCompleted: 54
        }
      ]
    };
  }
});

server.get("/api/tasks", (schema, request) => {
  if (request.queryParams.token === token && request.queryParams.projectId) {
    const id = parseInt(request.queryParams.projectId);
    const getProjectTasks = projectId => {
      return tasksDb.filter(item => item.project_id === projectId);
    };
    return {
      success: true,
      tasks: getProjectTasks(id)
    };
  }
});
