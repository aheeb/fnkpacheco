// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyARAND90jedhd0fNjZRAV6APEBeWaSwYFI",
    authDomain: "fnkpacheco.firebaseapp.com",
    projectId: "fnkpacheco",
    storageBucket: "fnkpacheco.appspot.com",
    messagingSenderId: "1053912919489",
    appId: "1:1053912919489:web:4434977dd4c7db4cef5340"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      // Benutzer ist nicht eingeloggt, Weiterleitung zur Login-Seite
      window.location.href = "login.html";
    }
  });
  
  
  const trial = firebase.firestore();
document.getElementById("update-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission behavior
  
    const title = document.getElementById('title').value;
    const updateName = document.getElementById('updateName').value;
    const description = document.getElementById('description').value;
  
    trial.collection("updates").add({
      title,
      updateName,
      description
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      console.log("hello");
      alert("Update sent successfully!");
    })
    .catch((error) => {
      console.log("hello");
      console.error("Error adding document: ", error);
    });
  });