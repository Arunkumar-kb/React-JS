import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  const handleClick = () => {
    if (input.trim() === '') return;
    if (editId) {
      setInput()
      setTodos(todos.map((todo) => (todo.id === editId) ? { ...todo, task: input } : todo))
      setEditId(null);
    }
    else {
      setTodos([...todos, { id: Date.now(), task: input, completed: false }]);
    }
    setInput('')
  }

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setInput(todo.task);
  }

  const handleDelete = (id) => {
    if (confirm('are you sure to delete')) {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  const toggleCompleted = (id) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }
  return (
    <>
      <div className='container'>
        <h2>Todo list</h2>
        <div className='input-field'>
          <input type='text' onChange={(e) => setInput(e.target.value)} value={input} placeholder='Add or edit task' />
          <button onClick={handleClick}>{editId ? 'Update' : 'Add'}</button>
        </div>
        <ul className='tasks'>
          {
            todos.map((todo) => (
              <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                <span onClick={() => toggleCompleted(todo.id)}>{todo.task}</span>
                <div>
                  <button onClick={() => handleEdit(todo)}>edit</button>
                  <button onClick={() => handleDelete(todo.id)}>delete</button>
                </div>
              </li>
            ))
          }

        </ul>
      </div>
    </>
  )
}

export default App
