import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
  },
  {
    id: 6,
    title: 'Fix the production issue',
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
  },
]

class SimpleTodo extends Component {
  state = {
    todos: initialTodosList.map(todo => ({
      ...todo,
      isCompleted: false,
      isEditing: false,
    })),
    newTodoInput: '',
  }

  onDeleteTodo = id => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.filter(todo => todo.id !== id)
      return {todos: updatedTodos}
    })
  }

  toggleEditState = id => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo =>
        todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo,
      )
      return {todos: updatedTodos}
    })
  }

  onEditTodo = (id, newTitle) => {
    if (!newTitle.trim()) return
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo =>
        todo.id === id ? {...todo, title: newTitle, isEditing: false} : todo,
      )
      return {todos: updatedTodos}
    })
  }

  handleAddTodo = () => {
    const {newTodoInput} = this.state

    if (newTodoInput.trim()) {
      const [newTitle, numberOfTodos] = newTodoInput.split(' ')

      if (
        !newTitle ||
        Number.isNaN(numberOfTodos) ||
        parseInt(numberOfTodos, 10) <= 0
      ) {
        return
      }

      const numberOfTodosInt = parseInt(numberOfTodos, 10)
      const newTodos = Array.from({length: numberOfTodosInt}, (_, idx) => ({
        id: Date.now() + idx,
        title: newTitle,
        isCompleted: false,
        isEditing: false,
      }))

      this.setState(prevState => ({
        todos: [...prevState.todos, ...newTodos],
        newTodoInput: '',
      }))
    }
  }

  handleToggleComplete = id => {
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      )
      return {todos: updatedTodos}
    })
  }

  render() {
    const {todos, newTodoInput} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Simple Todos</h1>
        <input
          type="text"
          value={newTodoInput}
          placeholder="Enter title and number of todos (separated by space)"
          onChange={e => this.setState({newTodoInput: e.target.value})}
        />
        <button onClick={this.handleAddTodo} type="button">
          Add
        </button>

        <ul className="todos-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDeleteTodo={this.onDeleteTodo}
              onToggleComplete={this.handleToggleComplete}
              onEditTodo={this.onEditTodo}
              onToggleEdit={this.toggleEditState}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default SimpleTodo
