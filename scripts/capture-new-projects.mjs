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
  { id: 'haotzma', url: 'https://haotzma-habib.com/he' },
  { id: 'mila', url: 'https://milafin.com/' },
  { id: 'ok-studio', url: 'https://ok-trainingcenter.com/' },
]

for (const target of targets) {
  const page = await context.newPage()
  try {
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 90000 })
    await page.waitForTimeout(2500)
    // Hide common cookie banners if present
    await page.evaluate(() => {
      const selectors = [
        '[id*="cookie"]',
        '[class*="cookie"]',
        '[aria-label*="cookie" i]',
        '#onetrust-banner-sdk',
      ]
      selectors.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el) => {
          ;(el).style.setProperty('display', 'none', 'important')
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
