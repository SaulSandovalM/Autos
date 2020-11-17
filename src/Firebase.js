import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDHl5NGuJAIw1b2rV39MwtzFtFCBdS2-Zw',
  authDomain: 'autos-a51c8.firebaseapp.com',
  databaseURL: 'https://autos-a51c8.firebaseio.com',
  projectId: 'autos-a51c8',
  storageBucket: 'autos-a51c8.appspot.com',
  messagingSenderId: '994610460775',
  appId: '1:994610460775:web:afc698ec2fbc85d5557cc2',
  measurementId: 'G-JEESF79CCG'
}
const firebaseConf = firebase.initializeApp(config)
export default firebaseConf
