/* global React */
// Advisory website — top navigation with brand lockup.
const { Logo, Button } = window.McFarlinCFODesignSystem_e3e0bb;

function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const links = ['Services', 'Approach', 'Results', 'About'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 20,
      background: 'rgba(251,250,247,0.82)', backdropFilter: 'saturate(140%) blur(10px)',
      borderBottom: '1px solid var(--line)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)', margin: '0 auto', padding: '14px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <Logo markSrc="../../assets/mark.svg" size="sm" />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {links.map((l) => (
            <a key={l} href={'#' + l.toLowerCase()} style={{
              fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: 500,
              color: 'var(--ink-secondary)', textDecoration: 'none',
            }}>{l}</a>
          ))}
          <Button size="sm" as="a" href="#contact" iconRight={<i data-lucide="arrow-right"></i>}>
            Book a call
          </Button>
        </nav>
      </div>
    </header>
  );
}
window.SiteHeader = SiteHeader;
