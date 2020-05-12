const socketio = require("socket.io");

const playersCommunicationHistory = [];
const observersCommunicationHistory = [];

module.exports = {
    connection: (http) => {
        const io = socketio(http);
        io.on("connect", (socket) => {
            const { id } = socket;
            console.log(`we have a connection on socket ${id}`);

            socket.on("join", ({ socketId, user, room }, callback) => {
                console.log(`${user} joined game ${room} on socket ${socketId}`);
                callback("hihihihi...");

                socket.join(room);

                socket.emit("backendMessage", { user: "admin", message: `Hello ${user}, welcome to the game...`})
            });



            socket.on("playersMessage", ({user, message}, callback) => {
                console.log(`${user} to "tempRoom": ${message}`);

                // socket.emit("backendPlayersMessage", {user: "admin", message: "responding in the same useEffect"});

                io.to("tempRoom").emit("backendPlayersMessage", { user, message });

                callback("Thanks");
            })

            socket.on("disconnect", () => {
                console.log("disconnecting....");
                
            })
        });

    },
    playersCommunicationHistory,
    observersCommunicationHistory
}