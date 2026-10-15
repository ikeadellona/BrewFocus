const drinkButtons = document.querySelectorAll(".drink-card");
const selectedDrinkText = document.getElementById("selected-drink");

drinkButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove selection from all buttons
        drinkButtons.forEach(function(otherButton) {
            otherButton.classList.remove("selected");
        });

        // Select the clicked button
        button.classList.add("selected");
        selectedDrinkText.textContent = "Your study drink is " + button.dataset.drink + "!";
        // Print the selected drink
        console.log(button.dataset.drink);

    });

});