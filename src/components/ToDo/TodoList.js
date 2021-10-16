import React from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

const styles = {
  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}

function TodoList(props) {
  return (
    <ul style={styles.ul}>  
      { props.items.map((todo, index) => {
        return <TodoItem 
                todo={todo} 
                index={index} 
                key={todo.id} 
                checkboxChange={props.onToggle}
              />
        }) 
      }
    </ul>
  )
}

TodoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default TodoList