import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CreditCard, Wallet, FileText, Banknote } from "lucide-react";

export default function Payment() {
  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Оплата" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6">Способи оплати</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {[
          { icon: CreditCard, t: "LiqPay", d: "Visa, Mastercard, Apple Pay, Google Pay. Миттєве зарахування." },
          { icon: Wallet, t: "Накладений платіж", d: "Оплата при отриманні в Новій Пошті. Комісія НП ~2%." },
          { icon: FileText, t: "Безготівковий розрахунок з ПДВ", d: "Для юр. осіб і ФОП. Виставляємо рахунок на email, відправка після надходження коштів. Накладні і податкові — електронно через M.E.Doc." },
          { icon: Banknote, t: "Готівка при самовивозі", d: "Оплата готівкою або карткою на касі виробництва в Броварах." },
        ].map(({ icon: I, t, d }) => (
          <div key={t} className="border border-border rounded-lg p-5 bg-surface">
            <div className="w-12 h-12 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3"><I size={24} /></div>
            <h3 className="font-bold mb-2">{t}</h3>
            <p className="text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>

      <div className="bg-accent rounded-xl p-6 mt-10">
        <h3 className="font-bold text-lg mb-2">Працюєте від юридичної особи?</h3>
        <p className="text-sm">Виставляємо рахунок з ПДВ за 15 хвилин. Договір на постійну поставку — індивідуальні умови, відстрочка платежу до 14 днів. Зв'яжіться з відділом B2B: <strong>b2b@mustangtape.ua</strong></p>
      </div>
    </div>
  );
}
