import {Aircraft} from "./Aircraft";
import {CabinLayout} from "./CabinLayout";
import {model, Schema} from "mongoose";

export type FleetUnit = {
    tailNumber: string;
    model: Aircraft['model'];
    manufacturingDate: string;
    purchaseDate: string;
    nextMaintenanceDate: string;
    cabinLayoutId: CabinLayout['id'];
    version: number;
}

const fleetUnitSchema = new Schema<FleetUnit>({
    tailNumber: {type: String, unique: true, required: true},
    model: {type: String, required: true},
    manufacturingDate: {type: String, required: true},
    purchaseDate: {type: String, required: true},
    nextMaintenanceDate: {type: String, required: true},
    cabinLayoutId: {type: String, required: true},
    version: {type: Number, required: true, default: 1},
});

export const FleetUnit = model('FleetUnit', fleetUnitSchema);