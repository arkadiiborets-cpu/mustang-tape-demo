import { Link } from "react-router-dom";
import { Facebook, Instagram, Send, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logo from "@/assets/mustang-logo.png";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground mt-16">
      <div className="container-mt pt-10 pb-4 flex items-center gap-4 border-b border-white/10">
        <img src={logo} alt="Mustang Tape" className="h-12 w-auto" />
        <div className="text-sm opacity-80">Пакувальні стрічки від виробника • Опт • White-label • Доставка по Україні</div>
      </div>
      <div className="container-mt py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4 text-base">Покупцям</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/dostavka" className="hover:text-accent">Доставка</Link></li>
            <li><Link to="/oplata" className="hover:text-accent">Оплата</Link></li>
            <li><Link to="/dostavka" className="hover:text-accent">Повернення</Link></li>
            <li><Link to="/dostavka" className="hover:text-accent">Гарантія</Link></li>
            <li><Link to="/dostavka" className="hover:text-accent">Як зробити замовлення</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-base">Бізнесу</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/opt-i-white-label" className="hover:text-accent">Опт</Link></li>
            <li><Link to="/opt-i-white-label" className="hover:text-accent">White-label</Link></li>
            <li><Link to="/opt-i-white-label" className="hover:text-accent">Стати дилером</Link></li>
            <li><Link to="/opt-i-white-label" className="hover:text-accent">Прайс-лист PDF</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-base">Каталог</h4>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link to="/catalog/bopp" className="hover:text-accent">Пакувальний</Link></li>
            <li><Link to="/catalog/malyarna" className="hover:text-accent">Малярний</Link></li>
            <li><Link to="/catalog/dvostoronniy" className="hover:text-accent">Двосторонній</Link></li>
            <li><Link to="/catalog/armovanyi" className="hover:text-accent">Армований</Link></li>
            <li><Link to="/catalog/masking-roller" className="hover:text-accent">Masking Roller</Link></li>
            <li><Link to="/catalog/spec" className="hover:text-accent">Doctor Tape, Go Tape</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-base">Контакти</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> Київська обл., м. Бровари, вул. Промислова 14</li>
            <li className="flex items-center gap-2"><Phone size={16} /> 0 800 21 03 03</li>
            <li className="flex items-center gap-2"><Mail size={16} /> sales@mustangtape.ua</li>
          </ul>
          <div className="flex gap-2 mt-4">
            {[Facebook, Instagram, Send, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-md bg-white/10 hover:bg-primary flex items-center justify-center transition-colors" aria-label="social"><Icon size={16} /></a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-mt py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-80">
          <span>© 2026 Mustang Tape. Виробництво в Україні.</span>
          <div className="flex flex-wrap items-center gap-3">
            {["Visa", "Mastercard", "LiqPay", "Privat24", "Apple Pay"].map(p => (
              <span key={p} className="bg-white/10 rounded px-2.5 py-1 font-semibold">{p}</span>
            ))}
            <span className="bg-accent text-accent-foreground rounded px-2.5 py-1 font-semibold">Безготівковий розрахунок з ПДВ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
