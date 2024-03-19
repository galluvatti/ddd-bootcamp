import { model, Schema } from 'mongoose';

export interface Aircraft {
  model: string;
  manufacturer: string;
  wingspan: number;
  cabinWidth: number;
  cabinHeight: number;
  cabinLength: number;
  cargoCapacity: number;
  range: number;
  cruiseSpeed: number;
  engineType: string;
  noiseLevel: string;
  version: number;
}

const schema = new Schema<Aircraft>({
  model: { type: String, unique: true, required: true },
  manufacturer: { type: String, required: true },
  wingspan: { type: Number, required: true },
  cabinWidth: { type: Number, required: true },
  cabinHeight: { type: Number, required: true },
  cabinLength: { type: Number, required: true },
  cargoCapacity: { type: Number, required: true },
  range: { type: Number, required: true },
  cruiseSpeed: { type: Number, required: true },
  engineType: { type: String, required: true },
  noiseLevel: { type: String, required: true },
  version: { type: Number, required: true, default: 1 },
});

export const Aircraft = model('Aircraft', schema);