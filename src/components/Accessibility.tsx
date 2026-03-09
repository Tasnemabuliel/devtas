import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nProvider'

type Props = {
  iconSrc?: string
}

type FontScale = 'normal' | 'large' | 'xlarge'
type LineSpacing = 'normal' | 'wide'

type A11yPrefs = {
  fontScale: FontScale
  highContrast: boolean
  underlineLinks: boolean
  highlightLinks: boolean
  reduceMotion: boolean
  lineSpacing: LineSpacing
  readableFont: boolean
  focusOutline: boolean
}

const STORAGE_KEY = 'a11yPrefs'

function applyPreferences(prefs: A11yPrefs) {
  const root = document.documentElement
  root.setAttribute('data-font-scale', prefs.fontScale)
  root.setAttribute('data-contrast', String(prefs.highContrast))
  root.setAttribute('data-underline', String(prefs.underlineLinks))
  root.setAttribute('data-highlight-links', String(prefs.highlightLinks))
  root.setAttribute('data-reduce-motion', String(prefs.reduceMotion))
  root.setAttribute('data-line-space', prefs.lineSpacing)
  root.setAttribute('data-readable-font', String(prefs.readableFont))
  root.setAttribute('data-focus-outline', String(prefs.focusOutline))
}

export default function Accessibility({ iconSrc }: Props) {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()
  const [prefs, setPrefs] = useState<A11yPrefs>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const p = JSON.parse(raw) as Partial<A11yPrefs>
        // Backward compatibility mapping
        const fontScale: FontScale = (p as any).fontLarge ? 'large' : 'normal'
        return {
          fontScale: (p.fontScale as FontScale) || fontScale,
          highContrast: !!p.highContrast,
          underlineLinks: !!p.underlineLinks,
          highlightLinks: !!p.highlightLinks,
          reduceMotion: !!p.reduceMotion,
          lineSpacing: (p.lineSpacing as LineSpacing) || 'normal',
          readableFont: !!p.readableFont,
          focusOutline: !!p.focusOutline,
        }
      }
    } catch {}
    return { fontScale: 'normal', highContrast: false, underlineLinks: false, highlightLinks: false, reduceMotion: false, lineSpacing: 'normal', readableFont: false, focusOutline: false }
  })

  useEffect(() => {
    applyPreferences(prefs)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)) } catch {}
  }, [prefs])

  useEffect(() => {
    const handlePageShow = () => {
      setOpen(false)
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setOpen(false)
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('pageshow', handlePageShow)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  function toggle(key: keyof A11yPrefs) {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function setFontScale(scale: FontScale) { setPrefs(p => ({ ...p, fontScale: scale })) }
  function setLineSpacing(space: LineSpacing) { setPrefs(p => ({ ...p, lineSpacing: space })) }
  function resetPrefs() {
    setPrefs({ fontScale: 'normal', highContrast: false, underlineLinks: false, highlightLinks: false, reduceMotion: false, lineSpacing: 'normal', readableFont: false, focusOutline: false })
  }

  return (
    <div>
      <button
        className="a11y-fab"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Accessibility"
        onClick={() => setOpen(o => !o)}
      >
        {iconSrc ? (
          <img 
            src={iconSrc} 
            alt="Accessibility" 
            style={{width:'100%', height:'100%', borderRadius:'50%'}}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextElement) nextElement.style.display = 'block';
            }}
          />
        ) : null}
        <span style={{display: iconSrc ? 'none' : 'block', fontSize: '24px'}}>♿</span>
      </button>
      {open && (
        <div className="a11y-panel" role="dialog" aria-label="Accessibility Options">
          <div className="a11y-head">
            <strong>{t('accessibility.title')}</strong>
            <button className="a11y-close" aria-label="Close panel" onClick={() => setOpen(false)}>×</button>
          </div>
          <div className="a11y-grid">
            <div className="a11y-group">
              <div className="a11y-group-title">{t('accessibility.textSize')}</div>
              <div className="a11y-btnrow">
                <button className={`a11y-btn ${prefs.fontScale==='normal' ? '' : 'outline'}`} aria-pressed={prefs.fontScale==='normal'} onClick={() => setFontScale('normal')}>{t('accessibility.normal')}</button>
                <button className={`a11y-btn ${prefs.fontScale==='large' ? '' : 'outline'}`} aria-pressed={prefs.fontScale==='large'} onClick={() => setFontScale('large')}>{t('accessibility.large')}</button>
                <button className={`a11y-btn ${prefs.fontScale==='xlarge' ? '' : 'outline'}`} aria-pressed={prefs.fontScale==='xlarge'} onClick={() => setFontScale('xlarge')}>{t('accessibility.extraLarge')}</button>
              </div>
            </div>
            <div className="a11y-group">
              <div className="a11y-group-title">{t('accessibility.contrast')}</div>
              <div className="a11y-btnrow">
                <button className={`a11y-btn ${prefs.highContrast ? 'outline' : ''}`} onClick={() => setPrefs(p => ({...p, highContrast: false}))}>{t('accessibility.normal')}</button>
                <button className={`a11y-btn ${prefs.highContrast ? '' : 'outline'}`} onClick={() => setPrefs(p => ({...p, highContrast: true}))}>{t('accessibility.high')}</button>
              </div>
            </div>
            <div className="a11y-group">
              <div className="a11y-group-title">{t('accessibility.links')}</div>
              <div className="a11y-btnrow">
                <button className={`a11y-btn ${prefs.underlineLinks ? '' : 'outline'}`} aria-pressed={prefs.underlineLinks} onClick={() => toggle('underlineLinks')}>{t('accessibility.underline')}</button>
                <button className={`a11y-btn ${prefs.highlightLinks ? '' : 'outline'}`} aria-pressed={prefs.highlightLinks} onClick={() => toggle('highlightLinks')}>{t('accessibility.highlight')}</button>
              </div>
            </div>
            <div className="a11y-group">
              <div className="a11y-group-title">{t('accessibility.motion')}</div>
              <div className="a11y-btnrow">
                <button className={`a11y-btn ${prefs.reduceMotion ? '' : 'outline'}`} aria-pressed={prefs.reduceMotion} onClick={() => toggle('reduceMotion')}>{t('accessibility.reduceAnimations')}</button>
              </div>
            </div>
            <div className="a11y-group">
              <div className="a11y-group-title">{t('accessibility.spacing')}</div>
              <div className="a11y-btnrow">
                <button className={`a11y-btn ${prefs.lineSpacing==='normal' ? '' : 'outline'}`} aria-pressed={prefs.lineSpacing==='normal'} onClick={() => setLineSpacing('normal')}>{t('accessibility.normal')}</button>
                <button className={`a11y-btn ${prefs.lineSpacing==='wide' ? '' : 'outline'}`} aria-pressed={prefs.lineSpacing==='wide'} onClick={() => setLineSpacing('wide')}>{t('accessibility.wide')}</button>
              </div>
            </div>
            <div className="a11y-group">
              <div className="a11y-group-title">{t('accessibility.fonts')}</div>
              <div className="a11y-btnrow">
                <button className={`a11y-btn ${prefs.readableFont ? '' : 'outline'}`} aria-pressed={prefs.readableFont} onClick={() => toggle('readableFont')}>{t('accessibility.moreReadable')}</button>
              </div>
            </div>
            <div className="a11y-group">
              <div className="a11y-group-title">{t('accessibility.focus')}</div>
              <div className="a11y-btnrow">
                <button className={`a11y-btn ${prefs.focusOutline ? '' : 'outline'}`} aria-pressed={prefs.focusOutline} onClick={() => toggle('focusOutline')}>{t('accessibility.focusOutline')}</button>
              </div>
            </div>
            <div className="a11y-group">
              <div className="a11y-btnrow" style={{justifyContent:'flex-end'}}>
                <button className="a11y-btn outline" onClick={resetPrefs} aria-label="Reset settings">{t('accessibility.reset')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


