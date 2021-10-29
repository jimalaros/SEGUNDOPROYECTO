import mongoose from 'mongoose';
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const stringConexion = process.env.DATABASE_URL;

const client = await mongoose.connect(stringConexion, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let baseDeDatos;

const conectarBD = (callback) => {
  client.connect((err, db) => {
    if (err) {
      console.error('Error conectando a la base de datos');
      return 'error';
    }
    baseDeDatos = db.db('SPRINT3');
    console.log('Conectado con exito a la base de datos');
    return callback();
  });
};

const getDB = () => {
  return baseDeDatos;
};

const cliente = redis.createClient({
  url: 'sprint3.drbuas.0001.use1.cache.amazonaws.com:6379';
});

(async () => {
  await cliente.connect();
})();

export { conectarBD, getDB, cliente };
