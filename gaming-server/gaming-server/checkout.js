// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCsQcD4txCXhk01Z0rse6l0CD3TnVVi374",
  authDomain: "andri-heebtest.firebaseapp.com",
  projectId: "andri-heebtest",
  storageBucket: "andri-heebtest.appspot.com",
  messagingSenderId: "206964986935",
  appId: "1:206964986935:web:17b8de010ef25a9d9a5bb2"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function saveOrderToFirestore(user, cartItems) {
  console.log("Saving order to Firestore...");
  console.log(firebase.auth().currentUser);
  console.log("user: ", user);
  if (user) {
    db.collection("orders").add({
      userId: user.uid,
      items: cartItems,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then((docRef) => {
      console.log("Order has been saved with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding order: ", error);
    });
  } else {
    console.log("User is not signed in. Cannot save order.");
  }
}




// Function to render checkout items and calculate total
function renderCheckoutItems() {
  const basket = JSON.parse(localStorage.getItem('basket')) || [];
  const checkoutDiv = document.getElementById('checkoutItems');
  window.totalAmount = 0; // Declare it on the window object to make it globally accessible
  
  // Clear the checkout items div
  checkoutDiv.innerHTML = '';
  
  basket.forEach((product, index) => {
    window.totalAmount += product.price;
    const item = `
      <div class="bg-white p-4 rounded mb-4">
        <h2 class="text-2xl">${product.name}</h2>
        <p>Price: $${product.price}</p>
        <button onclick="removeFromBasket(${index})">Remove</button>
      </div>
    `;
    checkoutDiv.innerHTML += item;
  });

  const totalDiv = `
    <div class="text-2xl">
      Total: $${window.totalAmount}
    </div>
  `;
  checkoutDiv.innerHTML += totalDiv;

  // Setup PayPal button after total is calculated
  document.getElementById('paypal-button-container').innerHTML = '';

  setupPayPalButton();
}

// Ihre vorhandene Setup-Logik für PayPal
function setupPayPalButton() {
  paypal.Buttons({
    createOrder: function(data, actions) {
      // Kundeninformationen erfassen
      const customerName = document.getElementById('customerName').value;
      const customerEmail = document.getElementById('customerEmail').value;

      if (!customerName || !customerEmail) {
        alert("Bitte geben Sie Ihren Namen und Ihre E-Mail-Adresse ein.");
        return;
      }

      // Set up the transaction
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: window.totalAmount // Ihr Gesamtbetrag
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        // Zahlung erfolgreich, Bestellung in Firestore speichern
        const user = firebase.auth().currentUser;
        const basket = JSON.parse(localStorage.getItem('basket')) || [];
        saveOrderToFirestore(user, basket);
    
        // Weiterleitung zur Dankesseite
        window.location.href = "thank_you_page.html";
      });    
    }
  }).render('#paypal-button-container');
}

// Function to remove item from basket
function removeFromBasket(index) {
  console.log('Before removal:', JSON.parse(localStorage.getItem('basket')));
  let basket = JSON.parse(localStorage.getItem('basket')) || [];
  basket.splice(index, 1);  // Remove the item at the given index
  localStorage.setItem('basket', JSON.stringify(basket));  // Update the local storage
  console.log('After removal:', basket);
  // Re-render the checkout items
  renderCheckoutItems();
}

// Initial render
renderCheckoutItems();
