import React from "react";
import { FaUserPlus, FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().required(),
    salary: yup.number().required(),
    dob: yup.date().required()
})

function Form() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const handleCreateEmployee = (data) => {
        console.log(data);
    }
    return (
        <form onSubmit={handleSubmit(handleCreateEmployee)} className='mt-3 border-t-2 border-dark-500'>
            <div className='grid grid-cols-3 gap-x-3'>
                <div className='form-control'>
                    <label className='label'>Firstname</label>
                    <input type="text"
                        className={`input input-sm input-bordered ${errors.firstname?.message ? 'input-error' : ''}`}
                        placeholder='Fullname' {...register('firstname')} />
                    <span className="text-red-700 text-xs mt-1">{errors.firstname?.message}</span>
                </div>
                <div className='form-control'>
                    <label className='label'>Lastname</label>
                    <input type="text"
                        className={`input input-sm input-bordered ${errors.lastname?.message ? 'input-error' : ''}`}
                        placeholder='Lastname' {...register('lastname')} />
                    <span className="text-red-700 text-xs mt-1">{errors.lastname?.message}</span>
                </div>
                <div className='form-control'>
                    <label className='label'>Email</label>
                    <input type="email"
                        className={`input input-sm input-bordered ${errors.email?.message ? 'input-error' : ''}`}
                        placeholder='Email' {...register('email')} />
                    <span className="text-red-700 text-xs mt-1">{errors.email?.message}</span>
                </div>
                <div className='form-control'>
                    <label className='label'>Salary</label>
                    <input type="number"
                        className={`input input-sm input-bordered ${errors.salary?.message ? 'input-error' : ''}`}
                        placeholder='Salary' {...register('salary')} />
                    <span className="text-red-700 text-xs mt-1">{errors.salary?.message}</span>
                </div>
                <div className='form-control'>
                    <label className='label'>Date of birth</label>
                    <input type="date"
                        className={`input input-sm input-bordered ${errors.dob?.message ? 'input-error' : ''}`}
                        placeholder='Salary' {...register('dob')} />
                    <span className="text-red-700 text-xs mt-1">{errors.dob?.message}</span>
                </div>
                <div className='form-control'>
                    <label className='label'>Status</label>
                    <div className='flex gap-x-4'>
                        <label className='label inline-block flex items-center'>
                            <input type="radio" defaultChecked value={"Active"} className='radio mr-2' {...register('status')} />
                            Active
                        </label>
                        <label className='label inline-block  flex items-center'>
                            <input type="radio" value={"Inactive"} className='radio mr-2' {...register('status')} />
                            Inactive
                        </label>
                    </div>
                </div>
                <div className='form-control w-full'>
                    <label className='label'></label>
                    <div>
                        <button type="submit" className='btn btn-warning btn-sm mr-3'>
                            Add
                            <FaUserPlus size={20} />
                        </button>
                        <button type="button" className='btn btn-neutral btn-sm'
                            onClick={() => reset()}
                        >
                            Cancel
                            <FaXmark size={15} />
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Form;