var firebaseConfig = {
//sensitive firebase authentication tokens removed for security
 };
 // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var txtSearchBar = document.getElementById('searchBar');

  var email = "";
  var uid = "";
  var originUserName = "";

  var db = firebase.firestore();

//Search for friends and add them
  btnSearch.addEventListener('click', e => {
  var search = txtSearchBar.value;
  db.collection("users").where("username", "==", search)
    .get()
    .then(function(querySnapshot) {
      if(querySnapshot.empty){
        alert("User not found!");
      }
      else {
        querySnapshot.forEach(function(doc) {

          var addValue = doc.get("username");
          //add friends
            db.collection("users").doc(uid).get().then(function(doc) {
              var originUserName = doc.get("username");
              if (doc.exists) {
                var friends = new Array();
                friends = doc.get("friends");
                if (friends.includes(addValue)){
                    alert("You are already friends with " + addValue);
                    return;
                }
                var friendRequests = new Array();
                friendRequests = doc.get("friendRequests");
                if(friendRequests.includes(addValue)){
                    var friends = new Array();
                    friends = doc.get("friends");
                    friends.push(addValue);
                    friendRequests.pop(addValue);
                    db.collection("users").doc(uid).update({
                    friendRequests: friendRequests,
                    friends: friends
                    })
                    .then(function(docRef) {
                      console.log("Document written");
                    })
                    .catch(function(error) {
                      console.error("Error adding document: ", error);
                    });
                    //update other user's too
                    db.collection("users").where("username", "==", addValue).get().then(function(querySnapshot) {
                      querySnapshot.forEach(function(doc){
                        var friends = new Array();
                        friends = doc.get("friends");
                        friends.push(originUserName);
                        db.collection("users").doc(doc.id).update({
                        friends: friends
                        })
                        .then(function(docRef) {
                          alert(doc.get("name") + " " + doc.get("last") + " is added to your friends.");
                          console.log("Document written");
                        })
                        .catch(function(error) {
                          console.error("Error adding document: ", error);
                        });
                        });
                    }).catch(function(error) {
                    console.log("Error getting document:", error);
                    });
                }
                else {
                  db.collection("users").where("username", "==", addValue).get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc){
                      var friendRequests = new Array();
                      friendRequests = doc.get("friendRequests");
                      friendRequests.push(originUserName);
                      db.collection("users").doc(doc.id).update({
                      friendRequests: friendRequests
                      })
                      .then(function(docRef) {
                        alert("Friend request sent to " + doc.get("name") + " " + doc.get("last"));
                        console.log("Friend request sent.");
                      })
                      .catch(function(error) {
                        console.error("Error adding document: ", error);
                      });
                      });
                  }).catch(function(error) {
                  console.log("Error getting document:", error);
                  });
                }
              } else {
            console.log("No such document!");
            }
            }).catch(function(error) {
            console.log("Error getting document:", error);
            });
        });
      }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  });
//end of search for friends and add them

//Create event
//modal for create event
var modal = document.querySelector('.modal');
var closeButtons = document.querySelectorAll('.close-modal');
// set open modal behaviour
document.querySelector('.open-modal').addEventListener('click', function() {
  modal.classList.toggle('modal-open');
});
// set close modal behaviour
for (i = 0; i < closeButtons.length; ++i) {
  closeButtons[i].addEventListener('click', function() {
    modal.classList.toggle('modal-open');
	});
}
// close modal if clicked outside content area
document.querySelector('.modal-inner').addEventListener('click', function() {
  modal.classList.toggle('modal-open');
});
// prevent modal inner from closing parent when clicked
document.querySelector('.modal-content').addEventListener('click', function(e) {
	e.stopPropagation();
});

//create new event
const btnCreateEvent = document.getElementById("createEvent");
btnCreateEvent.addEventListener('click', e => {
   const subject = document.getElementById("subject").value;
   const library = document.getElementById("library").value;
   const start = document.getElementById("start").value;
   const finish = document.getElementById("finish").value;
   const scope = document.getElementById("scope").value;

   db.collection("events").add({
       subject: subject,
       library: library,
       start: start,
       finish: finish,
       scope: scope,
       username: originUserName
   })
   .then(function(docRef) {
        alert("New study session created!");
        console.log("Document written with ID: ", docRef.id);
   })
   .catch(function(error) {
       console.error("Error adding document: ", error);
   });
 });

//landing on the page behavior
 firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser){
     console.log(firebaseUser);
     btnLogout.style.visibility = "visible";
     /*var db = firebase.firestore();
     db.collection("users").where("email", "==", firebaseUser.email).get().then(function(querySnapshot) {
       if(querySnapshot.empty){
         window.location.href = "./main.html";
       }
       else {

       }
     }).catch(function(error) {
     console.log("Error getting document:", error);
   });*/
     email = firebaseUser.email;
     uid = firebaseUser.uid;
     db.collection("users").doc(uid).get().then(function(doc) {
       originUserName = doc.get("username");
     });
   }
   else{
     console.log('not logged in');
     window.location.href = "./index.html";
   }
 });

//landing on page search through one's friends
firebase.auth().onAuthStateChanged(firebaseUser => {
  db.collection("users").doc(uid).get().then(function(doc) {
    var friends = new Array();
    friends = doc.get("friends");
    var i;
    //iterate for each friend
    for (i = 0; i < friends.length; i++) {
      //console.log(friends[i]);
      db.collection("events").where("username", "==", friends[i])
        .get()
        .then(function(querySnapshot) {

          /*var tempStr = function(){
          db.collection("users").where("username", "==", doc.get("username"))
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc1) {
              return doc1.get("name") + " " + doc1.get("last");
            });
          });
          return "a";
        };*/
        var tempStr = function("bora") {return "bora"};

          querySnapshot.forEach(function(doc) {

//Event card
            /*CSS Meetup Event Card by Sara Cope taken from https://codepen.io/saracope/pen/zBLPgQ*/
            var div5 = document.getElementById("div5");
            div5.appendChild(document.createElement('br'));
          //  var div1 = document.createElement('div');
          //div1.setAttribute('class', 'div7');
            var div2 = document.createElement('div');
            div2.setAttribute('class', 'wrapper');
            var h2 = document.createElement("h2");

            var txtCreater = document.createTextNode(tempStr);

            h2.appendChild(txtCreater);
            h2.setAttribute('class', 'upper');
            var a = document.createElement('a');
            var txtSubject = document.createTextNode(doc.get("subject"));
            a.appendChild(txtSubject);
            a.setAttribute('class','meetup');
            var p1 = document.createElement('p');
            p1.setAttribute('class','details');
            var span1 = document.createElement('span');
            span1.setAttribute('class','row');
            var i1 = document.createElement('i');
            i1.setAttribute('class','material-icons md-36 icon');//fix HERE *
            i1.appendChild(document.createTextNode("time"));
            var span2 = document.createElement('span');
            span2.setAttribute('class','row-item');
            var time = document.createElement('time');
            var txtStartTime = document.createTextNode(doc.get("start")+" to " + doc.get('finish')); //fix HERE *
            time.appendChild(txtStartTime);
            span1.appendChild(i1);
            span1.appendChild(span2);
            span1.appendChild(time);

            var span3 = document.createElement('span');
            span3.setAttribute('class','row');
            var i2 = document.createElement('i');
            i2.setAttribute('class','material-icons md-36 icon');
            i2.appendChild(document.createTextNode('place'));
            var span4 = document.createElement('span');
            span4.setAttribute('class','row-item');
            var strong = document.createElement('strong');
            var txtLibrary = document.createTextNode(doc.get("library"));
            strong.appendChild(txtLibrary);

            span3.appendChild(i2);
            span3.appendChild(span4);
            span3.appendChild(strong);

            p1.appendChild(span1);
            p1.appendChild(span3);

            div2.appendChild(h2)
            div2.appendChild(a);
            div2.appendChild(p1);
            div5.appendChild(div2);
          });
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
  }).catch(function(error) {
      console.error("Error adding document: ", error);
  });

  //show friend requests
  getFriendRequests();
  getFriends();
});

//Friend Requests List
function getFriendRequests(){
  db.collection("users").doc(uid).get().then(function(doc) {
    if (doc.exists) {
      var friendRequests = new Array();
      friendRequests = doc.get("friendRequests");
      var noti = document.getElementById("notifications");
      for (i = 0; i < friendRequests.length; i++) {
        var txtFriend= document.createTextNode(friendRequests[i]);
        noti.appendChild(txtFriend)
      }
    }
  })
}
  //Friends List currently does snothing
  function getFriends(){
    db.collection("users").doc(uid).get().then(function(doc) {
      if (doc.exists) {
        var friends= new Array();
        friends = doc.get("friends");
        //var noti = document.getElementById("notifications");
        for (i = 0; i < friends.length; i++) {
          //console.log(friends[i]);
          //var txtFriend= document.createTextNode(friendRequests[i]);
          //noti.appendChild(txtFriend)
        }
      }
  })
}



//log out
 btnLogout.addEventListener('click', e => {
   firebase.auth().signOut();
 });
