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

import ToDoListForm from './ToDoListForm'

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const [toDos, setToDos] = useState([])
  const [updatedToDos, setUpdatedToDos] = useState([])

  const [allCompleted, setAllCompleted] = useState({completed: false})

  const getToDos = async () => {
    try {
      const res = await axios(`http://localhost:8081/lists/${activeList._id}`)
      setToDos(res.data)
      console.log(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect( () => {
    (async () => {
      try {
        const res = await axios('http://localhost:8081/lists')
        setToDoLists(res.data)
        console.log(res.data)
    } catch (e) {
        console.error(e)
    }
    })()
  }, [])

  useEffect(() => {
    activeList && getToDos()
  }, [activeList])

  useEffect(() => {
    const uncompleted = toDos.filter(toDo => toDo.completed === false)
    if (uncompleted.length === 0 && activeList) {
      setAllCompleted({completed: true, list: activeList._id})
    }
  }, [toDos])

  const saveToDo = () => {
    
    for (let toDo of updatedToDos) {
      const content = {
        "content": toDos[toDo].content,
        "completed": toDos[toDo].completed || false,
        "listId": activeList._id,
      }
      try {
        if (!toDos[toDo]._id) {
          axios.post('http://localhost:8081/todos', content)
        } else if (toDos[toDo]._id) {
          axios.put(`http://localhost:8081/todos/${toDos[toDo]._id}`, content)
        }
      } catch (e) {
        console.error(e)
      }
      
    }
    setUpdatedToDos([])
  }

  const deleteToDo = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/todos/${id}`)
      getToDos()
    } catch (e) {
      console.error(e)
    }
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
            {allCompleted.completed && allCompleted.list === el._id && toDos.length > 0 && <p>Completed</p>}
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
