type Props = { open: boolean; onClose: () => void; title?: string; desc?: string; img?: string; tech?: string[] }

export default function ProjectModal({ open, onClose, title, desc, img, tech }: Props) {
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="btn small outline" onClick={onClose} style={{position:'absolute', right:8, top:8}}>Close</button>
        {img && <img src={img} alt={title + ' preview'} style={{width:'100%', borderRadius:12, marginBottom:'.7rem'}} />}
        <h3 style={{marginTop:0}}>{title}</h3>
        <p>{desc?.replace(/<\/?strong>/g, '')}</p>
        {tech && tech.length > 0 && (
          <div style={{display:'flex', flexWrap:'wrap', gap:'.4rem', marginTop:'.5rem'}}>
            {tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
        )}
      </div>
      <style>{`
        .modal-overlay { position: fixed; inset: 0; background: #0009; display:grid; place-items:center; z-index: 50; }
        .modal { position: relative; width: min(680px, 92%); background: #181a22; border: 1px solid #232323; border-radius: 16px; padding: 1rem; box-shadow: 0 10px 40px #0006; }
      `}</style>
    </div>
  )
}


