import { useEffect, useState, useRef, useCallback } from 'react';

type Item = { label: string; href: string };
interface CommandPaletteProps { items: Item[]; }

export default function CommandPalette({ items }: CommandPaletteProps) {
  const [open, setOpen]               = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery]             = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const navigate = useCallback((href: string) => {
    close();
    setTimeout(() => { window.location.href = href; }, 80);
  }, [close]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => (i + 1) % Math.max(filteredItems.length, 1)); return; }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIndex((i) => (i - 1 + Math.max(filteredItems.length, 1)) % Math.max(filteredItems.length, 1)); return; }
      if (e.key === 'Enter') { const item = filteredItems[activeIndex]; if (item) navigate(item.href); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, activeIndex, filteredItems, close, navigate]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => { setActiveIndex(0); }, [query]);

  if (!open) return null;

  // Read CSS variables at render time so the palette matches the active theme
  const bg     = 'color-mix(in srgb, var(--theme-bg) 92%, transparent)';
  const border = 'var(--theme-border)';
  const text   = 'var(--theme-text)';
  const muted  = 'var(--theme-muted)';
  const accent = 'var(--theme-accent)';

  return (
    <div
      style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:'8rem', paddingLeft:'1rem', paddingRight:'1rem' }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        style={{ width:'100%', maxWidth:'32rem', borderRadius:'1rem', overflow:'hidden', boxShadow:'0 25px 50px rgba(0,0,0,0.4)', border:`1px solid ${border}`, background: bg, backdropFilter:'blur(20px)' }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'0 16px', borderBottom:`1px solid ${border}` }}>
          <svg style={{ width:16, height:16, color:muted, flexShrink:0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex:1, background:'transparent', padding:'16px 0', color:text, fontSize:'14px', border:'none', outline:'none' }}
          />
          <button
            onClick={close}
            style={{ fontSize:'11px', fontFamily:'monospace', color:muted, background:'transparent', border:`1px solid ${border}`, borderRadius:'4px', padding:'2px 6px', cursor:'pointer' }}
          >ESC</button>
        </div>

        {/* Results */}
        <ul style={{ maxHeight:'320px', overflowY:'auto', padding:'8px 0' }}>
          {filteredItems.length > 0 ? filteredItems.map((item, index) => (
            <li
              key={item.href}
              onMouseDown={(e) => { e.preventDefault(); navigate(item.href); }}
              onMouseEnter={() => setActiveIndex(index)}
              style={{
                display:'flex', alignItems:'center', gap:'12px',
                margin:'0 8px', padding:'10px 12px', borderRadius:'8px',
                cursor:'pointer', fontSize:'14px', transition:'background 0.1s',
                background: index === activeIndex ? `color-mix(in srgb, ${accent} 12%, transparent)` : 'transparent',
                color: index === activeIndex ? text : muted,
              }}
            >
              <svg style={{ width:14, height:14, flexShrink:0, opacity:0.4 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              {item.label}
            </li>
          )) : (
            <li style={{ padding:'32px 16px', textAlign:'center', color:muted, fontSize:'14px' }}>
              No results for "{query}"
            </li>
          )}
        </ul>

        {/* Footer */}
        <div style={{ padding:'10px 16px', borderTop:`1px solid ${border}`, display:'flex', gap:'16px', fontSize:'11px', fontFamily:'monospace', color:muted, opacity:0.6 }}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}