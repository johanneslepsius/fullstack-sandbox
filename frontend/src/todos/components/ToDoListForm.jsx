import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Button, Typography, Checkbox} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  toDoLine: {
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

const ToDoListForm = ({ toDos, setToDos, updatedToDos, setUpdatedToDos, toDoList, saveToDo, deleteToDo }) => {
  const classes = useStyles()

  const submitForm = event => {
    event.preventDefault()
    saveToDo()
  }

  const handleChange = (type, index, action) => {
    if (!updatedToDos.includes(index)) {
      setUpdatedToDos([...updatedToDos, index])
    }

    switch (type){
      case 'COMPLETE':
        setToDos(
          [...toDos.slice(0, index),
          {...toDos[index], completed: action.completed},
          ...toDos.slice(index + 1)]
        )
        break
      case 'CONTENT':
        setToDos(
          [...toDos.slice(0, index),
          {...toDos[index], content: action.content},
          ...toDos.slice(index + 1)]
        )
        break
      default:
        return
    }
    
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.name}
        </Typography>
        <form onSubmit={submitForm} className={classes.form}>
          {toDos?.map((toDo, index) => (
            <div key={index} className={classes.toDoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox 
                checked={toDo.completed || false} 
                onChange={event => {
                  handleChange('COMPLETE', index, {completed: !toDo.completed})
                }}
                color="primary"
              />
              <TextField
                label='What to do?'
                value={toDo.content}
                onChange={event => {
                  handleChange('CONTENT', index, {content: event.target.value})
                }}
                className={classes.textField}
              />
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  deleteToDo(toDo._id)
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
                setToDos([...toDos, {content: '', completed: 'false'}])
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

export default ToDoListForm