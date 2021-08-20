import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    administrador: {
        type: Boolean,
        default: false
    }
});

/**usuarioSchema.methods.EncriptarContraseña = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

usuarioSchema.methods.CompararContraseñas = async function (password) {
  return bcrypt.compare(password, this.password);
};**/

export default model('Usuario', usuarioSchema);