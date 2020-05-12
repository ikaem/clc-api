const users = [];

const userObject = {
    name: "",
    room: "",
}

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase().split(" ").join("");
    room = room.trim().toLowerCase().split(" ").join("");

    // i could attach "observe" string to observe room
    // and then i could test if there already are two players that dont have this substring
    // if there already are 2 players without the substring, i could send a message saying it is not possible to play the game, but observe is possible?
    // for now, tho... lets add everyone...

    const existingPlayer = users.some(user => user.name === name);
    if(existingPlayer) return {error: "This username is already taken"}

    const currentPlayers = users.filter(user => user.room === room).length
    if(currentPlayers > 1) return {error: "This game already has two players"}

    const player = { id, name, room };
    users.push(player);

    return { player }
};

const removeUser = () => {};
const getUser = () => {};
const getUsersInRoom = () => {};

module.exports = {
    addUser
}