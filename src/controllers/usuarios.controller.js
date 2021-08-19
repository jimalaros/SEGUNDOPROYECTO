import Usuario from '../models/usuarios.model';
import config from '../config';
import jwt from 'jsonwebtoken';
import loginSchema from '../Schemas/Login.schema';
import ValidarUsuario from '../Schemas/usuarios.schema';

export const Usuarios = async (req,res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) { res.status(500).json(error); } 
};

export const CrearUsuario = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            correo,
            telefono,
            direccion,
            contraseña
        } = await ValidarUsuario.validateAsync(req.body);

        const UsuarioRepetido = await Usuario.findOne({ correo });
        if (UsuarioRepetido) {
            res.status(400).json('El Correo ya existe en la base de datos');
        } else {   
            const usuario = new Usuario({
                nombre,
                apellido,
                correo,
                telefono,
                direccion,
                contraseña
            });
            // Para encriptar la contraseña del usuario
            usuario.contraseña = await usuario.EncriptarContraseña(contraseña);  
            await usuario.save();
            res.status(201).json('Usuario creado con exito');
        }
    } catch (error) { res.status(500).json(error); } 
};

export const InicioSesion = async(req,res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const contraseña_comparar = await loginSchema.validateAsync(password);    
            const usuario = await Usuario.findOne({ email: req.body.correo });
            const contraseña = await usuario.Compararcontraseñas(req.body.password, contraseña_comparar);
            if (!usuario && !contraseña) {
                res.status(401).send({ auth: false, token: null });
            } else {
                const token = jwt.sign({ id: usuario._id }, config.secret, {
                    expiresIn: 60 * 60 * 24,
                });
                res.status(200).json({ auth: true, token });
            }
        } else { res.status(400).json({msg: 'Faltan datos'}); }
    } catch (error) { res.status(500).json(error); } 
};

export const EliminarUsuarios = async (req, res) => {
    const { id } = req.params;
    if(id) {
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({msg: "El Usuario fue eliminado con exito"});
    } else { res.status(400).json({msg: 'Faltan datos'}); }
};