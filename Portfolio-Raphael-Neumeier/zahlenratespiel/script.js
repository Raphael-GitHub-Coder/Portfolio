let targetNumber;
let attempts;
let remainingAttempts;

startGame(10);

function startGame(difficulty) {
    targetNumber = getRandomNumber(1, 101);
    attempts = 0;
    remainingAttempts = difficulty;
    updateAttemptsCounter();
    setMessage('');
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessInput').focus();
    document.getElementById('message').classList.remove('fade-in');
    document.getElementById('message').textContent = '';
    document.getElementById('difficulty-buttons').style.display = 'none';
    document.getElementById('guessInput').setAttribute('max', difficulty);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        setMessage('Bitte gib eine gültige Zahl zwischen 1 und 100 ein.');
        return;
    }

    attempts++;
    remainingAttempts--;

    if (guess === targetNumber) {
        setMessage(`Glückwunsch! Du hast die Zahl ${targetNumber} richtig in ${attempts} Versuchen erraten.`);
        document.getElementById('guessInput').disabled = true;
    } else if (guess < targetNumber) {
        setMessage('Zu niedrig! Versuche es mit einer größeren Zahl');
    } else {
        setMessage('Zu hoch! Versuche es mit einer kleineren Zahl');
    }

    if (remainingAttempts <= 0) {
        showLossPopup();
        document.getElementById('guessInput').disabled = true;
    }

    updateAttemptsCounter();
}

function updateAttemptsCounter() {
    document.getElementById('attempts-counter').textContent = `Versuche übrig: ${remainingAttempts}`;
}

function setMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.classList.add('fade-in');
}

function restartGame() {
    document.getElementById('guessInput').value = '';
    remainingAttempts = 10;
    startGame(remainingAttempts);
}

function setDifficulty(difficulty) {
    startGame(difficulty);
}

function showPopup() {
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    popup.style.display = 'block';
    popupMessage.textContent = `Glückwunsch! Du hast die Zahl ${targetNumber} richtig in ${attempts} Versuchen erraten.`;
    blurBackground();
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    unblurBackground();
}

function showLossPopup() {
    const lossPopup = document.getElementById('lossPopup');
    const lossPopupMessage = document.getElementById('loss-popup-message');
    lossPopup.style.display = 'block';
    lossPopupMessage.textContent = `Du hast alle Versuche aufgebraucht. Die richtige Zahl war ${targetNumber}.`;
    blurBackground();
}

function closeLossPopup() {
    const lossPopup = document.getElementById('lossPopup');
    lossPopup.style.display = 'none';
    unblurBackground();
}

function restartGameFromLossPopup() {
    closeLossPopup();
    restartGame();
}

function blurBackground() {
    const container = document.querySelector('.container');
    container.style.filter = 'blur(5px)';
}

function unblurBackground() {
    const container = document.querySelector('.container');
    container.style.filter = 'none';
}
