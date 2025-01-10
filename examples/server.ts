import { createServer } from 'vite'

async function startServer() {
  const server = await createServer({
    configFile: './vite.config.ts',
    root: './examples',
    server: {
      port: 3001
    }
  })
  
  await server.listen()
  console.log('Server running at http://localhost:3001')
}

startServer()