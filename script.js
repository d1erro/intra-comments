const openNoticesInNewTabButton = document.querySelector('#add-comments');

let uniqueArray = [];
let arrayNotices = [];
let currentTemplate = '';
let radioButtonValue;

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
});

openNoticesInNewTabButton.addEventListener('click', () => {
    for (let i = 0; i < uniqueArray.length; i++) {
        window.open(`${currentTemplate}${uniqueArray[i]}`);
    }
});

const printNoticesButton = document.querySelector('#print-notices');
printNoticesButton.addEventListener('click', () => {
    for (let num of uniqueArray) {
        printNotices(num);
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

const getRadioButtons = document.querySelector('.switch-buttons');
getRadioButtons.addEventListener('change', (e) => {

})

function getUniqueElementsArray(array) {
    const result = [];
    for (let item of array) {
        if (!result.includes(item)) result.push(item);
    }
    return result;
}

function printNotices(notice) {
    const createNotice = document.createElement('button');
    createNotice.className = 'notice';
    createNotice.innerText = `Заявка: ${notice} | Комментариев - ${amountNoticeInArray
    (notice, arrayNotices)}`;
    createNotice.id = `notice${notice}`;
    noticeList.append(createNotice);
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