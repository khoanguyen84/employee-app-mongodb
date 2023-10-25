import Employees from "../model/employee"

export async function getEmployees(req, res) {
    try {
        const employees = await Employees.find({})

        if (!employees) {
            return res.status(404).json({ error: "Data not Found" })
        }
        res.status(200).json(employees)
    } catch (error) {
        console.log(error);
        return res.status(404).json({ error: "Error While Fetching Data" })
    }
}

export async function getEmployee(req, res) {
    try {
        const { employeeId } = req.query;
        console.log(employeeId);
        const employee = await Employees.findById(employeeId)

        if (!employee) {
            return res.status(404).json({ error: "EmployeeId not Found" })
        }
        return res.status(200).json(employee)
    } catch (error) {
        return res.status(404).json({ error: "Error While Fetching Data" })
    }
}

export async function postEmployee(req, res) {
    try {
        const formData = req.body;
        if (!formData) {
            return res.status(404).json({ error: 'Form Data Not Provided ...!' })
        }
        const data = await Employees.create(formData)
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({ error: "Error While Create Employee" })
    }
}

export async function putEmployee(req, res) {
    try {
        const { employeeId } = req.query;
        const formData = req.body;
        if(employeeId && formData){
            let employee = await Employees.findByIdAndUpdate(employeeId, formData)
            return res.status(200).json(employee)
        }

        return res.status(404).json({ error: 'Can not update employee, please try again!' })
        
    } catch (error) {
        return res.status(404).json({ error: 'Error While Update Employee' })
    }
}

export async function deleteEmployee(req, res){
    try {
        const { employeeId } = req.query;
        if(employeeId){
            const employee = await Employees.findByIdAndDelete(employeeId)
            return res.status(200).json(employee)
        }
        return res.status(404).json({ error: 'Can not delete the employee, please try again!' })
        
    } catch (error) {
        return res.status(404).json({error: 'Error While Delete Employee'})
    }
}