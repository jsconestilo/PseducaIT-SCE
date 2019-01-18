/**
Desarrollador: Alejandro González Reyes
Email: alejandro.gonzalez.reyes@outlook.com
Producto: SCE-PREPAJV - Sistema de Control Escolar del Centro de Bachillerato José Vasconcelos
Licencia: Software Propietario (Prohibida su copia)
Registro: En proceso
Web: http://director.io/prepajv/
Fecha: 1 Septiembre 2013

Nota: Producto de Evaluación para proceso de calificación en la
	  materia de Fundamentos de Programación correspondiente a
	  la Maestría en Comunicación con Medios Virtuales
	  ICONOS

----------------------------------------------------------
Próximas versiones:
	Validación de entrada de números en las cajas de texto
	Validación de rango de calificaciones de 0 a 10
	Versión Responsive Web Design
	Incorporación de módulos (Exámenes Extraordinarios / Títulos de Suficiencia)
	Generación de reportes Impresos
----------------------------------------------------------
*/

window.onload = function(){
	//si el DOM esta preparado, el usuario puede generar la plantilla de registro de calificaciones
	document.getElementById("generador").onclick = generarTabla;
	//añado evento a mis controles de radio
	var radios = document.getElementsByName("tipoSemestre");
	for(var i=0; i<radios.length; i++){
		radios[i].onclick = selectSemestre;
	}
}
/*
ClipFloatByScriptma.03
Descripción: Función que permite cortar un número decimal al número de decimales indicado
Modificado: Alejandro González Reyes
Fecha: 1 Septiembre 2013
Bug corregido: ahora si el número es entero se regresa en formato con decimal 0 (10.0)
*/
function clipFloat(num,dec){ 
	var origin = parseFloat(num);
	var t=num+""; 
	num = parseFloat(t.substring(0,(t.indexOf(".")+dec+1)));
	if(t.indexOf(".") == 1){
		return (num);
	}else{
		return origin.toFixed(1);
	}
} 

//Generación de mis colecciones de datos, referentes al tiraje de materias propuestas para el Bachillerato UAEMéx
var listadoCabecera = new Array("Nombre de la Materia","1er Parcial","2do Parcial","Promedio","Ex. Final","Calif. Ordinaria");
var primerSemestre = ["Comunicacion Oral y Escrita","Computacion Basica","Algebra","Hombre y Salud","Pensamiento y Razonamiento Logico","Orientacion Educativa","Cultura Fisica","Antropologia","Desarrollo del Potencial Humano","Ingles"];
var segundoSemestre = ["Algebra y Trigonometria","Ingles A1","Quimica y Entorno","Filosofia de la Ciencia","Historia Universal Siglo XX-XXI","Estrategias Lingüisticas para el Estudio","Desarrollo del Potencial de Aprendizaje","Orientacion Educativa","Cultura Fisica"];
var tercerSemestre = ["Geometria Analitica","Ingles A2","Quimica y Vida Diaria","Fisica Basica","Etica y Sociedad","Historia Universal Siglo XX-XXI","Lectura de Textos Informativos y Cientificos","Orientacion Educativa","Cultura Fisica"];
var cuartoSemestre = ["Calculo Diferencial e Integral","Geografia Ambiente y Sociedad","Fisica General","Biologia Celular","Lectura de Textos Literarios","Medios y Recursos para la Investigacion","Orientacion Educativa","Cultura Fisica","Ingles B1"];
var quintoSemestre = ["Estadistica","Cultura y Responsabilidad Ambiental","Formacion Ciudadana","Apreciacion del Arte","Metodos de la Investigacion","Medios y Recursos para la Investigacion","Orientacion Educativa","Ingles B2"];
var sextoSemestre = ["Sociologia","Psicologia","Cultura Emprendedora","Mexico ante el Contexto Internacional","Expresion del Arte","Orientacion Educativa","Ingles VI"];
var listaMateriasSemestres = new Array(primerSemestre,segundoSemestre,tercerSemestre,cuartoSemestre,quintoSemestre,sextoSemestre);
//Ordenamiento alfabético en los datos de mis colecciones de materias
primerSemestre = primerSemestre.sort();
segundoSemestre = segundoSemestre.sort();
tercerSemestre = tercerSemestre.sort();
cuartoSemestre = cuartoSemestre.sort();
quintoSemestre = quintoSemestre.sort();
sextoSemestre = sextoSemestre.sort();

function selectSemestre(){
	var listadoSemestresSeleccionado = new Array();
	var nombreSemestres = new Array();
	var tipo_Semestre = document.frm_datosAlumno.tipoSemestre;
	//verifico que radio button fue seleccionado, para luego mostrar la lista correspondiente a los semestres (par e impar)
	for(var i=0; i<tipo_Semestre.length; i++){
		if(tipo_Semestre[i].checked){
			tipo_Semestre = tipo_Semestre[i].value
			break;
		}
	}
	//dependiendo del radio seleccionado, genero un select con opciones diferentes (primero, tercero, quinto / segundo, cuarto, sexto)
	if(tipo_Semestre == "Semestre_Impar"){
		listadoSemestresSeleccionado = [1,3,5];
		nombreSemestres = ["Primer Semestre","Tercer Semestre", "Quinto Semestre"];
	}else{
		listadoSemestresSeleccionado = [2,4,6];
		nombreSemestres = ["Segundo Semestre", "Cuarto Semestre", "Sexto Semestre"];
	}
	//activo mi lista, pues ya se selecciono una modalidad de semestre
	document.frm_datosAlumno.semestre.disabled = false;
	var lista_SeleccionSemestres = document.frm_datosAlumno.semestre;
	var opciones = "";
	//llenamos la lista de opciones en base a la selección del radio button
	for(var i=0; i<listadoSemestresSeleccionado.length; i++){
		opciones += "<option value=\""+listadoSemestresSeleccionado[i]+"\">"+nombreSemestres[i]+"</option>"
	}
	lista_SeleccionSemestres.innerHTML = opciones;
	//mostramos el botón para generar la tabla (plantilla de calificaciones)
	document.getElementById("generador").style.visibility = "visible";
}

function generarTabla(){
	var imprimir_tabla = "";
	imprimir_tabla += "<table>";
	imprimir_tabla += "<tr>";
	//en base a mis elementos de cabecera genero las columnas de titular correspondientes a mi plantilla de calificaciones
	for(var i=0; i<listadoCabecera.length; i++){
		imprimir_tabla += "<th>"+listadoCabecera[i]+"</th>";
	}
	var lista_semestreSeleccionado = document.frm_datosAlumno.semestre;
	//en base a la opción seleccionada en el select (me ubico en la posición del Array correspondiente) para generar la plantilla correspondiente al semestre seleccionado (sus materias)
	var valor_semestreSeleccionado = lista_semestreSeleccionado.options[lista_semestreSeleccionado.selectedIndex].value;
	for(var fila=0; fila<listaMateriasSemestres[valor_semestreSeleccionado-1].length; fila++){
		imprimir_tabla += "<tr>";
		for(var columna=0; columna<listadoCabecera.length; columna++){
			if(columna == 0){
				//en esta parte se generan los input-text referentes a los parciales (1/2)
				var materia_actual = listaMateriasSemestres[valor_semestreSeleccionado-1][fila];
				//codigo_materia es una variable fundamental para dar un nombre apropiado a las cajas de texto para dicha materia
				var codigo_materia = materia_actual.split(" ");
				imprimir_tabla += "<td>"+listaMateriasSemestres[valor_semestreSeleccionado-1][fila].toUpperCase();+"</td>";
			}else{
				//en esta parte se generan los input-text para 1: (el promedio "calificacion parcial"), 2: examen final y califiacación ordinaria
				//utilizo eventos onkeyup para hacer calculos una vez soltada las teclas - llamo a una función que se encarga de todo el cálculo y le paso como parámetro el semestre y la materia a evaluar 
				if(columna<3){
					imprimir_tabla += "<td><input type='text' id='txt_Sem"+valor_semestreSeleccionado+"_CalPar"+columna+"_"+codigo_materia[0].toUpperCase()+"' onkeyup=\"calculaCalificacion(\'"+valor_semestreSeleccionado+"\',\'"+codigo_materia[0]+"\')\"></td>";
				}else{
					imprimir_tabla += "<td><input type='text' disabled='true' id='txtSem"+valor_semestreSeleccionado+"_caja"+columna+"_"+codigo_materia[0].toUpperCase()+"' onkeyup=\"calculaCalificacion(\'"+valor_semestreSeleccionado+"\',\'"+codigo_materia[0]+"\')\"></td>";
				}
			}
		}
		imprimir_tabla += "</tr>";
	}
	imprimir_tabla += "</tr>";
	imprimir_tabla += "</table>";
	//innerHTML propiedad JavaScript causante de la magia de agregar mi tabla generada dinámicamente en el DOM
	document.getElementById("tabla").innerHTML = imprimir_tabla;
	document.getElementById("tabla").style.display = "block";
}

function calculaCalificacion(semestre, materia){
	//estructura de control que permite evaluar la materia en cuestión dependiendo del semestre indicado
	switch(semestre){
		case "1":
			switch(materia.toUpperCase()){
				case "COMPUTACION":
					determinaCalificacion(semestre,materia);
					break;
				case "ANTROPOLOGIA":
					determinaCalificacion(semestre,materia);
					break;
				case "HOMBRE":
					determinaCalificacion(semestre,materia);
					break;
				case "PENSAMIENTO":
					determinaCalificacion(semestre,materia);
					break;
				case "COMUNICACION":
					determinaCalificacion(semestre,materia);
					break;
				case "DESARROLLO":
					determinaCalificacion(semestre,materia);
					break;
				case "ORIENTACION":
					determinaCalificacion(semestre,materia);
					break;
				case "CULTURA":
					determinaCalificacion(semestre,materia);
					break;
				case "INGLES":
					determinaCalificacion(semestre,materia);
					break;
				case "ALGEBRA":
					determinaCalificacion(semestre,materia);
					break;
			}
			break;
		case "2":
			switch(materia.toUpperCase()){
				case "ALGEBRA":
					determinaCalificacion(semestre,materia);
					break;
				case "QUIMICA":
					determinaCalificacion(semestre,materia);
					break;
				case "FILOSOFIA":
					determinaCalificacion(semestre,materia);
					break;
				case "HISTORIA":
					determinaCalificacion(semestre,materia);
					break;
				case "ESTRATEGIAS":
					determinaCalificacion(semestre,materia);
					break;
				case "DESARROLLO":
					determinaCalificacion(semestre,materia);
					break;
				case "ORIENTACION":
					determinaCalificacion(semestre,materia);
					break;
				case "CULTURA":
					determinaCalificacion(semestre,materia);
					break;
				case "INGLES":
					determinaCalificacion(semestre,materia);
					break;
			}
			break;
		case "3":
			switch(materia.toUpperCase()){
				case "GEOMETRIA":
					determinaCalificacion(semestre,materia);
					break;
				case "QUIMICA":
					determinaCalificacion(semestre,materia);
					break;
				case "FISICA":
					determinaCalificacion(semestre,materia);
					break;
				case "ETICA":
					determinaCalificacion(semestre,materia);
					break;
				case "HISTORIA":
					determinaCalificacion(semestre,materia);
					break;
				case "LECTURA":
					determinaCalificacion(semestre,materia);
					break;
				case "ORIENTACION":
					determinaCalificacion(semestre,materia);
					break;
				case "CULTURA":
					determinaCalificacion(semestre,materia);
					break;
				case "INGLES":
					determinaCalificacion(semestre,materia);
					break;
			}
			break;
		case "4":
			switch(materia.toUpperCase()){
				case "CALCULO":
					determinaCalificacion(semestre,materia);
					break;
				case "GEOGRAFIA":
					determinaCalificacion(semestre,materia);
					break;
				case "FISICA":
					determinaCalificacion(semestre,materia);
					break;
				case "BIOLOGIA":
					determinaCalificacion(semestre,materia);
					break;
				case "LECTURA":
					determinaCalificacion(semestre,materia);
					break;
				case "MEDIOS":
					determinaCalificacion(semestre,materia);
					break;
				case "ORIENTACION":
					determinaCalificacion(semestre,materia);
					break;
				case "CULTURA":
					determinaCalificacion(semestre,materia);
					break;
				case "INGLES":
					determinaCalificacion(semestre,materia);
					break;
			}
			break;
		case "5":
			switch(materia.toUpperCase()){
				case "ESTADISTICA":
					determinaCalificacion(semestre,materia);
					break;
				case "CULTURA":
					determinaCalificacion(semestre,materia);
					break;
				case "FORMACION":
					determinaCalificacion(semestre,materia);
					break;
				case "APRECIACION":
					determinaCalificacion(semestre,materia);
					break;
				case "METODOS":
					determinaCalificacion(semestre,materia);
					break;
				case "MEDIOS":
					determinaCalificacion(semestre,materia);
					break;
				case "ORIENTACION":
					determinaCalificacion(semestre,materia);
					break;
				case "INGLES":
					determinaCalificacion(semestre,materia);
					break;
			}
			break;
		case "6":
			switch(materia.toUpperCase()){
				case "SOCIOLOGIA":
					determinaCalificacion(semestre,materia);
					break;
				case "PSICOLOGIA":
					determinaCalificacion(semestre,materia);
					break;
				case "MEXICO":
					determinaCalificacion(semestre,materia);
					break;
				case "EXPRESION":
					determinaCalificacion(semestre,materia);
					break;
				case "CULTURA":
					determinaCalificacion(semestre,materia);
					break;
				case "ORIENTACION":
					determinaCalificacion(semestre,materia);
					break;
				case "INGLES":
					determinaCalificacion(semestre,materia);
					break;
			}
			break;
	}
}

function determinaCalificacion(semestre, materia){
	//esta función es la que lleva a cabo toda la logistica de evaluación de cada una de las materias
	borrar(semestre, materia);	//como el cálculo es en tiempo real (una vez soltada una tecla en los input-text), se requiere hacer una limpieza de formato
	var primerExParcial = 0;
	var segundoExParcial = 0;
	var promedioExParcial = 0;
	var examenFinal = 0;
	var calificacionOrdinaria = 0;
	primerExParcial = document.getElementById("txt_Sem"+semestre+"_CalPar1_"+materia.toUpperCase()).value;
	segundoExParcial = document.getElementById("txt_Sem"+semestre+"_CalPar2_"+materia.toUpperCase()).value;
	primerExParcial = parseFloat(primerExParcial);
	segundoExParcial = parseFloat(segundoExParcial);
	promedioExParcial = (primerExParcial + segundoExParcial)/2;
	//por defecto las calificiones ordinarias se muestran en color verde PREPAJV
	document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).style.color="#315D29";
	if(promedioExParcial >= 8){
		//A groso modo en este caso se coloca EXENTO (con estilo) en la caja Examen Final, se le desactiva y la calificación ordinaria es la misma que el promedio
		document.getElementById("txtSem"+semestre+"_caja3_"+materia.toUpperCase()).value = clipFloat(promedioExParcial,1);
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).value = "Exento";
		document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).value = clipFloat(promedioExParcial,1);
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).style.backgroundColor = "#222";
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).style.color = "#fff";
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).disabled = true;
	}
	else if(promedioExParcial >=6 && promedioExParcial <8){
		//En este caso la caja de Examen Final se activa (con estilo) para poder insertar la calificación de ese examen (pues no se exento)
		document.getElementById("txtSem"+semestre+"_caja3_"+materia.toUpperCase()).value = clipFloat(promedioExParcial,1);
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).disabled = false;
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).style.backgroundColor = "#315D29";
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).style.color = "#fff";	
		if(document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).value != ""){
			//si el usuario colocó ya una calificación Final se procede a realizar el cálculo de promedios parciales y examen final. Para posteriormente mostrar el resultado en la caja Calificación ordinaria
			examenFinal = document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).value;
			examenFinal = parseFloat(examenFinal);
			calificacionOrdinaria = (promedioExParcial + examenFinal)/2;
			document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).value = clipFloat(calificacionOrdinaria,1);
			if(calificacionOrdinaria < 6){
				//si la calificación ordinaria es reprobatoria se procede a cambiar su estilo a rojo
				document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).style.color="red"; 
			}
		}
	}
	else if(promedioExParcial <6){
		//Si el promedio de los parciales es reprobatorio, a groso modo se anota el resultado en la caja Promedio y Calificación Ordinaria, se muestra un mensaje de SIN DERECHO en la caja Examen Final (con estilo) y esta se desactiva
		document.getElementById("txtSem"+semestre+"_caja3_"+materia.toUpperCase()).value = clipFloat(promedioExParcial,1);
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).value = "Sin Derecho";
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).disabled = true;
		document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).value = clipFloat(promedioExParcial,1);
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).style.backgroundColor = "red";
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).style.color = "#fff";
		document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).style.color="red";
	}
}

function borrar(semestre, materia){
	/*como los calculos se realizan una vez que el usuario suelta una tecla (en tiempo real), es necesario observar los cambios que este hace en los registros
	(puede borrar un número e insertar otro, agregarle un decimal, borrar todo el dato). El objetivo es estar presente de los cambios de estilo (leyendas y colores en algunas cajas)
	y estar pendiente de desactivar o volver activar las cajas en base a los cambios registrados*/
	var situacionFinal = document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).value;
	var datoParcialA = document.getElementById("txt_Sem"+semestre+"_CalPar1_"+materia.toUpperCase()).value;
	var datoParcialB = document.getElementById("txt_Sem"+semestre+"_CalPar2_"+materia.toUpperCase()).value;
	var datoOrdinario = document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).value;
	//si en la caja Examen Final existe una leyenda o se borra el contenido de las cajas de los examenes parciales. El contenido de la caja Examen final se procede a borrar y dependerá de la función (determinarCalificacion) si el contenido cambia
	if(situacionFinal == "Exento" || situacionFinal == "Sin Derecho" || datoParcialB=="" || datoParcialA==""){
		//si no se da el caso, entonces dejo que su contenido sea editable (para los casos de registro de examen final), de lo contrario no me dejaría escribir (pues borraría de inmediato)
		document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).value = "";
	}
	//Se hacen ajustes en los contenidos, comportamientos y estilos de las demás cajas (promedio, finales, calificación ordinaria)
	document.getElementById("txtSem"+semestre+"_caja3_"+materia.toUpperCase()).value = "";
	document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).disabled = true;
	document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).style.backgroundColor = "#F4E1A7";
	document.getElementById("txtSem"+semestre+"_caja4_"+materia.toUpperCase()).style.color = "#222";
	document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).disabled = true;
	document.getElementById("txtSem"+semestre+"_caja5_"+materia.toUpperCase()).value = "";
}