import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import deleteTask from '../services/deleteTask'
import db from '../firebaseConfig'
import './styles.css'
import { Card, CardHeader, CardBody, CardText, CardFooter, Button } from 'reactstrap'
import swal from '../services/sweetalertConfig'

const Task = () => {
  const [tasksList, setTasksList] = useState([])

  const handleDelete = (taskTitle, id) => {
    swal(
      `Borrar ${taskTitle.toUpperCase()}`,
      '¿Estás seguro de borrar la tarea?',
      'warning',
      true,
      '#0fb893f0',
      '#dc3545'
    ).then(result => {
      if (result.isConfirmed) {
        deleteTask(id)
        swal(
          `Se borro ${taskTitle.toUpperCase()}`,
          '',
          'success',
          false,
          '#0fb893f0'
        )
      }
    })
  }

  const handleDelete = (taskTitle, id) => {
    const swalButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-custom-primary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalButtons.fire({
      title: `Borrar ${taskTitle.toUpperCase()}`,
      text: '¿Estás seguro de borrar la tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Atrás',
      reverseButtons: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown'
      }
    }).then(result => {
      if (result.isConfirmed) {
        deleteTask(id)
        swalButtons.fire({
          title: '¡Borrado!',
          text: `Se borro ${taskTitle.toUpperCase()}`,
          icon: 'success',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
          }
        })
      }
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
            <CardHeader className='text-muted text-center bg-white border-2 border-light'>
              <h3>{ task.title.toUpperCase() }</h3>
            </CardHeader>
            <CardBody className='bg-white'>
              <CardText className='font-light'>
                { capitalize(task.description) }
              </CardText>
            </CardBody>
            <CardFooter className='d-flex justify-content-end gap-2 pt-1 border-0 bg-white'>
              <Button className='btn-custom-primary'>
                Editar
              </Button>
              <Button
                color='danger'
                onClick={ () => handleDelete(task.title, task.id) }
              >
                  Borrar
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}

export default Task
