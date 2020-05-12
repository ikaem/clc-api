const socketio = require("socket.io");

const { addUser } = require("./users");

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

                const { player, error } = addUser({ socketId, user, room })

                // using callback to send error data and return from the method...
                if(error) return callback(error);

                socket.join(room);

                socket.emit("backendMessage", { user: "admin", message: `Hello ${user}, welcome to the game...`})
            });



            socket.on("playersMessage", ({socketIdd, user, room, message}, callback) => {
                console.log(`${user} to ${room} from socket ${socketIdd}: ${message}`);

                // socket.emit("backendPlayersMessage", {user: "admin", message: "responding in the same useEffect"});

                io.to(room).emit("backendPlayersMessage", 
                    { 
                        user, 
                        message 
                    }
                );

                // callback("Thassnks");
            })

            socket.on("disconnect", () => {
                console.log("disconnecting....");
                
            })
        });

    },
    playersCommunicationHistory,
    observersCommunicationHistory
}