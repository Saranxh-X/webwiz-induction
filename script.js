const timerCards = document.querySelectorAll('.timer-card');

timerCards.forEach(card => {
    let timerId = null;
    const duration = parseInt(card.getAttribute('data-duration'));
    let timeLeft = duration;
    
    const display = card.querySelector('.display');
    const startBtn = card.querySelector('.start-btn');
    const resetBtn = card.querySelector('.reset-btn');

    function updateDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startBtn.addEventListener('click', () => {
        if (timerId === null) {
            startBtn.innerText = "Pause";
            startBtn.style.background = "#ff7675"; 
            timerId = setInterval(() => {
                timeLeft--;
                updateDisplay();
                if (timeLeft <= 0) {
                    clearInterval(timerId);
                    timerId = null;
                    alert(`${card.querySelector('h3').innerText} finished!`);
                }
            }, 1000);
        } else {
            clearInterval(timerId);
            timerId = null;
            startBtn.innerText = "Start";
            startBtn.style.background = "#00d2ff";
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerId);
        timerId = null;
        timeLeft = duration;
        updateDisplay();
        startBtn.innerText = "Start";
        startBtn.style.background = "#00d2ff";
    });
});