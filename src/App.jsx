import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import { useState, useEffect } from 'react'


function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistTodos(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistTodos(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, i) => i !== index)
    persistTodos(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index) {
    const valueToEdit = todos[index]
    setTodoValue(valueToEdit)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }
    let storedTodos = localStorage.getItem('todos')
    if (!storedTodos) {
      return
    }
      storedTodos = JSON.parse(storedTodos).todos
      setTodos(storedTodos)
  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} handleAddTodo={handleAddTodo} setTodoValue={setTodoValue} />
      <TodoList handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} todos={todos}/>
    </>
  )
}

export default App
