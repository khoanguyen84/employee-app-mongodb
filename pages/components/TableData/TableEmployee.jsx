import React, { useState } from "react";
import { FaCheck, FaUserPen, FaUserSlash, FaXmark } from "react-icons/fa6";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AlertFetching from "../Alert/AlertFetching";
import AlertError from "../Alert/AlertError";
import Link from "next/link";
import { API_URI } from "../../../common/constant";
import AlertSuccess from "../Alert/AlertSuccess";

function TableEmployee() {
    const [removeEmployee, setRemoveEmployee] = useState(null)
    const queryClient = useQueryClient()
    const fetchingData = async () => {
        let res = await fetch(`${API_URI}/api/employees`, {
            headers: { 'Content-type': 'application/json' }
        })
        let data = await res.json()
        return data;
    }
    const { isPending, data, isError, isFetching } = useQuery({
        queryKey: ['repoEmployee'],
        queryFn: fetchingData
    })

    const handleConfirmRemove = (empployee) => {
        setRemoveEmployee(empployee)
    }

    const mutation = useMutation({
        mutationFn: async (employee) => {
            let res = await fetch(`${API_URI}/api/employees/${employee._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            let data = await res.json()
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries('repoEmployee')
        }
    })

    const handleRemoveEmployee = (employee) => {
        mutation.mutate(employee)
        setRemoveEmployee(null)
    }
    return (
        <div className='container mx-auto px-20 mt-3 relative'>
            {mutation.isSuccess && <AlertSuccess content={"Employee removed success!"} />}
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
                                        <img className="w-10 rounded-full mr-3" src={employee.avatar} alt="" />
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
                                    {
                                        employee == removeEmployee ? (
                                            <div>
                                                <div className="tooltip tooltip-left tooltip-info" data-tip={`confirm remove emloyee ${employee.firstname}?`}>
                                                    <FaCheck role="button" className="text-red-500 me-3 hover:text-blue-800" size={20} 
                                                        onClick={() => handleRemoveEmployee(employee)}
                                                    />
                                                </div>
                                                <div className="tooltip tooltip-top tooltip-info" data-tip='cancel remove'>
                                                    <FaXmark role="button" className="text-black-500 hover:text-red-800" size={20}
                                                        onClick={() => setRemoveEmployee(null)}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="tooltip tooltip-top tooltip-info" data-tip='modify employee'>
                                                    <Link href={`/employee/modify/${employee._id}`}>
                                                        <FaUserPen role="button" className="text-blue-500 me-3 hover:text-blue-800" size={20} />
                                                    </Link>
                                                </div>
                                                <div className="tooltip tooltip-top tooltip-info" data-tip='remove employee'>
                                                    <FaUserSlash role="button" className="text-red-500 hover:text-red-800" size={20}
                                                        onClick={() => handleConfirmRemove(employee)}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }

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