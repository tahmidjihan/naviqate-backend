// const admin = require('firebase-admin');
// const serviceAccount = require('./serviceAccountKey.json'); // from Firebase Console
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
