import 'dotenv/config'      // Cargar variables de entorno
import Server from './models/server.js';



const servidor = new Server();

servidor.listen();