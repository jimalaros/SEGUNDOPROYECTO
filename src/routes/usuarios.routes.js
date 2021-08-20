import { Router } from 'express';
import * as Usuarios from '../controllers/usuarios.controller';
import { Administrador } from '../middlewares/administrador.middleware';
import { Verificar } from '../middlewares/token.middleware';
import { Repetido } from '../middlewares/usuariorepetido.middleware';
import { Validación } from '../middlewares/Validación.middleware';
import { ValidaciónLogin } from '../middlewares/ValidaciónLogin.middleware';

const router = Router();

router.get('/', Usuarios.Usuarios);

router.post('/nuevos', Repetido, Usuarios.CrearUsuario);

router.post('/Login', Usuarios.InicioSesion);

router.delete('/Eliminar/:id', Usuarios.EliminarUsuarios);

export default router;