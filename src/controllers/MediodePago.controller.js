import MediodePago from '../models/MediodePago.model';

export const MediosdePago = async (req, res) => {
    try {
        const mediosdepago = await MediodePago.find();
        res.json(mediosdepago);
    } catch (error) { res.status(404).json(error); }
};

export const CrearMediodePago = async (req, res) => {
    const { nombre } = req.body;
    try {
        if (nombre) {
            const MediodePagoRepetido = await MediodePago.findOne({ nombre });
            if (MediodePagoRepetido) {
                res.status(400).json('El Medio de pago ya existe');
            } else {
                const NuevoMediodePago = new MediodePago({ nombre });
                await NuevoMediodePago.save();
                res.status(201).json({ msg: 'Medio de Pago creado con exito' });
            }
        } else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json(error); }
};

export const ActualizarMediosdePago = async (req, res) => {
    try {
        const { nombre } = req.body;
        if (nombre) {
            const { id } = req.params;
            const updates = { ...req.body };
            const options = { new: true };
            await MediodePago.findByIdAndUpdate(id, updates, options);
            res.status(200).json({ msg: 'Medio de Pago editado con exito' });
        } else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json(error); }
};

export const EliminarMediosdePago = async (req, res) => {
    try {
        const { id } = req.params;
        await MediodePago.findByIdAndDelete(id);
        res.status(200).json({ msg: 'El medio de pago fue eliminado con exito' });
    } catch (error) { res.status(404).json(error); }
};