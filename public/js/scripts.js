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
    wrapperChatBox.classList.add('flex', 'w-full', 'my-2'); // Flexbox 사용

    // 채팅 박스 생성
    const chatBox = document.createElement('div');
    chatBox.classList.add(
        'inline-block', // 글자 수에 따라 크기를 조정
        'max-w-xs', // 최대 너비 제한 (20rem)
        'break-words', // 단어 길이가 초과되면 줄바꿈
        'px-3',
        'py-3', // 안쪽 여백
        'rounded-2xl', // 모서리를 둥글게
        'my-1', // 메시지 간 간격
    );

    if (isMe) {
        wrapperChatBox.classList.add('justify-end');
        chatBox.classList.add(
            'bg-gray-800',
            'text-gray-200',
            'ml-auto',
            'mr-4',
        );
    } else {
        wrapperChatBox.classList.add('justify-start');
        chatBox.classList.add('text-gray-200', 'ml-4');
        chatBox.style.backgroundColor = '#262626';
    }

    chatBox.textContent = message; // 메시지 내용 설정
    wrapperChatBox.appendChild(chatBox); // wrapper에 채팅 박스 추가
    chatBoxElement.appendChild(wrapperChatBox); // 채팅 창에 추가

    chatBoxElement.scrollTop = chatBoxElement.scrollHeight;
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
