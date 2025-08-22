"use client";

import { useState } from "react";
import type { Lead } from "@/types/lead";

type Props = { onSaved?: (l: Lead) => void };

export default function LeadForm({ onSaved }: Props) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", source: "website",
    status: "new", priority: "medium", budget: "", notes: "",
    propertyId: "", clientId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async () => {
    setLoading(true); setError(null);
    try {
      const body = {
        ...form,
        budget: form.budget ? Number(form.budget) : null,
        propertyId: form.propertyId || null,
        clientId: form.clientId || null,
      };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as Lead;
      onSaved?.(data);
      setForm({ name: "", email: "", phone: "", source: "website", status: "new", priority: "medium", budget: "", notes: "", propertyId: "", clientId: "" });
    } catch (e: any) {
      setError(e.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold">Nuevo lead</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="input" placeholder="Nombre" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input className="input" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <input className="input" placeholder="Teléfono" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        <select className="input" value={form.source} onChange={(e) => set("source", e.target.value)}>
          <option value="website">Web</option>
          <option value="referral">Referencia</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="other">Otro</option>
        </select>
        <select className="input" value={form.status} onChange={(e) => set("status", e.target.value)}>
          <option value="new">Nuevo</option>
          <option value="contacted">Contactado</option>
          <option value="qualified">Calificado</option>
          <option value="converted">Convertido</option>
          <option value="lost">Perdido</option>
        </select>
        <select className="input" value={form.priority} onChange={(e) => set("priority", e.target.value)}>
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <input className="input" placeholder="Presupuesto" value={form.budget} onChange={(e) => set("budget", e.target.value)} />
        <input className="input" placeholder="Property ID (opcional)" value={form.propertyId} onChange={(e) => set("propertyId", e.target.value)} />
        <input className="input" placeholder="Client ID (opcional)" value={form.clientId} onChange={(e) => set("clientId", e.target.value)} />
        <textarea className="input sm:col-span-2" placeholder="Notas" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn" onClick={submit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar lead"}
      </button>
    </div>
  );
}
