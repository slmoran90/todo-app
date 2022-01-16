import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import db from '../firebaseConfig'
import './styles.css'
import { Card, CardHeader, CardBody, CardText, CardFooter, Button } from 'reactstrap'
import ModalDelete from './ModalDelete'

const Task = () => {
  const [tasksList, setTasksList] = useState([])
  const [btnId, setBtnId] = useState({}) //eslint-disable-line
  const [showModal, setShowModal] = useState(false)

  const handleClickModal = (task) => {
    setShowModal(!showModal)

    setBtnId({
      id: task.id,
      title: task.title
    })
  }

  const capitalize = str => (str && str[0].toUpperCase() + str.slice(1)) || ''

  useEffect(() => {
    const getTasks = () => {
      try {
        onSnapshot(collection(db, 'tasks'), data => {
          setTasksList(data.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          })))
        })
      } catch (error) {
        console.log(error)
      }
    }

    getTasks()
  }, [])

  return (
    <>
      { tasksList && tasksList.map(task => {
        return (
          <Card
            key={ task.id }
            className='mb-3 border'
          >
            <CardHeader className='text-muted bg-light border border-light'>
              <h3>{ capitalize(task.title) }</h3>
            </CardHeader>
            <CardBody className='bg-white'>
              <CardText className='font-light'>
                { capitalize(task.description) }
              </CardText>
            </CardBody>
            <CardFooter className='d-flex justify-content-end gap-2 pt-1 border border-0 bg-white'>
              <Button className='btn-custom-primary'>
                Editar
              </Button>
              <Button
                color='danger'
                onClick={ () => handleClickModal(task) }
              >
                  Borrar
              </Button>
            </CardFooter>
          </Card>
        )
      })}
      <ModalDelete
        targetId={ btnId }
        showModal={ showModal }
        setShowModal= { setShowModal }
      />
    </>
  )
}

export default Task
