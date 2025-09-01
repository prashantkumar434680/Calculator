const btns = Array.from(document.getElementsByClassName('numbers'));
const input = document.querySelector('input');

// Input validation
input.addEventListener("input", () => {
    const validInput = /^[0-9+\-*÷.%]*$/;
    if (!validInput.test(input.value)) {
        input.value = input.value.replace(/[^0-9÷\-+*%./]/g, "");
    }
});

// Number buttons
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        input.value += btn.value;
    });
});

// Backspace button
document.getElementById('backspace').addEventListener("click", (e) => {
    input.value = input.value.slice(0, -1);
});

// Decimal point button
document.getElementById('dot').addEventListener('click', (e) => {
    if (input.value.endsWith(".")) return;
    else if (["+", "-", "÷", "*", "%"].includes(input.value.slice(-1))) return;
    else input.value += ".";
});

// Enter button (fixed selector - you had document.addEventListener instead of getting element)
document.getElementById('enter').addEventListener("click", () => {
    try {
        // Replace ÷ with / for eval
        const expression = input.value.replace(/÷/g, '/');
        input.value = eval(expression);
    } catch (error) {
        input.value = "Error";
    }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        try {
            const expression = input.value.replace(/÷/g, '/');
            input.value = eval(expression);
        } catch (error) {
            input.value = "Error";
        }
    }
});

// Operator buttons (fixed this section)
const operators = Array.from(document.getElementsByClassName('operator'));
operators.forEach((op) => {
    op.addEventListener("click", () => {
        if (["+", "-", "÷", "*", "%"].includes(input.value.slice(-1))) return;
        if (input.value == "" && (op.value == "÷" || op.value == "*")) return;
        input.value += op.value;
    });
});