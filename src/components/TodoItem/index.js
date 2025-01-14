// Write your code here
// src/components/TodoItem/index.js
import React from 'react'
import './index.css'

const TodoItem = ({todo, onDeleteTodo}) => {
  const {id, title} = todo

  const handleDelete = () => {
    onDeleteTodo(id)
  }

  return (
    <li className="todo-item">
      <p className="todo-title">{title}</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem
