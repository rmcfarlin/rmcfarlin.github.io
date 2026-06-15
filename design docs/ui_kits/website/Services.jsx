/* global React */
// Advisory website — services grid + approach steps.
const { Card: SCard, Tag: STag } = window.McFarlinCFODesignSystem_e3e0bb;

const SERVICES = [
  { icon: 'wallet', title: 'Cash & liquidity', body: 'Rolling 13-week cash forecasting, working-capital discipline, and covenant headroom you can see weeks ahead.' },
  { icon: 'line-chart', title: 'FP&A and forecasting', body: 'Driver-based models that tie strategy to the P&L — board-ready scenarios, not spreadsheets nobody trusts.' },
  { icon: 'handshake', title: 'Fundraising & M&A', body: 'Data rooms, models, and diligence support that stand up to the sharpest investor questions.' },
  { icon: 'gauge', title: 'Reporting & controls', body: 'A monthly close and KPI cadence that closes faster, reads cleaner, and earns lender confidence.' },
];

function Services() {
  return (
    <section id="services" style={{ background: 'var(--surface-muted)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '88px 32px' }}>
        <SectionHead eyebrow="Services" title="Where I create leverage" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 40 }}>
          {SERVICES.map((s) => (
            <SCard key={s.title} pad="lg" elevation="sm">
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 44, height: 44, flex: '0 0 auto', borderRadius: 'var(--radius-md)',
                  background: 'var(--forest-wash)', color: 'var(--forest)',
                }}>
                  <i data-lucide={s.icon}></i>
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 19, color: 'var(--ink)', margin: '2px 0 8px' }}>{s.title}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink-secondary)', margin: 0 }}>{s.body}</p>
                </div>
              </div>
            </SCard>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-tertiary)', marginRight: 6 }}>Sectors</span>
          {['SaaS', 'Healthcare', 'Manufacturing', 'Consumer', 'Professional services'].map((t) => <STag key={t}>{t}</STag>)}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, light }) {
  return (
    <div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: light ? 'rgba(244,241,234,0.6)' : 'var(--moss)' }}>{eyebrow}</span>
      <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 38, letterSpacing: '-0.02em', color: light ? 'var(--text-on-forest)' : 'var(--ink)', margin: '14px 0 0', textWrap: 'balance' }}>{title}</h2>
    </div>
  );
}
window.Services = Services;
window.SectionHead = SectionHead;
