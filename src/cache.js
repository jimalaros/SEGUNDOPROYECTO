import redis from 'redis';
import {promisify} from 'util';

const cliente = redis.createClient();

cliente.on('error', function(error) {
    console.error(error)
});

cliente.get = promisify(cliente.get);

export default cliente;