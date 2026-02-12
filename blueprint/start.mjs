import { spawn } from 'node:child_process'

const wp = spawn('npx', [
  '@wp-playground/cli@3.0.46', 'server',
  '--blueprint=./blueprint.json',
  '--mount=./blueprint/images:/wordpress/wp-content/uploads/blueprint'
], { stdio: 'inherit', shell: true })

wp.on('error', (err) => {
  console.error(`Failed to start WordPress Playground:`, err.message)
  process.exit(1)
})

process.on('SIGINT', () => {
  wp.kill()
  process.exit()
})

process.on('SIGTERM', () => {
  wp.kill()
  process.exit()
})
