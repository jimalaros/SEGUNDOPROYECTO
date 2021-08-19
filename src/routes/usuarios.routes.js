import { Router } from 'express';
import * as Usuarios from '../controllers/usuarios.controller';
import { Verificar } from '../middlewares/token.middleware';
import { Repetido } from '../middlewares/usuariorepetido.middleware';

const router = Router();

router.get('/', Verificar, Usuarios.Usuarios);

router.post('/nuevos', Repetido, Usuarios.CrearUsuario);

router.post('/Login', Usuarios.InicioSesion);

router.delete('/Eliminar/:id', Usuarios.EliminarUsuarios);

export default router;