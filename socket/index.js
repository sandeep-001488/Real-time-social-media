const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "FETCH"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //    when connected
  console.log("User connected:", socket.id);

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });

  // Handle other events as needed
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send and reeceive message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });
  
  // when discconnected
  socket.on("disconnect", () => {
    console.log("User disconnected:");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
