const TodoItem = ({
  todo,
  onDeleteTodo,
  onEditTodo,
  onToggleComplete,
  onToggleEdit,
}) => {
  const {id, title, isCompleted, isEditing} = todo

  const handleDelete = () => {
    onDeleteTodo(id)
  }

  const handleEdit = () => {
    onToggleEdit(id)
  }

  const handleToggleComplete = () => {
    onToggleComplete(id)
  }

  return (
    <li className={`todo-item ${isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggleComplete}
        className="todo-checkbox"
      />
      {isEditing ? (
        <input
          type="text"
          defaultValue={title}
          onBlur={e => onEditTodo(id, e.target.value)}
          className="todo-edit-input"
        />
      ) : (
        <p className="todo-title">{title}</p>
      )}
      <button onClick={handleEdit} type="button">
        {isEditing ? 'Save' : 'Edit'}
      </button>
      <button className="delete-button" onClick={handleDelete} type="button">
        Delete
      </button>
    </li>
  )
}

export default TodoItem
