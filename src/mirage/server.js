import { Server } from "miragejs";
const server = new Server();
let token = null; //check token for every request
let projects = [
  {
    id: 1,
    tasks: [
      {
        id: 1,
        name: "Задача 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "22.03.2020",
        completed: true,
        deletable: false
      },
      {
        id: 2,
        name: "Задача 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "12.11.2020",
        completed: false,
        deletable: false
      }
    ],
    materials: [
      {
        id: 1,
        name: "Обои винил",
        basePrice: 410,
        baseMeasure: "м",
        count: 14,
        deletable: false
      },
      {
        id: 2,
        name: "Лампочка",
        basePrice: 120,
        baseMeasure: "шт",
        count: 15,
        deletable: false
      },
      {
        id: 3,
        name: "Обои флюр",
        basePrice: 560,
        baseMeasure: "м",
        count: 25,
        deletable: false
      },
      {
        id: 4,
        name: "Потолочный плинтус",
        basePrice: 120,
        baseMeasure: "м",
        count: 12,
        deletable: false
      }
    ],
    jobs: [
      {
        id: 1,
        name: "Поклейка виниловых обоев",
        basePrice: 560,
        baseMeasure: "м",
        count: 14,
        deletable: false
      },
      {
        id: 2,
        name: "Замена лампочек",
        basePrice: 30,
        baseMeasure: "шт",
        count: 15,
        deletable: false
      },
      {
        id: 3,
        name: "Поклейка флюровых обоев",
        basePrice: 760,
        baseMeasure: "м",
        count: 25,
        deletable: false
      },
      {
        id: 4,
        name: "Установка плинтуса",
        basePrice: 40,
        baseMeasure: "м",
        count: 45,
        deletable: false
      }
    ],
    brigades: [
      {
        id: 1,
        employees: [
          {
            id: 1,
            name: "Иван Иванов"
          },
          {
            id: 2,
            name: "Петр Петров"
          }
        ]
      },
      {
        id: 2,
        employees: [
          {
            id: 3,
            name: "Иван Франко"
          },
          {
            id: 4,
            name: "Петр Первый"
          }
        ]
      },
      {
        id: 3,
        employees: [
          {
            id: 3,
            name: "Иван Франко"
          },
          {
            id: 4,
            name: "Петр Первый"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    tasks: [
      {
        id: 3,
        name: "Задача 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "22.03.2020",
        completed: true,
        deletable: false
      },
      {
        id: 4,
        name: "Задача 4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "12.11.2020",
        completed: false,
        deletable: false
      }
    ],
    materials: [
      {
        id: 1,
        name: "Обои винил",
        basePrice: 410,
        baseMeasure: "м",
        count: 14,
        deletable: false
      },
      {
        id: 2,
        name: "Лампочка",
        basePrice: 120,
        baseMeasure: "шт",
        count: 15,
        deletable: false
      },
      {
        id: 3,
        name: "Обои флюр",
        basePrice: 560,
        baseMeasure: "м",
        count: 25,
        deletable: false
      },
      {
        id: 4,
        name: "Потолочный плинтус",
        basePrice: 120,
        baseMeasure: "м",
        count: 12,
        deletable: false
      }
    ],
    jobs: [
      {
        id: 1,
        name: "Поклейка виниловых обоев",
        basePrice: 560,
        baseMeasure: "м",
        count: 14,
        deletable: false
      },
      {
        id: 2,
        name: "Замена лампочек",
        basePrice: 30,
        baseMeasure: "шт",
        count: 15,
        deletable: false
      },
      {
        id: 3,
        name: "Поклейка флюровых обоев",
        basePrice: 760,
        baseMeasure: "м",
        count: 25,
        deletable: false
      },
      {
        id: 4,
        name: "Установка плинтуса",
        basePrice: 40,
        baseMeasure: "м",
        count: 45,
        deletable: false
      }
    ],
    brigades: [
      {
        id: 1,
        employees: [
          {
            id: 1,
            name: "Иван Иванов"
          },
          {
            id: 2,
            name: "Петр Петров"
          }
        ]
      },
      {
        id: 2,
        employees: [
          {
            id: 3,
            name: "Иван Франко"
          },
          {
            id: 4,
            name: "Петр Первый"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    tasks: [
      {
        id: 6,
        name: "Задача 6",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "22.03.2020",
        completed: true,
        deletable: false
      },
      {
        id: 7,
        name: "Задача 7",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "12.11.2020",
        completed: false,
        deletable: false
      }
    ],
    materials: [
      {
        id: 1,
        name: "Обои винил",
        basePrice: 410,
        baseMeasure: "м",
        count: 14,
        deletable: false
      },
      {
        id: 2,
        name: "Лампочка",
        basePrice: 120,
        baseMeasure: "шт",
        count: 15,
        deletable: false
      },
      {
        id: 3,
        name: "Обои флюр",
        basePrice: 560,
        baseMeasure: "м",
        count: 25,
        deletable: false
      },
      {
        id: 4,
        name: "Потолочный плинтус",
        basePrice: 120,
        baseMeasure: "м",
        count: 12,
        deletable: false
      }
    ],
    jobs: [
      {
        id: 1,
        name: "Поклейка виниловых обоев",
        basePrice: 560,
        baseMeasure: "м",
        count: 14,
        deletable: false
      },
      {
        id: 2,
        name: "Замена лампочек",
        basePrice: 30,
        baseMeasure: "шт",
        count: 15,
        deletable: false
      },
      {
        id: 3,
        name: "Поклейка флюровых обоев",
        basePrice: 760,
        baseMeasure: "м",
        count: 25,
        deletable: false
      },
      {
        id: 4,
        name: "Установка плинтуса",
        basePrice: 40,
        baseMeasure: "м",
        count: 45,
        deletable: false
      }
    ],
    brigades: [
      {
        id: 1,
        employees: [
          {
            id: 1,
            name: "Иван Иванов"
          },
          {
            id: 2,
            name: "Петр Петров"
          }
        ]
      },
      {
        id: 2,
        employees: [
          {
            id: 3,
            name: "Иван Франко"
          },
          {
            id: 4,
            name: "Петр Первый"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    tasks: [
      {
        id: 7,
        name: "Задача 7",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "22.03.2020",
        completed: false,
        deletable: false
      },
      {
        id: 8,
        name: "Задача 8",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "12.11.2020",
        completed: false,
        deletable: false
      },
      {
        id: 9,
        name: "Задача 9",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "12.11.2020",
        completed: true,
        deletable: false
      },
      {
        id: 10,
        name: "Задача 10",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "12.11.2020",
        completed: true,
        deletable: false
      },
      {
        id: 11,
        name: "Задача 11",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "12.11.2020",
        completed: true,
        deletable: false
      },
      {
        id: 12,
        name: "Задача 12",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat sem at risus molestie, vitae volutpat mauris viverra. Proin maximus cursus est. Donec vulputate turpis sit amet quam aliquet, id ultricies orci tempor. Praesent in libero malesuada, mollis lacus vitae, ornare orci. Fusce ac luctus diam, nec ornare nunc. Fusce a eros consectetur, placerat erat vitae, facilisis ligula. Quisque dignissim, ipsum eget porttitor gravida, risus dolor fermentum enim, ac tempus elit dui non justo. Nulla vestibulum lobortis vehicula. In ullamcorper elementum ante, quis ultricies felis dapibus ut. Aliquam erat volutpat. Quisque in commodo massa. Duis et efficitur velit. Nunc sed ex ultricies, tristique justo et, egestas orci. Morbi molestie ante ut augue tempor hendrerit.",
        deadline: "12.11.2020",
        completed: true,
        deletable: false
      }
    ],
    materials: [
      {
        id: 1,
        name: "Обои винил",
        basePrice: 410,
        baseMeasure: "м",
        count: 14,
        deletable: false
      },
      {
        id: 2,
        name: "Лампочка",
        basePrice: 120,
        baseMeasure: "шт",
        count: 15,
        deletable: false
      },
      {
        id: 3,
        name: "Обои флюр",
        basePrice: 560,
        baseMeasure: "м",
        count: 25,
        deletable: false
      },
      {
        id: 4,
        name: "Потолочный плинтус",
        basePrice: 120,
        baseMeasure: "м",
        count: 12,
        deletable: false
      }
    ],
    jobs: [
      {
        id: 1,
        name: "Поклейка виниловых обоев",
        basePrice: 560,
        baseMeasure: "м",
        count: 14,
        deletable: false
      },
      {
        id: 2,
        name: "Замена лампочек",
        basePrice: 30,
        baseMeasure: "шт",
        count: 15,
        deletable: false
      },
      {
        id: 3,
        name: "Поклейка флюровых обоев",
        basePrice: 760,
        baseMeasure: "м",
        count: 25,
        deletable: false
      },
      {
        id: 4,
        name: "Установка плинтуса",
        basePrice: 40,
        baseMeasure: "м",
        count: 45,
        deletable: false
      }
    ],
    brigades: [
      {
        id: 1,
        employees: [
          {
            id: 1,
            name: "Иван Иванов"
          },
          {
            id: 2,
            name: "Петр Петров"
          }
        ]
      },
      {
        id: 2,
        employees: [
          {
            id: 3,
            name: "Иван Франко"
          },
          {
            id: 4,
            name: "Петр Первый"
          }
        ]
      }
    ]
  }
];

//routes
server.post("/api/auth/login", (schema, request) => {
  let attrs = JSON.parse(request.requestBody);
  if (attrs.username === "ivan.ivanov" && attrs.password === "jiQ7lhm") {
    token = `f${(+new Date() + Math.floor(Math.random())).toString(16)}`; // instead of JWT for testing purposes
    return {
      success: true,
      token: token,
      user: {
        id: 2,
        name: "Иван",
        surname: "Иванов",
        role: "manager"
      }
    };
  } else if (
    attrs.username === "nikolay.trofimov" &&
    attrs.password === "jiQ7lhm"
  ) {
    token = `f${(+new Date() + Math.floor(Math.random())).toString(16)}`; // instead of JWT for testing purposes
    return {
      success: true,
      token: token,
      user: {
        id: 1,
        name: "Николай",
        surname: "Трофимов",
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
          totalTasks: 4,
          completedTasks: 2
        },
        {
          id: 2,
          name: 'Объект "Чехов, коттедж"',
          imageLink:
            "https://lh5.googleusercontent.com/proxy/Ctc8-z8JYSE9xK1Z2h5Lyo1yJZ3arW-EX3H12v4cd6FUqt1u1xh5DYxRGzUnzhGUIhN_EFsnnsTURQXrBnB69FkY-09rzQ",
          totalCost: 382313,
          totalTasks: 2,
          completedTasks: 1
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
          totalTasks: 4,
          completedTasks: 2
        },
        {
          id: 2,
          name: 'Объект "Чехов, коттедж"',
          imageLink:
            "https://lh5.googleusercontent.com/proxy/Ctc8-z8JYSE9xK1Z2h5Lyo1yJZ3arW-EX3H12v4cd6FUqt1u1xh5DYxRGzUnzhGUIhN_EFsnnsTURQXrBnB69FkY-09rzQ",
          totalCost: 3823135,
          totalTasks: 2,
          completedTasks: 1
        },
        {
          id: 3,
          name: 'Объект "Домодедово"',
          imageLink:
            "https://www.biletik.aero/upload/resize_cache/medialibrary/414/compressed/414ba724f06584b7f17a86e57df08aad.jpg",
          totalCost: 689090,
          totalTasks: 6,
          completedTasks: 4
        }
      ]
    };
  }
});

server.get("/api/project", (schema, request) => {
  if (request.queryParams.token === token && request.queryParams.projectId) {
    const id = parseInt(request.queryParams.projectId);
    const projectData = projectId => {
      return projects.find(item => item.id === projectId);
    };
    return {
      success: true,
      data: projectData(id)
    };
  }
});
