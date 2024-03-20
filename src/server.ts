import { app } from './app'

app.get('/test', (request, reply) => {
  reply.send('Ola')
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('server is running 🔥')
  })
