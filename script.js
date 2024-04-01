function blogNav(button){
    // Deactivate all buttons with the class "myButton"
    var buttons = document.querySelectorAll('.blogButtons');
    buttons.forEach(function(btn) {
        btn.disabled = true;
    });

    // Activate the clicked button
    button.disabled = false;
}
        