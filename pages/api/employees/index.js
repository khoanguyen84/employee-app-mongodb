import connectMongo from "../../../database/connect"
import { getEmployees, postEmployee } from "../../../database/userRepository";

async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: 'Error in connection' }))
    const { method } = req

    switch (method) {
        case "GET": {
            await getEmployees(req, res)
            break;
        }
        case "POST": {
            await postEmployee(req, res)
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