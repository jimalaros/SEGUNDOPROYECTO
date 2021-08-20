import LoginSchema from '../schemas/Login.schema';

export const ValidaciónLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const contraseña = await LoginSchema.validateasync(password);
        const correo = await LoginSchema.validateasync(email);
        if (correo && contraseña) {
            next();
        } else {
            return res
            .status(400)
            .json(error.details[0].message);
        }
    } catch (error) { res.status(500).json(error); }
}