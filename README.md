# PROYECTO2

API REST en la cuál encontrarás funciones como:

* Observar todos los usuarios registrados.
* Crear un nuevo usuario.
* Iniciar sesión con los usuarios nuevos.
* Ver todos los productos disponibles y sus precios.
* Crear, editar y eliminar productos si el rol del usuario es Administrador.
* Crear pedidos y editarlos si el estado lo permite.

# Comienzo 🚀

## Instalación 🔧

_Estas instrucciones te permitirán correr el proyecto y realizar las pruebas correspondientes._

1. Descarga el repositorio en este [link](https://github.com/jimalaros/SEGUNDOPROYECTO) e instala los packages como se muestra a continuación.

2. Al abrir este proyecto, ejecuta en consola el siguiente comando:

```
cd SEGUNDOPROYECTO-master
```

* Luego instala los siguientes paquetes para que la API funcione correctamente

```
npm init --y
```

```
npm i express dotenv bcryptjs jest supertest helmet jsonwebtoken mongoose swagger-jsdoc swagger-ui-express chai chai-http regenerator-runtime
```

```
npm i @babel/core @babel/cli @babel/node @babel/preset-env @babel/polyfill
```

3. Editar el objeto "scripts" que viene por defecto en el packagejson por el siguiente:

```
"scripts": {
    "dev": "nodemon src/index.js --exec babel-node",
    "build": "babel src --out-dir dist",
    "start": "node dist/index.js",
    "test": "mocha dist/tests/RegistroUsuarios.test.js --exit"
  },
```

4. Antes de ejecutar la API o los test, tendrás que generar la carpeta dist, ejecutando el siguiente comando en consola:

```
npx babel src --out-dir dist
```

5. Antes de ejecutar la API y el test, tendrás que ejecutar el siguiente comando en otra consola:

```
mongod
```

_Lo anterior es para que la base de datos se ejecute corectamente_

6.  Después de generar la carpeta "dist" y tener la base de datos corriendo, podrás ejecutar el test del endpoint "Registro de usuarios", usando el siguiente comando:

```
npm test
```

7. Después de generar la carpeta "dist" y tener la base de datos corriendo, podrás ejecutar la API, usando el siguiente comando:

```
npm start
```

8. Dirigirse a la documentación de Swagger en el siguiente [link](http://localhost:5000/api-docs/)

Importante: Para que la página de swagger cargue correctamente, tendrás que ejecutar el comando "npm start"

9. El único usuario administrador es jimalaros25@gmail.com y su clave es 12345, al insertar estos datos en la ruta Login obtendrás el token que te dará acceso a las demás rutas de la API, de la siguiente forma:

```
{
    "correo":"jimalaros25@gmail.com",
    "contraseña":"12345"
}
```

### Ruta de USUARIOS

_Para crear un usuario tendrás que llenar todos los datos de este esquema en el body correspondiente, acá un pequeño ejemplo:_

```
{
    "nombre": "Jaao",
    "apellido": "A",
    "correo": "j@gmail.com",
    "telefono": 321850,
    "direccion": "Calle 15 # 22-02",
    "contraseña": "2222"
    "administrador": false
}
```
Importante: El rol de los usuarios nuevos siempre va a ser Usuario y no Administrador (el administrador por defecto es "False"), puedes omitir el "administrador" y enviar el body con los otros 6 datos, pero si necesitas crear otro administrador, solo colocas "administrador": true.

### Ruta PEDIDOS

_Para crear los pedidos, se trabajo con un concepto denominado nested documents, por lo cuál tendrás que loggearte (Ruta login) y en la ruta Crear (Pedidos) darle ejecutar, no tienes que enviar un body, haciendo esto obtendrás algo como lo siguiente:_

```
{
    "_id":600b365c79bdd616403fc73b,
    "nombre":"Jimmy",
    "direccion":"Carrera 14 #30-59",
    "pedidos": []
}
```

_Para llenar el array vacío de productos, tendrás que pasarle el id generado anteriormente y llenar el siguiente esquema en el body de la ruta Ordenar:_
```
{
    "nombres":["Hamburguesa doble", "Coca-cola"],
    "cantidades":[2,2],
    "mediodepago": "PSE",
    "estado":"Cerrado"
}
```

De la siguiente manera: 

* Para el body, el vector "nombres" se puede llenar con tantos nombres de productos como se desee, siempre y cuando estos existan dentro de la lista de productos, también es importante recalcar que se debe respetar la escritura, cualquier producto escrito de mala manera, hará que el programa presente un error del tipo: _cannot calculated price of undefined_.

_Para encontrar los productos que están almacenados, debes dirigirte al "get" que encontrarás en productos_.

* El vector "nombres" tiene que tener la misma longitud del vector "cantidades", es decir, cada producto escrito en el vector "nombres" debe tener su cantidad correspondiente.

* IMPORTANTE: Si el estado del pedido se envía como "cerrado", en la ruta de edición, no se podrá hacer nada, para editar el pedido el estado tiene que decir "Abierto".
* IMPROTANTE: Si se envia un medio de pago que no existe, la API no creará el pedido, generará un error.

_Para encontrar los medios de pago que están almacenados, debes dirigirte al "get" que encontrarás en medios de pago_.

_Recordatorio_

El único usuario administrador es jimalaros25@gmail.com y su clave es 12345.

## Construido con 🛠️

* NodeJS
* Express
* Swagger
* Mocha
* JWT

## Autores ✒️

* **Jimmy Alexander Arango Ossa** - *Link* - [jimalaros](https://github.com/jimalaros/SEGUNDOPROYECTO)
