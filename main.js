var firebaseConfig = {
//sensitive firebase authentication tokens removed for security
 };
 // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const btnLogout = document.getElementById('btnLogout');

  var email = "";
  var uid = "";

  const btnCont = document.getElementById('btnCont');
  const txtUserName = document.getElementById('userName');
  const txtFirstName = document.getElementById('firstName');
  const txtLastName = document.getElementById('lastName');
  const txtGrade = document.getElementById('grade');

   btnCont.addEventListener('click', e => {
     const userName = txtUserName.value;
     const firstName = txtFirstName.value;
     const lastName = txtLastName.value;
     const grade = txtGrade.value;
     var friends = new Array();
     var friendRequests = new Array();

     if (userName.length > 0 && firstName.length > 0 && lastName.length > 0 && grade.length > 0 && email.length > 0) {
      var db = firebase.firestore();
      db.collection("users").where("username","==","be2246").get().then(function(docSnapshot) {
        if (docSnapshot.exists) {
          alert("username already in use. Please select another one.");
        }
        else {
          db.collection("users").doc(uid).set({
            username: userName,
            email: email,
            name: firstName,
            last: lastName,
            grade: grade,
            friends: friends,
            friendRequests: friendRequests
          })

          .then(function(docRef) {
            console.log("Document written");
            window.location.href = "./home.html";
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
        }
      });
     }
     else {
       alert("Please fill all required fields.");
     }
    });

 firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser){
     console.log(firebaseUser);
     email = firebaseUser.email;
     uid = firebaseUser.uid;
   }
   else{
     console.log('not logged in');
     window.location.href = "./index.html";
   }
 });

 btnLogout.addEventListener('click', e => {
   firebase.auth().signOut();
 });
