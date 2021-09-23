import React, { Fragment, useState, useEffect } from 'react'
import axios from 'axios'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'

import { ToDoListForm } from './ToDoListForm'

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const [toDos, setToDos] = useState([])
  const [updatedToDos, setUpdatedToDos] = useState([])

  const getTodos = () => {
    axios(`http://localhost:8080/lists/${activeList._id}`)
      .then(res => {
        setToDos(res.data)
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios('http://localhost:8080/lists')
      .then(res => {
        setToDoLists(res.data)
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    activeList && getTodos()
  }, [activeList])

  const saveToDo = () => {
    for (let todo of updatedToDos) {
      if (!toDos[todo]._id) {
        axios.post('http://localhost:8080/todos', {
        "content": toDos[todo].content,
        "completed": toDos[todo].completed || false,
        "listId": activeList._id,
        })
      } else if (toDos[todo]._id) {
        axios.put(`http://localhost:8080/todos/${toDos[todo]._id}`, {
        "content": toDos[todo].content,
        "completed": toDos[todo].completed || false,
        "listId": activeList._id,
      })
      }
    }
    setUpdatedToDos([])
  }

  const deleteToDo = (id) => {
    axios.delete(`http://localhost:8080/todos/${id}`)
      .then(() => {
        getTodos()
      })
    
  }

  if (!toDoLists.length) return null

  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {toDoLists.map((el, i) => <ListItem
            key={i}
            button
            onClick={() => setActiveList(toDoLists[i])}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={el.name} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {activeList && <ToDoListForm
      key={activeList._id} // use key to make React recreate component to reset internal state
      toDoList={activeList}
      toDos={toDos}
      updatedToDos={updatedToDos}
      saveToDo={saveToDo}
      setUpdatedToDos={setUpdatedToDos}
      setToDos={setToDos}
      deleteToDo={deleteToDo}
    />}
  </Fragment>
}
