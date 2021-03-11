let isCaps = false;
let isRu = false;

const langArr = {
    "en": {
        "firstArr": [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '='],
        "secondArr": ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|'],
        "thirdArr": ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "' '"],
        "forthArr": ['z', 'x', 'c', 'v', 'b', 'n', 'm', ' , ', ' . ', ' / ', '   Shift   '],
    },
    "ru": {
        "firstArr": [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '='],
        "secondArr": ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/'],
        "thirdArr": ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
        "forthArr": ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '  Shift  '],
    },
    "capsru": {
        "firstArr": [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '='],
        "secondArr": ['TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/'],
        "thirdArr": ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
        "forthArr": ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', '  SHIFT  '],
    },
    "capsen": {
        "firstArr": [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '='],
        "secondArr": ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '|'],
        "thirdArr": ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "' '"],
        "forthArr": ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ' , ', ' . ', ' / ', '   SHIFT   '],
    },
}

const BACK = [{ tag: 'input', properties: { type: 'button', value: '   Back   ', onclick: del, className: 'del-button', id: 'del-button', } }];
const CAPSLOCK = [{ tag: 'input', properties: { type: 'button', value: 'CapsLock', onclick: caps, className: 'caps-lock' } }];
const ENTER = [{ tag: 'input', properties: { type: 'button', value: 'Enter', onclick: toEnter, className: 'enter-button' } }];
const LANGUAGE = [{ tag: 'input', properties: { type: 'button', value: '    EN    ', onclick: toChangeLanguage, className: 'lang-button' } }];
const SPACE = [{ tag: 'input', properties: { type: 'button', value: '____', onclick: pressSpace, className: 'spacebutton' } }];

let output = document.getElementById('key-input');


function fillButton(arr) {
    return arr.map(item => ({
        tag: 'input',
        properties: {
            type: 'button',
            value: item,
            className: 'button',
            onclick: forInput
        }
    }))
}

function renderButtons(arr, place) {
    arr.forEach(item => {
        let element = document.createElement(item.tag);
        document.createElement(item.tag).classList.add('buttonsclass');
        Object.entries(item.properties || {}).forEach(([key, value]) => {
            element[key] = value;
        })
        place.appendChild(element);
    })
}

function del() {
    output.value = output.value.substring(0, output.selectionStart - 1) + output.value.substring(output.selectionStart, output.value.length);
    output.focus();
}

function forInput(elem) {
    if (isCaps === false) {
        output.value += elem.target.value;
    } else {
        output.value += elem.target.value.toUpperCase();
    }
    output.focus();
}

function caps() {
    isCaps = !isCaps;
    if (isCaps === true) {
        document.querySelector('.caps-lock').classList.add('active')
    } else {
        document.querySelector('.caps-lock').classList.remove('active')
    }
    output.focus();
}

function toEnter() {
    output.value += '\n';
    output.focus();
}

function toChangeLanguage() {
    isRu = !isRu;

    let langBut = document.querySelector('.lang-button');
    if (isRu === true) {
        langBut.classList.add('active');
        langBut.value = '    RU    ';

    } else {
        langBut.classList.remove('active');
        langBut.value = '    EN    ';
    }
    output.focus();
}

function pressSpace() {
    output.value += ' ';
    output.focus();
}

renderButtons(fillButton(langArr.en.firstArr), document.body.querySelector('.firstArr'));
renderButtons(BACK, document.body.querySelector('.firstArr'));
renderButtons(fillButton(langArr.en.secondArr), document.body.querySelector('.secondArr'));
renderButtons(CAPSLOCK, document.body.querySelector('.thirdArr'));
renderButtons(fillButton(langArr.en.thirdArr), document.body.querySelector('.thirdArr'));
renderButtons(ENTER, document.body.querySelector('.thirdArr'));
renderButtons(LANGUAGE, document.body.querySelector('.forthArr'));
renderButtons(fillButton(langArr.en.forthArr), document.body.querySelector('.forthArr'));
renderButtons(SPACE, document.body);