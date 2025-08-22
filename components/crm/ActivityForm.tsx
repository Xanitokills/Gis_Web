"use client";

import { useState } from "react";
import type { Activity } from "@/types/activity";

type Props = { onSaved?: (a: Activity) => void };

export default function ActivityForm({ onSaved }: Props) {
  const [form, setForm] = useState({
    type: "call", title: "", description: "", status: "pending", dueDate: "", propertyId: "", clientId: "", leadId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async () => {
    setLoading(true); setError(null);
    try {
      const body = {
        ...form,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        propertyId: form.propertyId || null,
        clientId: form.clientId || null,
        leadId: form.leadId || null,
      };
      const res = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as Activity;
      onSaved?.(data);
      setForm({ type: "call", title: "", description: "", status: "pending", dueDate: "", propertyId: "", clientId: "", leadId: "" });
    } catch (e: any) {
      setError(e.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold">Nueva actividad</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <select className="input" value={form.type} onChange={(e) => set("type", e.target.value)}>
          <option value="call">Llamada</option>
          <option value="email">Email</option>
          <option value="meeting">Reunión</option>
          <option value="viewing">Visita</option>
          <option value="follow_up">Seguimiento</option>
        </select>
        <select className="input" value={form.status} onChange={(e) => set("status", e.target.value)}>
          <option value="pending">Pendiente</option>
          <option value="completed">Completada</option>
          <option value="cancelled">Cancelada</option>
        </select>
        <input className="input" placeholder="Título" value={form.title} onChange={(e) => set("title", e.target.value)} />
        <input className="input" type="datetime-local" value={form.dueDate} onChange={(e) => set("dueDate", e.target.value)} />
        <input className="input" placeholder="Property ID (opcional)" value={form.propertyId} onChange={(e) => set("propertyId", e.target.value)} />
        <input className="input" placeholder="Client ID (opcional)" value={form.clientId} onChange={(e) => set("clientId", e.target.value)} />
        <input className="input" placeholder="Lead ID (opcional)" value={form.leadId} onChange={(e) => set("leadId", e.target.value)} />
        <textarea className="input sm:col-span-2" placeholder="Descripción" value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn" onClick={submit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar actividad"}
      </button>
    </div>
  );
}
