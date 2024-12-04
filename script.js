const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const timerElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');
const startBtn = document.getElementById('start-btn');

const texts = [
    'Beware the ides of March.',
    'To be or not to be, that is the question.',
    'All that glitters is not gold.',
    'Et tu, Brute?',
    'The course of true love never did run smooth.',
];

let timeLeft = 60;
let timerInterval;
let started = false;
let correctWords = 0;

function startGame() {
    if (started) return;
    started = true;
    textInput.disabled = false;
    textInput.focus();
    startBtn.disabled = true;

    displayNewText();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    textInput.disabled = true;
    alert(`Time's up! Your WPM is ${calculateWPM()}.`);
    started = false;
    timeLeft = 60;
    timerElement.textContent = timeLeft;
    wpmElement.textContent = '0';
    startBtn.disabled = false;
    textInput.value = '';
}

function calculateWPM() {
    const minutes = 1;
    const wpm = Math.floor(correctWords / minutes);
    wpmElement.textContent = wpm;
    return wpm;
}

function checkInput() {
    const input = textInput.value;
    const textToMatch = textDisplay.textContent;
    calculateWPM();

    if (input.endsWith(' ') && textToMatch.startsWith(input.trim())) {
        correctWords++;
    }

    for (let i = 0; i < input.length; i++) {
        if (input[i] === textToMatch[i]) {
            textInput.style.color = 'black';
        } else {
            textInput.style.color = 'red';
        }
    }

    if (input === textToMatch) {
        displayNewText();
        textInput.value = '';
    }

    applyRandomStyles();
}

function displayNewText() {
    const randomIndex = Math.floor(Math.random() * texts.length);
    textDisplay.textContent = texts[randomIndex];
    applyRandomStyles();
}

function applyRandomStyles() {
    const fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Impact', 'Verdana', 'Comic Sans MS', 'Trebuchet MS'];
    const colors = ['#d63031', '#0984e3', '#00b894', '#fdcb6e', '#6c5ce7', '#e84393', '#55efc4'];
    const sizes = ['20px', '22px', '24px', '26px', '28px', '30px', '32px', '34px', '36px'];
    const positions = ['left', 'center', 'right', 'justify'];

    textDisplay.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
    textDisplay.style.color = colors[Math.floor(Math.random() * colors.length)];
    textDisplay.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
    textDisplay.style.textAlign = positions[Math.floor(Math.random() * positions.length)];

    textDisplay.style.fontWeight = Math.random() > 0.5 ? 'bold' : 'normal';
    textDisplay.style.fontStyle = Math.random() > 0.5 ? 'italic' : 'normal';
    textDisplay.style.textDecoration = Math.random() > 0.5 ? 'underline' : 'none';
    textDisplay.style.letterSpacing = Math.floor(Math.random() * 10) + 'px';
    textDisplay.style.lineHeight = Math.floor(Math.random() * 10) + 'px';
}

textInput.addEventListener('input', checkInput);
startBtn.addEventListener('click', startGame);