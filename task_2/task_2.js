const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

function generatePassword() {
    const length = parseInt(document.getElementById('lengthInput').value);
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    const passwordOutput = document.getElementById('passwordOutput');
    
    // Проверка выбранных опций
    if (!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols) {
        passwordOutput.textContent = "Выберите хотя бы один тип символов!";
        return;
    }

    // Создание пула символов на основе выбранных опций
    let characters = "";
    if (includeLowercase) characters += lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordOutput.textContent = `Ваш пароль: ${password}`;
}