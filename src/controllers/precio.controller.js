import Producto from '../models/productos.model';

export async function Precio(n, nombres, cantidades) {
    const vector = await Producto.find({nombre: {$in: nombres}});
    const prices = vector.map(price => price.precio);

    let precios=[];
    for (let index = 0; index < n; index++) {
        let p = prices[index];
        precios.push(p);
    }

    let precio=0;
    for (let d = 0; d < n; d++) 
    {
        let Q = cantidades[d]*precios[d];
        precio=precio+Q;   
    }

    return precio;
}