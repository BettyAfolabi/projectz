import { useEffect, useState, useRef } from 'react';

type Item = {
  label: string;
  href: string;
};

interface CommandPaletteProps {
  items: Item[];
}

export default function CommandPalette({ items }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }

      if (!open) return;

      if (e.key === 'Escape') {
        setOpen(false);
        setQuery('');
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % filteredItems.length);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + filteredItems.length) % filteredItems.length);
      }

      if (e.key === 'Enter') {
        const item = filteredItems[activeIndex];
        if (item) window.location.href = item.href;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, activeIndex, filteredItems]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-40">
      <div className="w-full max-w-lg rounded-xl bg-neutral-900 shadow-lg ring-1 ring-white/10">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          className="w-full rounded-t-xl bg-neutral-800 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        />

        <ul className="max-h-96 overflow-y-auto divide-y divide-white/10">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={item.href}
                className={`px-4 py-3 cursor-pointer transition-colors rounded-lg ${
                  index === activeIndex
                    ? 'bg-white/20 shadow-md'
                    : 'hover:bg-white/5'
                }`}
              >
                {item.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-white/50">No results found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
