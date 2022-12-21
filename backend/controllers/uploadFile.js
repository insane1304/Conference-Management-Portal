// Import the functions you need from the SDKs you need
// import ("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js")
// import ("https://www.gstatic.com/firebasejs/8.3.2/firebase-storage.js")

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
require("firebase/firestore");
require("firebase/messaging");
require("firebase/functions");
var storage=require("firebase/storage");
var getDownloadURL=require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyCOw5dUqzr6rUAn6td1C6sDCihE6qYCqFU",
  authDomain: "conference-management-portal.firebaseapp.com",
  projectId: "conference-management-portal",
  storageBucket: "conference-management-portal.appspot.com",
  messagingSenderId: "616490053869",
  appId: "1:616490053869:web:df0b641e4f41bc05d59ce4",
  measurementId: "G-GLMLH7GBE3"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const ref = storage.storage().ref();
const store = storage.getStorage();

function currDateTime() {
  var currentTime = new Date(Date.now());
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;
  var ISTTime = new Date(currentTime.getTime() +
    (ISTOffset + currentOffset)*60000);
  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  var secondsIST = ISTTime.getSeconds();
  var millisecondsIST = ISTTime.getMilliseconds();
  var time = hoursIST + ":" + minutesIST + ":" + secondsIST+":"+millisecondsIST;
  var mnth = currentTime.getMonth() + 1;
  var date_time = currentTime.getDate() +
    '_' + mnth +
    '_' + currentTime.getFullYear() + '_' + time;
  return date_time;
}

async function doUpload(file) {

  console.log(file)

  result=file.originalname;
  var date=currDateTime();
  // const d=new Date() + '-' + 'base64';
  result=date+result;
  const storageRef = storage.ref(store, result);
  var res="";
  await storage.uploadBytes(storageRef, file.buffer).then((snapshot) => {
      console.log('Uploaded File successfully!');

          // return url;
        });
   await storage.getDownloadURL(storage.ref(store, result))
          .then((url) => {
            // console.log(url);
            console.log(url);
            // x=storage.getStream(storageRef);
            // console.log(x);
            // storage.getBytes(storageRef).then((snapshot) => {
            //   console.log(snapshot);
            // })
            // console.log(y);
            res=url;
            return url;
      // console.log(d.getDownloadURL());
});
return res;
}

async function getFile(fileName) {
  fileName="https://firebasestorage.googleapis.com/v0/b/conference-management-portal.appspot.com/o/"+fileName;
  console.log(fileName);
  // const storageRef = storage.ref(store, fileName);
  let result="";
    const storageRef = await storage.ref(store,fileName);
    await storage.getBytes(storageRef).then((snapshot) => {
            console.log(snapshot);
            // return Buffer.from(snapshot).toJSON();
            // return snapshot;
            var x=Buffer.from(snapshot).toJSON();
            console.log(x);
            // return x;
            result=x;

          })
return result;
}
module.exports.doUpload = doUpload;
module.exports.getFile = getFile;
