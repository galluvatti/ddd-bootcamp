import {Request, Response, Router} from 'express';
import {CabinLayout} from "../types/CabinLayout";
import {CabinLayoutService} from "../services/CabinLayoutService";

const router = Router();

const cabinLayoutService = new CabinLayoutService()

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const cabinLayout = await CabinLayout.findOne({id});
    if (!cabinLayout) {
        return res.status(404).send();
    }
    res.status(200).send(cabinLayout);
});

router.post('/', async (req: Request, res: Response) => {
    const cabinLayout = new CabinLayout(req.body);
    try {
        await cabinLayoutService.validate(cabinLayout);
    } catch (err) {
        console.log(err);
        return res.status(400).send((err as Error).message);
    }
    try {
        await cabinLayout.save();
    } catch (err) {
        return res.status(500).send();
    }
    res.status(201).send(`Cabin Layout added`)
});

router.put('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const expectedVersion = req.body.version as number
    const query = {id: id, version: expectedVersion}

    const cabinLayout = await CabinLayout.findOneAndUpdate(query, {...req.body, version: expectedVersion + 1});
    if (!cabinLayout) {
        return res.status(404).send('Cabin Layout not found');
    }
    await cabinLayout.save();
    res.status(200).send();
});

router.delete('/:id', async (req: Request, res: Response) => {
    const id = req.params.id

    const cabinLayout = await CabinLayout.findOneAndDelete({id});
    if (!cabinLayout) {
        return res.status(404).send();
    }
    res.status(200).send(cabinLayout);
});

export default router;