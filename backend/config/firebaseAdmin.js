const admin = require('firebase-admin');
const serviceAccount = require('../aqua-overseas-d33d4-firebase-adminsdk-fbsvc-d63bbd9263.json'); // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;