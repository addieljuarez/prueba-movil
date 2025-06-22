# Evaluación de React Native: 
## App de Gestión de Tareas

## Objetivo
Crear una aplicación en React Native con autenticación de usuario y funcionalidades de gestión de tareas. Los usuarios deben iniciar sesión con un correo electrónico y contraseña predefinidos y luego poder visualizar, filtrar, agregar y eliminar tareas obtenidas de una API externa.

## IMPORTANTE

1. Asegúrate de tener `git` y tus herramientas de desarrollo instaladas.
2. Se solicita crear la aplicación utilizando `React Native`.
4. **Antes de comenzar a programar:**
   * Se requiere de una cuenta de `GitHub` para realizar este ejercicio.
   * Realiza un `fork` de [este repositorio](https://github.com/nueve09/prueba-movil).
   * Clona el fork a tu máquina local `git clone git@github.com:USERNAME/FORKED-PROJECT.git`.
   * Crea un `branch` en tu repositorio con tu nombre completo.
6. Realiza los `commits` necesarios.
7. Crea un archivo markdown en la raiz del proyecto y explícanos lo que hiciste.
8. Envía un `pull request` __al branch con tu nombre__.
9. Notifica que has terminado a la siguiente dirección de correo electrónico: recursos_humanos@nueve09.mx, CC: jaraujo@nueve09.mx, mjimenez@nueve09.mx.

## Instrucciones del Proyecto

### Requisitos

#### 1. Pantalla de Inicio de Sesión:
   - **Campos del Formulario**: Incluye campos para **correo electrónico** y **contraseña** con validación básica (que no estén vacíos y que el campo de correo electrónico esté en el formato correcto).
   - **Autenticación de Usuarios**: Valida las credenciales contra una lista de usuarios predefinidos (ver `usuarios.json` a continuación).
   - **Manejo de Errores**: Si las credenciales no coinciden, muestra un mensaje de error. Muestra un indicador de carga mientras se procesa el inicio de sesión.

   **Lista de Usuarios Predefinidos (`usuarios.json`):**

   ```json
[
  { "email": "admin@example.com", "password": "th1s1sadm1n", "userId": 0 },
  { "email": "user1@example.com", "password": "password123", "userId": 1 },
  { "email": "user2@example.com", "password": "pass456", "userId": 2 },
  { "email": "user3@example.com", "password": "secret789", "userId": 3 },
  { "email": "user4@example.com", "password": "mypassword", "userId": 4 },
  { "email": "user5@example.com", "password": "letmein2024", "userId": 5 },
  { "email": "user6@example.com", "password": "op3ns3s4me", "userId": 6 },
  { "email": "user7@example.com", "password": "p4ssw0rd", "userId": 7 },
  { "email": "user8@example.com", "password": "k3y2open", "userId": 8 },
  { "email": "user9@example.com", "password": "n3in3in3in", "userId": 9 },
{ "email": "user10@example.com", "password": "us3r10pswd", "userId": 10 },
]
```

#### 2. Pantalla de Lista de Tareas:
- **Navegación**: Después de un inicio de sesión exitoso, navega a la Pantalla de Lista de Tareas.
- **Obtención de Datos**: Obtén los primeros 50 elementos desde https://jsonplaceholder.typicode.com/todos.
- **Funcionalidad de Filtro**: Proporciona un botón que permita alternar la vista entre tareas con ID par o impar, filtrar tareas por ID de usuarios, y en caso de ser usuario  admin (userID: 0) mostrar todas las tareas.
- **Visualización de Tareas**: Para cada tarea, muestra: **ID y título**.
- **Barra de Búsqueda**: Incluye una barra de búsqueda que permita a los usuarios filtrar tareas por título, userId o estatus (completada o no) en tiempo real.
- **Paginación**: Incluye un botón de paginación para navegar entre páginas de tareas.
- **Agregar y Eliminar Tareas**: Permite al usuario agregar nuevas tareas y eliminar tareas existentes en la lista, eliminar tarea mediante el gesto y solicitar confirmación con ventana emergente.
#### 3. Funcionalidad de Cierre de Sesión:
- Incluye un botón de Cerrar Sesión en la pantalla de Lista de Tareas que borre el estado de inicio de sesión y regrese a la pantalla de Inicio de Sesión.
#### 4. Estados de Carga y Error:
- Muestra un indicador de carga mientras se obtienen los datos.
- Muestra un mensaje de error si falla la solicitud de red.
#### 5. Estilo y Adaptabilidad:
- Aplica un diseño limpio e intuitivo a la app.
- Asegúrate de que la app sea adaptable y accesible en diferentes tamaños de pantalla.

Resultado esperado: https://www.figma.com/design/YX5oxfS1NYsvgINxLDFY9T/prueba-n09?node-id=0-1&t=Mvfu848QJ10dYQ5v-1
