// src/components/islands/CommandPalette.tsx
import { useEffect, useState, useRef, useCallback } from 'react';
import type { Command, CommandCategory } from '../../data/commands';

interface CommandPaletteProps {
  items: Command[];
}

const CATEGORY_LABELS: Record<CommandCategory, string> = {
  navigation: 'Navigation',
  project:    'Projects',
  blog:       'Writing',
  action:     'Actions',
};

const CATEGORY_ORDER: CommandCategory[] = ['navigation', 'project', 'blog', 'action'];

export default function CommandPalette({ items }: CommandPaletteProps) {
  const [open, setOpen]               = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery]             = useState('');
  const [copied, setCopied]           = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = query
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  // Group by category for display
  const grouped = CATEGORY_ORDER.reduce<{ category: CommandCategory; items: Command[] }[]>((acc, cat) => {
    const catItems = filteredItems.filter((i) => i.category === cat);
    if (catItems.length) acc.push({ category: cat, items: catItems });
    return acc;
  }, []);

  // Flat list for keyboard navigation
  const flat = grouped.flatMap((g) => g.items);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
    setCopied(false);
  }, []);

  const execute = useCallback((cmd: Command) => {
    // copy
    if (cmd.href.startsWith('copy:')) {
      const value = cmd.href.replace('copy:', '');
      navigator.clipboard.writeText(value).then(() => {
        setCopied(true);
        setTimeout(close, 800);
      });
      return;
    }

    close();

    // External links
    if (cmd.href.startsWith('http')) {
      setTimeout(() => window.open(cmd.href, '_blank', 'noopener noreferrer'), 80);
      return;
    }

    // Internal navigation
    setTimeout(() => { window.location.href = cmd.href; }, 80);
  }, [close]);

  // Keyboard handler
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (!open) return;
      if (e.key === 'Escape')     { close(); return; }
      if (e.key === 'ArrowDown')  { e.preventDefault(); setActiveIndex((i) => (i + 1) % Math.max(flat.length, 1)); return; }
      if (e.key === 'ArrowUp')    { e.preventDefault(); setActiveIndex((i) => (i - 1 + Math.max(flat.length, 1)) % Math.max(flat.length, 1)); return; }
      if (e.key === 'Enter')      { const item = flat[activeIndex]; if (item) execute(item); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, activeIndex, flat, close, execute]);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 50); }, [open]);
  useEffect(() => { setActiveIndex(0); }, [query]);

  if (!open) return null;

  // Category icon
  const categoryIcon = (cat: CommandCategory) => {
    if (cat === 'navigation') return (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    );
    if (cat === 'project') return (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18" />
      </svg>
    );
    if (cat === 'blog') return (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    );
    // action
    return (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  };

  const bg     = 'color-mix(in srgb, var(--theme-bg) 92%, transparent)';
  const border = 'var(--theme-border)';
  const text   = 'var(--theme-text)';
  const muted  = 'var(--theme-muted)';
  const accent = 'var(--theme-accent)';

  return (
    <div
      style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)', display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:'8rem', paddingLeft:'1rem', paddingRight:'1rem' }}
      onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        style={{ width:'100%', maxWidth:'34rem', borderRadius:'1rem', overflow:'hidden', boxShadow:'0 25px 60px rgba(0,0,0,0.5)', border:`1px solid ${border}`, background: bg, backdropFilter:'blur(24px)' }}
        onMouseDown={(e) => e.stopPropagation()}
      >

        {/* Input */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px', padding:'0 16px', borderBottom:`1px solid ${border}` }}>
          <svg style={{ width:15, height:15, color:muted, flexShrink:0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, projects, writing..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex:1, background:'transparent', padding:'16px 0', color:text, fontSize:'14px', border:'none', outline:'none' }}
          />
          {copied
            ? <span style={{ fontSize:'11px', fontFamily:'monospace', color:accent }}>Copied!</span>
            : <kbd style={{ fontSize:'11px', fontFamily:'monospace', color:muted, background:'transparent', border:`1px solid ${border}`, borderRadius:'4px', padding:'2px 6px' }}>ESC</kbd>
          }
        </div>

        {/* Results */}
        <div style={{ maxHeight:'380px', overflowY:'auto', padding:'6px 0' }}>
          {flat.length === 0 ? (
            <div style={{ padding:'32px 16px', textAlign:'center', color:muted, fontSize:'13px' }}>
              No results for "{query}"
            </div>
          ) : grouped.map(({ category, items: catItems }) => (
            <div key={category}>
              {/* Category header */}
              <div style={{ display:'flex', alignItems:'center', gap:'6px', padding:'8px 16px 4px', color:muted, opacity:0.45 }}>
                <span style={{ color:accent, opacity:0.7 }}>{categoryIcon(category)}</span>
                <span style={{ fontSize:'10px', fontFamily:'monospace', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  {CATEGORY_LABELS[category]}
                </span>
              </div>

              {/* Items */}
              {catItems.map((item) => {
                const globalIndex = flat.indexOf(item);
                const isActive = globalIndex === activeIndex;
                return (
                  <div
                    key={item.id}
                    onMouseDown={(e) => { e.preventDefault(); execute(item); }}
                    onMouseEnter={() => setActiveIndex(globalIndex)}
                    style={{
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      gap:'12px', margin:'0 6px', padding:'9px 12px', borderRadius:'8px',
                      cursor:'pointer', transition:'background 0.1s',
                      background: isActive ? `color-mix(in srgb, ${accent} 10%, transparent)` : 'transparent',
                    }}
                  >
                    <div style={{ display:'flex', flexDirection:'column', gap:'1px', minWidth:0 }}>
                      <span style={{ fontSize:'13px', color: isActive ? text : muted, fontWeight: isActive ? 500 : 400, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                        {item.label}
                      </span>
                      {item.description && (
                        <span style={{ fontSize:'11px', color:muted, opacity:0.5, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                          {item.description}
                        </span>
                      )}
                    </div>

                    {/* Right indicator */}
                    {isActive && (
                      <svg style={{ width:12, height:12, color:accent, flexShrink:0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding:'10px 16px', borderTop:`1px solid ${border}`, display:'flex', gap:'16px', fontSize:'11px', fontFamily:'monospace', color:muted, opacity:0.5 }}>
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
          <span style={{ marginLeft:'auto' }}>{flat.length} results</span>
        </div>
      </div>
    </div>
  );
}