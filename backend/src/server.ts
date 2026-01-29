import "dotenv/config"

import express from 'express'
import cors from 'cors'

import clientsRoutes from "./routes/clients.routes"
import serversRoutes from "./routes/servers.routes"
import ports

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_, res) => {
    res.json({status: "ok"})
})

app.use("/clients", clientsRoutes);
app.use("/servers", serversRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`)
})