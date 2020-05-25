var firebaseConfig = {
//sensitive firebase authentication tokens removed for security
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 //const auth = firebase.auth();

  //



  //

 const txtEmail = document.getElementById('txtEmail');
 const txtPass = document.getElementById('txtPass');;

 const btnLogin = document.getElementById('btnLogin');
 const btnSignup = document.getElementById('btnSignup');
 const btnLogout = document.getElementById('btnLogout');

 btnLogin.addEventListener('click', e => {
   const email = txtEmail.value;
   const pass = txtPass.value;
   const auth = firebase.auth();

   const promise = auth.signInWithEmailAndPassword(email, pass);
   promise.catch(e => console.log(e.message));
 });

 btnSignup.addEventListener('click', e => {
   const email = txtEmail.value;
   const pass = txtPass.value;
   const auth = firebase.auth();

   const promise = auth.createUserWithEmailAndPassword(email, pass);
   promise.catch(e => console.log(e.message));
 });

 btnLogout.addEventListener('click', e => {
   firebase.auth().signOut();
 });

 firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser){
     //window.location.href = "./home.html";
     console.log(firebaseUser);
     btnLogout.style.visibility = "visible";
     var db = firebase.firestore();
     db.collection("users").where("email", "==", firebaseUser.email).get().then(function(querySnapshot) {
       if(querySnapshot.empty){
         window.location.href = "./main.html";
       }
       else {
         window.location.href = "./home.html";
       }
     }).catch(function(error) {
     console.log("Error getting document:", error);
   });
   }
   else{
     console.log('not logged in');
     btnLogout.style.visibility = "hidden";
   }
 });
