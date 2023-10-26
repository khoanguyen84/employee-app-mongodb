'use client'
import Form from './components/Form/Form'
import TableEmployee from './components/TableData/TableEmployee'
import { FaPersonCirclePlus } from "react-icons/fa6";
import { useState } from 'react';

export default function Home() {
  const [toggleForm, setToggleForm] = useState(false)
  return (
    <>
        {/* Form */}
        <div className='container mx-auto px-20'>
          <button className='btn btn-primary btn-sm' onClick={() => setToggleForm(!toggleForm)}>
            Add Employee
            <FaPersonCirclePlus size={20} />
          </button>
          {toggleForm && <Form />}
        </div>

        {/* Table */}
        <TableEmployee />
    </>
  )
}
