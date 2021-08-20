import joi from 'joi';

export const ValidarUsuario = joi.object({
    nombre: joi
        .string()
        .min(3)
        .max(30)
        .required(),
    apellido: joi
        .string()
        .min(3)
        .max(30)
        .required(),
    email: joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net', 'co'] },
        }),
    telefono: joi
        .number()
        .min(6)
        .max(10)
        .required(),
    direccion: joi
        .string()
        .min(10)
        .max(50)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    administrador: joi.boolean(),
});