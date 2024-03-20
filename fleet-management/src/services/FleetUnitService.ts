import {FleetUnit} from "../types/FleetUnit";
import {Aircraft} from "../types/Aircraft";
import {CabinLayout} from "../types/CabinLayout";


export class FleetUnitValidationError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class FleetUnitService {

    async validate(fleetUnit: FleetUnit) {
        const model = fleetUnit.model;
        const layoutId = fleetUnit.cabinLayoutId
        const aircraft = await Aircraft.findOne({model})
        const cabinLayout = await CabinLayout.findOne({id: layoutId})

        if (!aircraft) throw new FleetUnitValidationError("Aircraft model not found");

        if (!cabinLayout) throw new FleetUnitValidationError("Cabin Layout not found");

        if (aircraft.cabinLength !== cabinLayout.length || aircraft.cabinWidth !== cabinLayout.width)
            throw new FleetUnitValidationError("Cabin Layout size don't match aircraft model");
    }

}