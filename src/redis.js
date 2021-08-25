import redis from 'redis';
import config from '../config';

const REDIS_PORT = config.redisport || 6379;

const cliente = redis.createClient(REDIS_PORT);

cliente.on('error', function(error) {
    console.error(error)
});

export default cliente;