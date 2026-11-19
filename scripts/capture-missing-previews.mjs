import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const outDir = path.resolve('public/projects')
await mkdir(outDir, { recursive: true })

async function capture(page, id) {
  const file = path.join(outDir, `${id}.png`)
  await page.screenshot({ path: file, fullPage: false })
  console.log(`OK ${id} → ${page.url()} (${await page.title()})`)
}

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: 'he-IL',
})

const targets = [
  { id: 'smart-links', url: 'https://orelkoriatcoach.vercel.app/links' },
  { id: 'fitness-coach', url: 'https://www.orelkorait.com' },
  { id: 'academy', url: 'https://devtasweb.vercel.app' },
  { id: 'devtas-site', url: 'https://www.devtasweb.com' },
  // Prefer dashboard/app views where available
  { id: 'voltara', url: 'https://formerapp.vercel.app/login' },
  { id: 'denova', url: 'https://opal-demo-mu.vercel.app/' },
  { id: 'sukria', url: 'https://sweetapp-demo.vercel.app/login?next=%2F' },
  { id: 'wego', url: 'https://mangebuss.vercel.app/login?next=%2F' },
  { id: 'orchard', url: 'https://crispy-demo.vercel.app/' },
  { id: 'haotzma', url: 'https://haotzma-habib.com/he' },
  { id: 'mila', url: 'https://milafin.com/' },
  { id: 'ok-studio', url: 'https://ok-trainingcenter.com/' },
]

for (const target of targets) {
  const page = await context.newPage()
  try {
    await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await page.waitForTimeout(2200)

    if (target.id === 'sukria') {
      try {
        await page.getByRole('button', { name: /DEMO ADMIN/i }).click({ timeout: 4000 })
        await page.getByRole('button', { name: /כניסה|DEMO|Login/i }).first().click({ timeout: 4000 })
        await page.waitForTimeout(2800)
      } catch {}
    }

    if (target.id === 'voltara') {
      try {
        await page.getByText('admin', { exact: true }).first().click({ timeout: 3000 })
        await page.waitForTimeout(300)
        await page.getByText('VoltaraDemo123!', { exact: true }).first().click({ timeout: 3000 })
        await page.waitForTimeout(2500)
      } catch {}
    }

    if (target.id === 'denova') {
      try {
        const admin = page.getByText('admin', { exact: false }).first()
        if (await admin.count()) {
          await page.fill('input[type="password"], input[name="password"]', '1234').catch(() => {})
        }
        await page.waitForTimeout(1200)
      } catch {}
    }

    await page.evaluate(() => {
      ;['[id*="cookie"]', '[class*="cookie"]', '#onetrust-banner-sdk'].forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          el.style.setProperty('display', 'none', 'important')
        })
      })
    }).catch(() => {})

    await capture(page, target.id)
  } catch (error) {
    console.error(`FAIL ${target.id}`, error.message)
  } finally {
    await page.close()
  }
}

await browser.close()
