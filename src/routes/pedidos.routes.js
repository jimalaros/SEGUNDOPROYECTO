import { Router } from 'express';
import * as Pedido from '../controllers/pedidos.controller';
import { Verificar } from '../middlewares/token.middleware';

const router = Router();

router.get('/', Verificar, Pedido.Pedidos);

router.post('/Crear', Verificar, Pedido.CrearOrden);

router.post('/Ordenar/:id', Verificar, Pedido.Ordenar);

router.put('/Editar/:id', Verificar, Pedido.ActualizarPedidos);

router.delete('/Eliminar/:id', Verificar, Pedido.EliminarPedidos);

export default router;