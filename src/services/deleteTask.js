import { doc, deleteDoc } from 'firebase/firestore'
import db from '../firebaseConfig'

const deleteTask = async (id) => {
  try {
    await deleteDoc(doc(db, 'tasks', id))
  } catch (error) {
    console.log(error)
  }
}

export default deleteTask
