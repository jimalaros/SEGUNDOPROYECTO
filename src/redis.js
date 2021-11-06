import redis from 'redis';
import config from './config.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const PORT_REDIS = process.env.REDISPORT;
const cliente = redis.createClient(PORT_REDIS);

export default cliente;
