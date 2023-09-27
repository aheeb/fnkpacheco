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

fetch("https://us-central1-fnkpacheco.cloudfunctions.net/fetchUpdates")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((update) => {
      const updateElement = `
        <div class="p-4 rounded border mb-2 flex-item">
          <h3 class="font-bold">${update.title}</h3>
          <p><strong>Update Name:</strong> ${update.updateName}</p>
          <p><strong>Description:</strong> ${update.description}</p>
        </div>
      `;
      document.getElementById("updates-list").insertAdjacentHTML("beforeend", updateElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching updates:", error);
  });