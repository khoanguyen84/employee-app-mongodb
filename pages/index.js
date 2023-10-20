import Head from 'next/head'
import Form from './components/Form/Form'
import TableEmployee from './components/TableData/TableEmployee'
import { FaPersonCirclePlus } from "react-icons/fa6";
import { useState } from 'react';

export default function Home() {
  const [toggleForm, setToggleForm] = useState(false)
  return (
    <section>
      <Head>
        <title>Employee with MongoDB</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='container mx-auto py-3'>
        <h1 className="text-center text-3xl text-stone-700">Employee Management</h1>
        
        {/* Form */}
        <div className='container mx-auto px-20'>
            <button className='btn btn-primary btn-sm' onClick={() => setToggleForm(!toggleForm)}>
                Add Employee
                <FaPersonCirclePlus size={20} />
            </button>
            {toggleForm && <Form/>}
        </div>
        
        {/* Table */}
        <TableEmployee/>
      </main>
    </section>
  )
}
