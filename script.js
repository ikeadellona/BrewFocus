const drinkButtons = document.querySelectorAll(".drink-card");
const selectedDrinkText = document.getElementById("selected-drink");
const notificationSound = new Audio("sounds/chimeout.mp3");

drinkButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove selection from all buttons
        drinkButtons.forEach(function(otherButton) {
            otherButton.classList.remove("selected");
        });

        // Select the clicked button
        button.classList.add("selected");
        // selectedDrinkText.textContent = "Your study drink is " + button.dataset.drink + "!";
        
        // Hide the drink selection screen
        document.getElementById("drink-screen").classList.add("hidden");

        // Show the timer screen
        document.getElementById("timer-screen").classList.remove("hidden");

        // Set the timer to focus mode
        switchMode("focus");

    });
});

// Timer variables

const durations = {
    // focus: 25 * 60,
    // shortBreak: 5 * 60,
    // longBreak: 15 * 60
    focus: 10,
    shortBreak: 5,
    longBreak: 8
};

let currentMode = "focus";
let timeLeft = durations.focus;
let totalTime = durations.focus;

let completedSessions = 0;

let timerInterval = null;
const liquid = document.getElementById("liquid");


// Get HTML elements
const timerDisplay = document.getElementById("timer-display");
const toggleButton = document.getElementById("toggle-btn");
const resetButton = document.getElementById("reset-btn");

// Update the displayed time
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

    // Update the liquid height based on time left
    const liquidPercentage = (timeLeft / totalTime) * 100;
    liquid.style.height = liquidPercentage + "%";
}

// Start the timer
function startTimer() {
    if (timerInterval !== null || timeLeft <= 0) {
        return;
    }

    timerInterval = setInterval(function() {
        timeLeft--;
        updateDisplay();

        if (timeLeft === 0) {
            pauseTimer();
            completeSession();
        }
    }, 1000);

    toggleButton.textContent = "Pause";
}

function completeSession() {
    pauseTimer();

    notificationSound.currentTime = 0;
    notificationSound.play().catch(function(error) {
        console.log("Sound could not play:", error);
    });

    if (currentMode === "focus") {
        completedSessions++;

        if (completedSessions % 4 === 0) {
            switchMode("longBreak");
        } else {
            switchMode("shortBreak");
        }

        alert("Focus complete! Time for a break!");
        notificationSound.pause();
        notificationSound.currentTime = 0;
    } else {
        switchMode("focus");
        alert("Break complete! Ready to focus?");
        notificationSound.pause();
        notificationSound.currentTime = 0;
    }

    startTimer();
}


// Pause the timer
function pauseTimer() {
    toggleButton.textContent = "Start";
    clearInterval(timerInterval);
    timerInterval = null;
}

// Reset the timer
function resetTimer() {
    pauseTimer();
    timeLeft = totalTime;
    updateDisplay();
}

// This function stops the current countdown,
//  changes the session duration, and updates the display.
function switchMode(mode) {
    pauseTimer();

    currentMode = mode;
    totalTime = durations[mode];
    timeLeft = totalTime;

    const sessionLabel = document.getElementById("session-label");

    if (mode === "focus") {
        sessionLabel.textContent = "Focus Session";
    } else if (mode === "shortBreak") {
        sessionLabel.textContent = "Short Break";
    } else {
        sessionLabel.textContent = "Long Break";
    }

    if (mode === "focus") {
        document.body.classList.add("focus-mode");
        document.body.classList.remove("break-mode");
    } else {
        document.body.classList.remove("focus-mode");
        document.body.classList.add("break-mode");
    }

    updateDisplay();
}

const homeLink = document.getElementById("home-link");

homeLink.addEventListener("click", function(event) {
    event.preventDefault();

    // Stop the timer
    pauseTimer();

    // Return to drink selection
    document.getElementById("timer-screen").classList.add("hidden");
    document.getElementById("drink-screen").classList.remove("hidden");

    // Reset to focus mode
    switchMode("focus");
    document.body.classList.remove("focus-mode");
    document.body.classList.remove("break-mode");

});
// document.getElementById("focus-mode").addEventListener("click", function() {
//     switchMode("focus");
// });

// document.getElementById("short-break-mode").addEventListener("click", function() {
//     switchMode("shortBreak");
// });

// document.getElementById("long-break-mode").addEventListener("click", function() {
//     switchMode("longBreak");
// });

// Button click events
toggleButton.addEventListener("click", function() {
    if (timerInterval === null) {
        startTimer();
    } else {
        pauseTimer();
    }
});
resetButton.addEventListener("click", resetTimer);