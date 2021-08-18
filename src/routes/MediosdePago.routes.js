import { Router } from 'express';
import * as MediosdePago from '../controllers/MediodePago.controller';

const router = Router();

router.get('/', MediosdePago.MediosdePago);

router.post('/nuevos', MediosdePago.CrearMediodePago);

router.put('/:id', MediosdePago.ActualizarMediosdePago);

router.delete('/Eliminar/:id', MediosdePago.EliminarMediosdePago);

export default router;