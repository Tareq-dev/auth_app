// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCjAgSS7D4a6xmNxznZEgkkp1myjVr8pI0',
  authDomain: 'task-fiverr.firebaseapp.com',
  projectId: 'task-fiverr',
  storageBucket: 'task-fiverr.appspot.com',
  messagingSenderId: '571260191826',
  appId: '1:571260191826:web:c0daf11c0ad6e8db378b8b',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default auth
