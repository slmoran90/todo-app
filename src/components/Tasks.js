/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import deleteTask from "../services/deleteTask"
import db from "../firebaseConfig"
import "./styles.css"
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardFooter,
  Button,
} from "reactstrap"
import swal from "../services/sweetalertConfig"

const Task = ({ setCurrentId }) => {
  const [tasksList, setTasksList] = useState([])

  const handleDelete = (taskTitle, id) => {
    swal(
      `Borrar ${taskTitle.toUpperCase()}`,
      "¿Estás seguro de borrar la tarea?",
      "warning",
      true,
      "#0fb893f0",
      "#dc3545"
    ).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id)
        swal(
          `Se borro ${taskTitle.toUpperCase()}`,
          "",
          "success",
          false,
          "#0fb893f0"
        )
      }
    })
  }

  const capitalize = (str) => (str && str[0].toUpperCase() + str.slice(1)) || ""

  useEffect(() => {
    const getTasks = () => {
      try {
        onSnapshot(collection(db, "tasks"), (data) => {
          setTasksList(
            data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
        })
      } catch (error) {
        console.log(error)
      }
    }

    getTasks()
  }, [])

  return (
    <>
      {tasksList &&
        tasksList.map((task, i) => {
          return (
            <Card className="card-container border-0 mb-3" key={task.id}>
              <CardHeader className="text-white text-center bg-info-card border-0">
                <h3>
                  #{i + 1} {task.title.toUpperCase()}
                </h3>
              </CardHeader>
              <CardBody className="bg-muted">
                <CardText className="font-light">
                  - {capitalize(task.description)}
                </CardText>
              </CardBody>
              <CardFooter className="d-flex justify-content-end gap-2 pt-1 border-0">
                <Button
                  className="btn-custom-primary d-flex gap-2 align-items-center"
                  onClick={() => {
                    setCurrentId(task.id)
                  }}
                >
                  <span>Editar</span>
                  <i className="far fa-edit fa-lg" />
                </Button>
                <Button
                  color="danger"
                  onClick={() => handleDelete(task.title, task.id)}
                  className="d-flex gap-2 align-items-center"
                >
                  <span>Borrar</span>
                  <i className="far fa-trash-alt fa-lg" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}
    </>
  )
}

export default Task
