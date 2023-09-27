const functions = require('firebase-functions');
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Initialize Firestore
const db = admin.firestore();

// Initialize Express
const app = express();
app.use(bodyParser.json());

app.post("/updates", async (req, res) => {
  try {
    const { title, updateName, description } = req.body;
    await db.collection("updates").add({
      title,
      updateName,
      description
    });
    res.status(200).send("Update added successfully!");
  } catch (error) {
    console.error("Error adding update: ", error);
    res.status(500).send("Internal Server Error");
  }
});


exports.app = functions.https.onRequest(app);
