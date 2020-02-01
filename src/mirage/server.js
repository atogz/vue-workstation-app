import { Server } from "miragejs";
const server = new Server();
let token = null; //check token for every request

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
  } else if(attrs.username === "nikolay.trofimov" && attrs.password === "12345") {
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

//server.get("/api/dashboard")
