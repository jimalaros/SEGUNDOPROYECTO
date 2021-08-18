import { Schema, model } from 'mongoose';

const MediodePagoSchema = new Schema({
    mediodepago: {
        type: String,
        required: true
    }
});

export default model("MediodePago", MediodePagoSchema);