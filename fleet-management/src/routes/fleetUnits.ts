import {Request, Response, Router} from 'express';
import {FleetUnit} from "../types/FleetUnit";
import {FleetUnitService} from "../services/FleetUnitService";

const router = Router();

const fleetUnitService = new FleetUnitService();


router.get('/:tailNumber', async (req: Request, res: Response) => {
    const tailNumber = req.params.tailNumber
    const fleetUnit = await FleetUnit.findOne({tailNumber});
    if (!fleetUnit) {
        return res.status(404).send();
    }
    res.status(200).send(fleetUnit);
});

router.post('/', async (req: Request, res: Response) => {
    const fleetUnit = new FleetUnit(req.body);
    //const err = fleetUnit.validateSync();
    try {
        await fleetUnitService.validate(fleetUnit);
    } catch (err) {
        console.log(err);
        return res.status(400).send((err as Error).message);
    }
    try {
        await fleetUnit.save();
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
    res.status(201).send(`Fleet Unit added`)
});

router.put('/:tailNumber', async (req: Request, res: Response) => {
    const tailNumber = req.params.tailNumber
    const expectedVersion = req.body.version as number
    const query = {tailNumber, version: expectedVersion}

    const fleetUnit = await FleetUnit.findOneAndUpdate(query, {...req.body, version: expectedVersion + 1});
    if (!fleetUnit) {
        return res.status(404).send('Cabin Layout not found');
    }
    await fleetUnit.save();
    res.status(200).send();
});

router.delete('/:tailNumber', async (req: Request, res: Response) => {
    const tailNumber = req.params.tailNumber

    const fleetUnit = await FleetUnit.findOneAndDelete({tailNumber});
    if (!fleetUnit) {
        return res.status(404).send();
    }
    res.status(200).send(fleetUnit);
});

export default router;