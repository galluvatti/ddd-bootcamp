import {Request, Response, Router} from 'express';

import {Aircraft} from "../types/aircraft";

const router = Router();

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'fleetops_user',
    host: 'localhost',
    database: 'fleetops_db',
    password: 'S3cret',
    port: 5432,
})

// Add your CRUD API implementation here

router.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM fleetops.AIRCRAFTS ORDER BY id ASC', (error: any, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    pool.query('INSERT INTO fleetops.AIRCRAFTS (data) VALUES ($1) RETURNING *', [req.body], (error: any, results: { rows: { id: any; }[]; }) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Aircraft added with ID: ${results.rows[0].id}`)
    })
});

export default router;