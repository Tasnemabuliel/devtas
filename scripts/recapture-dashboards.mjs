import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

await page.goto('https://sweetapp-demo.vercel.app/login?next=%2F', {
  waitUntil: 'networkidle',
  timeout: 60000,
})
await page.getByRole('button', { name: /DEMO ADMIN/i }).click()
await page.waitForTimeout(400)
await page.getByRole('button', { name: /כניסה למערכת DEMO/i }).click()
await page.waitForTimeout(4500)
console.log('SUKRIA URL', page.url())
console.log((await page.locator('body').innerText()).slice(0, 600))
await page.screenshot({ path: 'public/projects/sukria.png' })

await page.goto('https://opal-demo-mu.vercel.app/', {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
})
await page.waitForTimeout(800)
const inputs = page.locator('input')
const count = await inputs.count()
console.log('denova inputs', count)
if (count >= 1) await inputs.nth(0).fill('admin')
if (count >= 2) await inputs.nth(1).fill('1234')
await page.getByRole('button', { name: /כניסה/i }).first().click()
await page.waitForTimeout(4000)
console.log('DENOVA URL', page.url())
console.log((await page.locator('body').innerText()).slice(0, 900))
await page.screenshot({ path: 'public/projects/denova.png' })

await browser.close()
