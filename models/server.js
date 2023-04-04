import express from 'express';
import cors from 'cors';
import { conectionDB } from '../db/configDB.js';
import authRoute from '../routes/authRoute.js';
import eventsRoute from '../routes/eventsRoute.js';




class Server {
        constructor() {
            this.app = express();
            this.port = process.env.PORT || 3000;


            this.paths = {
                authPath: '/api/auth',          // Creamos una ruta para el login ( autehtication )
                eventsPath: '/api/events'       // Creamos una ruta para los eventos
            }

            //Coneccion a la base de datos
            this.conectarDB();

            // Middlewares
            this.middlewares();
    
            // Rutas de mi app
            this.routes();
        };






        async conectarDB() {
            await conectionDB();
        };




        middlewares() {

            // Cors
            this.app.use( cors() ); // use: para usar un middleware

            // Lectura y parseo del body
            this.app.use( express.json() );
            //this.app.use( express.urlencoded({ extended: true }));

            // Directorio carpeta publica
            this.app.use(express.static('public'));   // use: para usar un middleware
        };



        // Rutas de mi app
        routes() {
            this.app.use( this.paths.authPath, authRoute );
            this.app.use( this.paths.eventsPath, eventsRoute );
        };


        listen() {
            this.app.listen( this.port, () => {
                console.log('Servidor corriendo en puerto', this.port);
            });
        };
};


export default Server;