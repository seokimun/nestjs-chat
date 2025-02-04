const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

const bannerElement = getElementById('banner');
const chatBoxElement = getElementById('chat_box');
const chatFormElement = getElementById('chat_form');

//소켓 핸들러
socket.on('user_connected', (username) => {
    console.log(`${username} connected!`);
});

//채팅보내기
const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements[0].value;
    if (inputValue !== '') {
        socket.emit('submit_chat', inputValue);

        drawChat(inputValue);
        event.target.elements[0].value = '';
    }
};

//유저 환영인사 배너
const drawBaneer = (username) =>
    (bannerElement.innerText = `Hello ${username} :)`);

//유저채팅 띄우기
const drawChat = (message) => {
    const wrapperChatBox = document.createElement('div');
    const chatBox = `
    <div>
        ${message}
    <div>
    `;
    wrapperChatBox.innerHTML = chatBox;
    chatBoxElement.append(wrapperChatBox);
};

//유저 닉네임 작성
function helloUser() {
    // const username = prompt('닉네임을 적어주세요');
    // socket.emit('new_user', username, (data) => {
    //     drawbaneer(data);
    // });
}

function init() {
    helloUser();
    chatFormElement.addEventListener('submit', handleSubmit);
}

init();
