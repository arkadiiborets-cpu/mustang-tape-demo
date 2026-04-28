import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="text-sm text-muted-foreground py-4 flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight size={14} className="text-muted-foreground/60" />}
          {it.to ? <Link to={it.to} className="hover:text-primary">{it.label}</Link> : <span className="text-foreground">{it.label}</span>}
        </span>
      ))}
    </nav>
  );
}
