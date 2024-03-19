import {Request, Response, Router} from 'express';

const router = Router();

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'fleetops_user',
    host: 'localhost',
    database: 'fleetops_db',
    password: 'S3cret',
    port: 5432,
})

router.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM fleetops.SEATS ORDER BY id ASC', (error: any, results: { rows: any; }) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
});

router.post('/', (req: Request, res: Response) => {
    pool.query('INSERT INTO fleetops.SEATS (data) VALUES ($1) RETURNING *', [req.body], (error: any, results: {
        rows: { id: any; }[];
    }) => {
        if (error) {
            throw error
        }
        res.status(201).send(`Seat added with ID: ${results.rows[0].id}`)
    })
});

router.put('/:id', (req: Request, res: Response) => {
    const seatID = req.params.id;

    pool.query('UPDATE fleetops.SEATS set DATA = $1 where ID = $2 RETURNING *', [req.body, seatID], (error: any, results: {
        rows: { id: any; }[];
    }) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Seat updated: ${results.rows[0].id}`)
    })

});

router.delete('/:id', (req: Request, res: Response) => {
    const seatID = req.params.id;

    pool.query('DELETE FROM fleetops.SEATS WHERE id = $1', [seatID], (error: any, results: any) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Seat deleted with ID: ${seatID}`)
    })
});

export default router;