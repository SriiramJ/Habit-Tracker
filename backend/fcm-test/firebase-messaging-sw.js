importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyC5P5iaAIBt9ys6CAAqdSB1SmhzZWia9IU",
  authDomain: "habittracker-db34c.appspot.com",
  projectId: "habittracker-db34c",
  storageBucket: "habittracker-db34c.appspot.com",
  messagingSenderId: "461228144247",
  appId: "1:461228144247:web:b6847fb442a28af65af872",
  measurementId: "G-BTLYG26R43",
});

const messaging = firebase.messaging();
