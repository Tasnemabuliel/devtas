import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const outDir = path.resolve('public/projects')
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({ headless: true })

{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('https://crispy-demo.vercel.app/', { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(4500)
  // Hide simulated banner if it covers content oddly
  await page.evaluate(() => {
    document.querySelectorAll('body > *').forEach((el) => {
      const style = getComputedStyle(el)
      if (style.position === 'fixed' && el.getBoundingClientRect().height < 48) {
        el.style.opacity = '0.35'
      }
    })
  }).catch(() => {})
  await page.screenshot({ path: path.join(outDir, 'orchard.png') })
  console.log('OK orchard', await page.title())
  await page.close()
}

{
  const htmlPath = path.join(outDir, '_academy-preview.html')
  const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Heebo, Arial, sans-serif;
      background: linear-gradient(145deg, #10233d, #1d4a73);
      color: #fff;
      min-height: 100vh;
    }
    .wrap { padding: 64px 72px; max-width: 1200px; }
    .eyebrow {
      display: inline-block;
      padding: 8px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,.12);
      font-size: 14px;
      margin-bottom: 18px;
    }
    h1 { margin: 0 0 14px; font-size: 54px; letter-spacing: -.03em; }
    p { margin: 0; max-width: 640px; line-height: 1.7; font-size: 20px; color: rgba(255,255,255,.82); }
    .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 42px; }
    .card {
      background: rgba(255,255,255,.1);
      border: 1px solid rgba(255,255,255,.16);
      border-radius: 18px;
      padding: 22px;
      min-height: 140px;
    }
    .card strong { display: block; font-size: 18px; margin-bottom: 8px; }
    .card span { color: rgba(255,255,255,.75); font-size: 14px; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="eyebrow">DEVTAS · Academy Preview</div>
    <h1>האקדמיה של אבא</h1>
    <p>מערכת קורסים דיגיטלית עם אזור תלמידים, ניהול תוכן ומעקב התקדמות. תצוגת Preview מקומית — האתר החי אינו זמין כרגע.</p>
    <div class="cards">
      <div class="card"><strong>אזור תלמידים</strong><span>גישה לקורסים ומעקב התקדמות אישי</span></div>
      <div class="card"><strong>ניהול</strong><span>ניהול תוכן, משתמשים ותשלומים</span></div>
      <div class="card"><strong>אוטומציות</strong><span>התראות, מעקב וזרימות עבודה</span></div>
    </div>
  </div>
</body>
</html>`
  await writeFile(htmlPath, html, 'utf8')
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(300)
  await page.screenshot({ path: path.join(outDir, 'academy.png') })
  console.log('OK academy local preview')
  await page.close()
}

// Prefer richer voltara office screenshot if available from former page
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('https://formerapp.vercel.app/login', { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: path.join(outDir, 'voltara.png') })
  await page.screenshot({ path: path.join(outDir, 'voltara-app.png') })
  console.log('OK voltara')
  await page.close()
}

await browser.close()
