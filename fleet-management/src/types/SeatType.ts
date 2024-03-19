import { model, Schema } from 'mongoose';

interface SeatType {
  seatTypeId: string;
  seatType: string;
  width: number;
  height: number;
  pitch: number;
  weight: number;
  productionDate: number;
  comfortLevel: number;
  features: string[];
}

const schema = new Schema<SeatType>({
  seatTypeId: { type: String, unique: true, required: true },
  seatType: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  pitch: { type: Number, required: true },
  weight: { type: Number, required: true },
  productionDate: { type: Number, required: true },
  comfortLevel: { type: Number, required: true },
  features: { type: [String], required: true },
});

export const SeatType = model('SeatType', schema);