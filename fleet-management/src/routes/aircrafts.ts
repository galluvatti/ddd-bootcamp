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
    pool.query('SELECT * FROM AIRCRAFTS ORDER BY model ASC', (error: any, results: { rows: any; }) => {
        if (error) {
            res.status(500).send()
        }
        res.status(200).json(results.rows)
    })
});

router.post('/', (req: Request, res: Response) => {
    pool.query('INSERT INTO AIRCRAFTS (model, data) VALUES ($1, $2) RETURNING *', [req.body.model, req.body], (error: any, results: {
        rows: { id: any; }[];
    }) => {
        if (error) {
            return res.status(500).send()
        }
        return res.status(201).send(`Aircraft added`)
    })
});

router.put('/:model', (req: Request, res: Response) => {
    const aircraftModel = req.params.model;

    pool.query('UPDATE AIRCRAFTS set DATA = $1 where MODEL = $2 RETURNING *', [req.body, aircraftModel], (error: any, results: {
        rows: { id: any; }[];
    }) => {
        if (error) {
            return res.status(500).send()
        }
        return res.status(200).send(`Aircraft updated: ${aircraftModel}`)
    })

});

router.delete('/:model', (req: Request, res: Response) => {
    const aircraftModel = req.params.model;

    pool.query('DELETE FROM AIRCRAFTS WHERE model = $1', [aircraftModel], (error: any, results: any) => {
        if (error) {
            return res.status(500).send()
        }
         return res.status(200).send(`Aircraft deleted with ID: ${aircraftModel}`)
    })
});

export default router;