import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export default function WhiteLabel() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Заявку прийнято", { description: "Передзвонимо протягом 1 робочого дня." });
  };

  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Опт і white-label" }]} />

      <div className="bg-gradient-to-r from-navy to-[hsl(211_55%_25%)] text-white rounded-xl p-8 md:p-12 mb-10">
        <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">B2B напрямок</div>
        <h1 className="text-3xl md:text-5xl font-bold mb-3">Опт і white-label</h1>
        <p className="text-lg opacity-90 max-w-2xl">Власне виробництво в Броварах. Ваш бренд на нашій стрічці. Партії від 1 000 рулонів за 14 днів.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {[
          { n: "−20%", t: "автоматична знижка від 100 рулонів роздробу" },
          { n: "1 000", t: "мінімальна партія white-label з друком" },
          { n: "14 днів", t: "термін виконання white-label замовлення" },
        ].map(({ n, t }) => (
          <div key={n} className="bg-surface border border-border rounded-lg p-6">
            <div className="text-3xl font-bold text-primary mb-1">{n}</div>
            <div className="text-sm text-muted-foreground">{t}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy mb-5">Як це працює</h2>
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        {[
          ["1", "Заявка", "Заповнюєте форму або дзвоните менеджеру"],
          ["2", "Ескіз", "Узгоджуємо макет, кольори, кількість"],
          ["3", "Виробництво", "Друкуємо і пакуємо за 14 днів"],
          ["4", "Доставка", "Власна доставка або Нова Пошта"],
        ].map(([n, t, s]) => (
          <div key={n} className="border border-border rounded-lg p-5">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mb-3">{n}</div>
            <div className="font-bold mb-1">{t}</div>
            <div className="text-sm text-muted-foreground">{s}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-navy mb-5">Виконані white-label проєкти</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {[
          ["Інтернет-магазин електроніки", "5 000 рулонів", "12 днів", "2 кольори"],
          ["Мережа квіткових магазинів", "3 200 рулонів", "10 днів", "4 кольори"],
          ["Логістична компанія", "12 000 рулонів", "18 днів", "1 колір + штрихкод"],
        ].map(([brand, qty, time, color]) => (
          <div key={brand} className="bg-surface border border-border rounded-lg p-5">
            <div className="aspect-video bg-gradient-to-br from-primary to-accent rounded-md mb-4 flex items-center justify-center text-white font-bold text-lg">Бренд клієнта</div>
            <div className="font-bold mb-2">{brand}</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>• {qty}</div>
              <div>• Виконано за {time}</div>
              <div>• Друк: {color}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 max-w-3xl">
        <h2 className="text-2xl font-bold text-navy mb-2">Залишити заявку</h2>
        <p className="text-sm text-muted-foreground mb-5">Передзвонимо протягом 1 робочого дня. Без спаму.</p>
        {sent ? (
          <div className="bg-success/10 border border-success/30 rounded-lg p-6 flex items-center gap-3">
            <CheckCircle2 className="text-success" />
            <div>
              <div className="font-semibold">Заявку прийнято</div>
              <div className="text-sm text-muted-foreground">Менеджер зв'яжеться з вами протягом 1 робочого дня.</div>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
            <Input label="Ваше ім'я" required />
            <Input label="Назва компанії" />
            <Input label="Телефон" type="tel" required />
            <Input label="Email" type="email" required />
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground">Опишіть запит (тип стрічки, розмір, кількість)</label>
              <textarea rows={4} className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background mt-1 outline-none focus:border-primary" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary w-full md:w-auto">Надіслати заявку</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Input({ label, ...props }: any) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input {...props} className="w-full h-10 px-3 border border-border rounded-md text-sm bg-background mt-1 outline-none focus:border-primary" />
    </div>
  );
}
