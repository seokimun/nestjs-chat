const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const bannerElement = getElementById('banner');
const chatBoxElement = getElementById('chat_box');
const chatFormElement = getElementById('chat_form');

function helloUser() {
    const username = prompt('닉네임을 적어주세요');
}

function init() {
    helloUser();
}

init();
