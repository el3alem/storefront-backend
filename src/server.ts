import express from 'express'
import cors from 'cors'
import router from './routes/indRoute'

const app = express()
const port = 8080

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)

app.get('/', (_req: express.Request, res: express.Response) => {
    res.redirect('/api')
})

app.listen(port, () => {
    // eslint-disable-next-line no-undef
    console.log(`server started at localhost: ${port}`)
})

export default app
