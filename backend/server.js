import  express  from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRouter.js";
import adminRoutes from "./routes/adminRouter.js"
import { notFound,errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path'
import { getDirname } from "./utils/util.js";




dotenv.config()
connectDB(); 
const app = express();
const __dirname = getDirname(import.meta.url);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors())
app.use('/image', express.static(path.join(__dirname, './utils/uploads')));


app.use('/api/admin',adminRoutes)
app.use('/api/users',userRoutes);


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  } 


app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000

app.listen(port,()=>console.log(`server listening to localhost:${port} `))      