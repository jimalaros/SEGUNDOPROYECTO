import redis from 'redis';

const cliente = redis.createClient();

cliente.on('error', function(error) {
    console.error(error)
});

export default cliente;