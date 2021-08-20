import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config';
import Usuario from '../models/usuarios.model';


export const Usuarios = async (req,res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) { res.status(404).json(error); }  
};

export const CrearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, direccion, password, administrador } = req.body;
        if( nombre && apellido && email && telefono && direccion && password )
        { 
            if(administrador)
            {
                const nuevoUsuario = new Usuario ({
                    nombre,
                    apellido,
                    email,
                    telefono,
                    direccion,
                    password: bcrypt.hashSync(password, 10),
                    administrador,
                });
                await nuevoUsuario.save();
                res.status(201).json('Usuario creado con exito');
            } else {
                const usuario = new Usuario({
                    nombre,
                    apellido,
                    email,
                    telefono,
                    direccion,
                    password: bcrypt.hashSync(password, 10),
                }); 
                await usuario.save();
                res.status(201).json('Usuario creado con exito');
            }
        } else { res.status(400).json('Faltan datos'); }
    } catch (error) { res.status(404).json(error); } 
};

export const InicioSesion = async(req,res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const usuario = await Usuario.findOne({ email: req.body.email });
            const contraseña = bcrypt.compare(req.body.password, usuario.password);
            if (!usuario && !contraseña) {
                return res.status(401).send({ auth: false, token: null });
            } else {
                const token = jwt.sign({ id: usuario._id }, config.secret, {
                    expiresIn: 60 * 60 * 24,
                });
                res.status(200).json({ auth: true, token });
            }
        }
        else { res.status(400).json({msg: 'Faltan datos'}); }
    } catch (error) { res.status(404).json(error); }  
};

export const EliminarUsuarios = async (req, res) => {
    try {
        const { id } = req.params;
        if(id) {
            await Usuario.findByIdAndDelete(id);
            res.status(200).json({msg: "El Usuario fue eliminado con exito"});
        } else { res.status(400).json({msg: 'Faltan datos'}); } 
    } catch (error) { res.status(404).json(error); } 
};