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
    res.json('list of aircrafts');
});

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    //Insert on DB

    pool.query('INSERT INTO fleetops.AIRCRAFTS (data) VALUES ($1) RETURNING *', [req.body], (error: any, results: { rows: { id: any; }[]; }) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Aircraft added with ID: ${results.rows[0].id}`)
    })
});

export default router;