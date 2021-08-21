import { Schema, model } from 'mongoose';

const MediodePagoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
});

export default model("MediodePago", MediodePagoSchema);