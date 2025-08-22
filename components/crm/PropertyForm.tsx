"use client";

import { useState } from "react";
import type { Property } from "@/types/property";

type Props = { onSaved?: (p: Property) => void };

export default function PropertyForm({ onSaved }: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    operationType: "venta",
    propertyType: "departamento",
    district: "",
    address: "",
    latitude: "",
    longitude: "",
    bedrooms: "",
    bathrooms: "",
    totalArea: "",
    builtArea: "",
    parking: "",
    phone: "",
    email: "",
    featured: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: string, v: string | number | boolean) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      const body = {
        ...form,
        price: Number(form.price || 0),
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        totalArea: form.totalArea ? Number(form.totalArea) : null,
        builtArea: form.builtArea ? Number(form.builtArea) : null,
        parking: form.parking ? Number(form.parking) : null,
      };
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as Property;
      onSaved?.(data);
      // reset minimal
      setForm({
        title: "", description: "", price: 0, operationType: "venta", propertyType: "departamento",
        district: "", address: "", latitude: "", longitude: "", bedrooms: "", bathrooms: "", totalArea: "", builtArea: "", parking: "",
        phone: "", email: "", featured: false,
      });
    } catch (e: any) {
      setError(e.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold">Nueva propiedad</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input className="input" placeholder="Título" value={form.title} onChange={(e) => set("title", e.target.value)} />
        <input className="input" placeholder="Precio" type="number" value={form.price} onChange={(e) => set("price", e.target.value)} />
        <input className="input" placeholder="Distrito" value={form.district} onChange={(e) => set("district", e.target.value)} />
        <input className="input" placeholder="Dirección" value={form.address} onChange={(e) => set("address", e.target.value)} />
        <select className="input" value={form.operationType} onChange={(e) => set("operationType", e.target.value)}>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
        <select className="input" value={form.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
          <option value="departamento">Departamento</option>
          <option value="casa">Casa</option>
          <option value="oficina">Oficina</option>
          <option value="terreno">Terreno</option>
        </select>
        <input className="input" placeholder="Latitud" value={form.latitude} onChange={(e) => set("latitude", e.target.value)} />
        <input className="input" placeholder="Longitud" value={form.longitude} onChange={(e) => set("longitude", e.target.value)} />
        <input className="input" placeholder="Dormitorios" value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} />
        <input className="input" placeholder="Baños" value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} />
        <input className="input" placeholder="Área total (m²)" value={form.totalArea} onChange={(e) => set("totalArea", e.target.value)} />
        <input className="input" placeholder="Área construída (m²)" value={form.builtArea} onChange={(e) => set("builtArea", e.target.value)} />
        <input className="input" placeholder="Estacionamientos" value={form.parking} onChange={(e) => set("parking", e.target.value)} />
        <input className="input" placeholder="Teléfono" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        <input className="input" placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} />
        <label className="flex items-center gap-2 sm:col-span-2">
          <input type="checkbox" checked={form.featured} onChange={(e) => set("featured", e.target.checked)} />
          <span>Destacada</span>
        </label>
        <textarea className="input sm:col-span-2" placeholder="Descripción" value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button className="btn" onClick={submit} disabled={loading}>
        {loading ? "Guardando..." : "Guardar propiedad"}
      </button>
    </div>
  );
}
