import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const ToDoListForm = ({ todos, toDoList, saveToDoList, setTodos }) => {
  const classes = useStyles()
  const [content, setContent] = useState()
  const [completed, setCompleted] = useState()

  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(content, completed)
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                label='What to do?'
                value={todo.content}
                onChange={event => {
                  setContent(event.target.value)
                }}
                className={classes.textField}
              />
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  // deleteTodo(todo._id)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, {content: '', completed: 'false'}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
