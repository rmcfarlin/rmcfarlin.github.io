/* global React */
// Advisory website — approach steps + results panel (forest feature) + contact.
const { Card: RCard, Button: RButton, Input: RInput, BarChart: RBar, Badge: RBadge } = window.McFarlinCFODesignSystem_e3e0bb;

const STEPS = [
  { n: '01', t: '30-day diagnostic', d: 'A clear read on cash, margin, and reporting health — with the three things to fix first.' },
  { n: '02', t: 'Prioritized roadmap', d: 'A sequenced plan tied to runway and board milestones, owned with your team.' },
  { n: '03', t: 'Embedded execution', d: 'I operate alongside you — close, forecast, and capital work — then hand off cleanly.' },
];

function Approach() {
  return (
    <section id="approach" style={{ background: 'var(--paper)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '88px 32px' }}>
        <SectionHead eyebrow="Approach" title="A measured, three-phase engagement" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginTop: 40 }}>
          {STEPS.map((s) => (
            <div key={s.n} style={{ paddingTop: 22, borderTop: '2px solid var(--forest)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--brass-strong)', fontWeight: 600 }}>{s.n}</span>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 20, color: 'var(--ink)', margin: '10px 0 8px' }}>{s.t}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink-secondary)', margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section id="results" style={{ background: 'var(--forest)', color: 'var(--text-on-forest)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '88px 32px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <SectionHead eyebrow="Selected results" title="The numbers that mattered" light />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.65, color: 'rgba(244,241,234,0.78)', maxWidth: 460, margin: '20px 0 28px' }}>
            A representative Series-B SaaS engagement: rebuilt the operating model,
            extended runway, and closed the books in days, not weeks.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <RBadge tone="brass" variant="solid">Series B</RBadge>
            <RBadge tone="forest" variant="outline" style={{ color: 'rgba(244,241,234,0.85)', borderColor: 'rgba(244,241,234,0.4)' }}>14-month engagement</RBadge>
          </div>
        </div>
        <RCard tone="surface" pad="lg" elevation="md" style={{ color: 'var(--ink)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Net revenue by quarter</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--positive)' }}>▲ +69% FY</span>
          </div>
          <RBar height={150} showValues highlightLast format={(v) => '$' + v + 'M'} data={[
            { label: 'Q1', value: 3.2 }, { label: 'Q2', value: 3.9 },
            { label: 'Q3', value: 4.8 }, { label: 'Q4', value: 5.4 },
          ]} />
        </RCard>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '88px 32px', textAlign: 'center' }}>
        <SectionHead eyebrow="Get in touch" title="Let's look at your numbers together" />
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-secondary)', margin: '18px auto 32px', maxWidth: 520 }}>
          Tell me a little about your company and where you'd like a sharper view.
          I reply to every inquiry personally within two business days.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, textAlign: 'left', maxWidth: 560, margin: '0 auto' }}>
          <RInput label="Name" placeholder="Jane Founder" />
          <RInput label="Work email" type="email" placeholder="jane@company.com" />
          <div style={{ gridColumn: '1 / -1' }}>
            <RInput label="Annual revenue" prefix="$" numeric placeholder="0" />
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: 6 }}>
            <RButton block size="lg" iconRight={<i data-lucide="arrow-right"></i>}>Request a consultation</RButton>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Approach = Approach;
window.Results = Results;
window.Contact = Contact;
