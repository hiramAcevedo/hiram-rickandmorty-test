# Hiram Technical Test: Rick & Morty Explorer

Una aplicación de demostración construida con **Next.js (pages router)**, **Material‑UI**, **Zustand** y **Axios**, para:

* Autenticación de usuario (hard‑coded) con persistencia en **localStorage**.
* Selección de un "personaje favorito" durante el login.
* Listado de personajes de la API de **Rick & Morty** con **scroll infinito** y animación hover.
* Página de detalle de cada personaje con navegación "Anterior" y "Siguiente".
* Barra de navegación sticky con avatar de usuario, nombre y botón de logout.

**Incluye respuestas a las preguntas del ejercicio al final del documento.**

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

## 🌐 Despliegue en Vercel

1. Haz push a tu repo en GitHub.
2. En Vercel, importa el proyecto y despliega (framework: Next.js).
3. Asegúrate de configurar la ruta raíz y variables si aplica.

---

## Preguntas del ejercicio

**¿Cómo abordaría una aplicación con login que redirige al dashboard si es administrador, o al e-commerce si es cliente?**

Desde el frontend se puede manejar la redirección justo después del login si contamos con alguna propiedad que nos indique el rol del usuario. En el caso de este ejercicio, haría una validación después del inicio de sesión y según el rol devuelto por el proceso de autenticación, lo enviaría al dashboard o al e-commerce. Lo importante es tomar esa decisión lo más pronto posible una vez que el usuario se ha identificado, manteniéndolo simple y claro para evitar rutas incorrectas.

**¿Qué haría si al cerrar sesión en una pestaña, las demás permanecen abiertas?**

Este problema ocurre cuando cada pestaña mantiene su propio estado de sesión de forma aislada. Una forma efectiva de abordarlo sería almacenar la sesión en una cookie accesible desde todas las pestañas y que sea eliminada al cerrar sesión. Además, se puede complementar con el uso del evento `storage` para escuchar los cambios en `localStorage` y reflejar el cierre de sesión de una pestaña en las demás. Esto ayuda a mantener la coherencia en el comportamiento sin necesidad de recargar toda la aplicación manualmente.
