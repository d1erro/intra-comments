const button = document.querySelector('button');

button.addEventListener('click', (e) => {
    let inputNumbers = document.getElementById('numbers').value;
    let arrayNumbers = inputNumbers.split('\n');
    for (let i = 0; i < arrayNumbers.length; i++) {
        window.open(`https://admin-nk.tatar.ru/opengov/order/${arrayNumbers[i]}`);
    }
})