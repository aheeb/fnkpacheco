if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: "AIzaSyARAND90jedhd0fNjZRAV6APEBeWaSwYFI",
      authDomain: "fnkpacheco.firebaseapp.com",
      projectId: "fnkpacheco",
      storageBucket: "fnkpacheco.appspot.com",
      messagingSenderId: "1053912919489",
      appId: "1:1053912919489:web:4434977dd4c7db4cef5340",
    };
    firebase.initializeApp(firebaseConfig);
  }
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      // Benutzer ist nicht eingeloggt, Weiterleitung zur Login-Seite
      window.location.href = "login.html";
    }
  });
  
  
  const db = firebase.firestore();

  // Add a new event to the first timeline
document.getElementById("timelineEventForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
  
    db.collection("timelineEvents").add({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      title: title,
      description: description
    }).then(() => {
      alert("Event added");
    }).catch((error) => {
      alert("Error adding event: " + error);
    });
  });
  
  // Add a new project to the second timeline
  document.getElementById("projectForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const year = document.getElementById("projectYear").value;
    const month = document.getElementById("projectMonth").value;
    const day = document.getElementById("projectDay").value;
    const text1 = document.getElementById("text1").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const text2 = document.getElementById("text2").value;
  
    db.collection("projects").add({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      text1: text1,
      imageUrl: imageUrl,
      text2: text2
    }).then(() => {
      alert("Project added");
    }).catch((error) => {
      alert("Error adding project: " + error);
    });
  });
  