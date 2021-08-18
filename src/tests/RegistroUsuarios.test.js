import request from 'supertest';
import app from '../index';

/**
 * testing registro usuarios
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
    request(app)
      .post('/usuarios/nuevos')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .expect('"Usuario creado con exito"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("respond with 400 on bad request", (done) => {
    const data = {};
    request(app)
      .post('/usuarios/nuevos')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect('"Faltan datos"')
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});