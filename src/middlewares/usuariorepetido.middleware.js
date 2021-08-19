import Usuario from '../models/usuarios.model';

export const Repetido = async (req, res, next) =>
{
    const email = req.body.email;
    const UsuarioRepetido = await Usuario.findOne({ email });
    if(UsuarioRepetido) {
        return res
        .status(400)
        .send({ auth: false, msg: "El correo ya se encuentra registrado en la base de datos" }); 
    } else { 
        next();
    }
};