import Employees from "../model/employee"

export async function getEmployees(req, res){
    try {
        const employees = await Employees.find({})

        if(!employees) {
            return res.status(404).json( { error: "Data not Found"})
        }
        res.status(200).json(employees)
    } catch (error) {
        res.status(404).json( { error : "Error While Fetching Data"})
    }
}


export async function postEmployee(req, res){
    try {
        const formData = req.body;
        if(!formData){
            return res.status(404).json({ error: 'Form Data Not Provided ...!' })
        }
        res.setHeader('Content-Type', 'application/json')
        const data = await Employees.create(formData)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json( { error : "Error While Fetching Data"})
    }
}