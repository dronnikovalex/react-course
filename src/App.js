import React from 'react'
import TodoList from './components/ToDo/TodoList'
import Context from './context'
import AddTodo from './components/ToDo/AddTodo'

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, isCompleted: false, title: 'Практика React' },
    { id: 2, isCompleted: false, title: 'Практика Cypress' },
    { id: 3, isCompleted: false, title: 'Практика Karate DSL' }
  ])
  //Функция для отметки Todo как выполненного
  function toggleTodo(id) {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted
        }
        return todo
      })
    )
  }
  //Функция для удаления конкретного
  function removeTodo(id) {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  function addTodo (title) {
    setTodos(
      todos.concat([{
        title,
        id: Date.now(),
        isCompleted: false
      }])
    )
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React Tutor</h1>

        <AddTodo onCreate={addTodo}/>

        {
          todos.length ? <TodoList items={todos} onToggle={toggleTodo} /> : <p>Записей нет</p>
        }

      </div>
    </Context.Provider>

  )
}

export default App
