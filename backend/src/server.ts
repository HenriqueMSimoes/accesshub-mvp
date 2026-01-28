import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import clientsRoutes from "./routes/clients.routes";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_, res) => {
    res.json({status: "ok"})
})

app.use("/clients", clientsRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`)
})