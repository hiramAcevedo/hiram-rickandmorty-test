# Hiram Technical Test: Rick & Morty Explorer - Actividad 3.5

Una aplicación de demostración construida con **Next.js (pages router)**, **Material‑UI**, **Zustand** y **Axios**, que implementa todos los elementos solicitados en la Actividad 3.5 de Prototipado en Next.js:

## ✅ Elementos de Next.js implementados

### Diseño y maquetado
- **Clases y estilos**: Implementados mediante Material-UI y estilos en línea con la propiedad `sx`
- **Listas**: Implementadas en la página de personajes con Grid de Material-UI y renderizado de listas de personajes

### Componentes
- **Registro de componentes**: Implementados en la carpeta `/components` (NavBar, CharacterCard)
- **Paso de datos sobre componentes**: Mediante props entre componentes padre e hijos
- **Eventos**: Manejo de eventos onClick, onChange, onSubmit en formularios y elementos interactivos

### Rutas y navegación
- **Páginas y rutas dinámicas**: Implementadas con el sistema de páginas de Next.js
- **Navegación entre páginas**: Implementada con useRouter y componente Link
- **Layouts compartidos**: Implementado en `_app.js` con NavBar compartido

## 🔐 Credenciales de acceso para pruebas

Para probar la aplicación, utiliza las siguientes credenciales hardcodeadas:
* **Usuario:** `Test123`
* **Contraseña:** `password@2`

Además, debes seleccionar un personaje favorito para habilitar el botón de login.

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
