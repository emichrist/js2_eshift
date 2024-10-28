const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    const message = document.getElementById('message');

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Введите число от 1 до 100!";
        return;
    }

    attempts++;
    if (userGuess === randomNumber) {
        message.textContent = `Поздравляю! Вы угадали число ${randomNumber} за ${attempts} попыток.`;
    } else if (userGuess < randomNumber) {
        message.textContent = "Загаданное число больше!";
    } else {
        message.textContent = "Загаданное число меньше!";
    }

    document.getElementById('guessInput').value = "";
    document.getElementById('guessInput').focus();
}