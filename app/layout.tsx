import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lima CRM</title>
      </head>
      <body className="min-h-dvh bg-neutral-50 text-neutral-900 antialiased">
        <div className="mx-auto max-w-7xl p-4">{children}</div>
      </body>
    </html>
  );
}
