import { doc, updateDoc } from "firebase/firestore"
import db from "../firebaseConfig"

const updateTask = async (task) => {
  try {
    await updateDoc(doc(db, `tasks/${task.id}`), task)
  } catch (error) {
    console.log(error)
  }
}

export default updateTask
