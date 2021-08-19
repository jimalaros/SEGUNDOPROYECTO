import Pedido from '../models/pedidos.model';
import { Precio } from '../controllers/precio.controller';
import Usuario from '../models/usuarios.model';

import jwt from "jsonwebtoken";
import config from "../config"; 

export const Pedidos = async (req,res) => {
    try {
        const pedidos = await Pedido.find();
        if(pedidos) { res.json(pedidos) }
        else {res.status(400).json({msg: 'Faltan Datos'})}
    } catch (error) { res.status(500).json(error); } 
};

export const CrearOrden = async (req,res) =>
{
    try {
        const bearerHeader = req.headers['authorization'];
        if(bearerHeader)
        {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
    
            //Decodificar el token
            const decoded = await jwt.verify(token, config.secret);
            const id = decoded.id;
            const user = await Usuario.findById(id);

            const usuario = user.nombre;
            const direccion = user.direccion;

            const InicioOrden = new Pedido({ usuario, direccion });
            await InicioOrden.save();
            res.status(201).json({msg: 'Datos de la orden creados con exito'});
        }
        else { res.status(401).send({ auth: false, msg: "Ha olvidado el token" }); }
    } catch (error) { res.status(500).json(error); }
};

export const Ordenar = async (req,res) =>
{
    try {
        const {nombres, cantidades, mediodepago, estado} = req.body;

        if(nombres && cantidades && mediodepago && estado)
        {
            const n = cantidades.length;
            const precio = await Precio(n, nombres, cantidades);
            const Agregar = await Pedido.findById(req.params.id);
            Agregar.pedidos.push({...req.body, precio});
            await Agregar.save();
            res.status(201).json({msg: 'Pedido creado con exito'});     
        } else {res.status(400).json({msg: 'Faltan Datos'}); }
    } catch (error) { res.status(500).json(error); }
};

export const ActualizarPedidos = async (req, res) => {
    try {
        const {nombres, cantidades, mediodepago, estado} = req.body;

        if(nombres && cantidades && mediodepago && estado) {
            const n = cantidades.length;
            const precio = await Precio(n, nombres, cantidades);
            const { id } = req.params;
            const Actualizar = await Pedido.findById(id);
            const state = Actualizar.pedidos[0].estado;
            if (state === 'Abierto') {
                Actualizar.pedidos.splice(0,2);
                Actualizar.pedidos.push({...req.body, precio});
                await Actualizar.save();
                res.status(200).json({msg: 'Pedido actualizado con exito'}); 
            } else {res.status(400).json({msg: 'Faltan Datos'}); }
        } else {res.status(400).json({msg: 'Faltan Datos'}); }    
    } catch (error) { res.status(500).json(error); }
};
  
export const EliminarPedidos = async (req, res) => {
    try {
        const { id } = req.params;
        await Pedido.findByIdAndDelete(id);
        res.status(200).json({msg: "Pedido eliminado con exito"});    
    } catch (error) { res.status(500).json(error); }
};