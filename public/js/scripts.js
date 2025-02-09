const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

const bannerElement = getElementById('banner');
const chatBoxElement = getElementById('chat_box');
const chatFormElement = getElementById('chat_form');

//글로벌 소켓 핸들러
socket.on('user_connected', (username) => {
    drawChat(`${username}님 연결되었습니다!`);
});

socket.on('new_chat', (data) => {
    const { chat, username } = data;
    drawChat(`${username}: ${chat}`);
});

socket.on('disconnect_user', (username) => drawChat(`${username}: bye...`));

//채팅 불러오기
const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements[0].value;
    if (inputValue !== '') {
        socket.emit('submit_chat', inputValue);

        drawChat(`me : ${inputValue}`, true);
        event.target.elements[0].value = '';
    }
};

//유저 환영인사 배너
const drawBanner = (username) =>
    (bannerElement.innerText = `Hello ${username} :)`);

//유저채팅 띄우기
const drawChat = (message, isMe = false) => {
    const wrapperChatBox = document.createElement('div');
    wrapperChatBox.className = 'clearfix';
    let chatBox;
    if (!isMe)
        chatBox = `
        <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
            ${message}
        </div>
    `;
    else
        chatBox = `
        <div class='bg-white w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
            ${message}
        </div>
    `;
    wrapperChatBox.innerHTML = chatBox;
    chatBoxElement.append(wrapperChatBox);
};

//유저 닉네임 작성
function helloUser() {
    const username = prompt('닉네임을 적어주세요');
    socket.emit('new_user', username, (data) => {
        drawBanner(data);
    });
}

function init() {
    helloUser();
    chatFormElement.addEventListener('submit', handleSubmit);
}

init();
