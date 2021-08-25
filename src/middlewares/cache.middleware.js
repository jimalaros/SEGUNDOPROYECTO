import cliente from '../redis';

export const cache = (req, res, next) => {
    cliente.get('productos', (error, data) => {
        if (error) throw error;
        if (data) res.json(JSON.parse(data));
        else next();
    });
}