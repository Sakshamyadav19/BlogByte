import express,{Express} from 'express'
import cors from 'cors'
import authRouter from '../routes/Auth';
import blogRouter from '../routes/Blog';



const app:Express = express()
app.use(cors());
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/blog',blogRouter)

app.listen(3000,()=>{console.log('Running on port 3000')})


