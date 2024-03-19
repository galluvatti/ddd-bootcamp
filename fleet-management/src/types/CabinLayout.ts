import {SeatType} from "./SeatType";
import {model, Schema} from "mongoose";

export type CabinLayout = {
    id: string;
    width: number;
    length: number;
    rows: CabinRow[];
    version: number;
}
type CabinRow = {
    type: SeatType['seatTypeId'];
    groups: SeatGroup[];
    extraSpace: number;
}

type SeatGroup = {
    availableSeats: number;
    aisleWidth?: number;
}

const seatGroupSchema = new Schema<SeatGroup>({
  availableSeats: { type: Number, required: true },
  aisleWidth: { type: Number, required: true },
});

const cabinRowSchema = new Schema<CabinRow>({
  type: { type: String, required: true },
  groups: { type: [seatGroupSchema], required: true },
  extraSpace: { type: Number, required: true },
});

const cabinLayoutSchema = new Schema<CabinLayout>({
  id: { type: String, unique: true, required: true },
  width: { type: Number, required: true },
  length: { type: Number, required: true },
  rows: { type: [cabinRowSchema], required: true },
  version: { type: Number, required: true, default: 1 },
});

export const CabinLayout = model('CabinLayout', cabinLayoutSchema);

//const row1: CabinRow = {
//    type: 'BIZ-ADV',
//    groups: [{seats: ['seat', 'seat', 'empty'], aisleWidth: 106}, {seats: ['empty', 'seat', 'seat']}],
//    extraSpace: 0,
//}