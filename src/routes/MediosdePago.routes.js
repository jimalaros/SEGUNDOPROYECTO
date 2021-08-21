import { Router } from 'express';
import * as MediosdePago from '../controllers/MediodePago.controller';
import { Administrador } from '../middlewares/administrador.middleware';

const router = Router();

router.get('/', Administrador, MediosdePago.MediosdePago);

router.post('/nuevos', Administrador, MediosdePago.CrearMediodePago);

router.put('/:id', Administrador, MediosdePago.ActualizarMediosdePago);

router.delete('/Eliminar/:id', Administrador, MediosdePago.EliminarMediosdePago);

export default router;