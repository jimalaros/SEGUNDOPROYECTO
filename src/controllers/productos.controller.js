import Producto from '../models/productos.model.js';
import cliente from '../redis.js';

export const Productos = async (req,res) => {
    try {
        const productos = await Producto.find();
        cliente.set('productos', JSON.stringify(productos));
        res.json(productos);
    } catch (error) { res.status(404).json(error); }
};

export const CrearProducto = async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        if (nombre && precio) {
            const ProductoRepetido = await Producto.findOne({ nombre });
            if (ProductoRepetido) {
                res.status(400).json('El Producto ya existe');
            } else {
                const productos = await Producto.find();
                new Producto({ ...req.body }).save();
                res.status(201).json({ msg: 'Producto creado con exito' });
            }
        } else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json(error); }
};

export const ActualizarProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;
        if (nombre && precio) {
            const updates = { ...req.body };
            const options = { new: true };
            await Producto.findByIdAndUpdate(id, updates, options);
            res.status(200).json({ msg: 'Producto editado con exito' });
        }
        else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json(error); }
};

export const EliminarProductos = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            await Producto.findByIdAndDelete(id);
            res.status(200).json({msg: 'El producto fue eliminado con exito' });
        } else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json(error); }
};
