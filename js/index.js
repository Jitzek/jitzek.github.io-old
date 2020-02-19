/* 
 *About buttons active Handler
*/

// Get all buttons with class="about-btn" inside the container
var about_btns = document.getElementById("about-btn-container").getElementsByClassName("about-btn");

// Loop through the buttons and add the about-btn-active class to the current/clicked button
for (var i = 0; i < about_btns.length; i++) {
    about_btns[i].addEventListener("click", function () {
        var current_about_btn = document.getElementsByClassName("about-btn-active");
        current_about_btn[0].className = current_about_btn[0].className.replace(" about-btn-active", "");
        this.className += " about-btn-active";
    });
}
//------//



/* 
 *Programming buttons active Handler
*/
var pr_active = "pr-btn-active";

// Get all buttons with class="pr-btn" inside the container "pr-btn-container"
var pr_btns = document.getElementById("pr-btn-container").getElementsByClassName("pr-btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < pr_btns.length; i++) {
    pr_btns[i].addEventListener("click", function () {
        var current_pr_btn = document.getElementsByClassName(pr_active);

        var already_active = this.className.includes(pr_active);

        // If there is an active class
        if (current_pr_btn.length > 0) {
            if (document.getElementById(current_pr_btn[0].id + "-tab")) {
                document.getElementById(current_pr_btn[0].id + "-tab").style.display = "none";
            }
            // Remove active class from button
            current_pr_btn[0].className = current_pr_btn[0].className.replace(" " + pr_active, "");
        }

        // If the button wasn't already active
        if (!already_active) {
            // Add the active class to the clicked button
            this.className += " pr-btn-active";

            if (document.getElementById(current_pr_btn[0].id + "-tab")) {
                document.getElementById(current_pr_btn[0].id + "-tab").style.display = "inline";
            }
        }
    });
}
//------//