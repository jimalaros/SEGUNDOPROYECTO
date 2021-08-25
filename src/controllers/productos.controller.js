import Producto from '../models/productos.model';
import cliente from '../redis';

export const ProductosxDefecto = async (req, res) => {
    try {
        const contador = await Producto.estimatedDocumentCount();
        // Verificación de productos existentes
        if (contador > 0) return;
        // Productos por defecto
        const productos = await Promise.all([
            new Producto({ nombre: 'Hamburguesa', precio: 5000 }).save(),
            new Producto({ nombre: 'Hamburguesa doble', precio: 10500 }).save(),
            new Producto({ nombre: 'Perro', precio: 5500 }).save(),
            new Producto({ nombre: 'Perro especial', precio: 9000 }).save(),
            new Producto({ nombre: 'Coca cola', precio: 3000 }).save(),
            new Producto({ nombre: 'Sprite', precio: 2500 }).save(),
            new Producto({ nombre: 'Agua', precio: 5000 }).save(),
        ]);
        res.json(productos);
    } catch (error) { res.status(404).json(error); }
};

export const Productos = async (req,res) => {
    try {
        const productos = await Producto.find();
        cliente.setex('productos', 300, JSON.stringify(productos));
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
                cliente.EXPIRE(productos, 1);
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
            cliente.EXPIRE(productos, 1);
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
            cliente.EXPIRE(productos, 1);
            res.status(200).json({msg: 'El producto fue eliminado con exito' });
        } else { res.status(400).json({ msg: 'Faltan datos' }); }
    } catch (error) { res.status(404).json(error); }
};