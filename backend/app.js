import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectToDb from './config/db.config.js'; 

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));
 
app.use("/", (req, res) => {
    res.send("Hey, im ready")
})
 
app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
})


// db init
connectToDb();

export default app;