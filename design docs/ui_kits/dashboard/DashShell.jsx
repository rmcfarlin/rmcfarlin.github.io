/* global React */
// Dashboard — app shell: sidebar + topbar.
const { Logo: DLogo, Badge: DBadge } = window.McFarlinCFODesignSystem_e3e0bb;

const NAV = [
  { icon: 'layout-dashboard', label: 'Overview' },
  { icon: 'trending-up', label: 'Revenue' },
  { icon: 'wallet', label: 'Cash & runway' },
  { icon: 'receipt', label: 'P&L' },
  { icon: 'scale', label: 'Balance sheet' },
  { icon: 'file-text', label: 'Reports' },
];

function DashSidebar({ active, onSelect }) {
  return (
    <aside style={{
      width: 248, flex: '0 0 auto', background: 'var(--surface)', borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      <div style={{ padding: '20px 20px 18px', borderBottom: '1px solid var(--line)' }}>
        <DLogo markSrc="../../assets/mark.svg" size="sm" showEyebrow={false} />
      </div>
      <nav style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {NAV.map((n) => {
          const on = n.label === active;
          return (
            <button key={n.label} onClick={() => onSelect && onSelect(n.label)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', border: 'none',
              borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'var(--font-sans)', fontSize: 14.5, fontWeight: on ? 600 : 500,
              color: on ? 'var(--forest)' : 'var(--ink-secondary)',
              background: on ? 'var(--forest-wash)' : 'transparent',
            }}>
              <i data-lucide={n.icon} style={{ opacity: on ? 1 : 0.7 }}></i>
              {n.label}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: 16, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--forest)', color: 'var(--text-on-forest)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 13 }}>RM</span>
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>Robert McFarlin</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--ink-tertiary)' }}>Acme Robotics · CFO</div>
        </div>
      </div>
    </aside>
  );
}

function DashTopbar({ period, onPeriod }) {
  const periods = ['Q3 2025', 'Q2 2025', 'FY 2024'];
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
      padding: '20px 32px', borderBottom: '1px solid var(--line)', background: 'var(--paper)',
    }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 24, letterSpacing: '-0.02em', color: 'var(--ink)', margin: 0 }}>Financial overview</h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--ink-tertiary)', margin: '4px 0 0' }}>Acme Robotics, Inc. · prepared by the office of the CFO</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <DBadge tone="positive" dot>Books closed</DBadge>
        <div style={{ display: 'flex', background: 'var(--surface)', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {periods.map((p) => (
            <button key={p} onClick={() => onPeriod && onPeriod(p)} style={{
              border: 'none', cursor: 'pointer', padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 12.5,
              background: p === period ? 'var(--forest)' : 'transparent',
              color: p === period ? 'var(--text-on-forest)' : 'var(--ink-secondary)',
            }}>{p}</button>
          ))}
        </div>
      </div>
    </header>
  );
}
window.DashSidebar = DashSidebar;
window.DashTopbar = DashTopbar;
