const openNoticesInNewTabButton = document.querySelector('#add-comments');
const inputRange = document.querySelector('input[type=range]');

let uniqueArray = [];
let arrayNotices = [];
let currentTemplate = '';
let inputRangeValue = Number(inputRange.value);
let startValue = 0;
let endValue = inputRangeValue;
let isFirstOpen = true;
let prevArray = [];
let currentArray = [];

printInputRangeValue(inputRangeValue);

inputRange.addEventListener('change', (e) => {
    inputRangeValue = Number(e.target.value);
    endValue = inputRangeValue;
    printInputRangeValue(inputRangeValue);
})

const inputTemplate = document.querySelector('#template');
inputTemplate.addEventListener('change', (e) => {
    setCurrentTemplate(e.target.value);
    printCurrentTemplate(currentTemplate);
})

const textArea = document.querySelector('textarea');
textArea.addEventListener('change', () => {
    const inputNumbers = document.getElementById('numbers').value;
    arrayNotices = inputNumbers.split('\n');
    uniqueArray = getUniqueElementsArray(arrayNotices);
    printNoticesInTable();
});

openNoticesInNewTabButton.addEventListener('click', () => {
    const currentArray = uniqueArray.slice(startValue, endValue);
    if (isFirstOpen) {
        for (let i = 0; i < currentArray.length; i++) {
            const notice = document.querySelector(`#notice${currentArray[i]}`);
            notice.classList.add('in-progress');
        }
        prevArray = currentArray.slice();
        openNoticesInNewTab(currentArray);
        isFirstOpen = false;
    } else {
        for (let i = 0; i < prevArray.length; i++) {
            const notice = document.querySelector(`#notice${prevArray[i]}`);
            notice.classList.remove('in-progress');
            notice.classList.add('done-notice');
        }
        for (let i = 0; i < currentArray.length; i++) {
            const notice = document.querySelector(`#notice${currentArray[i]}`);
            notice.classList.add('in-progress');
            prevArray = [];
            prevArray = currentArray.slice();
        }
        openNoticesInNewTab(currentArray);
    }
});

const resetTextArea = document.querySelector('#clear-textarea');
resetTextArea.addEventListener('click' , () => {
    textArea.value = '';
    uniqueArray = [];
    arrayNotices = [];
});

const noticeList = document.querySelector('.notice-list');
const secondColumn = document.querySelector('.second-column');

const clearTableButton = document.querySelector('#clear-table');
clearTableButton.addEventListener('click', () => {
    const noticesInDisplay = document.querySelectorAll('.notice')
    noticesInDisplay.forEach(notice => {
        notice.remove();
    })
});

noticeList.addEventListener('click', (e) => {
    const notice = document.querySelector(`#${e.target.id}`);
    if (!notice.classList.value.includes('done-notice')) {
        notice.classList.remove('fail-notice');
        notice.classList.add('done-notice');
    } else {
        notice.classList.remove('done-notice');
        notice.classList.add('fail-notice');
    }
})

function openNoticesInNewTab(arr) {
    for (let i = 0; i < arr.length; i++) {
        window.open(`${currentTemplate}${arr[i]}`);
    }
    startValue += inputRangeValue;
    endValue += inputRangeValue;
}

function getUniqueElementsArray(array) {
    const result = [];
    for (let item of array) {
        if (!result.includes(item)) result.push(item);
    }
    return result;
}

function printNoticesInTable() {
    for (let num of uniqueArray) {
        const createNotice = document.createElement('button');
        createNotice.className = 'notice';
        createNotice.innerText = `Заявка: ${num} | Комментариев - ${amountNoticeInArray
        (num, arrayNotices)}`;
        createNotice.id = `notice${num}`;
        noticeList.append(createNotice);
    }
}

function amountNoticeInArray(notice, array) {
    const result = array.filter(element => element === notice);
    return result.length;
}

function printCurrentTemplate(str) {
    const createDisplayCurrentTemplate = document.createElement('p');
    createDisplayCurrentTemplate.innerText = `Текущий шаблон: ${str}`;
    createDisplayCurrentTemplate.className = 'current-template';
    const getDisplayCurrentTemplate = document.querySelector('.current-template')
    if (getDisplayCurrentTemplate === null) {
        inputTemplate.before(createDisplayCurrentTemplate);
    } else {
        getDisplayCurrentTemplate.replaceWith(createDisplayCurrentTemplate);
    }
}

function setCurrentTemplate(str) {
    currentTemplate = str;
}

function printInputRangeValue(value) {
    const getInputRangeValue = document.querySelector('.input-display-range')
    const createInputRangeValue = document.createElement('p');
    createInputRangeValue.innerText = `Количество заявок: ${value}`;
    createInputRangeValue.className = 'input-display-range'
    const rangeInfo = document.querySelector('.range-info');
    if (getInputRangeValue === null) {
        rangeInfo.prepend(createInputRangeValue);
    } else {
        getInputRangeValue.replaceWith(createInputRangeValue);
    }

}