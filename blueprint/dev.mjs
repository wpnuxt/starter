import { spawn } from 'node:child_process'

const GRAPHQL_URL = 'http://127.0.0.1:9400/graphql'
const POLL_INTERVAL = 2000

function startProcess(command, args) {
  const proc = spawn(command, args, { stdio: 'inherit', shell: true })
  proc.on('error', (err) => {
    console.error(`Failed to start ${command}:`, err.message)
    process.exit(1)
  })
  return proc
}

async function waitForGraphQL() {
  console.log('Waiting for WordPress GraphQL...')
  while (true) {
    try {
      const res = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ __typename }' }),
        redirect: 'manual'
      })
      if (res.ok) {
        const json = await res.json()
        if (json.data?.__typename) {
          console.log('WordPress ready!')
          return
        }
      }
    } catch { /* expected while waiting for server */ }
    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL))
  }
}

const wp = startProcess('npx', [
  '@wp-playground/cli@3.0.46', 'server',
  '--blueprint=./blueprint.json',
  '--mount=./blueprint/images:/wordpress/wp-content/uploads/blueprint'
])

process.on('SIGINT', () => {
  wp.kill()
  process.exit()
})

process.on('SIGTERM', () => {
  wp.kill()
  process.exit()
})

await waitForGraphQL()

process.env.WPNUXT_WORDPRESS_URL = 'http://127.0.0.1:9400'

const nuxt = startProcess('npx', ['nuxt', 'dev'])

nuxt.on('close', (code) => {
  wp.kill()
  process.exit(code)
})

wp.on('close', (code) => {
  if (code) {
    nuxt.kill()
    process.exit(code)
  }
})
