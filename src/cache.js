import redis from 'redis';
import {promisify} from 'util';

const cliente = redis.createClient(6379);

cliente.on('error', function(error) {
    console.error(error)
});

cliente.get = promisify(cliente.get);

export default cliente;