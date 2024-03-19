import {Request, Response, Router} from 'express';
import {SeatType} from "../types/SeatType";

const router = Router();

router.get('/:seatTypeId', async (req: Request, res: Response) => {
    const seatTypeId = req.params.seatTypeId
    const seatType = await SeatType.findOne({seatTypeId});
    if (!seatType) {
        return res.status(404).send();
    }
    res.status(200).send(seatType);
});

router.post('/', async (req: Request, res: Response) => {
    const seatType = new SeatType(req.body);
    const err = seatType.validateSync();
    if (err) {
        return res.status(400).send();
    }
    await seatType.save();
    res.status(201).send();
});

router.put('/:seatTypeId', async (req: Request, res: Response) => {
    const seatTypeId = req.params.seatTypeId;
    const expectedVersion = req.body.version as number
    const query = {seatTypeId: seatTypeId, version: expectedVersion}

    const seatType = await SeatType.findOneAndUpdate(query, {...req.body, version: expectedVersion + 1});
    if (!seatType) {
        return res.status(404).send();
    }
    await seatType.save();
    res.status(200).send();
});

router.delete('/:seatTypeId', async (req: Request, res: Response) => {
    const seatTypeId = req.params.seatTypeId;
    const seatType = await SeatType.findOneAndDelete({seatTypeId});
    if (!seatType) {
        return res.status(404).send();
    }
    res.status(200).send(seatType);

});

export default router;