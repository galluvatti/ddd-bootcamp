import express, {Request, Response} from 'express';
import aircraftRoutes from './routes/aircrafts';

const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/aircrafts', aircraftRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});