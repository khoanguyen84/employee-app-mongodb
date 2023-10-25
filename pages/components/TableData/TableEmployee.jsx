import React, { useState } from "react";
import { FaUserPen, FaUserSlash } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query'
import { AlertFetching, AlertError } from "../Alert";
import Link from "next/link";
import Image from "next/image";

function TableEmployee() {
    const fetchingData = async () => {
        let res = await fetch('http://localhost:3000/api/employees', {
            headers: { 'Content-type': 'application/json' }
        })
        let data = await res.json()
        return data;
    }
    const { isPending, data, isError, isFetching } = useQuery({
        queryKey: ['repoEmployee'],
        queryFn: fetchingData
    })

    return (
        <div className='container mx-auto px-20 mt-3 relative'>
            {isFetching && <AlertFetching />}
            {isError && <AlertError />}
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
                        data && data.length > 0 ? data?.map((employee) => (
                            <tr role="button" key={employee._id} className="hover:bg-neutral-content">
                                <td>
                                    <div className="flex items-center">
                                        <Image className="w-10 rounded-full mr-3" src={employee.avatar} alt="" />
                                        {employee.firstname} {employee.lastname}
                                    </div>
                                </td>
                                <td className="text-right">{employee.email}</td>
                                <td className="text-right">{employee.salary}</td>
                                <td className="text-right">{new Date(Number(employee.dob)).toLocaleDateString("es-CL")}</td>
                                <td className="text-right">
                                    <span className={`badge ${employee.status == 'Active' ? 'badge-success' : 'badge-warning'}`}>{employee.status}</span>
                                </td>
                                <td>
                                    <div>
                                        <div className="tooltip tooltip-top tooltip-info" data-tip='modify employee'>
                                            <Link href={`/employee/modify/${employee._id}`}>
                                                <FaUserPen role="button" className="text-blue-500 me-3 hover:text-blue-800" size={20} />
                                            </Link>
                                        </div>
                                        <div className="tooltip tooltip-top tooltip-info" data-tip='remove employee'>
                                            <FaUserSlash role="button" className="text-red-500 hover:text-red-800" size={20}

                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )) :
                            (
                                <tr>
                                    <td colSpan={6}>
                                        Data is empty
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div >
    )
}


export default TableEmployee;