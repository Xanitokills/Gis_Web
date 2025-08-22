"use client";

import { useState } from "react";
import type { Client } from "@/types/client";

type Props = {
  onSaved?: (c: Client) => void;
};

export default function ClientForm({ onSaved }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dni: "",
    clientType: "buyer",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));
  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as Client;
      onSaved?.(data);
      setForm({
        name: "", email: "", phone: "", address: "", dni: "", clientType: "buyer", notes: "",
      });
    } catch (e: any) {
      setError(e.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold">Nuevo cliente</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="input" placeholder="Nombre" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input className="input" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <input className="input" placeholder="Teléfono" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        <input className="input" placeholder="Dirección" value={form.address} onChange={(e) => set("address", e.target.value)} />
        <input className="input" placeholder="DNI" value={form.dni} onChange={(e) => set("dni", e.target.value)} />
        <select className="input" value={form.clientType} onChange={(e) => set("clientType", e.target.value)}>
          <option value="buyer">Comprador</option>
          <option value="seller">Vendedor</option>
          <option value="tenant">Inquilino</option>
          <option value="owner">Propietario</option>
        </select>
        <textarea className="input sm:col-span-2" placeholder="Notas" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn" onClick={submit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar cliente"}
      </button>
    </div>
  );
}
