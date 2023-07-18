import  express  from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRouter.js";
import adminRoutes from "./routes/adminRouter.js"
import { notFound,errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from 'path';
dotenv.config()

connectDB(); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

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