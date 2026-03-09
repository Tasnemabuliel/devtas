import './Testimonials.css'
import logoNew from '../assets/logonew.png'

const testimonials = [
  { name: 'S. Cohen', role: 'Product Manager', quote: 'Tasnem delivered fast, clean, and accessible UI. Pleasure to work with!', avatar: logoNew },
  { name: 'A. Levi', role: 'Team Lead', quote: 'Strong ownership and attention to detail. Projects shipped on time.', avatar: logoNew },
  { name: 'M. Haddad', role: 'CTO', quote: 'Clear communication and UX mindset that moves the needle.', avatar: logoNew },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <h2>Testimonials</h2>
      <div className="testimonials-grid carousel" data-auto>
        {testimonials.map(t => (
          <figure className="testimonial" key={t.name}>
            <div style={{display:'flex', alignItems:'center', gap:'.6rem'}}>
              {t.avatar && <img src={t.avatar} alt={t.name + ' avatar'} style={{width:36, height:36, borderRadius:'50%'}} />}
              <figcaption>— {t.name}, {t.role}</figcaption>
            </div>
            <blockquote style={{marginTop:'.4rem'}}>“{t.quote}”</blockquote>
          </figure>
        ))}
      </div>
      <style>{`
        .carousel { overflow: hidden; }
        .carousel .testimonial { animation: slide 18s linear infinite; }
        @keyframes slide {
          0% { transform: translateX(0); }
          45% { transform: translateX(-105%); }
          50% { transform: translateX(-105%); }
          95% { transform: translateX(0); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) { .carousel .testimonial { animation: none; } }
      `}</style>
    </section>
  )
}


