import {Request, Response, Router} from 'express';
import {Aircraft} from "../types/Aircraft";

const router = Router();


router.get('/:model', async (req: Request, res: Response) => {
    const model = req.params.model
    const aircraft = await Aircraft.findOne({model});
    if (!aircraft) {
        return res.status(404).send();
    }
    res.status(200).send(aircraft);
});

router.post('/', async (req: Request, res: Response) => {
    const aircraft = new Aircraft(req.body);
    const err = aircraft.validateSync();
    if (err) {
        return res.status(400).send();
    }
    try {
        await aircraft.save();
    } catch (err) {
        return res.status(500).send();
    }
    res.status(201).send(`Aircraft added`)
});

router.put('/:model', async (req: Request, res: Response) => {
    const model = req.params.model
    const expectedVersion = req.body.version as number
    const query = {model: model, version: expectedVersion}

    const aircraft = await Aircraft.findOneAndUpdate(query, {...req.body, version : expectedVersion+1});
    if (!aircraft) {
        return res.status(404).send('Aircraft not found');
    }
    await aircraft.save();
    res.status(200).send();
});

router.delete('/:model', async (req: Request, res: Response) => {
    const model = req.params.model

    const aircraft = await Aircraft.findOneAndDelete({model});
    if (!aircraft) {
        return res.status(404).send();
    }
    res.status(200).send(aircraft);
});

export default router;