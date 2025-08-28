# Pasos para realizar los experimentos
Una brújula del silencio – Delos
Autor: Stella P.
Fecha de desarrollo: Agosto-septiembre 2025.

## Sobre el proyecto
Proyecto desarrollado bajo el marco de la clase Sistemas Físicos Interactivos 2, Universidad Pontificia Bolivariana. Utilizando como referente para el desarrollo visual la canción ***"Delos"*** del artista colombiano **Nerón Arkano**, quien es dueño de la totalidad de los derechos de dicha canción, utilizada en este proyecto con fines unicamente de **exploración académica**.
  
El concepto raiz de este proyecto parte de la idea del silencio como brújula interna, explorando cómo el vacío y la pausa permiten redescubrir el propio centro.
  
La experiencia se desarrolla en tres fases emocionales (*Desembarco, Santuario y Retorno Interior*), cada una representada por un estado visual generativo que evoluciona en sincronía con la música, la voz del artista y la interacción del público.
  
El sistema se materializa a través de una infraestructura técnica interactiva distribuida, donde múltiples clientes envían datos en tiempo real:
- **Clientes móviles:** aportan información sensorial del público (palabras, movimiento).
- **Cliente web:** captura inputs como micrófono, movimiento del mouse o teclado.
- **Cliente remoto: permite controlar** parámetros y transiciones de estados.
- **Servidor Node.js con Socket.IO:** integra y distribuye la comunicación en vivo entre todos los clientes.
- **Visuales en p5.js:** interpretan los datos según las reglas Input-Process-Output diseñadas, transformándolos en campos lumínicos, constelaciones o nebulosas.

El propósito no es generar empatía (ponerse en el lugar del otro), sino propiciar epifanías colectivas e individuales, donde cada participante construye su propia revelación a través de su silencio, sus movimientos o sus palabras.

En conjunto, la propuesta combina arte generativo, narrativa nodal y agencia distribuida para crear un ritual contemporáneo de introspección compartida, en el que artista, público y sistema se transforman mutuamente.


## Para probar la aplicación:
Los pasos para ejecutar la aplicación son:

* Clonar el repositorio.

* Abre el repositorio en Visual Studio Code (VSC)

* Abre la **Terminal** de VSC para ejecutar los sigiuentes comandos.

* Instalar las dependencias con el comando

``` bash
npm install
```

* Ejecutar el servidor con:

``` bash
npm start
```
* Realiza un **Forward a port** en Visual Studio Code mediante la pestaña **PORTS** y el puerto 3000 (este es el que está configurado en el archivo server.js)

* Cambia la visibilidad de la URL expuesta a **Public**. Ten presente 
que si lo dejas Private tendrás que autenticarte con tus credenciales de github tanto 
en tu computador (sitio web de escritorio) como en tu celular (sitio web móvil)

* Toma nota de la URL que te da **Forward a port**. Esta la necesitarás en el celular.

* Abre la página web en el computador

``` js
http://localhost:3000/desktop/
https://URL EN FORWARD A PORT/mobile/
```
