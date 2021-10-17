import React, { useContext } from 'react'
import PropTypes, { func } from 'prop-types'
import Context from '../../context'

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '.5rem'
  },
  input: {
    marginRight: '1rem'
  }
}

function TodoItem({ todo, index, checkboxChange }) {
  const { removeTodo } = useContext(Context)
  let classes = []

  if (todo.isCompleted) {
    classes.push('done')
  }

  return (
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input
          type="checkbox"
          style={styles.input}
          onChange={() => checkboxChange(todo.id)}
          checked={todo.isCompleted}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>
      <button className='rm' onClick={removeTodo.bind(null, todo.id)}>&times;</button>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  checkboxChange: func
}


export default TodoItem