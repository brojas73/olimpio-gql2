import dotenv from 'dotenv'
import express from "express"
import cors from 'cors'
import session from 'express-session'
import RedisStore from 'connect-redis'
import { createClient } from 'redis'

import { COOKIE_NAME } from './constants.js'

import v1TareasExternasRouter from './v1/routes/tareasExternasRoutes.js'
import v1TareasExternasLogRouter from './v1/routes/tareasExternasLogRoutes.js'
import v1ServiciosDomicilioRouter from './v1/routes/serviciosDomicilioRoutes.js' 
import v1ServiciosDomicilioLogRouter from './v1/routes/serviciosDomicilioLogRoutes.js'
import v1CatalogosRouter from './v1/routes/catalogosRoutes.js'
import v1UsuariosRouter from './v1/routes/usuariosRoutes.js'

dotenv.config()

// const origin = process.env.ORIGIN || 'http://5.183.8.10'
const port = process.env.PORT || 3040;
const origin = process.env.ORIGIN || 'http://5.183.8.10:8080'
const api_route = process.env.API_ROUTE || 'api-v1'

const main = () => {
  const redisClient = createClient()
  redisClient.connect().catch(console.error)
  
  const app = express()
  app.use(express.json())
  app.use(
      cors({
          origin: origin, 
          credentials: true
      })
  );
  app.use(
      session({
          name: COOKIE_NAME,
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

  app.use(`/${api_route}/tareas-externas`, v1TareasExternasRouter);
  app.use(`/${api_route}/tareas-externas-log`, v1TareasExternasLogRouter);
  app.use(`/${api_route}/servicios-domicilio`, v1ServiciosDomicilioRouter);
  app.use(`/${api_route}/servicios-domicilio-log`, v1ServiciosDomicilioLogRouter);
  app.use(`/${api_route}/catalogos`, v1CatalogosRouter);
  app.use(`/${api_route}/usuarios`, v1UsuariosRouter);
  
  app.listen(port, () => {
    console.log(`API is listening on port ${port}`);
  });
}

main()
