import express, {Request, Response} from 'express';
import aircraftRoutes from './routes/aircrafts';
import seatsRoutes from './routes/seats';

const bodyParser = require('body-parser')

function initDatabaseTables() {
    const Pool = require('pg').Pool
    const pool = new Pool({
        user: 'fleetops_user',
        host: 'localhost',
        database: 'fleetops_db',
        password: 'S3cret',
        port: 5432,
    })

    pool.query('CREATE TABLE IF NOT EXISTS aircrafts(model VARCHAR(30), data JSON, PRIMARY KEY (model));' +
        'CREATE TABLE IF NOT EXISTS seat_types(id VARCHAR(30), data JSON, PRIMARY KEY (id));', (error: any, results: {
        rows: any;
    }) => {
        if (error) {
            throw error
        }

    })
}

initDatabaseTables();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/aircrafts', aircraftRoutes);
app.use('/seats', seatsRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json('Hello, TypeScript Express!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});