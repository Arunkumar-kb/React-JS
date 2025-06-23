import { useReducer } from 'react'
import '../index.css'

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    filter: 'all',
    editId: '',
    editText: ''
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            localStorage.setItem('todos', JSON.stringify([...state.todos, { id: Date.now(), task: action.payload, completed: false }]))
            return {
                ...state,
                todos: [...state.todos, { id: Date.now(), task: action.payload, completed: false }]
            }
        case 'TOGGLE_TODO':
            const newTodo = state.todos.map(todo =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            )
            localStorage.setItem('todos', JSON.stringify(newTodo))
            return {
                ...state,
                todos: newTodo
            }
        case 'DELETE_TODO': {
            const newTodo = state.todos.filter((todo => todo.id != action.payload))
            localStorage.setItem('todos', JSON.stringify(newTodo))
            return {
                ...state,
                todos: newTodo
            }
        }
        case 'UPDATE_FILTER': {
            return {
                ...state,
                filter: action.payload
            }
        }
        case 'START_EDIT': {
            return {
                ...state,
                editId: action.payload.id,
                editText: action.payload.task
            }
        }
        case 'SET_EDIT_TEXT': {
            return {
                ...state,
                editText: action.payload
            }
        }
        case 'SAVE_UPDATE': {
            const newTodo = state.todos.map((todo) => todo.id == state.editId && state.editText !== ''? { ...todo, task: state.editText} : todo)
            localStorage.setItem('todos', JSON.stringify(newTodo))
            return {
                ...state,
                todos: newTodo,
                editId: '',
                editText: ''
            }
        }
        default:
            return state;
    }
}

const TodoList = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const handleSubmit = (e) => {
        e.preventDefault();
        const input = e.target.input.value.trim();
        if (input) {
            dispatch({ type: 'ADD_TODO', payload: input });
            e.target.input.value = '';
        }
    }
    const toggleTask = (id) => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    }
    const getFilteredTodos = () => {
        switch (state.filter) {
            case 'active':
                return state.todos.filter(todo => !todo.completed);
            case 'completed':
                return state.todos.filter(todo => todo.completed);
            default:
                return state.todos;
        }

    }
    const handleEdit = (todo) => {
        dispatch({ type: 'START_EDIT', payload: todo })
    }
    const handleEditText = (e) => {
        dispatch({ type: 'SET_EDIT_TEXT', payload: e.target.value })
    }
    const handeleUpdate = () => {
        dispatch({ type: 'SAVE_UPDATE' })
    }
    return (
        <div className='container'>
            <h2>Todo List Application</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input type="text" name="input" />
                    <button type="submit">Add</button>
                </div>
            </form>
            <div className="filter">
                <div className="btn">
                    {['all', 'active', 'completed'].map((filter, index) => (
                        <button key={index} className={state.filter === filter ? 'active' : ''} onClick={() => dispatch({ type: 'UPDATE_FILTER', payload: filter })}>{filter}</button>
                    ))}
                </div>
                <div className="task-info">
                    <span>Total Tasks: {state.todos.length}</span>
                    <span>Active Tasks: {state.todos.filter(todo => !todo.completed).length}</span>
                    <span>Completed Tasks : {state.todos.filter(todo => todo.completed).length}</span>
                </div>
            </div>
            <ul className='tasks'>
                {
                    getFilteredTodos().map((todo) => (
                        <li key={todo.id} onClick={() => toggleTask(todo.id)}>
                            {state.editId === todo.id ? (
                                <><input type="text" name="editInput" value={state.editText} onChange={(e) => handleEditText(e)} autoFocus onKeyDown={(e) => e.key === 'Enter' ? handeleUpdate():''}
                                onBlur={handeleUpdate}/>
                                    <button className='update' onClick={handeleUpdate}>save</button></>
                            ) : (

                                <span className={todo.completed ? "completed" : ''} onDoubleClick={() => handleEdit(todo)}>{todo.task}</span>
                            )}
                            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>delete</button>
                        </li>
                    ))
                }
            </ul>

        </div>
    )
}

export default TodoList
