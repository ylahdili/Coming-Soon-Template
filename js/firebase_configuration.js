// Initialize Firebase
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var config = {
    apiKey: "AIzaSyCFoJGpZOluzB_Qu2tbOC5elMIIficXB2g",
    authDomain: "coming-soon-digizy.firebaseapp.com",
    databaseURL: "",
    projectId: "coming-soon-digizy",
    storageBucket: "coming-soon-digizy.appspot.com",
    messagingSenderId: "414610334048"
};
firebase.initializeApp(config);
var db = firebase.firestore();
db.settings({
    timestampsInSnapshots: true
});

$(document).ready(function () {

    $('#notifs-form-btn').click(function (e) {
        var is_present = false;
        email = $('#notifs-form-input').val();
        if (validateEmail(email)) {
            db.collection('Emails').get().then(function (qs) {
                qs.forEach(function (element) {
                    if (element.data()['ID'] == email) {
                        is_present = true;
                    }
                });

                if (is_present == false) {
                    db.collection("Emails").add({
                        'ID': email,
                    })
                        .then(function (docRef) {
                            console.log("Document written with ID: ", docRef.id);
                            $("#notifs-form-btn").text("Notified!").css("background-color", "green");
                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error);
                        });
                }
            });

        }
        else {
            alert('Invalid Email');
        }
    });

});