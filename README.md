# Hiram Technical Test: Rick & Morty Explorer

Una aplicación de demostración construida con **Next.js (pages router)**, **Material‑UI**, **Zustand** y **Axios**, para:

* Autenticación de usuario (hard‑coded) con persistencia en **localStorage**.
* Selección de un "personaje favorito" durante el login.
* Listado de personajes de la API de **Rick & Morty** con **scroll infinito** y animación hover.
* Página de detalle de cada personaje con navegación "Anterior" y "Siguiente".
* Barra de navegación sticky con avatar de usuario, nombre y botón de logout.

---

## 🚀 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TU_USUARIO/hiram-technical-test.git
   cd hiram-technical-test
   ```
2. Instala dependencias:

   ```bash
   npm install
   ```

## 🏃‍♂️ Ejecución en desarrollo

```bash
npm run dev
```

Abre en tu navegador: [http://localhost:3000](http://localhost:3000)

## 🔐 Credenciales de prueba

* **Usuario:** `Test123`
* **Contraseña:** `password@2`

Debes además seleccionar un personaje favorito para habilitar el botón de login.

## 📄 Estructura principal

```
/pages
  ├─ index.js           # Redirección raíz a /login o /characters
  ├─ login.js           # Formulario de login con selección de personaje
  └─ characters
     ├─ index.js        # Listado con scroll infinito y animación hover
     └─ [id].js         # Detalle con botones Anterior/Siguiente
/store
  └─ auth.js            # Zustand persist para auth y favorite
/components
  └─ NavBar.js          # Barra sticky con avatar, usuario y logout
```