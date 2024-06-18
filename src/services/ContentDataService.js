import { getDatabase, ref as dbRef, onValue, set, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyCQheLP694ykHyall-AeDrzpFQoK4qAs2Q",
  authDomain: "iks-digitaleexponate.firebaseapp.com",
  projectId: "iks-digitaleexponate",
  storageBucket: "iks-digitaleexponate.appspot.com",
  messagingSenderId: "933056814795",
  appId: "1:933056814795:web:3d1a8f23438e896838054e",
  databaseURL: "https://iks-digitaleexponate-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app =  initializeApp(config);
const db = getDatabase();


class ContentDataService {
  getAll() {
    const dbRefInstance = dbRef(getDatabase(), 'test')
    onValue(dbRefInstance, (snapshot) =>
      {
        if (snapshot.exists())
          {
            const rawData = snapshot;
            console.log(rawData);
            // get image with the object key f  rom getImage()
          } else
          {
            console.log("No data available");
          }
        });
        return dbRefInstance;
      }
      setUpperScreenDistortion(corners){
        set(dbRef(db, 'upperScreen/upperScreenDistortion'), corners);
      }
      async getUpperScreenDistortion(){
        return new Promise((resolve, reject) => {
          get(dbRef(db, 'upperScreen/upperScreenDistortion')).then((snapshot) => {
            if (snapshot.exists()) {
              resolve(snapshot.val());
            } else {
              reject("No data available");
            }
          }).catch((error) => {
            reject(error);
          });
        });
        
  }
}

export default new ContentDataService();