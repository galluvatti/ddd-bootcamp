import mongoose from 'mongoose';
import { Aircraft } from './src/types/Aircraft';
import { SeatType } from './src/types/SeatType';

const a1 = new Aircraft({
    model: '737-300',
    manufacturer: 'Boing',
    wingspan: 28.9,
    cabinWidth: 354,
    cabinHeight: 2.2,
    cabinLength: 24.13,
    cargoCapacity: 27.5,
    range: 4444,
    cruiseSpeed: 0.785,
    engineType: 'CFM56-3 Series',
    noiseLevel: '65-70',
    version: 1
});

const st1 = new SeatType({
    seatTypeId: 'ECON-HRTG',
    seatType: 'Heritage Economy Non-Reclining',
    width: 43,
    height: 88,
    pitch: 70,
    weight: 12,
    productionDate: 1980,
    comfortLevel: 5,
    features: ['Wooden', 'non-reclining', 'minimal cushion'],
    version: 1
});

(async function main() {
    await mongoose.connect('mongodb://root:example@127.0.0.1/evilton-fleet-management?authSource=admin');
    await mongoose.connection.db.dropDatabase();

    await Promise.allSettled([a1.save(), st1.save()]);

    await mongoose.connection.close();
})();