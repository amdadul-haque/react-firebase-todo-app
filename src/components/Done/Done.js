import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from '../../config/config-firebase';
import TodoFrame from '../TodoFrame/TodoFrame';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';



const Done = () => {

  const [dones, setDones] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "todos"),
      where("isDone", "==", true)
    );
    onSnapshot(q, (querySnapshot) => {
      const dones = [];
      querySnapshot.forEach((doc) => {
        console.log("doc id" + doc.data())
        dones.push({ id: doc.id, data: doc.data() });
      });
      setDones(dones)
    });
  }, [])

  const updateStatus = (todo) => {
    const todoRef = doc(db, "todos", todo.id);
    updateDoc(todoRef, {
      isDone: false
    });
  }
  const [todoDone, setTodoDone] = useState(true)
  return (
    <>
      {console.log({ dones })}
      <div className='w-full bg-green-300 h-full p-2'>
        <div>
          {dones &&
            dones.map((done) => {
              return (
                <div key={done?.id} className='my-2 shadow-md bg-white p-2 flex gap-2 items-center'>
                  <div className='text-[20px]' onClick={() => updateStatus(done)}>
                    <ImCheckboxChecked />
                  </div>
                  {console.log("id: " + done?.id)}
                  <input type="text" value={done?.data.todo}
                    className="bg-transparent focus:outline-none line-through opacity-50" />
                </div>
              )
            })
          }
        </div>
        {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, minima.</p> */}
      </div>
    </>
  )
}

export default Done