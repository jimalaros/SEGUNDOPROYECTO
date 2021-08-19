import { Schema, model } from 'mongoose';

const PedidoSchema = new Schema({
    usuario: {
        type: String,
        required:true
    },
    direccion: {
        type: String,
        required:true
    },
    pedidos: [{
        nombres: {
            type: Array,
            required: true
        },
        cantidades: {
            type: Array,
            required: true
        },
        mediodepago: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        precio: {
            type: Number
        }
    }]
});

export default model('Pedido', PedidoSchema);