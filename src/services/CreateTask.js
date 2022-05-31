import { addDoc, collection } from "firebase/firestore";
import db from "../firebaseConfig";

const createTask = async (task) => {
  try {
    await addDoc(collection(db, "tasks"), task);
  } catch (error) {
    console.log(error);
  }
};

export default createTask;
