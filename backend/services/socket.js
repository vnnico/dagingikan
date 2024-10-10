export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    const count = io.engine.clientsCount;
    console.log(count);

    socket.on("join room", (to) => {
      socket.join(to);
    });

    socket.on("send message", ({ content, from, to }) => {
      io.to(to).emit("receive message", {
        content,
        from,
        to,
      });
    });

    socket.on("typing", ({ from, to, bool }) => {
      socket.to(to).emit("is typing", { from, to, bool });
    });

    // socket.on("not typing", ({ from, to, bool }) => {
    //   socket.to(to).emit("is typing", { from, to, bool });
    // });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  });
};
