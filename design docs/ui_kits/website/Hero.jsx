/* global React */
// Advisory website — hero + credibility strip.
const { Button: HButton, Badge: HBadge, StatCard: HStat } = window.McFarlinCFODesignSystem_e3e0bb;

function Hero() {
  return (
    <section style={{ background: 'var(--paper)' }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: '88px 32px 64px',
        display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 56, alignItems: 'center',
      }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--moss)',
          }}>Fractional &amp; Interim CFO</span>
          <h1 style={{
            fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 56, lineHeight: 1.04,
            letterSpacing: '-0.025em', color: 'var(--ink)', margin: '18px 0 20px', textWrap: 'balance',
          }}>
            Senior financial leadership, exactly when you need it.
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: 19, lineHeight: 1.6,
            color: 'var(--ink-secondary)', maxWidth: 520, margin: '0 0 32px',
          }}>
            I help founders and boards see their numbers clearly — turning cash,
            margin, and forecasts into decisions you can defend.
          </p>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <HButton size="lg" iconRight={<i data-lucide="arrow-right"></i>}>Book a consultation</HButton>
            <HButton size="lg" variant="secondary" iconLeft={<i data-lucide="file-text"></i>}>View engagement model</HButton>
          </div>
          <div style={{ display: 'flex', gap: 26, marginTop: 40, flexWrap: 'wrap' }}>
            <Fact k="18 yrs" v="Operating finance" />
            <Divider />
            <Fact k="$1.2B+" v="Capital raised &amp; managed" />
            <Divider />
            <Fact k="40+" v="Engagements led" />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <HStat label="Avg. runway extended" value="+7.4 mo" delta={18.2} caption="across engagements" accent />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <HStat label="Close cycle" value="5 days" delta={-42} deltaProps={{ invert: true }} caption="from 9" />
            <HStat label="Gross margin" value="+11 pts" delta={11} caption="first year" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ k, v }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums' }} dangerouslySetInnerHTML={{ __html: k }} />
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--ink-tertiary)' }} dangerouslySetInnerHTML={{ __html: v }} />
    </div>
  );
}
function Divider() {
  return <span style={{ width: 1, alignSelf: 'stretch', background: 'var(--line-strong)' }} />;
}
window.Hero = Hero;
