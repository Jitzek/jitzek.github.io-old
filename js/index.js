// Get the container element
var btnContainer = document.getElementById("about-btn-container");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("about-btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("about-btn-active");
        current[0].className = current[0].className.replace(" about-btn-active", "");
        this.className += " about-btn-active";
    });
}