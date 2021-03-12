$(document).ready(function () {
    $("form#formXYZ").submit(function (event) {
        event.preventDefault();
        var firstname = $("input#firstname").val();
        var lastname = $("input#lastname").val();
        var email = $("input#emaill").val();
        var checkin = $("input#checkin").val();
        var checkout = $("input#checkout").val();
        if ($("input#firstname").val() && $("input#lastname").val() && $("input#emaill").val() && $("input#checkin").val() && $("input#checkout").val()) {
            alert(firstname + lastname + ", your booking to " + " from " + checkin + " to " + checkout + " has been recieved. An email with confirmation details has been sent to " + email);
        }
        else {
            alert("Enter all your information to proceed!");
        }
    });

});