import './Insights.css'
import { useMemo, useRef } from 'react'
import { useI18n } from '../i18n/I18nProvider'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import { Bar, Doughnut, Radar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
)

function useCssVars() {
  return useMemo(() => {
    const styles = getComputedStyle(document.documentElement)
    return {
      text: styles.getPropertyValue('--text-main')?.trim() || '#f5f5f5',
      accent: styles.getPropertyValue('--accent')?.trim() || '#facc15',
    }
  }, [document.documentElement.getAttribute('data-theme')])
}

function useDownload() {
  function downloadCanvas(dataUrl: string, filename: string) {
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
  return { downloadCanvas }
}

export default function Insights() {
  const { t } = useI18n()
  const vars = useCssVars()
  const { downloadCanvas } = useDownload()

  const barRef = useRef<ChartJS<'bar'> | null>(null)
  const doughnutRef = useRef<ChartJS<'doughnut'> | null>(null)

  const barData = useMemo(() => ({
    labels: ['React', 'Node.js', 'Python', 'Firebase', 'TypeScript'],
    datasets: [
      {
        label: 'Experience Level (1-5)',
        data: [5, 4, 3, 4, 4],
        backgroundColor: vars.accent,
        borderRadius: 8,
        hoverBackgroundColor: '#d4b014',
      },
    ],
  }), [vars.accent])

  const commonFont = {
    family: 'JetBrains Mono, Inter, system-ui, sans-serif',
    size: 12,
  }

  const barOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false, labels: { color: vars.text, font: commonFont } },
      title: { display: false },
      tooltip: {
        enabled: true,
        titleFont: commonFont,
        bodyFont: commonFont,
        callbacks: {
          label: (ctx: any) => `Experience Level: ${ctx.raw}/5`,
        },
      },
    },
    scales: {
      x: { ticks: { color: vars.text, font: commonFont }, grid: { color: '#2a2a2a' } },
      y: { ticks: { color: vars.text, stepSize: 1, font: commonFont }, grid: { color: '#2a2a2a' }, suggestedMin: 0, suggestedMax: 5 },
    },
  }), [vars.text])

  const doughnutData = useMemo(() => ({
    labels: ['UI/UX', 'Backend', 'Testing', 'Deployment', 'Docs'],
    datasets: [
      {
        data: [30, 25, 15, 20, 10],
        backgroundColor: ['#facc15', '#eab308', '#d97706', '#b45309', '#92400e'],
        borderColor: '#1a1a1a',
      },
    ],
  }), [])

  const doughnutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { color: vars.text, font: commonFont } },
      title: { display: false },
      tooltip: {
        enabled: true,
        titleFont: commonFont,
        bodyFont: commonFont,
        callbacks: {
          label: (ctx: any) => `${ctx.label}: ${ctx.raw}%`,
        },
      },
    },
  }), [vars.text])

  // Deployment Stats (monthly deploy counts)
  const deployData = useMemo(() => ({
    labels: ['W1', 'W2', 'W3', 'W4'],
    datasets: [{
      label: 'Deploys',
      data: [2, 3, 4, 3],
      backgroundColor: vars.accent,
      borderRadius: 8,
    }],
  }), [vars.accent])
  const deployOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: vars.text, font: commonFont }, grid: { color: '#2a2a2a' } },
      y: { ticks: { color: vars.text, font: commonFont, stepSize: 1 }, grid: { color: '#2a2a2a' }, suggestedMin: 0, suggestedMax: 5 },
    },
  }), [vars.text])

  // Client Feedback (satisfaction)
  const feedbackData = useMemo(() => ({
    labels: ['Satisfied', 'Neutral', 'Dissatisfied'],
    datasets: [{
      data: [82, 12, 6],
      backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
      borderColor: '#1a1a1a',
    }],
  }), [])
  const feedbackOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const, labels: { color: vars.text, font: commonFont } } },
  }), [vars.text])

  // Learning Tracker (tags list)
  const learningTags = ['Remix', 'Zod', 'Vitest', 'TanStack Query v5']

  // Performance Metrics KPIs
  const perfKpis = [
    { label: 'Avg Response', value: '180 ms' },
    { label: 'First Contentful Paint', value: '1.3 s' },
    { label: 'LCP', value: '2.1 s' },
    { label: 'CLS', value: '0.02' },
  ]

  

  const radarData = useMemo(() => ({
    labels: ['Frontend', 'Backend', 'Testing', 'A11y', 'DevOps', 'UX'],
    datasets: [{
      label: 'Skill Radar',
      data: [90, 80, 70, 85, 60, 75],
      backgroundColor: 'rgba(250, 204, 21, 0.2)',
      borderColor: vars.accent,
      pointBackgroundColor: vars.accent,
    }],
  }), [vars.accent])
  const radarOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: { r: { angleLines: { color: '#2a2a2a' }, grid: { color: '#2a2a2a' }, pointLabels: { color: vars.text }, ticks: { color: vars.text, display: false } } },
    plugins: { legend: { display: false } },
  }), [vars.text])

  function handleDownload(ref: React.RefObject<ChartJS | null>, name: string) {
    const chart = ref.current
    if (!chart) return
    const dataUrl = chart.toBase64Image('image/png', 1)
    downloadCanvas(dataUrl, `${name}.png`)
  }

  return (
    <section id="insights" className="insights-section">
      <h2>{t('insights.title')}</h2>
      <h4 className="insights-sub">{t('insights.subtitle')}</h4>

      <div className="insights-grid">
        <article className="insight-card fade-in-up">
          <div className="insight-head">
            <h3>{t('insights.deploymentStats')}</h3>
            <button className="btn small outline" onClick={() => handleDownload(barRef, 'deployment-stats')}>{t('insights.downloadPNG')}</button>
          </div>
          <div className="kpi-row">
            <div className="kpi"><span className="kpi-label">{t('insights.releases')}</span><span className="kpi-value">12</span></div>
            <div className="kpi"><span className="kpi-label">{t('insights.deployFrequency')}</span><span className="kpi-value">3/wk</span></div>
          </div>
          <div className="chart-wrap small">
            <Bar data={deployData} options={deployOptions} />
          </div>
        </article>

        <article className="insight-card fade-in-up">
          <div className="insight-head">
            <h3>{t('insights.clientFeedback')}</h3>
          </div>
          <div className="chart-wrap small">
            <Doughnut data={feedbackData} options={feedbackOptions} />
          </div>
        </article>

        <article className="insight-card fade-in-up">
          <div className="insight-head">
            <h3>{t('insights.learningTracker')}</h3>
          </div>
          <div className="tags">
            {learningTags.map(t => (<span key={t} className="tag">{t}</span>))}
          </div>
        </article>

        <article className="insight-card fade-in-up">
          <div className="insight-head">
            <h3>{t('insights.performanceMetrics')}</h3>
          </div>
          <div className="kpi-row">
            {perfKpis.map(k => (
              <div key={k.label} className="kpi"><span className="kpi-label">{k.label}</span><span className="kpi-value">{k.value}</span></div>
            ))}
          </div>
        </article>

        <article className="insight-card fade-in-up">
          <div className="insight-head">
            <h3>{t('insights.experienceByTech')}</h3>
            <button className="btn small outline" onClick={() => handleDownload(barRef, 'experience-by-tech')}>{t('insights.downloadPNG')}</button>
          </div>
          <div className="chart-wrap">
            <Bar ref={barRef} data={barData} options={barOptions} />
          </div>
        </article>

        <article className="insight-card fade-in-up delay-1">
          <div className="insight-head">
            <h3>{t('insights.timeSplit')}</h3>
            <button className="btn small outline" onClick={() => handleDownload(doughnutRef, 'time-split')}>{t('insights.downloadPNG')}</button>
          </div>
          <div className="chart-wrap">
            <Doughnut ref={doughnutRef} data={doughnutData} options={doughnutOptions} />
          </div>
        </article>

        

        <article className="insight-card fade-in-up">
          <div className="insight-head">
            <h3>{t('insights.skillsRadar')}</h3>
          </div>
          <div className="chart-wrap small">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </article>
      </div>

      
    </section>
  )
}


