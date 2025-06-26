



Esta es una aplicación móvil desarrollada con React Native utilizando Expo, diseñada para simular la gestión de tareas de manera eficiente y ofrecer una experiencia de usuario intuitiva. Esta herramienta demuestra capacidades de interacción con APIs externas, manipulación de datos, y funcionalidades avanzadas de filtrado y visualización, construida con las mejores prácticas actuales del ecosistema React Native.

Características Principales:
Login Simulado: Ofrece una pantalla de inicio de sesión que simula un proceso de autenticación, permitiendo al usuario acceder a las funcionalidades principales de la aplicación sin necesidad de credenciales reales.

Conexión con API de Prueba (Fetch): Se conecta a una API externa de prueba para obtener un listado de tareas, demostrando la capacidad de la aplicación para consumir servicios RESTful y manejar datos asíncronos.

Gestión Completa de Tareas (CRUD simulado):

Edición de Tareas: Permite a los usuarios modificar los detalles de las tareas existentes (título, descripción, estado, etc.) y persistir estos cambios de forma simulada en la interfaz.

Eliminación de Tareas: Facilita la eliminación de tareas individuales de la lista, mostrando la actualización de la UI en tiempo real.

Visualización Detallada de Tareas:

Modal de Tareas Par e Impar: Incorpora un modal interactivo que clasifica y muestra la lista de tareas de forma separada, distinguiendo entre tareas con ID par y tareas con ID impar, ofreciendo una forma única de organizar la información.

Filtrado Inteligente:

Filtrado por Título: Los usuarios pueden buscar y filtrar tareas utilizando una barra de búsqueda que compara el texto introducido con el título de las tareas, mostrando solo las coincidencias relevantes.

Filtrado por ID de Usuario: Permite a los usuarios ver tareas asignadas a un ID de usuario específico, ideal para entornos con múltiples colaboradores.

Feedback Visual Mejorado: Utiliza un overlay de spinner de carga para indicar procesos en segundo plano y notificaciones Toast para informar al usuario sobre el éxito o fracaso de sus acciones.

Tecnologías Utilizadas:
React Native y Expo: Framework principal y entorno de desarrollo recomendado para aplicaciones móviles multiplataforma.

Expo Router: Para una navegación robusta y basada en el sistema de archivos entre las diferentes pantallas de la aplicación.

Zustand: Para el manejo eficiente y simplificado del estado global de la aplicación.

Zod: Utilizado para una validación de esquemas y datos segura y tipada, garantizando la integridad de la información.

Toast: Para mostrar mensajes informativos y de confirmación al usuario de forma no intrusiva.

AsyncStorage: Para el almacenamiento local de datos simples o configuraciones de la aplicación.

Fetch API: Para realizar las peticiones HTTP a la API de prueba de tareas.

