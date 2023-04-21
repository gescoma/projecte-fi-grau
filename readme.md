# Proyecto final (GRUPO 1)

## Integrantes

- [Alice](https://github.com/w0nd3rl4nd)
- [Gerard](https://github.com/gescoma)
- [Jaime](https://github.com/soviet07)
- [Jose Ramon](https://github.com/joseAbaldea)

## Descripción

Nuestro concepto, en resumen, consiste en la creación de un CRM multiplataforma fácil de usar y seguridad de forma predeterminada.

Los objetivos de la creación de esta herramienta ad-hoc para empresas inmobiliarias que no solo permita las funcionalidades de un CRM completo, de diseño orientado hacia su modelo de negocio, sino que además contenga seguridad de forma predeterminada.

Su diseño directo para el marco inmobiliario así como su filosofía “privacy by default” hacen de este CRM una implementación ideal para la pequeña y mediana inmobiliaria, que se beneficiará de su rápida implementación y su facilidad de mantenimiento.

## Tecnologías

:point_right: Python  
:point_right: FastAPI  
:point_right: MySQL  
:point_right: React  
:point_right: NextJS  
:point_right: Git  
:point_right: Github  
:point_right: Notion

## CLIENTE WEB 

Escrito en JavaScript, que desde un login web podrá acceder al sistema y manipular con funcionalidad completa todas las funciones de éste. Todas las peticiones llegarán encriptadas al Servidor con su clave pública y viceversa.

## CLIENTE DESKTOP

Escrito en Python, desde el cual los ordenadores podrán conectarse directamente o mediante directorio activo al servidor, y mayoritariamente estará enfocado a los ordenadores in premises. Desarrollaremos este software con TkInter y Flask. Todas las peticiones llegarán encriptadas al Servidor con su clave pública y viceversa.

## API 

Escrita en Python haciendo uso de FastAPI, será la encargada de comunicar ambos clientes con el servidor mencionado abajo. Funcionará como una librería separada que se encargará de la lógica detrás de la comunicación por HTTP.

## SERVIDOR

Escrito en Python, donde ocurrirán las acciones solicitadas por los clientes en las peticiones. Integrará el fichero principal de Python con toda la carga pesada asociada a las funciones de utilidad como CRM así como las librerías customs, que serán la  librería para comunicación con la base de datos (escrita haciendo uso de la librería SQLite3), la librería API HTTP, escrita con Flask y la librería de encriptación (usando Sequoia).

## BASE DE DATOS SQL 

Hosteada en una máquina en la nube junto al servidor Python, conteniendo toda la información del sistema.
