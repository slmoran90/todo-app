import { collection, getDocs } from 'firebase/firestore'
import db from '../firebaseConfig'

const getTasks = async () => {
  const datas = []
  try {
    const data = await getDocs(collection(db, 'tasks'))
    data.forEach(doc => {
      const { title, description } = doc.data()
      const newTask = {
        id: doc.id,
        title,
        description
      }
      datas.push(newTask)
    })
  } catch (error) {
    console.log(error)
  }
  return datas
}

export default getTasks
