const users = [];

const userObject = {
    user: "",
    room: "",
}

const addUser = ({socketId, user, room}) => {
    const name = user.trim().toLowerCase().split(" ").join("");
    room = room.trim().toLowerCase().split(" ").join("");

    // i could attach "observe" string to observe room
    // and then i could test if there already are two players that dont have this substring
    // if there already are 2 players without the substring, i could send a message saying it is not possible to play the game, but observe is possible?
    // for now, tho... lets add everyone...
    

    const existingUser = users.find(user => user.user === name);

    console.log("existing player on server...", existingUser);
    console.log("user", name);
    // this should ideally be fetched from db, create token and so on...
    // for now, tho, this works...
    if(existingUser) return {error: "This username is already taken"}

    // const currentPlayers = users.filter(user => user.room === room).length
    // if(currentPlayers > 1) return {error: "This game already has two players"}

    const player = { socketId, user: name, room };

    console.log("Player:", player);
    users.push(player);
    console.log("users array:", users);

    return { player }
};

const removeUser = () => {};
const getUser = () => {};
const getUsersInRoom = () => {};

module.exports = {
    addUser
}