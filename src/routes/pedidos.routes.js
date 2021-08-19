import { Router } from 'express';
import * as Pedido from '../controllers/pedidos.controller';

const router = Router();

router.get('/', Pedido.Pedidos);

router.post('/Crear', Pedido.CrearOrden);

router.post('/Ordenar/:id', Pedido.Ordenar);

router.put('/Editar/:id', Pedido.ActualizarPedidos);

router.delete('/Eliminar/:id', Pedido.EliminarPedidos);

export default router;