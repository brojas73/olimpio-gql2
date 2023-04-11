import dotenv from 'dotenv'
import express from "express"
import cors from 'cors'
import session from 'express-session'
import RedisStore from 'connect-redis'
import { createClient } from 'redis'

import v1TareasExternasRouter from './v1/routes/tareasExternasRoutes.js'
import v1TareasExternasLogRouter from './v1/routes/tareasExternasLogRoutes.js'
import v1ServiciosDomicilioRouter from './v1/routes/serviciosDomicilioRoutes.js' 
import v1ServiciosDomicilioLogRouter from './v1/routes/serviciosDomicilioLogRoutes.js'
import v1CatalogosRouter from './v1/routes/catalogosRoutes.js'
import v1UsuariosRouter from './v1/routes/usuariosRoutes.js'

dotenv.config()
const PORT = process.env.PORT || 3040;
const origin = process.env.ORIGIN || 'http://localhost'

const main = () => {
  const redisClient = createClient()
  redisClient.connect().catch(console.error)
  
  const app = express();
  app.use(express.json())
  app.use(
      cors({
          origin: origin, 
          credentials: true
      })
  );
  app.use(
      session({
          name: 'qid',
          store: new RedisStore({
              client: redisClient,
              disableTouch: true,
          }),
          cookie: {
              maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
              httpOnly: true,
              sameSite: 'lax',                        // none
              secure: false,                          // true, coockie only works in https
          },
          secret: "E$t3D3b3$3rUnP@$$w0rdC0mpl1c@d0",
          resave: false,
          saveUninitialized: false
      })
  )

  app.use("/api/v1/tareas-externas", v1TareasExternasRouter);
  app.use("/api/v1/tareas-externas-log", v1TareasExternasLogRouter);
  app.use("/api/v1/servicios-domicilio", v1ServiciosDomicilioRouter);
  app.use("/api/v1/servicios-domicilio-log", v1ServiciosDomicilioLogRouter);
  app.use("/api/v1/catalogos", v1CatalogosRouter);
  app.use("/api/v1/usuarios", v1UsuariosRouter);
  
  app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
  });
}

main()
