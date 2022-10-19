import { async } from '@firebase/util';
import { addDoc, deleteDoc, getDocs, onSnapshot,doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { todosCollectionRef } from '../config/collectionRef'
import { db } from "../config/config-firebase";
import './MainTodo.css'


const MainTodo = () => {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState("")
  const inputRef = useRef();

  useEffect(()=>{
    const unsubscribe = onSnapshot(todosCollectionRef, snapshot => {
      setTodos(snapshot.docs.map((doc) => ({id: doc.id, name: doc.data() })));
    })
    return () => {
      unsubscribe();
    }
  },[])

  const addNewTodoToCloud = async ()=>{
    newTodo &&  await addDoc(todosCollectionRef, {name: newTodo})
  }


  const addNewTodo = async () =>{
    addNewTodoToCloud()
    inputRef.current.value = "";
    inputRef.current.focus()
    setNewTodo("") // need to clear newTodo 
  }

  const deleteTodo = async(id)=>{
    await deleteDoc(doc(todosCollectionRef, id))
  }

  /*================= Eidting Todo ================== */
  const [isUpdate, setIsUpdate] = useState(false)
  // const updateRef = useRef()
  const [updateId, setUpdateId] = useState("")


  const passValueToInputField = (id, value)=>{
    setIsUpdate(true)
    setUpdateId(id)
    inputRef.current.value = value;
    inputRef.current.focus()
    console.log(id)
  }

  const updateTodo = async () =>{
    setIsUpdate(false);
    inputRef.current.value = " ";
    await updateDoc(doc(todosCollectionRef,updateId), {name:newTodo})
    setNewTodo("") // need to clear newTodo 
  }

  return (
    <div>
      <div className="sticky-top bg-body shadow-sm pb-2">
        <header className="App-header mb-2">
          <h3 className='App-header'>Todo List App🔥React 🤝Firestore</h3>
        </header>
        <input onChange={(event)=>{setNewTodo(event.target.value)}} ref={inputRef} placeholder="Add todos..." type="text" />
        {!isUpdate && <button onClick={addNewTodo} className='btn btn-secondary ms-3 my-2 py-0'> Add Todo</button> }
        {isUpdate && <button onClick={updateTodo} className='btn btn-success ms-3 my-2 py-0'> Update</button>}
        {/* <p>{newTodo}</p> */}
      </div>
      <div className="container">
        {
          todos.map(todo =>{
            return(
              <div className='todo-card col-12 shadow p-3 my-3 mx-auto d-flex justify-content-between' style={{maxWidth: '50%', minWidth:'50%'}}>
                <p className='text-left m-0'>{todo.name.name} </p>
                <div>
                  <button onClick={()=> {passValueToInputField(todo.id, todo.name.name)}} className='btn btn-warning py-0 ms-3'><small>Edit</small></button>  
                  <button onClick={()=> {deleteTodo(todo.id)}} className='btn btn-danger py-0 ms-3'><small>Delete</small></button>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* {
        dbTodos.map(dbTodo => <p>{dbTodo.name.name}</p>)
      } */}
    </div>
  )
}

export default MainTodo