/* eslint-disable react/prop-types */
import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import deleteTask from '../services/deleteTask'

const ModalDelete = ({ targetId, showModal, setShowModal }) => {
  const { id, title } = targetId

  const handleDeleteTask = (id) => {
    deleteTask(id)
    setShowModal(false)
  }

  return (
    <Modal
      backdrop='static'
      keyboard={false}
      isOpen={ showModal }
      toggle={ () => { setShowModal(!showModal) } }
    >
      <ModalHeader className='text-danger'>
        <h4>Borrar { title }</h4>
      </ModalHeader>
      <ModalBody className='bg-light'>
        <p className='lead'>¿Estás seguro de borrar la tarea?</p>
      </ModalBody>
      <ModalFooter>
        <button
          type='button'
          className='btn btn-custom-primary'
          onClick={ () => { setShowModal(false) } }
        >
          Atras
        </button>
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => handleDeleteTask(id)}
        >
          Aceptar
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default ModalDelete
