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

  const [todos, setTodos] = useState()

  useEffect(() => {
    axios('http://localhost:8080/lists')
      .then(res => {
        setToDoLists(res.data)
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    activeList && axios(`http://localhost:8080/lists/${activeList._id}`)
      .then(res => {
        setTodos(res.data)
        console.log(res.data)
      })
      .catch(err => console.error(err))
  }, [activeList])

  const saveToDoList = ({content, completed}) => {
    axios.post('http://localhost:8080/todos', {
      "content": content,
      "completed": completed,
      "listId": toDoLists[activeList]._id,
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
    {todos && <ToDoListForm
      key={activeList._id} // use key to make React recreate component to reset internal state
      toDoList={activeList}
      todos={todos}
      saveToDoList={saveToDoList}
      setTodos={setTodos}
    />}
  </Fragment>
}
