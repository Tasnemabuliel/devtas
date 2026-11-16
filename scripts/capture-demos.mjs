import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const outDir = path.resolve('public/projects')
await mkdir(outDir, { recursive: true })

const notes = {}

async function capture(page, id, label) {
  const file = path.join(outDir, `${id}.png`)
  await page.screenshot({ path: file, fullPage: false })
  const title = await page.title()
  const text = await page.locator('body').innerText().catch(() => '')
  notes[id] = { label, title, url: page.url(), text: text.slice(0, 4000) }
  console.log(`OK ${id} → ${title}`)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: 'he-IL',
})

// SUKRIA dashboard
{
  const page = await context.newPage()
  await page.goto('https://sweetapp-demo.vercel.app/login?next=%2F', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.getByRole('button', { name: /DEMO ADMIN/i }).click()
  await page.getByRole('button', { name: /כניסה|DEMO/i }).first().click()
  await page.waitForURL(/sweetapp-demo/, { timeout: 30000 }).catch(() => {})
  await page.waitForTimeout(2800)
  await capture(page, 'sukria', 'SUKRIA dashboard')
  await page.close()
}

// VOLTARA office login + try enter
{
  const page = await context.newPage()
  await page.goto('https://formerapp.vercel.app/login', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(1000)
  await capture(page, 'voltara', 'VOLTARA login')
  try {
    await page.getByText('admin', { exact: true }).first().click()
    await page.waitForTimeout(400)
    await page.getByText('VoltaraDemo123!', { exact: true }).first().click()
    await page.waitForTimeout(2500)
    await capture(page, 'voltara-app', 'VOLTARA after login')
  } catch (e) {
    console.log('VOLTARA login click failed', e.message)
  }
  await page.close()
}

// Orchard
{
  const page = await context.newPage()
  await page.goto('https://crispy-demo.vercel.app/', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(2500)
  await capture(page, 'orchard', 'Orchard Crisp')
  await page.close()
}

// WEGO
{
  const page = await context.newPage()
  await page.goto('https://mangebuss.vercel.app/login?next=%2F', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(1500)
  await capture(page, 'wego', 'WEGO login')
  // Look for demo credentials on page
  const body = await page.locator('body').innerText()
  console.log('WEGO body snippet:', body.slice(0, 2000))
  await page.close()
}

// DENOVA
{
  const page = await context.newPage()
  await page.goto('https://opal-demo-mu.vercel.app/', { waitUntil: 'domcontentloaded', timeout: 60000 })
  await page.waitForTimeout(1200)
  await capture(page, 'denova', 'DENOVA login')
  try {
    await page.getByRole('button', { name: /כניסה/i }).first().click()
    await page.waitForTimeout(2800)
    await capture(page, 'denova-app', 'DENOVA dashboard')
  } catch (e) {
    console.log('DENOVA login failed', e.message)
  }
  await page.close()
}

await writeFile(path.join(outDir, '_notes.json'), JSON.stringify(notes, null, 2), 'utf8')
await browser.close()
console.log('Done')
