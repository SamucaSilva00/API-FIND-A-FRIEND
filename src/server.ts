import { app } from './app'
import { env } from '@/env/index.js'

app
  .listen({
    host: '0.0.0.0', //deixa ficar acessível para outras máquinas na rede (frontend, mobile, etc)
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP server running!')
  })
