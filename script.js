const button = document.querySelector('#comments');

button.addEventListener('click', (e) => {
    let inputNumbers = document.getElementById('numbers').value;
    let arrayNumbers = inputNumbers.split('\n');
    for (let i = 0; i < arrayNumbers.length; i++) {
        window.open(`https://admin-nk.tatar.ru/opengov/order/${arrayNumbers[i]}`);
    }
})

const statistic = document.querySelector('#statistic');
statistic.addEventListener('click', () => {
    window.open(`https://admin-nk.tatar.ru/opengov/statistics/index`);
})