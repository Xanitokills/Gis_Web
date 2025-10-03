# 🎨 Guía de Temas - SmartCore BI Dashboard

## 🌓 Sistema de Modo Oscuro/Claro Implementado

### ✨ Características Principales

1. **Toggle Elegante**: Botón de cambio con animación suave en el sidebar
2. **Transición Fluida**: Animaciones CSS de 300ms para cambios sin cortes
3. **Persistencia Visual**: Los cambios se aplican instantáneamente en toda la interfaz
4. **Paleta Profesional**: Colores cuidadosamente seleccionados para cada modo

---

## 🌙 MODO OSCURO (Por Defecto)

### Paleta de Colores

```css
/* Backgrounds */
--bg-main: #0D0D0D           /* Fondo principal */
--bg-sidebar: #1C1C1C        /* Sidebar */
--bg-card: #1C1C1C           /* Tarjetas */
--bg-input: #252525          /* Inputs */
--bg-secondary: #252525      /* Fondos secundarios */
--bg-active: rgba(5, 150, 105, 0.1)  /* Estados activos */

/* Borders */
--border-default: #2A2A2A    /* Bordes principales */
--border-input: #3A3A3A      /* Bordes de inputs */
--border-accent: rgba(5, 150, 105, 0.2)  /* Bordes de acento */

/* Text */
--text-primary: #FFFFFF      /* Texto principal */
--text-secondary: #9CA3AF    /* Texto secundario (gray-400) */
--text-tertiary: #6B7280     /* Texto terciario (gray-500) */
--text-accent: #34D399       /* Texto de acento (emerald-400) */

/* Accents */
--accent-primary: #059669    /* Verde esmeralda (emerald-600) */
--accent-hover: #10B981      /* Verde hover (emerald-500) */
```

### Uso
- **Ideal para**: Trabajo nocturno, reducir fatiga visual
- **Estilo**: Minimalista, profesional, elegante
- **Acento**: Verde esmeralda sutil y refinado

---

## ☀️ MODO CLARO

### Paleta de Colores

```css
/* Backgrounds */
--bg-main: linear-gradient(to-br, #F9FAFB, #F3F4F6)  /* Gradiente suave gris */
--bg-sidebar: #FFFFFF        /* Sidebar blanco */
--bg-card: #FFFFFF           /* Tarjetas blancas */
--bg-input: #FFFFFF          /* Inputs blancos */
--bg-secondary: #F9FAFB      /* Fondos secundarios (gray-50) */
--bg-active: #ECFDF5         /* Estados activos (emerald-50) */

/* Borders */
--border-default: #E5E7EB    /* Bordes principales (gray-200) */
--border-input: #D1D5DB      /* Bordes de inputs (gray-300) */
--border-accent: #A7F3D0     /* Bordes de acento (emerald-200) */

/* Text */
--text-primary: #111827      /* Texto principal (gray-900) */
--text-secondary: #4B5563    /* Texto secundario (gray-600) */
--text-tertiary: #6B7280     /* Texto terciario (gray-500) */
--text-accent: #059669       /* Texto de acento (emerald-600) */

/* Accents */
--accent-primary: #059669    /* Verde esmeralda (emerald-600) */
--accent-hover: #047857      /* Verde hover (emerald-700) */
```

### Uso
- **Ideal para**: Trabajo diurno, presentaciones, ambientes iluminados
- **Estilo**: Limpio, fresco, corporativo
- **Acento**: Verde esmeralda vibrante y profesional

---

## 🔄 Toggle de Modo

### Ubicación
- **Sidebar superior**: Debajo del logo y nombre de usuario
- **Visible**: Solo cuando el sidebar está expandido
- **Animado**: Switch toggle con transición suave

### Iconos
- 🌙 **Modo Oscuro**: Luna (indigo-400)
- ☀️ **Modo Claro**: Sol (yellow-400)

### Interacción
```typescript
const [darkMode, setDarkMode] = useState(true);

// Toggle function
<button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
</button>
```

---

## 📊 Componentes Adaptados

### ✅ Completamente Adaptados:
- [x] Sidebar (navegación, logo, footer)
- [x] Header principal
- [x] Toggle de modo oscuro/claro
- [x] Botones de acción primarios
- [x] Tarjetas KPI (parcial)

### 🔄 En Progreso:
- [ ] Todas las tarjetas de fase (1-7)
- [ ] Modales y formularios
- [ ] Tablas de datos
- [ ] Gráficos y visualizaciones
- [ ] Badges y etiquetas

---

## 🎯 Mejores Prácticas

### 1. Contraste Accesible
- **Modo Oscuro**: Mínimo 7:1 (texto blanco sobre fondo oscuro)
- **Modo Claro**: Mínimo 7:1 (texto oscuro sobre fondo claro)

### 2. Uso del Verde Esmeralda
- **Restringido**: Solo para elementos importantes
- **Estados activos**: Navegación, botones primarios
- **Feedback**: Éxito, confirmación, estados positivos

### 3. Transiciones
- **Duración**: 300ms para cambios de color
- **Easing**: ease-in-out por defecto
- **Aplicar a**: background, border, color

---

## 🚀 Próximos Pasos

1. **Completar adaptación**: Aplicar tema dinámico a todas las fases
2. **Modales**: Actualizar todos los modales con tema dinámico
3. **Persistencia**: Guardar preferencia en localStorage
4. **Optimización**: Reducir repetición de código con utilidades

---

## 💡 Código de Referencia

```typescript
// Objeto de tema dinámico
const theme = {
  bgMain: darkMode ? 'bg-[#0D0D0D]' : 'bg-gradient-to-br from-gray-50 to-gray-100',
  bgCard: darkMode ? 'bg-[#1C1C1C]' : 'bg-white',
  textPrimary: darkMode ? 'text-white' : 'text-gray-900',
  accent: darkMode ? 'bg-emerald-600' : 'bg-emerald-600',
  // ... más propiedades
};

// Uso en componentes
<div className={`${theme.bgCard} ${theme.textPrimary}`}>
  Contenido adaptable
</div>
```

---

**Estado Actual**: ✅ Sistema de temas implementado y funcionando
**Última Actualización**: Octubre 2, 2025
