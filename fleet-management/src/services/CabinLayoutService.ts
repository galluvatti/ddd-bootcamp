import {CabinLayout} from "../types/CabinLayout";
import {SeatType} from "../types/SeatType";


export class CabinLayoutValidationError extends Error{
    constructor(message: string) {
        super(message);
    }
}

export class CabinLayoutService {

    async validate(cabinLayout: CabinLayout) {
        let overallLenght = 0;
        for await (const row of cabinLayout.rows) {
            if (row.extraSpace < 0 || row.extraSpace > 100) {
                throw new CabinLayoutValidationError("Extra Space of each row must be in the range 0-100");
            }

            if (row.groups.filter(group => group.aisleWidth && group.aisleWidth > 0).length == 0) {
                throw new CabinLayoutValidationError("Each row must have at least one aisle");
            }
            const seatType = await SeatType.findOne({seatTypeId: row.type})
            if (!seatType) {
                throw new CabinLayoutValidationError(`row type ${seatType} not found`)
            }

        }
    }

}