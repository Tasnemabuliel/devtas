import { useState, type CSSProperties } from 'react'
import { useI18n } from '../../i18n/I18nProvider'
import styles from './FAQSection.module.css'

type FAQItem = {
  question: string
  answer: string
}

function QuestionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm.1 15.2a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zm1.9-7.4-.8.6c-.7.5-1.1 1.1-1.1 2v.3h-2v-.4c0-1.3.5-2.4 1.6-3.2l1-.7c.5-.4.8-.9.8-1.5 0-1.1-.9-1.8-2.2-1.8-1.1 0-2 .4-2.8 1.2L7.1 5c1.1-1.2 2.6-1.9 4.5-1.9 2.7 0 4.5 1.5 4.5 3.8 0 1.2-.5 2.2-1.7 3z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function FAQSection() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number>(0)
  const faqIndexes = [0, 1, 2, 3, 4, 5, 6, 7]

  const items: FAQItem[] = faqIndexes.map((index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))

  return (
    <section id="faq" className={styles.section} data-reveal="up">
      <header className="section-header" data-reveal="up" style={{ '--reveal-delay': '80ms' } as CSSProperties}>
        <div className={styles.headingRow}>
          <span className={styles.iconWrap}>
            <QuestionIcon />
          </span>
          <div>
            <h2 className="section-title">{t('faq.title')}</h2>
            <p className="section-subtitle">{t('faq.subtitle')}</p>
          </div>
        </div>
      </header>

      <div className={styles.list}>
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const panelId = `faq-panel-${index}`
          const buttonId = `faq-button-${index}`

          return (
            <article
              key={item.question}
              className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
            >
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span className={styles.question}>{item.question}</span>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`} aria-hidden="true">
                  +
                </span>
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`${styles.panel} ${styles.panelOpen}`}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.answer}</p>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <div className={styles.ctaRow} data-reveal="up" style={{ '--reveal-delay': '200ms' } as CSSProperties}>
        <a href="#contact" className="btn small">
          {t('faq.cta')}
        </a>
      </div>
    </section>
  )
}

