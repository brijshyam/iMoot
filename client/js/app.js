const socket = io(`http://127.0.0.1:3000`); // the server url 
const msgArea = document.getElementById('postman');
const messageInp = document.getElementById('messageInp');
const msgContainer = document.querySelector('.message_container');
const btn = document.getElementById('btn');


const append = (sender, message, position) => {
    const msgElement = document.createElement('div');
    const span = document.createElement('span');
    const para = document.createElement('p');
    span.innerText = sender;
    para.innerText = message;

    msgElement.append(span);
    msgElement.append(para);
    // console.log(`${span} , ${span.innerText}`);

    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
}

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name); //sendig the name of new user with the client script add in html file 
//broadcast when user joins
socket.on('user-joined', name => {
    append(name, ': joined the chat', 'message_left');
})

//broadcast when user leaves
socket.on('left', data => {
    append(data.name, ': left the chat', 'message_left');
})
//handling message what server sent from server
socket.on('receive', data => {
    append(data.name, ` : ${data.message}`, 'message_left');
})


function handleSendMessage() {
    const message = messageInp.value;
    append('You : ', message, 'message_right');
    socket.emit('send', message);
    messageInp.value = '';
}

messageInp.addEventListener("keypress", function (e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});
btn.addEventListener("click", handleSendMessage);
