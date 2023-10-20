import React, { useEffect, useState } from "react";
import { FaUserPen, FaUserSlash } from "react-icons/fa6";

function TableEmployee() {
    const [employeeList, setEmployeeList] = useState([])

    useEffect(() => {
        async function fetchData() {
            let res = await fetch('http://localhost:3000/api/employees')
            let data = await res.json();
            setEmployeeList(data)
        }
        fetchData()
    }, [])
    return (
        <div className='container mx-auto px-20 mt-3'>
            <table className='table'>
                <thead className='bg-neutral text-white'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Birthday</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employeeList.map((employee) => (
                            <tr key={employee.id}>
                                <td>
                                    <div className="flex items-center">
                                        <img className="w-10 rounded-full mr-3" src={employee.avatar} alt="" />
                                        {employee.firstname} {employee.lastname}
                                    </div>
                                </td>
                                <td>{employee.email}</td>
                                <td>{employee.salary}</td>
                                <td>{employee.dob}</td>
                                <td>
                                    <span className={`badge ${employee.status == 'Active' ? 'badge-success' : 'badge-seconday'}`}>{employee.status}</span>
                                </td>
                                <td>
                                    <div className="flex">
                                        <div className="tooltip tooltip-left tooltip-info" data-tip='modify user'>
                                            <FaUserPen role="button" className="text-blue-500 me-3 hover:text-blue-800" size={20} />
                                        </div>
                                        <div className="tooltip tooltip-right tooltip-info" data-tip='remove user'>
                                            <FaUserSlash role="button" className="text-red-500 hover:text-red-800" size={20} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableEmployee;