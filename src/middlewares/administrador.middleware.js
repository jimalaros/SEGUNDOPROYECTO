import Usuario from '../models/usuarios.model';
import jwt from 'jsonwebtoken';
import config from '../config';

export const Administrador = async (req, res, next) =>
{
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    
    //Decodificar el token
    const decoded = await jwt.verify(token, config.secret);
    const UsuarioAdministrador = await Usuario.findById(decoded.id);
    if(UsuarioAdministrador.administrador === true)
    {
        next();
    }
    else { 
        return res
        .status(401)
        .send({ auth: false, msg: "No eres administrador" }); 
    }
};