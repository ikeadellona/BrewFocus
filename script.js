const drinkButtons = document.querySelectorAll(".drink-card");

drinkButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        console.log(button.dataset.drink);
    });
});