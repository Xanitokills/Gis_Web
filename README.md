# Lima CRM (Next.js App Router)

Starter con:
- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Prisma (PostgreSQL)
- API routes CRUD (clientes, propiedades, leads, actividades)
- Formularios simples (sin dependencias externas)
- Componentes de mapa (Leaflet / React-Leaflet)

> **Importante:** Tu `package.json` actual no incluye Prisma ni Leaflet.
> Para que todo funcione instala estas dependencias adicionales:

```bash
npm i prisma @prisma/client leaflet react-leaflet
npm i -D @types/leaflet
```

## Puesta en marcha

1) Configura Tailwind v4 (ya incluido `postcss.config.mjs`) y usa `app/globals.css` con `@import "tailwindcss";`.
2) Configura la base de datos: copia `.env.example` a `.env` y ajusta `DATABASE_URL`.
3) Inicializa Prisma y genera el cliente:

```bash
npx prisma init            # si no existe /prisma
npx prisma migrate dev     # crea tablas del esquema
npx prisma generate
```

4) Ejecuta el proyecto:

```bash
npm run dev
```

## Endpoints

- `GET/POST /api/clients`
- `GET/POST /api/properties`
- `GET/POST /api/leads`
- `GET/POST /api/activities`

## Mapa

Página: `/map`. Requiere instalar `leaflet` y `react-leaflet`. El componente se carga dinámicamente en el cliente para evitar SSR.
