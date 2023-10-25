import { Schema, models, model } from 'mongoose'

const employeeSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    salary: Number,
    dob: Number,
    status: String,
    avatar: String
})

const Employees =  models.employee || model('employee', employeeSchema)

export default Employees