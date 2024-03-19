import express, {Request, Response} from 'express';
import aircraftRoutes from './routes/aircrafts';

const app = express();
const port = process.env.PORT || 3000;

app.use('/aircrafts', aircraftRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});