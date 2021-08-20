import ValidarUsuario from '../schemas/usuarios.schema';

export const Validación = async (req, res) => {
    try {
        const {
            nombre, 
            apellido, 
            email, 
            telefono, 
            direccion, 
            password,
            administrador
        } =  await ValidarUsuario.validateAsync(req.body);
        if( nombre && apellido && email && telefono && direccion && password && administrador ){
            next();
        } else {
            return res
            .status(400)
            .json(error.details[0].message);
        }
    } catch (error) { res.status(500).json(error); }
};