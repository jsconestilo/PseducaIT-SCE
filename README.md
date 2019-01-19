![Logotipo Sistema de Control Escolar PSEDUCA IT](https://github.com/jsconestilo/PseducaIT-SCE/blob/master/logotipoSCE.png)

El **Sistema de Control Escolar** del Centro de Bachillerato José Vasconcelos SC. Tiene por objetivo registrar todas las calificaciones obtenidas por los alumnos en cada una de las materias cursadas, pertenecientes a dicha Institución Educativa.

**Sistema de Contol Escolar** es parte PSEDUCA IT, un entorno virtual que tiene por objetivo ser un punto de encuentro entre alumnos de la comunidad estudiantil y profesores.

### Tecnologías Web Implementadas en el Proyecto

| Frontend               							| Backend | Gestor de Bases de Datos |
| ------------------------------------------------- | ------- | ------------------------ |
| HTML-5                 							| 		    					     |
| CSS-3                  							|         			                 |
| JavaScript Vanilla (No Framewoks / No Librerías)   |                                   |


### Descripción de las Secciones del Sitio

**1. Página de Index**

   Es la página de inicio del Sistema de Control Escolar, cuenta con un diseño minimalista en el que se puede apreciar el logotipo Institucional, información legal del Sitio, así como un formulario en la parte central con los controles necesarios para llevar a cabo la caputura de calificaciones semestrales pertenecientes a un alumno.

   Una vez seleccionado la modalidad y número de semestre por el usuario, el sistema genera una tabla con todo el tiraje de materias asociadas a dicho semestre, donde a su vez, se puede capturar la calificación obtenida por el alumno tanto en el primer como segundo examen parcial, con base en la siguiente lógica de negocio:

   * **Si el promedio de las calificaciones es igual o supero a 8.0**, el sistema determina que dicho alumno se encuentra exento, por tanto no es necesario que presente un examen final (se coloca como calificación ordinaria el promedio obtenido).

   * **Si el promedio es inferior 6.0**, el sistema determina que dicho alumno se encuentra sin derecho a presentar un examen final, por tanto se coloca como calificación ordinaria el promedio obtenido.

   * **Si el promedio es igual o superior a 6.0 y menor a 8.0**, el sistema determina que dicho alumno debe presentar un examen final, por tanto es necesario registrar esta calificación en el apartado correspondiente. Al final, la calificación ordinaria se determina con promediar los tres exámenes presentados (primer parcial, segundo parcial y examen final).
