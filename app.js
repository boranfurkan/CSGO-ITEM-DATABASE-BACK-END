require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml')

const express = require('express')
const app = express()

// connect db
const connectDB = require('./db/connect')

// authorization
const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require("./routes/auth")
const itemsRouter = require("./routes/items")

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// extra packages
app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300 // limit each IP to 300 requests per windowMs
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// routes
app.get("/", (req, res) => {
  res.send('<h2>CSGO ITEM DATABASE</h2><a href="/api-docs">Check Out For Documentation</a>')
})

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/items", authenticateUser, itemsRouter)

// Middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error)
  }
}

start()
