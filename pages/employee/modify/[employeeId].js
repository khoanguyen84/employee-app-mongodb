import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { FaArrowLeftLong, FaUserPen, FaXmark } from "react-icons/fa6";
import * as yup from "yup"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AlertFetching, AlertSuccess, AlertError } from './../../components/Alert';
import { API_URI } from "../../../common/constant";

const schema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().required(),
    salary: yup.number().required().typeError('salary is a required field'),
    dob: yup.date().required().typeError('date of birth is a required field'),
    status: yup.string().required()
})

export default function ModifyEmployee() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(schema)
    })
    const queryClient = useQueryClient()
    const { query } = useRouter()

    const fetchingData = async () => {
        let res = await fetch(`${API_URI}/api/employees/${query.employeeId}`, {
            headers: { 'Content-type': 'application/json' }
        })
        let data = await res.json()
        return data;
    }
    const { isPending, data, isError, isFetching } = useQuery({
        queryKey: ['repoSingleEmployee', query.employeeId],
        queryFn: fetchingData
    })

    const mutation = useMutation({
        mutationFn: async (employee) => {
            let res = await fetch(`${API_URI}/api/employees/${query.employeeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(employee)
            })
            let data = await res.json()
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['repoSingleEmployee', query.employeeId])
        }
    })

    const handleCreateEmployee = (data) => {
        // data.avatar = `https://randomuser.me/api/portraits/men/${Math.ceil(Math.random() * 55)}.jpg`
        data.dob = (new Date(data.dob).getTime())
        mutation.mutate(data)
        // reset();
    }
    return (
        <>
            <div className='container mx-auto px-20 mt-3'>
                <Link href={'/employee'} className='btn btn-link btn-sm'>
                    <FaArrowLeftLong size={20} />
                    Back to Employee list
                </Link>
            </div>
            <div className="container mx-auto px-20 mt-3">
                {isFetching && <AlertFetching />}
                {mutation.isSuccess && <AlertSuccess content={"Employee updated success!"} />}
                {mutation.isError && <AlertError content={"Something went wrong, please try again later!"} />}
                {
                    data && Object.keys(data).length > 0 && (
                        <form onSubmit={handleSubmit(handleCreateEmployee)} className='mt-3 border-t-2 border-dark-500'>
                            <div className='grid grid-cols-3 gap-x-3'>
                                <div className='form-control'>
                                    <label className='label'>Firstname</label>
                                    <input type="text"
                                        defaultValue={data.firstname}
                                        className={`input input-sm input-bordered ${errors.firstname?.message ? 'input-error' : ''}`}
                                        placeholder='Fullname' {...register('firstname')} />
                                    <span className="text-red-700 text-xs mt-1">{errors.firstname?.message}</span>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>Lastname</label>
                                    <input type="text"
                                        defaultValue={data.lastname}
                                        className={`input input-sm input-bordered ${errors.lastname?.message ? 'input-error' : ''}`}
                                        placeholder='Lastname' {...register('lastname')} />
                                    <span className="text-red-700 text-xs mt-1">{errors.lastname?.message}</span>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>Email</label>
                                    <input type="email"
                                        defaultValue={data.email}
                                        className={`input input-sm input-bordered ${errors.email?.message ? 'input-error' : ''}`}
                                        placeholder='Email' {...register('email')} />
                                    <span className="text-red-700 text-xs mt-1">{errors.email?.message}</span>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>Salary</label>
                                    <input type="number"
                                        defaultValue={data.salary}
                                        className={`input input-sm input-bordered ${errors.salary?.message ? 'input-error' : ''}`}
                                        placeholder='Salary' {...register('salary')} />
                                    <span className="text-red-700 text-xs mt-1">{errors.salary?.message}</span>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>Date of birth</label>
                                    <input type="date"
                                        defaultValue={(new Date(Number(data.dob))).toISOString().split('T')[0]}
                                        className={`input input-sm input-bordered ${errors.dob?.message ? 'input-error' : ''}`}
                                        placeholder='Salary' {...register('dob')} />
                                    <span className="text-red-700 text-xs mt-1">{errors.dob?.message}</span>
                                </div>
                                <div className='form-control'>
                                    <label className='label'>Status</label>
                                    <div className='flex gap-x-4'>
                                        <label className='label inline-block flex items-center'>
                                            {
                                                data.status == 'Active' ? (
                                                    <input type="radio" className='radio mr-2'
                                                        value={'Active'}
                                                        {...register('status')}
                                                        checked
                                                    />
                                                ) : (
                                                    <input type="radio" className='radio mr-2'
                                                        value={'Active'}
                                                        {...register('status')}
                                                    />
                                                )
                                            }
                                            Active
                                        </label>
                                        <label className='label inline-block  flex items-center'>
                                            {
                                                data.status == 'Inactive' ? (
                                                    <input type="radio" className='radio mr-2'
                                                        value={'Inactive'}
                                                        {...register('status')}
                                                        checked
                                                    />
                                                ) : (
                                                    <input type="radio" className='radio mr-2'
                                                        value={'Inactive'}
                                                        {...register('status')}
                                                    />
                                                )
                                            }
                                            Inactive
                                        </label>
                                    </div>
                                    <span className="text-red-700 text-xs mt-1">{errors.status?.message}</span>
                                </div>
                                <div className='form-control w-full'>
                                    <label className='label'></label>
                                    <div>
                                        <button type="submit" className='btn btn-success btn-sm mr-3'>
                                            Save
                                            <FaUserPen size={20} />
                                        </button>
                                        <Link href={'/employee'} type="button" className='btn btn-neutral btn-sm'
                                        >
                                            Cancel
                                            <FaXmark size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )
                }

            </div>
        </>
    )
}