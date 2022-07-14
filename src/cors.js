import { config } from 'dotenv'
import cors from 'cors'
config()

export default cors({
    origin: (origin, callback) => {
        if (origin.includes(process.env.URL)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
})
