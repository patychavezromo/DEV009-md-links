# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Como utilizar la libreria de Md-links a tráves de la terminal:](#3-como-utilizar-la-libreria-de-md-links-a-tráves-de-la-terminal)
* [4. Intalación](#4-instalación)
* [5. Pruebas unitarias](#5-pruebas-unitarias)
* [6. Diagrama de flujo](#6-diagrama-de-flujo)



***

## 1. Preámbulo

Markdown es un lenguaje de marcado sencillo utilizado por la comunidad de desarrolladores web y escritores para formatear contenido en línea. Su popularidad se debe a su facilidad de uso, legibilidad, amplia compatibilidad, versatilidad y capacidad de funcionar en diferentes entornos. Markdown simplifica la creación de contenido en la web, lo que ahorra tiempo y esfuerzo al permitir a los usuarios centrarse en el contenido en lugar de la complejidad del formato.

Es muy común encontrar varios archivos en ese formato en cualquier tipo de
repositorio (empezando por el tradicional README.md). Estos archivos Markdown normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

![imagenproyecto](./img/mdlinks.png)

## 2. Resumen del proyecto

Md-Links es una biblioteca en Node.js que funciona como una herramienta para analizar enlaces dentro de archivos Markdown. Esta biblioteca está disponible como un módulo publicado en GitHub y como una interfaz de línea de comandos (CLI) que permite utilizar la biblioteca directamente desde la terminal.

Md-Links tiene la capacidad de leer archivos Markdown y extraer los enlaces encontrados en ellos. Además, proporciona información relevante sobre cada enlace, como el texto del enlace, el archivo en el que se encuentra y el estado del enlace, ya sea que esté funcionando o roto. También ofrece estadísticas, como la cantidad total de enlaces encontrados, la cantidad de enlaces no repetidos y la cantidad de enlaces rotos.

Con Md-Links, simplificamos la tarea de analizar y gestionar enlaces en archivos Markdown, lo que lo convierte en una herramienta útil para quienes trabajan con documentación y contenidos en este formato.


## 3. Como utilizar la libreria de Md-Links a tráves de la terminal:

### Comando md-links
Para comenzar a utilizar Md-Links es necesario escribir el comando ```md-links``` + escribir ```el path ```(ruta absoluta o relativa del proyecto donde se está trabajando, este path puede ser de un archivo o de un directorio) en caso de no localizar la ruta se mostrara un mensaje con el error.

<pre> md-links './ruta/a/un/archivo/markdown.md' <code></code></pre>

* comando md-links + path de un ```directorio específico```:
  Verifica que el archivo sea de tipo Markdown y muestra cada uno de los links encontrados dentro del archivo.

* comando md-links + path de un ```directorio```:
  Busca todos los archivos de tipo Markdown que se localicen dentro del directorio y devuelve la información de cada uno de los links encontrados.

En ambas alternativas de path devolverá información de los links encontrados correspondiente al:
* link encontrado,
* texto del link y,
* ruta del archivo.

Como se muestra a continuación:

![md-links](./img/onlyMdLinks.png)

### Comandos opcionales

También podemos utilizar los siguientes comandos opcionales (--validate y --stats) que nos proporcionan información sobre cada de uno de los enlaces encontrados.

<pre> md-links './ruta/del/archivo' --validate <code></code></pre>
<pre> md-links './ruta/del/archivo' --stats <code></code></pre>

* ```--validate```:  
 al utilizar el comando ```md-links``` + path (indicar la ruta) + el comando ```--validate``` devolvera la información de todos los links encontrados y adicionalmente se agregara la informacion del estatus de respuesta positiva 'ok' o negativa 'fail'.

    #### Tipos de valor al consultar el estatus:

    ```status 200``` significa que al acceder a ese enlace, el servidor web ha podido encontrar y entregar el recurso solicitado, ya que indica que el recurso solicitado está disponible y se ha entregado correctamente.

    ```status 404``` recursos no encontrados.

    ```status 500``` problemas en el servidor.

    ![ejemplovalidate](./img/validate.png)

* ```--stats```:  
 al utilizar el comando ```md-links``` + path (indicar la ruta) + el comando ``` --stats ```, solo devolvera las estadisticas de los enlaces encontrados dentro del archivo o directorio solicitado (total de links, links no repetidos).


  ![ejemplostats](./img/stats.png)


### Combinación de comandos --validate y --stats

<pre> md-links './ruta/del/archivo' --validate --stats <code></code></pre>

Podemos combinar los comandos ```--validate``` y ```--stats``` para obtener una estadistica adicional relacionada al estatus del enlace (muestra los links rotos):

  ![combinacion de comando](./img/validateandstats.png)

## 4. Instalación

Podemos instalar ejecutando en la terminal el siguiente comando:
 

<pre>npm install patychavezromo/DEV009-md-links<code></code></pre>

## 5. Pruebas Unitarias
Se realizarón las pruebas unitarias para validar los modulos de data.js e index.js:

![test](./img/test1.png)
![test](./img/test2.png)


## 6. Diagrama de Flujo

![diagrama de flujo](./img/Untitled%20Diagram.drawio.png)



