


/*FASE 1: CREACIÓN DE BASE DE DATOS SIEMPRE QUE NO EXISTA, POSTERIOR USO*/

CREATE DATABASE IF NOT EXISTS edelweiss DEFAULT CHARACTER SET 'UTF8MB4' DEFAULT COLLATE 'UTF8MB4_general_ci';


USE edelweiss;






/*FASE 2: CREACIÓN DE TODAS LAS TABLAS QUE COMPONEN LA BASE DE DATOS "edelweiss"*/

	
	
CREATE TABLE users (
    id int AUTO_INCREMENT NOT NULL,
	name VARCHAR(50) NOT NULL,
	apellido1 VARCHAR(50) NOT NULL,
	imagen VARCHAR(200) NOT NULL,
	email VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    login VARCHAR(50) NOT NULL,  /*usuario*/
    passwd VARCHAR(50) NOT NULL,   /*contrasena*/
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );	
	
	
	
CREATE TABLE cliente (
    id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(50) NOT NULL,
    apellido1 VARCHAR(50) NOT NULL,
    apellido2 VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    nacionalidad VARCHAR(50),
    personaFisica BOOLEAN,   /*¿Estamos tratando con una persona fisica, o es una empresa? p.fisica: YES/1 -- empresa: NO/0*/
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );	
	
	
	
CREATE TABLE campain (
    id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR(50) NOT NULL,
    periocidad VARCHAR(50) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,	
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );



CREATE TABLE cliente_user_campain (
    id int AUTO_INCREMENT NOT NULL,
	comentario VARCHAR(500),
	id_campain int NOT NULL,
	id_cliente int NOT NULL,
	id_users int NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );	
	
	
	
CREATE TABLE vivienda (
    id int AUTO_INCREMENT NOT NULL,
    calle VARCHAR(50) NOT NULL,
    numero VARCHAR(50) NOT NULL,   /*Es varchar aunque sea numerico, solo se utiliza a nivel informativo*/
	vendida BOOLEAN NOT NULL,  /*queremos saber SI la vivienda esta vendida o NO*/
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );	
	
	
	
	
CREATE TABLE compra (
    id int AUTO_INCREMENT NOT NULL,
	id_users int not NULL,
    id_cliente int NOT NULL,
	id_vivienda int NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );



CREATE TABLE tramiteCompra (
    id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR (50) NOT NULL, 
	descripcion VARCHAR (200) NULL,
	id_proyecto int,
    id_compra int NOT NULL, 
	estado ENUM ("INICIO","ACTUALIZADA","FIN") NOT NULL,
	id_users int NOT NULL, /*encargado*/
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );
	
	
	
/*NUEVAS TABLAS*/




CREATE TABLE roles ( 
    nombre VARCHAR (50) NOT NULL, 
	descripcion VARCHAR (200) NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (nombre)
    );	




CREATE TABLE rolEntidad (
	id int AUTO_INCREMENT NOT NULL,
    entidad VARCHAR (50) NOT NULL, 
	permiso ENUM ("LEER","ESCRIBIR") NOT NULL,   /*Escribir incluye a los 2*/
	rol VARCHAR (50) NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );




CREATE TABLE tarea ( /*una campaña tiene una o varias tareas*/
	id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR (50) NOT NULL, 
	descripcion VARCHAR (200) NULL,
	id_proyecto int,
    id_cliente_user_campain int NOT NULL, 
	estado ENUM ("INICIO","ACTUALIZADA","FIN") NOT NULL,
	id_user int NOT NULL, /*encargado*/
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );
	
	
	

CREATE TABLE registroTarea ( /*se podra hacer con un tigger*/
	id int AUTO_INCREMENT NOT NULL,
    id_tarea int NOT NULL, 
	comentario VARCHAR (200) NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );	



	
CREATE TABLE archivo ( /*una tarea tiene uno o varios archivos*/
	id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR (50) NOT NULL, 
	rutaRel VARCHAR (150) NOT NULL,
	rutaAbs VARCHAR (250) NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );	




/*Tablas de relación con archivo*/


CREATE TABLE tareaArchivo ( 
	id int AUTO_INCREMENT NOT NULL,
	id_tarea int NOT NULL,
	id_archivo int NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );
	
	
	
	
CREATE TABLE tramiteCompraArchivo ( 
	id int AUTO_INCREMENT NOT NULL,
	id_tramiteCompra int NOT NULL,
	id_archivo int NOT NULL,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );	



/*la ultima tabla proyectos*/

	
CREATE TABLE proyecto ( 
	id int AUTO_INCREMENT NOT NULL,
	nombre VARCHAR (50) NOT NULL,
	descripcion VARCHAR (200) NULL,
	id_cliente_user_campain int,
	id_users int NOT NULL,
	id_compra int,
	fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	fecha_modificacion DATE,
    PRIMARY KEY (id)
    );





/* FASE 3: CREACIÓN DE RELACIONES ENTRE LAS DIFERENTES ENTIDADES (FKs)*/	



/*FKs cliente_user_campain*//*los "notis" son los alias*/

ALTER TABLE cliente_user_campain ADD CONSTRAINT fk_noti1 FOREIGN KEY (id_campain) REFERENCES campain (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE cliente_user_campain ADD CONSTRAINT fk_noti2 FOREIGN KEY (id_cliente) REFERENCES cliente (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE cliente_user_campain ADD CONSTRAINT fk_noti3 FOREIGN KEY (id_users) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK tramiteCompra */

ALTER TABLE tramiteCompra ADD CONSTRAINT fk_tCompraUser FOREIGN KEY (id_users) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE tramiteCompra ADD CONSTRAINT fk_tCompraCompra FOREIGN KEY (id_compra) REFERENCES compra (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE tramiteCompra ADD CONSTRAINT fk_tcProyecto FOREIGN KEY (id_proyecto) REFERENCES proyecto (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FKs Compra */
ALTER TABLE compra ADD CONSTRAINT fk_compraCliente FOREIGN KEY (id_cliente) REFERENCES cliente (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_compraUsers FOREIGN KEY (id_users) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE compra ADD CONSTRAINT fk_compraVivienda FOREIGN KEY (id_vivienda) REFERENCES vivienda (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK users */

ALTER TABLE users ADD CONSTRAINT fk_users FOREIGN KEY (rol) REFERENCES roles (nombre) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK rolEntidad */

ALTER TABLE rolEntidad ADD CONSTRAINT fk_rolEntidad FOREIGN KEY (rol) REFERENCES roles (nombre) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK tarea */

ALTER TABLE tarea ADD CONSTRAINT fk_tarea FOREIGN KEY (id_cliente_user_campain) REFERENCES cliente_user_campain (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE tarea ADD CONSTRAINT fk_tareaEncargado FOREIGN KEY (id_user) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE tarea ADD CONSTRAINT fk_tareaProyecto FOREIGN KEY (id_proyecto) REFERENCES proyecto (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK registroTarea */

ALTER TABLE registroTarea ADD CONSTRAINT fk_registroTarea FOREIGN KEY (id_tarea) REFERENCES tarea (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK archivo */

/*ALTER TABLE archivo ADD CONSTRAINT fk_archivo FOREIGN KEY (id_tarea) REFERENCES tarea (id) ON UPDATE CASCADE ON DELETE CASCADE;*//*SE CANCELA POR LAS TABLAS NUEVAS DE RELACIÓN*/




/*FK tareaArchivo*/

ALTER TABLE tareaArchivo ADD CONSTRAINT fk_tatarea FOREIGN KEY (id_tarea) REFERENCES tarea (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE tareaArchivo ADD CONSTRAINT fk_taArchivo FOREIGN KEY (id_archivo) REFERENCES archivo (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK tramiteCompraArchivo*/

ALTER TABLE tramiteCompraArchivo ADD CONSTRAINT fk_taArchivo2 FOREIGN KEY (id_archivo) REFERENCES archivo (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE tramiteCompraArchivo ADD CONSTRAINT fk_taCompraArchivo FOREIGN KEY (id_tramiteCompra) REFERENCES tramiteCompra (id) ON UPDATE CASCADE ON DELETE CASCADE;




/*FK proyecto*/

ALTER TABLE proyecto ADD CONSTRAINT fk_pcliente_user_campain FOREIGN KEY (id_cliente_user_campain) REFERENCES cliente_user_campain (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE proyecto ADD CONSTRAINT fk_pUser FOREIGN KEY (id_users) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE proyecto ADD CONSTRAINT fk_pCompra FOREIGN KEY (id_compra) REFERENCES compra (id) ON UPDATE CASCADE ON DELETE CASCADE;







 