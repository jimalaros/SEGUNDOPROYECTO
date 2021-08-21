import { Router } from 'express';
import * as Usuarios from '../controllers/usuarios.controller';
import { Administrador } from '../middlewares/administrador.middleware';
import { Verificar } from '../middlewares/token.middleware';

const router = Router();

router.get('/', Verificar, Usuarios.Usuarios);

router.post('/nuevos', Usuarios.CrearUsuario);

router.post('/Login', Usuarios.InicioSesion);

router.delete('/Eliminar/:id', Administrador, Usuarios.EliminarUsuarios);

export default router;