import { getChat, updateChat } from './helper';

// This is a chat app. It has 2 panes. The person on left and preson on right can chat with each other

// This is the chat Oberver, which emits values when new chat is received
const chat$ = getChat();
let leftsent = getCurrentTime();
let rightsent = getCurrentTime();
// This function just adds the element to the chat 

function getCurrentTime() {
    return ((new Date()).toTimeString()).split(' ')[0];
}
function addElement(id: string, value1: string, value2: string) {
    document.getElementById(id).innerHTML += `<li><span class="a">` + value1 + `</span><span class="b">` + value2 + `</span></li>`;
}

// Here chat is subscribed
chat$.pipe(
    // TO DO
    // This is where you need to add your code
    // This is the only place in this file where you can add code
    // Hint: RxJs Operators
).subscribe((chat) => {
    let content = "chatcontentleft"
    if(chat.name == "left") {
        content = "chatcontentright";
        document.getElementById("rightupdated").innerHTML = leftsent;
    } else {
        document.getElementById("leftupdated").innerHTML = rightsent;
    }
    addElement(content, chat.msg, chat.time);
});

// Handlig send click of the left user
document.getElementById("leftsend").onclick = function () {
    const msg = (<HTMLInputElement>document.getElementById("chatleft")).value;
    const name = "left";

    // Update chat ensures a new chat is emitted to the subscriber
    updateChat(msg, name);
}

// Handlig send click of the right user
document.getElementById("rightsend").onclick = function () {
    const msg = (<HTMLInputElement>document.getElementById("chatright")).value;
    const name = "right";

    // Update chat ensures a new chat is emitted to the subscriber
    updateChat(msg, name);
}

// Just a empty delayed message sent
setTimeout(() => {
    let newChat = {msg: "Howdy", name: "right", time: "12:00:00 AM"}
    chat$.next(newChat);
}, 3000);
