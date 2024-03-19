import {Request, Response, Router} from 'express';
import {FleetUnit} from "../types/FleetUnit";

const router = Router();


router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const fleetUnit = await FleetUnit.findOne({id});
    if (!fleetUnit) {
        return res.status(404).send();
    }
    res.status(200).send(fleetUnit);
});

router.post('/', async (req: Request, res: Response) => {
    const fleetUnit = new FleetUnit(req.body);
    const err = fleetUnit.validateSync();
    if (err) {
        return res.status(400).send();
    }
    try {
        await fleetUnit.save();
    } catch (err) {
        return res.status(500).send();
    }
    res.status(201).send(`Cabin Layout added`)
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const expectedVersion = req.body.version as number
    const query = {id: id, version: expectedVersion}

    const fleetUnit = await FleetUnit.findOneAndUpdate(query, {...req.body, version: expectedVersion + 1});
    if (!fleetUnit) {
        return res.status(404).send('Cabin Layout not found');
    }
    await fleetUnit.save();
    res.status(200).send();
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id

    const fleetUnit = await FleetUnit.findOneAndDelete({id});
    if (!fleetUnit) {
        return res.status(404).send();
    }
    res.status(200).send(fleetUnit);
});

export default router;