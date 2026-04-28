import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShop } from "@/store/shop";
import { uah } from "@/lib/format";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChevronDown, Check } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const { itemsDetailed, cartTotal, clearCart } = useShop();
  const [step, setStep] = useState(1);
  const [isCompany, setIsCompany] = useState(false);
  const [delivery, setDelivery] = useState("np");
  const [payment, setPayment] = useState("liqpay");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const submit = () => {
    if (!agree) { toast.error("Підтвердіть погодження з умовами"); return; }
    if (itemsDetailed.length === 0) { toast.error("Кошик порожній"); return; }
    toast.success("Демо-режим: замовлення прийнято", { description: "У реальному магазині — буде підтвердження на email і дзвінок менеджера." });
    clearCart();
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Кошик", to: "/cart" }, { label: "Оформлення" }]} />
      <h1 className="text-3xl font-bold text-navy mb-6">Оформлення замовлення</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-3">
          <Section n={1} title="Контактні дані" open={step === 1} onOpen={() => setStep(1)} done={step > 1}>
            <div className="grid md:grid-cols-2 gap-3">
              <Input label="Ім'я" placeholder="Олександр" />
              <Input label="Прізвище" placeholder="Шевченко" />
              <Input label="Телефон" placeholder="+380 XX XXX XX XX" />
              <Input label="Email" placeholder="you@example.com" type="email" />
            </div>
            <label className="flex items-center gap-2 mt-4 text-sm cursor-pointer">
              <input type="checkbox" checked={isCompany} onChange={e => setIsCompany(e.target.checked)} className="accent-primary" />
              Я юр.особа (потрібен рахунок з ПДВ)
            </label>
            {isCompany && (
              <div className="grid md:grid-cols-2 gap-3 mt-3 animate-fade-in">
                <Input label="Назва компанії" placeholder="ТОВ «Приклад»" />
                <Input label="ЄДРПОУ" placeholder="12345678" />
                <Input label="ІПН" placeholder="123456789012" />
                <Input label="Контактна особа" placeholder="ПІБ" />
              </div>
            )}
            <button onClick={() => setStep(2)} className="btn-primary mt-5">Далі</button>
          </Section>

          <Section n={2} title="Доставка" open={step === 2} onOpen={() => setStep(2)} done={step > 2}>
            <div className="space-y-2">
              {[
                ["np", "Нова Пошта на відділення", "1–2 дні, від ₴70"],
                ["np-courier", "Нова Пошта кур'єр", "1–2 дні, від ₴120"],
                ["pickup", "Самовивіз з виробництва Бровари", "Безкоштовно"],
                ["own", "Власна доставка по Києву", "Безкоштовно від ₴5 000"],
              ].map(([v, l, sub]) => (
                <label key={v} className={`flex items-start gap-3 p-3 border rounded-md cursor-pointer ${delivery === v ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" name="del" value={v} checked={delivery === v} onChange={() => setDelivery(v)} className="mt-1 accent-primary" />
                  <div>
                    <div className="font-semibold text-sm">{l}</div>
                    <div className="text-xs text-muted-foreground">{sub}</div>
                  </div>
                </label>
              ))}
            </div>
            {delivery === "np" && (
              <div className="grid md:grid-cols-2 gap-3 mt-4 animate-fade-in">
                <Input label="Місто" placeholder="Київ" />
                <div>
                  <label className="text-xs text-muted-foreground">Відділення</label>
                  <select className="w-full h-10 px-3 border border-border rounded-md text-sm bg-background mt-1">
                    <option>№1 — вул. Хрещатик, 22</option>
                    <option>№42 — вул. Сагайдачного, 14</option>
                    <option>№128 — пр. Перемоги, 67</option>
                  </select>
                </div>
              </div>
            )}
            <button onClick={() => setStep(3)} className="btn-primary mt-5">Далі</button>
          </Section>

          <Section n={3} title="Оплата" open={step === 3} onOpen={() => setStep(3)} done={false}>
            <div className="space-y-2">
              {[
                ["liqpay", "LiqPay (картка Visa / Mastercard)"],
                ["cod", "Накладений платіж при отриманні"],
                ["invoice", "Безготівковий розрахунок з ПДВ — рахунок на email"],
                ["cash", "Готівка при самовивозі"],
              ].map(([v, l]) => (
                <label key={v} className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${payment === v ? "border-primary bg-primary/5" : "border-border"}`}>
                  <input type="radio" name="pay" value={v} checked={payment === v} onChange={() => setPayment(v)} className="accent-primary" />
                  <span className="text-sm">{l}</span>
                </label>
              ))}
            </div>
          </Section>

          <div className="bg-surface border border-border rounded-lg p-4 mt-3">
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="mt-0.5 accent-primary" />
              Погоджуюсь з умовами обробки персональних даних та публічною офертою
            </label>
            <button onClick={submit} className="btn-primary w-full h-12 mt-4 text-base">Підтвердити замовлення</button>
          </div>
        </div>

        <aside className="bg-surface border border-border rounded-lg p-5 h-fit lg:sticky lg:top-32">
          <h3 className="font-bold text-lg mb-4">Ваше замовлення</h3>
          <div className="space-y-2 max-h-64 overflow-auto mb-4">
            {itemsDetailed.map(({ product, qty, lineTotal }) => (
              <div key={product.id} className="flex justify-between text-sm gap-2">
                <span className="line-clamp-2">{product.name} <span className="text-muted-foreground">× {qty}</span></span>
                <span className="font-semibold whitespace-nowrap">{uah(lineTotal)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 flex justify-between items-baseline">
            <span className="font-bold">Разом</span>
            <span className="text-2xl font-bold text-primary">{uah(cartTotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ n, title, open, onOpen, done, children }: any) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button onClick={onOpen} className="w-full flex items-center gap-3 p-4 text-left">
        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${done ? "bg-success text-white" : open ? "bg-primary text-primary-foreground" : "bg-surface text-muted-foreground"}`}>
          {done ? <Check size={16} /> : n}
        </span>
        <span className="font-semibold flex-1">{title}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""} text-muted-foreground`} />
      </button>
      {open && <div className="px-4 pb-5 animate-fade-in">{children}</div>}
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
