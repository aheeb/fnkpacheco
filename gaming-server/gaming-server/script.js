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

const db = firebase.firestore();

let timelineHtml = "";

db.collection("timelineEvents")
  .get()
  .then((querySnapshot) => {
    let events = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (
        typeof data.day === "number" &&
        typeof data.month === "number" &&
        typeof data.year === "number" &&
        typeof data.description === "string"
      ) {
        events.push(data);
      }
    });

    // Sortiere die Ereignisse nach Jahr, Monat und Tag in aufsteigender Reihenfolge
    events.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });

    events.forEach((data) => {
      const position = data.year % 2 === 0 ? "left" : "right";
      const eventHtml = `
    <div class="container ${position} mx-auto">
    <div class="content">
      <h2 style="color: black">${data.year}</h2>
      <h3 style="font-weight: bold; color: black">${data.title}</h3>
      <p style="color: black">${data.description}</p>
    </div>
  </div>
  `;
      timelineHtml += eventHtml;
    });

    console.log(events);

    document.querySelector(".timeline").innerHTML = timelineHtml;
  });

let leftListHtml = "";
let currentYear = null;

db.collection("projects")
  .get()
  .then((querySnapshot) => {
    let projects = [];

    querySnapshot.forEach((doc) => {
      projects.push(doc.data());
    });

    // Sortierung nach Jahr, Monat, Tag
    projects.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      if (a.month !== b.month) return a.month - b.month;
      return a.day - b.day;
    });

    projects.forEach((data) => {
      if (currentYear !== data.year) {
        if (currentYear !== null) {
          leftListHtml += `</div>`; // Schließe den vorherigen Container
        }
        leftListHtml += `<div class="year-container">
      <div class="year-bracket"></div>
      <span class="year-label">${data.year}</span>`;
        currentYear = data.year;
      }

      const listItemHtml = `
    <div class="flex items-center justify-center p-2 bg-white text-black h-[50px] mt-4 mb-4">
      <div class="w-1/3 flex items-center justify-center py-2">${data.text1}</div>
      <div class="w-1/3 flex items-center justify-center py-2">
        <img src="${data.imageUrl}" alt="${data.text1}" class="mx-auto">
      </div>
      <div class="w-1/3 flex items-center justify-center py-2">${data.text2}</div>
    </div>
    `;
      leftListHtml += listItemHtml;
    });

    leftListHtml += "</div>"; // Schließe den letzten Container
    document.querySelector("#leftList").innerHTML = leftListHtml;
  });

// Login
// Login mit Firebase Auth
document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Nach dem erfolgreichen Login
      alert("User authenticated");
    } catch (error) {
      alert("Invalid email or password");
    }
  });

// Add a new event to Firestore


