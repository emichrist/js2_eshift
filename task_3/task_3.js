function calculate(operation) {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultElement = document.getElementById("result");

    if (isNaN(num1) || isNaN(num2)) {
        resultElement.textContent = "Введите оба числа!";
        return;
    }

    let result;
    switch (operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                resultElement.textContent = "Ошибка: деление на ноль!";
                return;
            }
            result = num1 / num2;
            break;
        default:
            resultElement.textContent = "Неверная операция!";
            return;
    }

    resultElement.textContent = `Результат: ${result}`;
}