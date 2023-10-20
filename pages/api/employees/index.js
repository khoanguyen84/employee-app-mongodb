import connectMongo from "../../../database/connect"
import { getEmployees, postEmployee } from "../../../database/userRepository";
import Employees from "../../../model/employee";

async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: 'Error in connection' }))
    const { method } = req

    switch (method) {
        case "GET": {
            getEmployees(req, res)
            break;
        }
        case "POST": {
            // res.status(200).json({ method, name: "POST Request" })
            await postEmployee(req, res)
            break;
        }
        case "PUT": {
            res.status(200).json({ method, name: "PUT Request" })
            break;
        }
        case "DELETE": {
            res.status(200).json({ method, name: "DELETE Request" })
            break;
        }
        default: {
            res.setHeader('Allow', ["GET", "POST", "PUT", "DELETE"])
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
        }
    }
}

export default handler;