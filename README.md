# FiboQuant Analytica

**Desafío Web 2005 · Informática & Economía**  
Proyecto desarrollado en HTML5, CSS3 y JavaScript Vanilla.

🔗 [Repositorio](https://github.com/LucyCosme/crecimiento-de-conejitos?authuser=0) · [Página Publicada](https://lucycosme.github.io/crecimiento-de-conejitos/?authuser=0)

---

## Descripción

FiboQuant Analytica es una aplicación web interactiva de tres módulos que aplica conceptos matemáticos — la Sucesión de Fibonacci y los Números Primos — a contextos reales: mercados financieros, criptografía RSA y control de plagas en agronomía.

---

## Estructura del Proyecto

```
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── script.js
└── README.md
```

---

## Módulos

### 01 · Fibonacci & Mercado Financiero

Calcula los niveles de retroceso de Fibonacci a partir de un rango de precios ingresado por el usuario. Genera una tabla con los cuatro ratios principales (23.6%, 38.2%, 50.0% y 61.8%) y un gráfico técnico en SVG que visualiza los niveles sobre una curva de precio simulada. También emite un dictamen analítico con un Stop-Loss sugerido.

**Concepto central:** La Sucesión de Fibonacci (Fₙ = Fₙ₋₁ + Fₙ₋₂) converge al Número Áureo φ ≈ 1.618. Su inverso, 0.618, es la "Zona Áurea Crítica" usada en la Teoría de Ondas de Elliott para identificar zonas de reversión de precio.

**Entradas:** Precio mínimo, precio máximo, nombre del activo (opcional).  
**Salidas:** Tabla de retrocesos, gráfico SVG, reporte técnico con Stop-Loss.

---

### 02 · CONTRASEÑA SEGURA

Verifica si un número entero ingresado es primo y evalúa su viabilidad como componente de una clave segura. Muestra el resultado en una consola visual con un veredicto claro.

**Concepto central:** La seguridad de contraseñas se basa en que multiplicar dos primos grandes es trivial, pero factorizar su producto es computacionalmente inviable. Un número primo puede ser uno de los factores secretos de una clave segura.

**Entrada:** Número entero mayor o igual a 2.  
**Salida:** Veredicto de primalidad (PRIMO / COMPUESTO) con explicación.

**Algoritmo de primalidad:** Conteo de divisores por fuerza bruta — si el número tiene exactamente 2 divisores (1 y sí mismo), es primo.

---

### 03 · AgroTech & Control de Plagas

Simula el crecimiento de una población de plagas siguiendo la Sucesión de Fibonacci y genera un calendario de erradicación. Las semanas cuya población resulta ser un número primo se marcan como momentos críticos de vulnerabilidad biológica, y se calcula el día exacto de intervención mediante residuo modular base 7.

**Concepto central:** Las poblaciones de ciertas plagas (pulgones, ácaros) crecen siguiendo patrones de Fibonacci. Las semanas con población prima representan estados de vulnerabilidad óptimos para la intervención química, reduciendo resistencia genética y costos.

**Entradas:** Tipo de plaga, población inicial, número de semanas a proyectar.  
**Salida:** Cronograma semanal con estado (Estable / Erradicar) y día exacto de intervención.

---

## Tecnologías

- **HTML5** — Estructura semántica, sin dependencias externas.
- **CSS3** — Variables CSS, Grid, animaciones, diseño responsivo. Sin frameworks.
- **JavaScript Vanilla** — Lógica pura sin librerías. Sin arrays; se usan variables de estado simples (`var a, b, c`) y bucles `while`.
- **SVG** — Gráfico técnico generado dinámicamente desde JavaScript.
- **Google Fonts** — Syne (display), DM Sans (cuerpo), Share Tech Mono (código/datos).

---

## Navegación

La página de inicio muestra tres tarjetas de selección. Al ingresar a un módulo, aparece la barra de navegación superior con acceso a los otros módulos y un botón "← Inicio" para regresar a la pantalla principal.

---

## Restricciones de Implementación

El proyecto fue desarrollado bajo las siguientes reglas del desafío:

- No se utilizan arrays en ningún módulo.
- Todos los elementos del DOM se acceden exclusivamente con `getElementById`.
- La lógica de Fibonacci se implementa con variables de estado (`a`, `b`, `c`) y bucles `while`.
- No se usan frameworks de JavaScript ni CSS.

---

## Autor

Desarrollado por **Lucy Cosme** para el Desafío Web 2005 — Informática & Economía.
