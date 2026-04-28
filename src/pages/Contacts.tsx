import { Breadcrumbs } from "@/components/Breadcrumbs";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Contacts() {
  return (
    <div className="container-mt">
      <Breadcrumbs items={[{ label: "Головна", to: "/" }, { label: "Контакти" }]} />
      <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6">Контакти</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Card icon={MapPin} title="Виробництво">Київська обл., м. Бровари, вул. Промислова 14</Card>
          <Card icon={MapPin} title="Склад роздробу Київ">м. Київ, вул. Електриків 26 (Поділ)</Card>
          <Card icon={Phone} title="Телефон">0 800 21 03 03 (безкоштовно з України)</Card>
          <Card icon={Mail} title="Email">sales@mustangtape.ua / b2b@mustangtape.ua</Card>
          <Card icon={Clock} title="Графік роботи">Пн–Пт 09:00–18:00 / Сб 10:00–14:00 / Нд — вихідний</Card>
        </div>

        <div>
          <div className="aspect-video rounded-lg bg-gradient-to-br from-surface to-muted border border-border flex items-center justify-center text-muted-foreground mb-5">
            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-2 text-primary" />
              <div className="text-sm">Карта виробництва · Бровари</div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Повідомлення надіслано", { description: "Відповімо протягом 1 робочого дня." }); }}
            className="bg-surface border border-border rounded-lg p-5 space-y-3"
          >
            <h3 className="font-bold mb-2">Напишіть нам</h3>
            <Input label="Ім'я" required />
            <Input label="Email" type="email" required />
            <div>
              <label className="text-xs text-muted-foreground">Повідомлення</label>
              <textarea rows={4} required className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background mt-1 outline-none focus:border-primary" />
            </div>
            <button type="submit" className="btn-primary w-full">Надіслати</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, children }: any) {
  return (
    <div className="flex gap-4 p-5 bg-surface border border-border rounded-lg">
      <Icon className="text-primary shrink-0" size={22} />
      <div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{title}</div>
        <div className="font-semibold">{children}</div>
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
