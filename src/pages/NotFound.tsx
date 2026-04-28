import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-mt py-20 text-center">
      <div className="text-7xl font-bold text-primary mb-3">404</div>
      <h1 className="text-2xl font-bold text-navy mb-2">Сторінку не знайдено</h1>
      <p className="text-muted-foreground mb-6">Можливо, посилання застаріло або сторінка переїхала.</p>
      <Link to="/" className="btn-primary inline-flex">На головну</Link>
    </div>
  );
}
