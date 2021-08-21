import app from '../index';
import chai from 'chai';
import chaiHttp from 'chai-http';
import Usuario from '../models/usuarios.model';

chai.should();
chai.use(chaiHttp);

describe('Registro de usuarios', () => {
  /**
  * Test para el endpoint de Registrar Usuarios
  */
  describe("POST /usuarios/nuevos", () => {  
    it("respond with 201 created", (done) => {
      const data = {
        nombre: "Jaao",
        apellido: "A",
        correo: "jaaao@gmail.com",
        telefono: 311111,
        direccion: "Hospital",
        contraseña: "111111"
      };
      chai.request(app)
        .post('/usuarios/nuevos')
        .send(data)
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });

    after (async () => {
      await Usuario.deleteOne({ correo: 'jaaao@gmail.com'});
    });
  });

  describe("POST /usuarios/nuevos", () => {  
    it("respond with 400 on bad request", (done) => {
      const dataempty = {};
      chai.request(app)
        .post('/usuarios/nuevos')
        .send(dataempty)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
  });
});

