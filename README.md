# Node Scaffolding
Express & Mongo DB & Redis-Cache REST API in ES6
 
## Requisitos
Para correr el proyecto es necesario tener instalado:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [RedisDB](http://redis.io/)
- [pm2](http://pm2.keymetrics.io/)

## Instalación

1- Clonar el repo de ca, en el directorio: /etc/api-gateway/ca

url: https://git.argentina.gob.ar/argentina/api-gateway-ca-externos


2- Clonar el repo de ApiGateway:

Instalar Dependencias:

    $ npm install


## Deployment

```sh
# Make Pull 
$ git pull origin master

# Install Dependencies
$ npm install

# compile to ES5
$ npm run build 
or: 
$ gulp

# Use pm2 to start your services
$ NODE_ENV=production pm2 start dist/index.js --name ApiGateway
```


## Miscelaneas

**Nomencaltura Estandar para commits:**

Formato: \<tipo\>: mensaje
Ejemplo: $ git commit -m "feat: CRUD Usuarios"


Tipos: 

    feat: A new feature
    fix: A bug fix
    docs: Documentation only changes
    style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    refactor: A code change that neither fixes a bug nor adds a feature
    perf: A code change that improves performance
    test: Adding missing tests
    chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

