class Sockets {
    constructor(io) {
      this.io = io;
  
      this.socketEvents();
    }
  
    socketEvents() {
      // On connection
      this.io.on("connection", (socket) => {
        console.log("New client connected");
        socket.on("disconnect", () => {
          console.log("User disconnected");
        });
      });
    }
  }
  
  module.exports = Sockets;
  