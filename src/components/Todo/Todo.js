import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'
import TodoFrame from '../TodoFrame/TodoFrame';
import { db } from '../../config/config-firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';

const Todo = () => {

  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "todos"),
      where("isDone", "==", false)
    );
    onSnapshot(q, (querySnapshot) => {
      const todos = [];
      querySnapshot.forEach((doc) => {
        console.log("doc id" + doc.id)
        todos.push({ id: doc.id, data: doc.data() });
      });
      setTodos(todos)
    });
  }, [])

  const handleAddTodo = () => {
    // add a new doc to firebase id wll be auto generated
    addDoc(collection(db, "todos"), {
      isDone: false,
      todo: ""
    });

  };

  const handleChange = (event, todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, data: { ...todo.data, todo: event.target.value } };
      }
      return todo;
    });
    setTodos(updatedTodos);
    console.log({ todoId })
  };

  // update firebase doc by id todo will get from todos array by id
  const updateTodo = (todo) => {
    const data = todos.find(t => t.id === todo.id).data.todo

    //if data is empty then delete the doc else update the doc
    if (data === "") {
      deleteDoc(doc(db, "todos", todo.id));
    } else {
      const todoRef = doc(db, "todos", todo.id);
      updateDoc(todoRef, {
        todo: data
      });
    }
  }


  const updateStatus = (todo) => {
    const todoRef = doc(db, "todos", todo.id);
    updateDoc(todoRef, {
      isDone: true
    });
  }

  return (
    <>
      <div className='w-full bg-red-300 h-full p-2'>
        <div>
          {todos &&
            todos.map((todo) => {
              return (
                <div key={todo.id} className='my-2 shadow-md bg-white p-2 flex gap-2 items-center'
                  onBlur={(event) => updateTodo(todo)}
                >
                  <div className='text-[20px]' onClick={() => updateStatus(todo)}>
                    <ImCheckboxUnchecked />
                  </div>
                  <input type="text" value={todo?.data.todo}
                    onChange={(event) => handleChange(event, todo.id)}
                    className="bg-transparent focus:outline-none" />
                </div>
              )
            })
          }
        </div>
        <div className='bg-gray-50 w-50 border rounded-sm p-1 cursor-pointer hover:bg-white'>
          <button className='flex items-center gap-2 w-full' onClick={handleAddTodo}>
            <AiOutlinePlus size={20} />
            Add Todo
          </button>
        </div>
      </div>
    </>
  )
}

export default Todo