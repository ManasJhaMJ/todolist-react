import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id) === id ? todo : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div className="bg min-h-screen py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-4xl font-bold text-center mb-8 mt-2 backdrop-blur-md rounded-lg">BESTO FRIENDO TODO APP</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id}
                className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
        <div className='text-[#ffffff] w-fit fixed backdrop-blur-lg p-4 px-2 bottom-5 rounded-xl z-10 flex flex-col justify-center items-center'>
          <h1>React Concepts Used</h1>
          <ul className='flex flex-wrap items-center gap-4'>
            <li>localStorage</li>
            <li>Context API</li>
          </ul>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
