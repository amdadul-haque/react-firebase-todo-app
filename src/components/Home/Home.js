import React from 'react'
import { AiFillPlusCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Todo from '../Todo/Todo'
import Done from '../Done/Done'

const Home = () => {
  return (
    <>
      <div className='container-sm p-0 h-screen'>
        <div>
          <h1 className='bg-gray-900 py-3 text-[40px] text-center text-green-500'>Note Taking App</h1>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2'>
          <div>
            <Todo />
          </div>
          <div>
            <Done />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home