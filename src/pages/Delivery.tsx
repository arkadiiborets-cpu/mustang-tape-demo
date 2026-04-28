import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function Delivery() {
  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Доставка і оплата" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6">Доставка</h1>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="p-4 font-bold">Спосіб</th>
              <th className="p-4 font-bold">Термін</th>
              <th className="p-4 font-bold">Вартість</th>
              <th className="p-4 font-bold">Деталі</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Нова Пошта на відділення", "1–2 дні", "від ₴70", "По всій Україні. Відправка день-у-день при замовленні до 16:00."],
              ["Нова Пошта кур'єр", "1–2 дні", "від ₴120", "Доставка за вказаною адресою."],
              ["Самовивіз з виробництва", "Сьогодні", "Безкоштовно", "м. Бровари, вул. Промислова 14. Пн–Пт 09:00–18:00."],
              ["Власна доставка по Києву", "Наступний день", "Безкоштовно від ₴5 000", "Замовлення до 16:00 — наступний робочий день."],
              ["Укрпошта", "3–5 днів", "від ₴45", "Економна доставка для малих посилок."],
              ["Експорт", "За домовленістю", "Розрахунок", "Молдова, Польща, Румунія. Узгоджуємо індивідуально."],
            ].map(row => (
              <tr key={row[0]} className="border-t border-border">
                {row.map((c, i) => <td key={i} className={`p-4 ${i === 0 ? "font-semibold" : "text-muted-foreground"}`}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-navy mt-12 mb-4">Повернення і гарантія</h2>
      <p className="text-sm text-muted-foreground max-w-3xl">Якщо товар вас не влаштував — повернення протягом 14 днів за умови збереження товарного вигляду. На всю продукцію Mustang Tape діє гарантія 24 місяці у закритій упаковці.</p>
    </div>
  );
}
