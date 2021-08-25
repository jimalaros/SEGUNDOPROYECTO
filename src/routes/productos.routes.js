import { Router } from 'express';
import { Administrador } from '../middlewares/administrador.middleware';
import * as Productos from '../controllers/productos.controller';
import { cache } from '../middlewares/cache.middleware';

const router = Router();

router.get('/', cache, Productos.Productos);

router.post('/nuevos', Administrador, Productos.CrearProducto);

router.put('/:id', Administrador, Productos.ActualizarProductos);

router.delete('/Eliminar/:id', Administrador, Productos.EliminarProductos);

export default router;