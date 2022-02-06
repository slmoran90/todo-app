import { doc, getDoc } from 'firebase/firestore'
import db from '../firebaseConfig'

const getTask = async (id) => {
  try {
    const task = await getDoc(doc(db, `tasks/${id}`))
    return task.data()
  } catch (error) {
    console.log(error)
  }
}

export default getTask
