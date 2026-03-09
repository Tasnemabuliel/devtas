export default function HowIWork() {
  const items = [
    { title: 'Clarity First', desc: 'Define goals and constraints before code.' },
    { title: 'Accessibility', desc: 'Design for everyone from day one.' },
    { title: 'Performance', desc: 'Measure, optimize, and ship fast UIs.' },
    { title: 'Collaboration', desc: 'Communicate early, iterate often.' },
  ]
  return (
    <section>
      <h2>How I Work</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'1rem'}}>
        {items.map(i => (
          <div key={i.title} style={{background:'#181a22cc', border:'1px solid #232323', borderRadius:16, padding:'1rem', boxShadow:'0 4px 24px #0003'}}>
            <h3 style={{margin:0}}>{i.title}</h3>
            <p style={{margin:'.4rem 0 0 0', color:'#cfcfcf'}}>{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


