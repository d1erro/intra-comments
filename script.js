const openNoticesInNewTabButton = document.querySelector('#add-comments');
const inputRange = document.querySelector('input[type=range]');
const inputTemplate = document.querySelector('#template');
const textArea = document.querySelector('textarea');
const resetTextArea = document.querySelector('#clear-textarea');
const noticeList = document.querySelector('.notice-list');
const clearTableButton = document.querySelector('#clear-table');
const getAmountNoticesInDisplay = document.querySelector('h4');

let uniqueArray = [];
let arrayNotices = [];
let currentTemplate = '';
let inputRangeValue = Number(inputRange.value);
let startValue = 0;
let endValue = inputRangeValue;
let isFirstOpen = true;
let prevArray = [];
let remainderNoticesArray = [];

printInputRangeValue(inputRangeValue);

inputRange.addEventListener('mousemove', (e) => {
    inputRangeValue = Number(e.target.value);
    endValue = inputRangeValue;
    printInputRangeValue(inputRangeValue);
})

inputTemplate.addEventListener('change', (e) => {
    setCurrentTemplate(e.target.value);
    printCurrentTemplate(currentTemplate);
})



textArea.addEventListener('change', () => {
    clearTable();
    const inputNumbers = document.getElementById('numbers').value;
    arrayNotices = inputNumbers.split('\n');
    uniqueArray = getUniqueElementsArray(arrayNotices);
    remainderNoticesArray = arrayNotices.slice();
    printNoticesInTable();
});

openNoticesInNewTabButton.addEventListener('click', () => {
    const currentArray = uniqueArray.slice(startValue, endValue);
    if (isFirstOpen) {
        setClass(currentArray, 'in-progress');
        prevArray = currentArray.slice();
        openNoticesInNewTab(currentArray);
        isFirstOpen = false;
    } else {
        setClass(prevArray, 'done-notice');
        setClass(currentArray, 'in-progress');
        prevArray = [];
        prevArray = currentArray.slice();
        openNoticesInNewTab(currentArray);
    }
});

resetTextArea.addEventListener('click' , () => {
    textArea.value = '';
    uniqueArray = [];
    arrayNotices = [];
});

clearTableButton.addEventListener('click', () => {
    clearTable();
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
    const createAmountNoticesInDisplay = document.createElement('h4');
    const amountDoneNotices = document.querySelectorAll('.notice-list + button :not(.done-notice)');
    createAmountNoticesInDisplay.innerText = `Осталось комментариев: ${amountDoneNotices.length}`;
    console.log(amountDoneNotices)
    noticeList.append(createAmountNoticesInDisplay);
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

function setClass(array, classValue) {
    for (let i = 0; i < array.length; i++) {
        const notice = document.querySelector(`#notice${array[i]}`);
        notice.classList.remove('done-notice');
        notice.classList.remove('fail-notice');
        notice.classList.remove('in-progress');
        notice.classList.add(`${classValue}`);
    }
}

function clearTable() {
    const noticesInDisplay = document.querySelectorAll('.notice');
    const getAmountNoticesInDisplay = document.querySelector('h4');
    if (getAmountNoticesInDisplay !== null) getAmountNoticesInDisplay.remove();
    noticesInDisplay.forEach(notice => {
        notice.remove();
    })
}

