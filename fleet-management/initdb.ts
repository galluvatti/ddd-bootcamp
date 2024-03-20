import mongoose from 'mongoose';
import {Aircraft} from './src/types/Aircraft';
import {SeatType} from './src/types/SeatType';
import {CabinLayout, CabinRow, SeatGroup} from "./src/types/CabinLayout";
import {FleetUnit} from "./src/types/FleetUnit";

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

const cl1 = new CabinLayout(
    {
        id: 'C3005',
        width: 310,
        length: 4000,
        rows: [
            new CabinRow({
                type: 'ECON-HRTG',
                extraSpace: 0,
                groups: [
                    new SeatGroup({
                        availableSeats: 2,
                        aisleWidth: 106
                    }),
                    new SeatGroup({
                        availableSeats: 2
                    })
                ]
            }),
            new CabinRow({
                type: 'ECON-HRTG',
                extraSpace: 0,
                groups: [
                    new SeatGroup({
                        availableSeats: 3,
                        aisleWidth: 40
                    }),
                    new SeatGroup({
                        availableSeats: 3
                    })
                ]
            })
        ]
    }
);

const fu1 = new FleetUnit(
    {
        tailNumber: 'E731',
        model: '737-300',
        manufacturingDate: '25/05/1984',
        purchaseDate: '25/05/1980',
        nextMaintenanceDate: '25/05/1994',
        cabinLayoutId: 'C3005'
    }
);

(async function main() {
    await mongoose.connect('mongodb://root:example@127.0.0.1/evilton-fleet-management?authSource=admin');
    await mongoose.connection.db.dropDatabase();

    await Promise.allSettled([a1.save(), st1.save(), cl1.save(), fu1.save()]);

    await mongoose.connection.close();
})();