import connectMongo from "../../../database/connect"
import { getEmployee, putEmployee, deleteEmployee } from "../../../database/userRepository";

async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: 'Error in connection' }))
    const { method } = req

    switch (method) {
        case "GET": {
            getEmployee(req, res)
            break;
        }
        case "PUT": {
            putEmployee(req, res)
            break;
        }
        case "DELETE": {
            deleteEmployee(req, res)
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