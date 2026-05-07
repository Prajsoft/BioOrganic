import { readFileSync } from 'node:fs'

const checks = []

function read(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
}

function check(name, condition) {
  checks.push({ name, ok: Boolean(condition) })
}

const envExample = read('.env.example')
check('Documents GA4 env var', envExample.includes('NEXT_PUBLIC_GA_MEASUREMENT_ID='))
check('Documents Meta Pixel env var', envExample.includes('NEXT_PUBLIC_META_PIXEL_ID='))
check('Documents private Web3Forms key', envExample.includes('WEB3FORMS_ACCESS_KEY='))
check('Documents WordPress API base', envExample.includes('WORDPRESS_API_BASE='))

const contactForm = read('components/ui/ContactForm.tsx')
check('Client form does not expose Web3Forms placeholder key', !contactForm.includes('REPLACE_WITH_WEB3FORMS_KEY'))
check('Client form posts to local API route', contactForm.includes("fetch('/api/contact'"))

const wordpress = read('lib/wordpress.ts')
check('WordPress fetches are guarded', wordpress.includes('try {') && wordpress.includes('catch'))

const locationsPage = read('app/locations/page.tsx')
const pestControlPage = read('app/pest-control/page.tsx')
check('Locations index page is indexable', !locationsPage.includes('index: false'))
check('Pest control library is indexable', !pestControlPage.includes('index: false'))

const failed = checks.filter((result) => !result.ok)

for (const result of checks) {
  console.log(`${result.ok ? 'PASS' : 'FAIL'} ${result.name}`)
}

if (failed.length > 0) {
  process.exitCode = 1
}
