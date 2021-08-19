import { Schema, model } from 'mongoose';

const productoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

export default model("Producto", productoSchema);