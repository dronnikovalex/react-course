import React, { useEffect } from 'react'
import TodoList from './components/ToDo/TodoList'
import Context from './context'
import Loader from './loader'
import Modal from './components/Modal/Modal'

//Динамическая загрузка компонента AddTodo в константу
const AddTodo = React.lazy(() => new Promise(resolve => {
  setTimeout(() => {
    resolve(import('./components/ToDo/AddTodo'))
  }, 5000)
})
)

function App() {
  const [todos, setTodos] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos)
          setLoading(false)
        }, 2000)
      })
  }, [])

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
  //Функция для удаления конкретного todo
  function removeTodo(id) {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }
  //Функция для добавления todo
  function addTodo(title) {
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

        <Modal />

        <React.Suspense fallback={<p>Loading</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}

        {
          todos.length ? (
            <TodoList items={todos} onToggle={toggleTodo} />
          ) : (
            loading ? null : <p>Записей нет</p>
          )
        }

      </div>
    </Context.Provider>

  )
}

export default App
