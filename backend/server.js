import  express  from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRouter.js";
import { notFound,errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./congig/db.js";
import cookieParser from "cookie-parser";
dotenv.config()

connectDB(); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRoutes);
app.get('/',(req,res)=> res.send('server is ready'))
 
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000

app.listen(port,()=>console.log(`server listening to localhost:${port} `))     