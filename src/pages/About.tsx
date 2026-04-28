import { Link } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Factory, Award, Truck, Users } from "lucide-react";

export default function About() {
  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Про виробництво" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">Про виробництво Mustang Tape</h1>
      <p className="text-lg text-muted-foreground max-w-3xl mb-8">Власний цех з виробництва клейких стрічок у Броварах з 2014 року. Постачаємо роздріб, опт, white-label по всій Україні і на експорт.</p>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-navy to-[hsl(211_55%_25%)] text-white rounded-xl p-10 min-h-[280px] flex items-end">
          <div>
            <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Цех №1, Бровари</div>
            <div className="text-2xl font-bold">2 400 м² виробничих площ</div>
          </div>
        </div>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>Mustang Tape — український виробник клейких стрічок повного циклу. Ми починали як невеликий перемотувальний цех у 2014 році і за 12 років виросли до підприємства, що випускає до <strong>2 мільйонів рулонів на місяць</strong>.</p>
          <p>На виробництві працюють 4 лінії нанесення клею (Hot-melt, акрил, каучук), 3 перемотувальні машини, друкарська лінія до 4 кольорів для white-label замовлень. Власна лабораторія перевіряє кожну партію на адгезію, термостійкість і термін зберігання.</p>
          <p>Сертифіковано за <strong>ДСТУ ISO 9001:2015</strong>. Маємо санітарно-епідеміологічний висновок для контакту з харчовою упаковкою.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-navy mb-5">Цифри</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Factory, n: "2 млн", t: "рулонів на місяць" },
          { icon: Users, n: "120+", t: "співробітників" },
          { icon: Truck, n: "1 200+", t: "B2B-клієнтів" },
          { icon: Award, n: "12 років", t: "на ринку" },
        ].map(({ icon: I, n, t }) => (
          <div key={t} className="bg-surface border border-border rounded-lg p-5 text-center">
            <I className="mx-auto text-primary mb-2" size={28} />
            <div className="text-2xl font-bold">{n}</div>
            <div className="text-xs text-muted-foreground mt-1">{t}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy mb-5">Сертифікати</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {["ДСТУ ISO 9001:2015", "ТУ У 22.2-12345678-001:2022", "Санітарний висновок", "REACH compliance"].map(c => (
          <div key={c} className="border border-border rounded-lg p-4 text-center text-sm font-semibold bg-surface">{c}</div>
        ))}
      </div>

      <div className="bg-accent rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold mb-2">Хочете побачити виробництво на власні очі?</h3>
        <p className="text-sm mb-4">Запрошуємо B2B-клієнтів на екскурсію цехом. Узгодьте дату — і приїжджайте у Бровари.</p>
        <Link to="/kontakty" className="btn-primary inline-flex">Зв'язатися з нами</Link>
      </div>
    </div>
  );
}
