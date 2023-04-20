import React from 'react'

const TodoFrame = ({ todo }) => {
  return (
    <div key={todo.id} className='my-2 shadow-md bg-white p-2 flex gap-2 items-center'>
      <input type="checkbox" />
      <input type="text" value={todo.text}
        // onChange={(event) => handleChange(event, todo.id)}
        className="bg-transparent focus:outline-none" />
    </div>
  )
}

export default TodoFrame