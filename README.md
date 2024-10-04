# GESTOR DE TAREAS
<p>
    <img src="https://img.shields.io/badge/STATUS-TERMINADO-green">
    <img src="https://img.shields.io/badge/Angular-16.2.16-red">
    <img src="https://img.shields.io/badge/TailwindCSS-blue">
    <img src="https://img.shields.io/badge/Git/GitHub-black">

</p>



## Descripción

Se implementa esta aplicación web en **Angular 16** que gestiona tareas y personas asociadas a ellas. La aplicación ofrece las siguientes funcionalidades:

1. Crear tareas.
2. Listar tareas creadas.
3. Marcar tareas como completadas.
4. Filtrar tareas por estado (completadas o pendientes).
5. Asignar personas a cada tarea, incluyendo nombres completos, edades y habilidades.
6. Añadir y eliminar personas de las tareas mediante botones para estas acciones.
7. Añadir y eliminar habilidades para cada persona usando botones.
8. Implementar un formulario reactivo con validaciones, que incluya la validación de arreglos y arreglos anidados.

Las personas asociadas a una tarea deben tener los siguientes atributos:

- **Nombre completo** (obligatorio, mínimo 5 caracteres, no puede repetirse entre las personas de la misma tarea).
- **Edad** (obligatorio, mayor de 18 años).
- **Habilidades** (lista de habilidades asociadas a la persona, debe tener al menos una habilidad).

Utiliza arreglos de objetos para almacenar y gestionar las personas asociadas a las tareas, así como un arreglo anidado para gestionar las habilidades de cada persona.

## Requerimientos
1. **Interfaz Gráfica:**
   - Interfaz gráfica de usuario utilizando **Angular 16** que gestiona las tareas, personas y habilidades asociadas.
   - Formularios reactivos con validaciones, gestionando correctamente el arreglo de personas y el arreglo anidado de habilidades.
   - Implementa componentes standalone en al menos uno de los componentes.
   - Aplica principios de diseño **Mobile First** para que la interfaz sea responsiva.

2. **Gestión del Estado:**
   - Servicio en Angular para gestionar el estado de las tareas, personas y habilidades.
   - Almacena las tareas y personas en un arreglo de objetos, y las habilidades en un arreglo anidado dentro de cada persona.


## Interfaz Gráfica
La aplicación incluye las siguientes funcionalidades visibles en la interfaz gráfica:

1. **Pantalla de Creación de Tareas:**
   - Presenta un formulario para agregar una nueva tarea con nombre, fecha límite, personas asociadas y botones para añadir o eliminar personas y habilidades.
   - Incluye validaciones para los campos del formulario, que abarcan el arreglo de personas y el arreglo anidado de habilidades.

2. **Pantalla de Listado de Tareas:**
   - Muestra todas las tareas creadas con la opción de filtrar por tareas completadas o pendientes.
   - Presenta las personas asociadas a cada tarea.
   

## Tecnologías
- **Framework de Frontend:** Angular 16
- **Framework de CSS:** TailwindCSS
- **Control de versiones:** Git / GitHuub


## Desarrollador:

| [<img src="https://avatars.githubusercontent.com/u/120583187?v=4" width=115><br><sub>José Luis Paternina Martínez</sub>](https://github.com/JosePater) 
|:------------------------------------------------------------------------------------------------------------------------------------------------------:| 

© Derechos Reservados
