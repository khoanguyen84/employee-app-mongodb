import React from "react";
import Form from './../components/Form/Form'
import { FaPersonCirclePlus } from "react-icons/fa6";
import TableEmployee from './../components/TableData/TableEmployee';
import { useState } from 'react';

function EmployeePage() {
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

export default EmployeePage;